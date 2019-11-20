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
  
};

const workflowModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default workflowModule;
