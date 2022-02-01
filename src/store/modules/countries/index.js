import {http} from '../../../modules/http-common';

const state = {
  countries: [],
};

const mutations = {

  UPDATE (state, payload) {
    state.countries = payload;
  }

};

const actions = {

  fetch ({ commit }) {
    return http.get(`countries`).then( response => {
      commit('UPDATE', response.data.data)
    })
  }

};

const getters = {

};

const countriesModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default countriesModule;
