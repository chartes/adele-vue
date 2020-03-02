import {http} from '../../../modules/http-common';

const state = {
  selection: {
      languages : [],
      acteTypes: []
  },
};

const mutations = {


  REMOVE (state, {filter, index}) {
    state.selection[filter].splice(index, 1)
  },
  ADD (state, {filter, item}) {
    state.selection[filter].push(item)
  }

};

const actions = {

  toggleSelection({commit, state}, {filter, item}) {
    console.log("toggleSelection", filter, item)
    const index = state.selection[filter].indexOf(item)
    if (index > -1) {
       commit('REMOVE', {filter, index})
    } else {
      commit('ADD', {filter, item})
    }
  }

};

const getters = {
    isLanguageSelected : (state) => (langCode) => {
        return state.selection.languages.indexOf(langCode) > -1
    }
};

const searchModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default searchModule;
