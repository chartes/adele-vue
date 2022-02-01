import {http} from '../../../modules/http-common';

const state = {
  traditions: [],
};

const mutations = {

  UPDATE (state, payload) {
    state.traditions = payload;
  }

};

const actions = {

  fetch ({ commit }) {
    return http.get(`traditions`).then( response => {
      commit('UPDATE', response.data.data)
    })
  }

};

const getters = {

};

const traditionsModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default traditionsModule;
