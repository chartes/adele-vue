import axios from "axios/index";

const state = {

  noteTypes: undefined

};

const mutations = {

  UPDATE (state, payload) {
    state.noteTypes = payload;
  }

};

const actions = {

  fetch ({ commit }) {
    axios.get(`${process.env.VUE_APP_API_URL}/note-types`).then( response => {
      const respData = response.data.data;
      const isArray = Array.isArray(respData);
      const noteTypes = isArray ? respData : [respData];
      commit('UPDATE', noteTypes)
    });
  }

};

const getters = {

  noteTypes: state => state.noteTypes

};

const noteTypesModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default noteTypesModule;
