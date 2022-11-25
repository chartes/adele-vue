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
  async fetch ({ state, commit }) {
    const response = await http.get(`/speech-part-types`);
    commit('UPDATE', response.data.data);
  }
};

const getters = {

  getSpeechpartTypeById: (state) => (id) => {
    const sp = state.speechpartTypes.find(spt => parseInt(spt.id) === parseInt(id));
    return sp;
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
