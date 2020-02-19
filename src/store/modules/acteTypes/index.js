import {http} from '../../../modules/http-common';

const state = {
  acteTypes: [],
};

const mutations = {

  UPDATE (state, payload) {
    state.acteTypes = payload;
  }

};

const actions = {

  fetch ({ commit }) {
    return http.get(`acte-types`).then( response => {
      commit('UPDATE', response.data.data)
    })
  }

};

const getters = {

};

const acteTypesModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default acteTypesModule;
