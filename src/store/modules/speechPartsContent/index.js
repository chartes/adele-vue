import {http} from '../../../modules/http-common';
import Vue from 'vue';

const state = {
  speechPartsContent: null,
  speechPartsContentError: null
};

const mutations = {
  SET_ERROR(state, payload) {
    state.speechPartsContentError = payload
  },
  UPDATE (state, speechPartsContent) {
    state.speechPartsContent = speechPartsContent;
  },
  CLEAR(state) {
    state.speechPartsContent = null
  },
}

const actions = {
  /* useful */
  setError({commit}, payload) {
    commit('SET_ERROR', payload)
  },
  /* useful */
  fetchSpeechPartsContentFromUser ({commit }, {docId, userId}) { 
    return http.get(`documents/${ docId }/speech-parts-content/from-user/${ userId }`).then(async response => {
      commit('UPDATE', response.data.data)
      commit('SET_ERROR', null)
    }).catch((error) => {
      commit('SET_ERROR', error)
      commit('CLEAR')
    })
  },
  /* useful */
  fetchSpeechPartsContent({dispatch, rootState, rootGetters}) {
    const docId = rootState.document.document.id;
    let userId = rootState.workflow.selectedUserId;
    if (rootGetters['workflow/isSpeechPartsReadOnly'] && !rootGetters['user/currentUserIsTeacher']) {
      // when in readonly mode
      // students see the reference content
      // teacher and admins can see other ppl readonly views
        userId = rootState.document.user_id
    }
    return dispatch('fetchSpeechPartsContentFromUser', {
      docId,
      userId,
    })
  }
};

const getters = {

  speechparts: state => state.speechparts,
  newSpeechpart: state => state.newSpeechpart,

};

const speechpartsModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default speechpartsModule;
