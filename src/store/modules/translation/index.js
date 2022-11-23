import {http} from '../../../modules/http-common';

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

  RESET (state) {
    state.translationLoading = true;
    state.translation = null;
    state.translationContent = null;
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
  UPDATE (state, translation) {
    state.translationContent = translation.content;
    state.translation = translation;
  },
  CHANGED (state, content) {
    // translation changed and needs to be saved
    state.translationContent = content;
    state.translationSaved = false;
  },
  SAVING_STATUS (state, payload) {
    //console.log("STORE MUTATION transcription/SAVING_STATUS", payload)
    state.savingStatus = payload;
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
      //const alignments = rootState.transcription.transcriptionAlignments;

      commit('UPDATE', translation);
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
  getTranslationViewContent({rootState}) {
    if (rootState.document.translationView) {
      return rootState.document.translationView.content;
    } else {
      return null;
    }
  },
  /* useful */
  async addNewTranslation ({commit, dispatch, rootState}) {
    commit('LOADING_STATUS', true)
    const emptyTranslation = {
      data: {
        content: ""
      }
    }
    try {
      const response = await http.post(`documents/${rootState.document.document.id}/translations/from-user/${rootState.workflow.selectedUserId}`, emptyTranslation)
      commit('UPDATE', response.data.data)
      commit('SET_ERROR', null)
      commit('LOADING_STATUS', false)
    } catch (error) {
      commit('SET_ERROR', error)
      commit('CLEAR')
      commit('LOADING_STATUS', false)
    }
  },
  /* useful */
  setError({commit}, payload) {
    commit('SET_ERROR', payload)
  },
   /* useful */
  async deleteTranslationFromUser({dispatch, commit}, {docId, userId}) {
    commit('LOADING_STATUS', true)
    try {
      commit('SET_ERROR', null)
      const response = await http.delete(`documents/${docId}/translations/from-user/${userId}`)
      await dispatch('document/partialUpdate', {
        validation_flags: response.data.data.validation_flags
      }, {root: true})
      await dispatch('fetchTranslationContent')
      commit('CLEAR')
      commit('LOADING_STATUS', false)
    } catch(error) {
      commit('SET_ERROR', error);
      commit('SAVING_STATUS', 'error');
      commit('LOADING_STATUS', false);
    }
  },

  /* useful */
  async saveTranslation({dispatch, commit, state, rootState, rootGetters}) {
    commit('SAVING_STATUS', 'tobesaved')
    commit('LOADING_STATUS', true)

    try {
      // put content
      await http.put(`documents/${rootState.document.document.id}/translations/from-user/${rootState.workflow.selectedUserId}`, {
        data: {
          content: state.translationContent,
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

  changed ({ commit, rootState }, {content}) {
    commit('CHANGED', content);
    commit('SAVING_STATUS', 'tobesaved')
  },
  reset ({ commit }) {
    commit('RESET')
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
