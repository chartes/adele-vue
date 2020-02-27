import {http} from '../../../modules/http-common';

const state = {

  languages: [],

};

const mutations = {

  UPDATE (state, payload) {
    state.languages = payload;
  }

};

const actions = {

  fetch ({ commit }) {
    return http.get(`languages`).then( response => {
      commit('UPDATE', response.data.data)
    })
  }

};

const getters = {

};

const languagesModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default languagesModule;
