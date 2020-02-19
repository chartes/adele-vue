import {http} from '../../../modules/http-common';

const state = {
  districts: [],
};

const mutations = {

  UPDATE (state, payload) {
    state.districts = payload;
  }

};

const actions = {

  fetch ({ commit }) {
    return http.get(`districts`).then( response => {
      commit('UPDATE', response.data.data)
    })
  }

};

const getters = {

};

const districtsModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default districtsModule;
