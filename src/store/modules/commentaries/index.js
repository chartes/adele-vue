import {http} from '../../../modules/http-common';
import Quill from '../../../modules/quill/AdeleQuill';
import Vue from 'vue';

import {
  TEIToQuill,
  quillToTEI,
  convertLinebreakTEIToQuill,
  convertLinebreakQuillToTEI,
  computeNotesPointers,
} from '../../../modules/quill/MarkupUtils'
import {filterDeltaOperations} from '../../../modules/quill/DeltaUtils'


const state = {

  commentaryTypes: [],
  selectedCommentaryLabel : null,

  commentaries: {},
  savingStatus: 'uptodate',
  commentariesLoading: false,
  commentariesSaved: true,
  commentariesError: null,
};

async function saveCom(rootState, rootGetters, com) {
  //console.log("saving", state.commentariesWithNotes, com)
  const content = com.content

  // put content
  await http.put(`documents/${rootState.document.document.id}/commentaries/from-user/${rootState.workflow.selectedUserId}`, {
    data: {
      type_id: com.type,
      content,
    }
  })
}  

const mutations = {
  INIT(state, data) {
      state.commentaries = {}
      state.selectedCommentaryLabel = null

      data.forEach(commentary => {
        const t = commentary.typeLabel

        console.log("commentary source", t, data)

        Vue.set(state.commentaries, t, {
          ...commentary,
        })
      })

      if (data.length > 0) {
        state.selectedCommentaryLabel = data[0].typeLabel
      }
  },
  UPDATE_TYPES (state, payload) {
    state.commentaryTypes = payload
  },
  SELECT(state, label) {
    state.selectedCommentaryLabel = label
  },
  LOADING_STATUS (state, payload) {
    state.commentariesLoading = payload;
  },
  /*
  ADD_COMMENTARY (state, {commentary}) {
    const comm = state.commentaries.find(c => c.type === commentary.type);
    if (!comm) {
      state.commentaries.push(commentary)
      const typeLabel = state.commentaryTypes[commentary.type]
      state.hasCommentaryTypes[typeLabel] = true
    }
  },
  */
  /*
  UPDATE_COMMENTARY (state, {content, type}) {
    const comm = state.commentaries.find(c => c.type === type);
    comm.content = content
  },
  */
  UPDATE(state, {content}) {
    const t = state.selectedCommentaryLabel
    Vue.set(state.commentaries, t, {
      ...state.commentaries[t],
      content
    })
  },
  SET_ERROR(state, payload) {
    state.commentariesError = payload
  },
  RESET(state) { 
    state.commentariesWithNotes = {}
    state.selectedCommentaryLabel = null
  },
  CHANGED (state) {
    // transcription changed and needs to be saved
    state.commentariesSaved = false;
  },
  SAVING_STATUS (state, payload) {
    state.savingStatus = payload;
  },
};

function parseComsFromResponse(response) {
  const commentaries = response.data.data;
  let hasTypes = {};
  let commentariesFormatted = [];
  commentaries.forEach(comm => {
    commentariesFormatted.push({
      type: comm.type.id,
      typeLabel: comm.type.label,
      content: comm.content,
    });
    hasTypes[comm.type.label] = true
  })
  return { commentaries: commentariesFormatted, hasTypes }
}

const actions = {

  fetchTypes ({ commit }) {
    return http.get(`commentary-types`).then( response => {
      commit('UPDATE_TYPES', response.data.data)
    });
  },

  fetchCommentariesFromUser ({ commit }, {docId, userId}) {
    commit('LOADING_STATUS', true);
    return http.get(`documents/${ docId }/commentaries/from-user/${ userId }`).then( response => {
        const formattedData = parseComsFromResponse(response)
        commit('INIT', formattedData.commentaries); 
        commit('SET_ERROR', null)
        commit('LOADING_STATUS', false);
      }).catch((error) => {
        commit('SET_ERROR', error)
        commit('RESET')
        commit('LOADING_STATUS', false);
        //throw error
      })
  },
  /* useful */
  fetchCommentariesContent({dispatch, rootState, rootGetters}) {
    if (rootGetters['workflow/isCommentariesReadOnly']) {
      // when in readonly mode
      // students see the reference content
      // teacher and admins can see other ppl readonly views
      return dispatch('document/fetchCommentariesView', 
        rootGetters['user/currentUserIsTeacher'] ? rootState.workflow.selectedUserId : rootState.document.user_id,
        {root: true})
    } else {
      return dispatch('fetchCommentariesFromUser', {
        docId: rootState.document.document.id,
        userId: rootState.workflow.selectedUserId
      })
    }
  },
  async cloneContent({dispatch, rootState}) {
    console.log('STORE ACTION commentaries/cloneContent');
    const doc_id = rootState.document.document.id;
    const user_id = rootState.workflow.selectedUserId;
    const type_id = 1 // TODO
    try {
      const response = await http.get(`documents/${doc_id}/commentaries/clone/from-user/${user_id}/and-type/${type_id}`)
      await dispatch('document/unsetValidationFlag', {docId: doc_id, flagName: 'commentaries'}, {root: true})
      return response.data;
    } catch (e) {
      console.log(`%c error while cloning commentaries ${e}`, 'color:red');
    }
  },
  /* useful */
  setError({commit}, payload) {
    commit('SET_ERROR', payload)
  },
  selectCommentaryTab({commit}, label) {
    commit('SELECT', label)
  },
  /* useful */
  addNewCommentary({commit, state, dispatch, rootState}, {type}) {
    commit('LOADING_STATUS', true);
    const newCommentary = {
      data: {
        doc_id : rootState.document.document.id,
        user_id : rootState.workflow.selectedUserId,
        type_id: type,
        content : '<p></p>'
      }
    }
    const newLabel = state.selectedCommentaryLabel
    return http.post(`documents/${rootState.document.document.id}/commentaries/from-user/${rootState.workflow.selectedUserId}`, newCommentary).then(response => {
      return dispatch('fetchCommentariesFromUser', {
        docId: rootState.document.document.id,
        userId: rootState.workflow.selectedUserId
      }).then(() => {
        commit('SELECT', newLabel)
        commit('LOADING_STATUS', false);
      })
    }).catch(error => {
      commit('SET_ERROR', error)
      commit('LOADING_STATUS', false);
    })
  },
   /* useful */
   async deleteCommentaryFromUser({dispatch, commit, rootState}, comType) {
    try {
      commit('LOADING_STATUS', true);
      commit('SET_ERROR', null)
      const response = await http.delete(`documents/${rootState.document.document.id}/commentaries/from-user/${rootState.workflow.selectedUserId}/and-type/${comType}`)
     /*
     //TODO: faire le bouton de validation avant, histoire de tester facilement
      await dispatch('document/partialUpdate', {
        validation_flags: response.data.data.validation_flags
      }, {root: true})
      */
      await dispatch('fetchCommentariesContent')
    } catch(error) {
      commit('SET_ERROR', error)
      commit('LOADING_STATUS', false);
    }
  },

  /* useful */
  changed ({ commit }, {content}) {
    commit('UPDATE', {content});
    commit('CHANGED');
    commit('SAVING_STATUS', 'tobesaved')
  },

  /* useful */
  async saveCommentaries({dispatch, commit, state, rootState, rootGetters}) {
    commit('SAVING_STATUS', 'tobesaved')
    commit('LOADING_STATUS', true);

    try {
      // save each commentary independently in parallel
      await Promise.all(Object.values(state.commentaries).map(com => saveCom(rootState, rootGetters, com)))
      // update the store content
      await dispatch('fetchCommentariesContent')
  
      commit('SAVING_STATUS', 'uptodate')
      commit('SET_ERROR', false)
      commit('LOADING_STATUS', false)
    } catch(error) {
      commit('SET_ERROR', error)
      commit('SAVING_STATUS', 'error')
      commit('LOADING_STATUS', false)
    }
  },


  getCommentariesViewContent({rootState}) {
    if (rootState.document.commentariesView) {
      console.log("==> rootState.document.commentariesView", rootState.document.commentariesView)
      const coms = rootState.document.commentariesView.map(c => {
        return {
          ...c,
          content: convertLinebreakTEIToQuill(TEIToQuill(c.content))
        }
      });
      //const notes = rootState.document.transcriptionView.notes;
      //const withNotes = insertNotesAndSegments(content, notes, [], 'transcription')
      return coms
    } else {
      return null;
    }
  },

};

const getters = {
  missingCommentaryTypes (state) {
    return state.commentaryTypes.filter(ct => {
        return !(ct.label in state.commentaries)
      }
    )
  },
  hasCommentaryTypes: (state) => (typeLabel) => {
    return  typeLabel in state.commentaries
  },
  getCommentary : (state) => (label) => {
    let c
    try {
      c = state.commentaries[label]
    } catch (e) {
      c = null
    }
    return c
  },
  isCommentariesSaved(state) {
    return state.savingStatus === 'uptodate'
  }
};

const commentariesModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default commentariesModule;
