import {http} from '../../../modules/http-common';


const state = {

  transcriptionLoading: true,
  transcription: null,
  transcriptionContent: null,
  transcriptionSaved: true,
  translationAlignmentSaved: true,
  transcriptionError: null,
  translationAlignmentError: null,
  textAlignmentSegments: [],
  savingStatus: 'uptodate'
};

const mutations = {


  RESET(state) {
    console.log("STORE MUTATION transcription/RESET");
    state.transcription = null;
    state.textAlignmentSegments = [];
    state.transcriptionContent = null;
  },
  SET_ERROR(state, payload) {
    state.transcriptionError = payload
  },
  SET_TEXT_ALIGNMENT_ERROR(state, payload) {
    state.translationAlignmentError = payload
  },
  LOADING_STATUS (state, payload) {
    state.transcriptionLoading = payload;
  },
  SAVING_STATUS (state, payload) {
    //console.log("STORE MUTATION transcription/SAVING_STATUS", payload)
    state.savingStatus = payload;
  },
  STORE_ALIGNMENTS(state, payload) {
    state.textAlignmentSegments = payload;
  },
  UPDATE (state, {transcription}) {
    state.transcriptionContent = transcription.content
    state.transcription = transcription
  },
  CHANGED (state, content) {
    // transcription changed and needs to be saved
    state.transcriptionContent = content;
    state.transcriptionSaved = false;
  },
  SAVED (state) {
    // transcription saved
    state.transcriptionSaved = true;
  }
};

const actions = {
 
  /* useful */
  fetchTranscriptionFromUser ({dispatch, commit, state, getters, rootState}, {docId, userId}) {
    commit('RESET')
    commit('LOADING_STATUS', true);
    return http.get(`documents/${docId}/transcriptions/from-user/${userId}`).then(async response => {
      const data = {transcription: response.data.data}
      commit('UPDATE', data);
      commit('SET_ERROR', null)
      commit('LOADING_STATUS', false);
    }).catch((error) => {
      commit('SET_ERROR', error)
      commit('LOADING_STATUS', false);
      //throw error
    })
  },
  async fetchTranscriptionContent({dispatch, rootState, rootGetters}) {
    await dispatch('fetchTranscriptionFromUser', {
        docId: rootState.document.document.id,
        userId: rootState.workflow.selectedUserId
      })
    await dispatch('document/fetchTranscriptionView', 
    rootGetters['user/currentUserIsTeacher'] ? rootState.workflow.selectedUserId : rootState.document.document.user_id,
    {root: true})
   
  },
  getTranscriptionViewContent({rootState}) {
    if (rootState.document.transcriptionView) {
      return rootState.document.transcriptionView.content;
    } else {
      return null;
    }
  },

  /* useful */
  async fetchTextAlignments ({commit, rootState}) {
    const response = await http.get(`documents/${rootState.document.document.id}/transcriptions/alignments/from-user/${rootState.workflow.selectedUserId}`)
    if (response.data.errors) {
      commit('STORE_ALIGNMENTS', []);
      return;
    }
    const alignments = response.data.data && Array.isArray(response.data.data[0]) ? response.data.data : [response.data.data];
    commit('STORE_ALIGNMENTS', alignments);
  },
  /* useful */
  addNewTranscription ({commit, dispatch, rootState}) {
    const emptyTranscription = {
      data: {
        notes: [],
        content: ""
      }
    }
    return http.post(`documents/${rootState.document.document.id}/transcriptions/from-user/${rootState.workflow.selectedUserId}`, emptyTranscription).then(response => {
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
  async deleteTranscriptionFromUser({dispatch, commit}, {docId, userId}) {
    try {
      commit('SET_ERROR', null)
      const response = await http.delete(`documents/${docId}/transcriptions/from-user/${userId}`)
      await dispatch('document/partialUpdate', {
        validation_flags: response.data.data.validation_flags
      }, {root: true})
      await dispatch('fetchTranscriptionContent')
    } catch(error) {
      commit('SET_ERROR', error)
    }
  },
  /* useful */
  async saveTranscription({dispatch, commit, state, rootState, rootGetters}) {
    commit('SAVING_STATUS', 'tobesaved')
    commit('LOADING_STATUS', true)
    
    try {
      // put content
      await http.put(`documents/${rootState.document.document.id}/transcriptions/from-user/${rootState.workflow.selectedUserId}`, {
        data: {
          content: state.transcriptionContent,
        }
      })
            
      // update the store content
      
      await dispatch('fetchTranscriptionContent')

      commit('SAVING_STATUS', 'uptodate')
      commit('SET_ERROR', false)
      commit('LOADING_STATUS', false)
    } catch(error) {
      commit('SET_ERROR', error)
      commit('SAVING_STATUS', 'error')
      commit('LOADING_STATUS', false)
    }
  },
  async cloneContent({dispatch, rootState}) {
    const doc_id = rootState.document.document.id;
    const user_id = rootState.workflow.selectedUserId;
    console.log("async cloneContent rootState.document.document.id / const user_id : ", doc_id, user_id);
    try {
      const response = await http.get(`documents/${doc_id}/transcriptions/clone/from-user/${user_id}`)
      await dispatch('document/unsetValidationFlag', {docId: doc_id, flagName: 'transcription'}, {root: true})
      return response.data;
    } catch (e) {
      console.log(`%c error while cloning transcription ${e}`, 'color:red');
    }
  },
  changed ({ commit }, { content }) {
    commit('CHANGED', content);
    commit('SAVING_STATUS', 'tobesaved')
  },
  reset({commit}) {
    commit('RESET')
  }

};

const getters = {
  isTranscriptionSaved(state) {
    return state.savingStatus === 'uptodate'
  },
};

const transcriptionModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default transcriptionModule;
