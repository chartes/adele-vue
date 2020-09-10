import axios from 'axios';
import Quill from '../../../modules/quill/AdeleQuill';
import {http} from '../../../modules/http-common';

import TEItoQuill, {
  insertNotes, computeNotesPointers, TEIToQuill,
  insertSegments, stripSegments, quillToTEI, convertLinebreakTEIToQuill, insertNotesAndSegments,
  convertLinebreakQuillToTEI
} from '../../../modules/quill/MarkupUtils'
import {filterDeltaOperations} from "../../../modules/quill/DeltaUtils";

const translationShadowQuillElement = document.createElement('div');
const notesShadowQuillElement = document.createElement('div');
let translationShadowQuill;
let notesShadowQuill;

const state = {
  translationLoading: true,
  translation: null,
  translationError: null,
  translationContent: null,
  translationWithNotes: null,
  translationSaved: true,
  translationAlignments: [],
  referenceTranslation: null,

  savingStatus: 'uptodate'
};

const mutations = {

  INIT(state, payload) {
      translationShadowQuillElement.innerHTML = "<p></p>";
      translationShadowQuill = new Quill(translationShadowQuillElement);
      translationShadowQuillElement.children[0].innerHTML = payload.content;
      state.translationContent = translationShadowQuillElement.children[0].innerHTML;
      console.log('STORE ACTION translation/INIT')

      notesShadowQuillElement.innerHTML = "<p></p>"
      notesShadowQuill = new Quill(notesShadowQuillElement);
      notesShadowQuillElement.children[0].innerHTML = payload.withNotes;
      state.translationWithNotes = notesShadowQuillElement.children[0].innerHTML;

  },
  RESET (state) {
    console.log("STORE MUTATION translation/RESET")
    state.translation = null;
    state.translationAlignments = [];
    state.translationContent = null;
    state.translationWithNotes = null;

    if (translationShadowQuillElement) translationShadowQuillElement.innerHTML = "";
    if (notesShadowQuillElement) notesShadowQuillElement.innerHTML = "";
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
  ALIGNMENTS(state, payload) {
    state.translationAlignments = payload;
  },
  UPDATE (state, payload) {
    if (payload.translation) {
      state.translation = payload.translation;
    }
    if (payload.withNotes) {
      state.translationWithNotes =  payload.withNotes
    }
    if (payload.withSpeechparts) {
      state.translationWithSpeechparts = payload.withSpeechparts;
    }
    if (payload.withFacsimile) {
      state.translationWithFacsimile = payload.withFacsimile;
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
  ADD_OPERATION (state, payload) {
    const deltaFilteredForContent = filterDeltaOperations(translationShadowQuill, payload, 'content');
    const deltaFilteredForNotes = filterDeltaOperations(notesShadowQuill, payload, 'notes');

    translationShadowQuill.updateContents(deltaFilteredForContent);
    notesShadowQuill.updateContents(deltaFilteredForNotes);

    state.translationContent = translationShadowQuillElement.children[0].innerHTML;
    state.translationWithNotes = notesShadowQuillElement.children[0].innerHTML;
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
      let content = insertSegments(quillContent, alignments, 'translation');
      const withNotes = insertNotesAndSegments(quillContent, translation.notes, alignments, 'translation');

      const data = {
        translation: translation,
        content: convertLinebreakTEIToQuill(content),
        withNotes: convertLinebreakTEIToQuill(withNotes),
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
        notes: [],
        content: ""
      }
    }
    return http.post(`documents/${rootState.document.document.id}/translations/from-user/${rootState.user.currentUser.id}`, emptyTranslation).then(response => {
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

      // prepare notes
      const teiWithNotes = quillToTEI(state.translationWithNotes)
      let sanitizedWithNotes = stripSegments(teiWithNotes)
      sanitizedWithNotes = convertLinebreakQuillToTEI(sanitizedWithNotes)
      const notes = computeNotesPointers(sanitizedWithNotes)
      //console.log("preparing notes", state.translationWithNotes, computeNotesPointers(sanitizedWithNotes), notes)

      notes.forEach(note => {
        const found = rootGetters['notes/getNoteById'](note.id)
        note.content = found.content
        if (found.note_type) {
          note.type_id = found.note_type.id
        }
      })

      // put content && update notes
      await http.put(`documents/${rootState.document.document.id}/translations/from-user/${rootState.user.currentUser.id}`, {
        data: {
          content: sanitizedContent,
          notes: notes.filter(n => n.id !== null && n.id >= 0)
        }
      })
            
      // and post new notes 
      const new_notes = notes.filter(n => n.id === null || n.id < 0).map(n => {
         delete n.id
         return n
        })
      if (new_notes.length > 0){
        await http.post(`documents/${rootState.document.document.id}/translations/from-user/${rootState.user.currentUser.id}`, {
          data: {notes: new_notes}
        })
      }

      // update the store content
      await dispatch('fetchTranslationContent')

      commit('SAVING_STATUS', 'uptodate')
      commit('SET_ERROR', false)
      commit('LOADING_STATUS', false)
    } catch(error) {
      // TODO: rollback to previous content and notes
      commit('SET_ERROR', error)
      commit('SAVING_STATUS', 'error')
      commit('LOADING_STATUS', false)
    }
  },

  insertNote({commit, state}, newNote) {
    /* build a new shadow content with notes */
    const quillContent = TEIToQuill(state.translationContent);
    const textWithNotes = insertNotes(quillContent, [newNote])
    const data = {
      translation: {
        ...state.translation,
        notes: state.translation.notes.concat(newNote)
      },
      withNotes: convertLinebreakTEIToQuill(textWithNotes),
    }
    /* save the shadow content with notes */
    commit('UPDATE', data)
    return newNote
  },
  changed ({ commit, dispatch }, deltas) {
    commit('ADD_OPERATION', deltas);
    commit('CHANGED', false);
    commit('SAVING_STATUS', 'tobesaved')
    //dispatch('transcription/translationChanged', null, {root:true})
  },
  reset ({ commit }) {
    commit('RESET')
  },
  create ({ commit, rootState, rootGetters }) {
    const auth = rootGetters['user/authHeader'];
    const data = { data: [{
        "content" : '<p></p>',
        "username": rootState.user.currentUser.username
      }]};
    return new Promise( ( resolve, reject ) => {
      axios.post(`/adele/api/1.0/documents/${rootState.document.document.id}/translations`, data, auth)
        .then( response => {
          if (response.data.errors) {
            reject(response.data.errors);
          }
          else resolve( response.data )
        })
        .catch( error => {
          reject( error )
        });
    } );
  },

};

const getters = {
  isTranslationSaved(state) {
    return state.savingStatus === 'uptodate'
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
