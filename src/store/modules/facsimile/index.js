import axios from 'axios';

const fragmentSort = (a, b) => {
  if (a.bbox_y < b.bbox_y) return -1;
  else if (a.bbox_y > b.bbox_y) return 1;
  else return fragmentSortOnX(a, b);

}
const fragmentSortOnX = (a, b) => {
  if (a.bbox_x < b.bbox_x) return -1;
  else if (a.bbox_x > b.bbox_x) return 1;
  else return fragmentSortOnZoneId(a, b);
}
const fragmentSortOnZoneId = (a, b) => {
  return a.zone_id - b.zone_id;
}

const state = {

  canvasNames: [],
  currentCanvas: 0,
  fragments: [],
  alignments: [],
  loading: false,
  newFacsimileZone: false,
  deletedFacsimileZoneId: false,

};

const mutations = {


  INIT (state, payload) {
    state.canvasNames = payload;
    state.currentCanvas = 0;
  },

  UPDATE_FRAGMENTS (state, payload) {
    state.fragments = payload;
  },

  UPDATE_ALIGNMENTS (state, payload) {
    state.alignments = payload;
  },
  UPDATE_CANVAS (state, payload) {
    state.currentCanvas = payload;
  },
  DELETE_ZONE (state, payload) {
    state.deletedFacsimileZoneId = payload;
  },


};

const actions = {

  fetchCanvasNames ({ commit, dispatch, rootState }) {

    return axios.get(`${process.env.VUE_APP_API_URL}/documents/${rootState.document.document.id}/first-sequence`).then( response => {
      if (response.data && response.data.errors) {
        return false;
      }

      let data = response.data.data;
      if (!data || !data.canvases) return;
      let canvasNames = data.canvases.map((canvas) => {
        let idParts = canvas['@id'].split('/');
        return idParts[idParts.length - 1];
      });
      commit('INIT', canvasNames);
      return true;

    })

  },
  fetchFragments ({ commit, rootState, rootGetters, state }) {

    if (!rootGetters['document/manifestURL']) {
      return;
    }
    const doc_id = rootState.document.document.id;
    const user_id = rootState.user.author.id;
    const canvas = state.canvasNames[state.currentCanvas];

    return axios.get(`${process.env.VUE_APP_API_URL}/documents/${doc_id}/annotations/${canvas}/fragments/from-user/${user_id}`).then( response => {
      if (response.data && response.data.errors) {
        return;
      }
      let data = response.data.data;
      let fragments = data.fragments.map((frag) => {
        return {
          zone_id: frag.zone.zone_id,
          zone_type: frag.zone.zone_type.label,
          canvas_idx: frag.zone.canvas_idx,
          img_idx: frag.zone.img_idx,
          bbox_x: frag.bbox_coords[0],
          bbox_y: frag.bbox_coords[1],
          fragment_url: frag.fragment_url
        }
      }).sort(fragmentSort);
      commit('UPDATE_FRAGMENTS', fragments);

    });

  },
  fetchAlignments ({ commit, rootState, rootGetters }) {

    if (!rootGetters['document/manifestURL']) {
      return;
    }
    const doc_id = rootState.document.document.id;
    const user_id = rootState.user.author.id;

    return axios.get(`${process.env.VUE_APP_API_URL}/documents/${doc_id}/transcriptions/alignments/images/from-user/${user_id}`).then( response => {
      if (response.data && response.data.errors) {
        return;
      }

      let data = response.data.data;
      commit('UPDATE_ALIGNMENTS', data);
    });

  },

  addAlignment ({commit, rootState, state}, alignment) {
    if (!rootState.document.manifestUrl) {
      return;
    }
  },

  updateCanvas ({commit}, canvasIndex) {
    commit('UPDATE_CANVAS', canvasIndex)
  },
  deleteFacsimileZone ({commit}, zoneId) {
    commit('DELETE_ZONE', zoneId)
  },
};

const getters = {

  annotationFragments: state => state.fragments.filter(frag => frag.zone_type === 'annotation'),
  transcriptionFragments: state => state.fragments.filter(frag => frag.zone_type === 'transcription'),
  getZoneById: state => id => state.fragments.find(fragment =>  fragment.zone_id === parseInt(id))

};

const facsimileModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default facsimileModule;
