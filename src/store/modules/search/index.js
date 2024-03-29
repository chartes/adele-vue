const initState = () => ({
  title: null,
  sorts: ['-witness_date'],
  selection: {
      languages : [],
      acteTypes: [],
      institutions: [],
      traditions: [],
      availableCommentaries: [],
      countries: [],
      districts: [],
      creationRange: [],
      copyRange: [],
      dateMode: 'witness'
  },
})

const mutations = {
  CLEAR (state, {filter}) {
    state.selection[filter] = []
    state.title = null
  },
  CLEAR_ALL (state) {
    const initial = initState()
    Object.keys(initial).forEach(key => { state[key] = initial[key] })
  },
  SET (state, {title, filters, sorts}) {
    state.selection = filters
    state.title = title
    state.sorts = sorts
  },
  SET_FILTER (state, {name, value}) {
    state.selection[name] = value
  },
  SORT (state, fields) {
    state.sorts = fields
  },
  REMOVE (state, {filter, index}) {
    state.selection[filter].splice(index, 1)
    //state.title = null
  },
  ADD (state, {filter, item}) {
    state.selection[filter].push(item)
    //state.title = null
  }
};

const actions = {
    clear({commit, state}, {filter}) {
        commit('CLEAR', {filter})
    },
    clearAll({commit, state}) {
        commit('CLEAR_ALL')
    },
    set({commit}, {title, filters, sorts}) {
        commit('SET', {title, filters, sorts})
    },
    setFilter({commit}, {name, value}) {
      commit('SET_FILTER', {name, value})
    },
    setSort({commit}, fields) {
      commit('SORT', fields)
    },
    toggleSelection({commit, state}, {filter, item}) {
      const index = state.selection[filter].indexOf(item)
      if (index > -1) {
         commit('REMOVE', {filter, index})
      } else {
        commit('ADD', {filter, item})
      }
    }

};

const getters = {
    isCurrentlyFiltered: (state) => {
      return JSON.stringify(initState().selection) !== JSON.stringify({...state.selection})
    },
    isCurrentlySorted: (state) => {
      return JSON.stringify(initState().sorts) !== JSON.stringify({...state.sorts})
    },
    isLanguageSelected : (state) => (item) => {
        return state.selection.languages.indexOf(item) > -1
    },
    isActeTypeSelected : (state) => (item) => {
        return state.selection.acteTypes.indexOf(item) > -1
    },
    isTraditionSelected : (state) => (item) => {
        return state.selection.traditions.indexOf(item) > -1
    },
    isInstitutionSelected : (state) => (item) => {
        return state.selection.institutions.indexOf(item) > -1
    },
    isCountrySelected : (state) => (item) => {
        return state.selection.countries.indexOf(item) > -1
    },
    isDistrictSelected : (state) => (item) => {
        return state.selection.districts.indexOf(item) > -1
    },
    isAvailableCommentarySelected : (state) => (item) => {
        return state.selection.availableCommentaries.indexOf(item) > -1
    }
};

const searchModule = {
  namespaced: true,
  state: initState(),
  mutations,
  actions,
  getters
}

export default searchModule;
