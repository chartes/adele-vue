import axios from 'axios';
import Quill from '../../../modules/quill/AdeleQuill';
import {http} from '../../../modules/http-common';

import {
  insertNotes, computeNotesPointers, TEIToQuill,
  insertSegments, stripSegments, quillToTEI, convertLinebreakTEIToQuill, insertNotesAndSegments,
  convertLinebreakQuillToTEI, computeAlignmentPointers
} from '../../../modules/quill/MarkupUtils'
import {filterDeltaOperations} from "../../../modules/quill/DeltaUtils";

const translationShadowQuillElement = document.createElement('div');
let translationShadowQuill;

const translationWithTextAlignmentShadowQuillElement = document.createElement('div');
let translationWithTextAlignmentShadowQuill;

const state = {
  translationLoading: true,
  translation: null,
  translationError: null,
  translationContent: null,
  translationWithTextAlignment: null,
  translationSaved: true,
  referenceTranslation: null,

  savingStatus: 'uptodate'
};

const mutations = {

  INIT(state, payload) {
      translationShadowQuillElement.innerHTML = "<p></p>";
      translationShadowQuill = new Quill(translationShadowQuillElement);
      translationShadowQuillElement.children[0].innerHTML = payload.content;
      state.translationContent = translationShadowQuillElement.children[0].innerHTML;

      translationWithTextAlignmentShadowQuillElement.innerHTML = "<p></p>" 
      translationWithTextAlignmentShadowQuill = new Quill(translationWithTextAlignmentShadowQuillElement);
      translationWithTextAlignmentShadowQuillElement.children[0].innerHTML = payload.withTextAlignment || "";
      state.translationWithTextAlignment = translationWithTextAlignmentShadowQuillElement.children[0].innerHTML;
  },
  RESET (state) {
    state.translationLoading = true;
    state.translation = null;
    state.translationContent = null;
    state.translationWithTextAlignment = null;

    if (translationShadowQuillElement) translationShadowQuillElement.innerHTML = "";
    if (translationWithTextAlignmentShadowQuillElement && translationWithTextAlignmentShadowQuillElement.children[0]) translationWithTextAlignmentShadowQuillElement.children[0].innerHTML = "";

  },
  SET_ERROR(state, payload) {
    state.translationError = payload
  },
  REFERENCE(state, payload) {
    state.referenceTranslation = payload
  },
  LOADING_STATUS (state, payload) {
    state.translationLoading = payload;
  },
  UPDATE (state, payload) {
    if (payload.translation) {
      state.translation = payload.translation;
    }
    if (payload.withFacsimile) {
      state.translationWithFacsimile = payload.withFacsimile;
    }
    if (payload.withTextAlignment) {
      state.translationWithTextAlignment = payload.withTextAlignment;
    }
    //state.translationSaved = true;
  },
  CHANGED (state) {
    // translation changed and needs to be saved
    state.translationSaved = false;
  },
  SAVING_STATUS (state, payload) {
    //console.log("STORE MUTATION transcription/SAVING_STATUS", payload)
    state.savingStatus = payload;
  },
  ADD_TRANSLATION_ALIGNMENT_OPERATION (state, payload) {
    const deltaFilteredForTextAlignment = filterDeltaOperations(translationWithTextAlignmentShadowQuill, payload, 'text-alignment');
    translationWithTextAlignmentShadowQuill.updateContents(deltaFilteredForTextAlignment);
    state.translationWithTextAlignment = translationWithTextAlignmentShadowQuillElement.children[0].innerHTML;
  },
  ADD_OPERATION (state, payload) {
    const deltaFilteredForContent = filterDeltaOperations(translationShadowQuill, payload, 'content');

    translationShadowQuill.updateContents(deltaFilteredForContent);

    state.translationContent = translationShadowQuillElement.children[0].innerHTML;
  },
  SAVED (state) {
    // translation changed and needs to be saved
    state.translationSaved = true;
  }
};

const actions = {

  /* useful */
  fetchTranslationFromUser ({commit, state, rootState}, {docId, userId}) {
    commit('RESET')
    return http.get(`documents/${docId}/translations/from-user/${userId}`).then( response => {
      commit('LOADING_STATUS', true);

      let translation = response.data.data;
      const alignments = rootState.transcription.transcriptionAlignments;

      let quillContent = TEIToQuill(translation.content);
      //let content = insertSegments(quillContent, alignments, 'translation');

      const data = {
        translation: translation,
        content: convertLinebreakTEIToQuill(quillContent),
        withTextAlignment: convertLinebreakTEIToQuill(quillContent),
      }

      commit('INIT', data);
      commit('UPDATE', data);
      commit('SET_ERROR', null)
      commit('LOADING_STATUS', false);
    }).catch((error) => {
      commit('SET_ERROR', error)
      commit('LOADING_STATUS', false);
      //throw error
    })
  },
  /* useful */
  fetchTranslationContent({dispatch, rootState, rootGetters}) {
    if (rootGetters['workflow/isTranslationReadOnly']) {
      // when in readonly mode
      // students see the reference content
      // teacher and admins can see other ppl readonly views
      return dispatch('document/fetchTranslationView', 
        rootGetters['user/currentUserIsTeacher'] ? rootState.workflow.selectedUserId : rootState.document.user_id,
        {root: true})
    } else {
      console.log("fetch translation from user")
      return dispatch('fetchTranslationFromUser', {
        docId: rootState.document.document.id,
        userId: rootState.workflow.selectedUserId
      })
    }
  },
  /* useful */
  addNewTranslation ({commit, dispatch, rootState}) {
    const emptyTranslation = {
      data: {
        content: ""
      }
    }
    return http.post(`documents/${rootState.document.document.id}/translations/from-user/${rootState.workflow.selectedUserId}`, emptyTranslation).then(response => {
      commit('SET_ERROR', null)
    }).catch(error => {
      commit('SET_ERROR', error)
    })
  },
  /* useful */
  setError({commit}, payload) {
    commit('SET_ERROR', payload)
  },
   /* useful */
  async deleteTranslationFromUser({dispatch, commit}, {docId, userId}) {
    try {
      commit('SET_ERROR', null)
      const response = await http.delete(`documents/${docId}/translations/from-user/${userId}`)
      await dispatch('document/partialUpdate', {
        validation_flags: response.data.data.validation_flags
      }, {root: true})
      await dispatch('fetchTranslationContent')
    } catch(error) {
      commit('SET_ERROR', error)
    }
  },

  /* useful */
  async saveTranslation({dispatch, commit, state, rootState, rootGetters}) {
    commit('SAVING_STATUS', 'tobesaved')
    commit('LOADING_STATUS', true)

    try {
      const tei = quillToTEI(state.translationContent)
      const sanitizedContent = stripSegments(tei)

      // put content
      await http.put(`documents/${rootState.document.document.id}/translations/from-user/${rootState.workflow.selectedUserId}`, {
        data: {
          content: sanitizedContent,
        }
      })
            
      // update the store content
      await dispatch('fetchTranslationContent')

      commit('SAVING_STATUS', 'uptodate')
      commit('SET_ERROR', false)
      commit('LOADING_STATUS', false)
    } catch(error) {
      // TODO: rollback to previous content ?
      commit('SET_ERROR', error)
      commit('SAVING_STATUS', 'error')
      commit('LOADING_STATUS', false)
    }
  },

  insertSegments({commit, state}, segments) {
    const TEIwithSegments = insertSegments(quillToTEI(state.translationContent), segments);
    const withTextAlignmentSegments = TEIToQuill(TEIwithSegments);
    const data = {
      withTextAlignment: convertLinebreakTEIToQuill(withTextAlignmentSegments)
    };
    translationWithTextAlignmentShadowQuillElement.children[0].innerHTML = data.withTextAlignment;

    commit('UPDATE', data);
    //translationWithTextAlignmentShadowQuill.setText(state.translationWithTextAlignment)
    //console.log(state.translationWithTextAlignment)
  },


  async cloneContent({dispatch, rootState}) {
    const doc_id = rootState.document.document.id;
    const user_id = rootState.workflow.selectedUserId;
    try {
      const response = await http.get(`documents/${doc_id}/translations/clone/from-user/${user_id}`)
      await dispatch('document/unsetValidationFlag', {docId: doc_id, flagName: 'translation'}, {root: true})
      return response.data;
    } catch (e) {
      console.log(`%c error while cloning translation ${e}`, 'color:red');
    }
  },

  changed ({ commit, rootState }, {delta}) {
    if (rootState.workflow.transcriptionAlignmentMode) {
      commit('ADD_TRANSLATION_ALIGNMENT_OPERATION', delta);
    } else {
      commit('ADD_OPERATION', delta);
      commit('CHANGED', false);
      commit('SAVING_STATUS', 'tobesaved')
    }
  },
  reset ({ commit }) {
    commit('RESET')
  },

};


const getters = {
  isTranslationSaved(state) {
    return state.savingStatus === 'uptodate'
  },
  translationSegmentsFromQuill(state) {
    if (!state.translationWithTextAlignment) return [];
    const text = quillToTEI(state.translationWithTextAlignment)
    return computeAlignmentPointers(text)
  }
};

const translationModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default translationModule;
