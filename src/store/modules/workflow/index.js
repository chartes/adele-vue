import {http} from '../../../modules/http-common';


const state = {
  selectedUserId: null,
};

const mutations = {
  SELECT_USER (state, userId) {
    state.selectedUserId = userId
  }
};

const actions = {
  changeSelectedUser ({ commit }, {userId}) { 
    commit('SELECT_USER', userId)
  },

};

const getters = {
  isTranscriptionValidated(state, getters, rootState, rootGetters) {
    return rootState.document.document.validation_step >= 1
  },
  isTranslationValidated(state, getters, rootState, rootGetters) {
      return rootState.document.document.validation_step >= 2
  },
  isCommentariesValidated(state, getters, rootState, rootGetters) {
      return rootState.document.document.validation_step >= 3
  },
  isFacsimileValidated(state, getters, rootState, rootGetters) {
      return rootState.document.document.validation_step >= 4
  },
  isSpeechPartsValidated(state, getters, rootState, rootGetters) {
      return rootState.document.document.validation_step >= 5
  }
};

const workflowModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default workflowModule;
