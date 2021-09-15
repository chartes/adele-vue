import {http} from '../../../modules/http-common';

const state = {
  acteTypes: [],
};

const mutations = {

  UPDATE (state, payload) {
    state.acteTypes = payload;
  }

};

const actions = {

  fetch ({ commit }) {
    return http.get(`acte-types`).then( response => {
      commit('UPDATE', response.data.data)
    })
  }

};

function findLabel(state, label){
  return state.acteTypes.find(a => a.label.trim() === label.trim())
}

const getters = {
  methSortedActeTypes: (state) => {
    return [
      {
        sectionLabel: 'A - Actes, auteurs', 
        acteTypes: [
          'Pape et entourage',
          'Évêque et entourage',
          'Religieux',
          'Souverain',
          'Du prince au baron',
          'Administration séculière centrale et locale',
          'Seigneurs et particuliers',
          'Municipalité, communauté',
          'Actes privés, Système traditionnels',
          'Notaire public',
          'Juridiction gracieuse ecclésiastique',
          'Juridiction gracieuse laïque',
        ].map(l => findLabel(state, l))
      },
      {
        sectionLabel: 'B - Documents de gestion, type', 
        acteTypes:  [
          'Documents de gestion domaniale',
          'Inventaires de biens',
          'Documents féodaux',
          'Documents comptables, financiers et fiscaux',
          'Documents propres à la production, aux échanges et au travail',
          'Documents militaires',
          'Documents propres à la diplomatie',
          'Documents propres à la justice',
          'Documents propres à l’enseignement',
          'Documents propres à l’assistance',
          'Documents propres aux archives ecclésiastiques',
          'Documents propres aux archives royales et princières',
          'Documents propres aux archives municipales',
          'Documents propres aux archives seigneuriales et de particuliers'
        ].map(l => findLabel(state, l))
      }
    ]
  }
};

const acteTypesModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default acteTypesModule;
