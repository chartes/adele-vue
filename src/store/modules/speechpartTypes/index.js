import {http} from '../../../modules/http-common';

const state = {
  speechpartTypes: []
};

const mutations = {

  UPDATE (state, payload) {
    state.speechpartTypes = payload;
  }

};

const actions = {
  async fetch ({ commit }) {
    await http.get(`/speech-part-types`).then( response => {
      commit('UPDATE', response.data.data);
    });
  }
};

const getters = {

  getSpeechpartTypeById: (state) => (id) => {
    return state.speechpartTypes.find(spt => spt.id === id)
  }

};

const speechpartTypesModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default speechpartTypesModule;
