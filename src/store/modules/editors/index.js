import {http} from '../../../modules/http-common';

const state = {
  editors: [],
};

const mutations = {

  UPDATE (state, payload) {
    state.editors = payload;
  }

};

const actions = {

  fetch ({ commit }) {
    return http.get(`editors`).then( response => {
      commit('UPDATE', response.data.data)
    })
  }

};

const getters = {

};

const editorsModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default editorsModule;
