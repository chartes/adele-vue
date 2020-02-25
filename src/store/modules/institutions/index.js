import {http} from '../../../modules/http-common';

const state = {
  institutions: [],
};

const mutations = {

  UPDATE (state, payload) {
    state.institutions = payload;
  }

};

const actions = {

  fetch ({ commit }) {
    return http.get(`institutions`).then( response => {
      commit('UPDATE', response.data.data)
    })
  }

};

const getters = {

};

const institutionsModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default institutionsModule;
