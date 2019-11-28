import {http} from '../../../modules/http-common';
import { VALIDATION_STEPS_LABELS } from '../workflow';

const state = {

  document: undefined,
  documents: [],
  
  transcriptionView: undefined,
  translationView: undefined,
  transcriptionAlignmentView: undefined,

  loading: false,
};

const mutations = {

  UPDATE_DOCUMENT (state, payload) {
    state.document = payload;
  },
  UPDATE_TRANSCRIPTION_VIEW (state, {content, notes}) {
    state.transcriptionView = {
      content,
      notes
    };
  },
  UPDATE_TRANSLATION_VIEW (state, {content, notes}) {
    state.translationView = {
      content,
      notes
    };
  },
  UPDATE_TRANSCRIPTION_ALIGNMENT_VIEW (state, {content, notes}) {
    state.transcriptionAlignmentView = {
      content,
      notes
    };
  },
  RESET_TRANSCRIPTION_VIEW(state) {
    state.transcriptionView = null;
  },
  RESET_TRANSLATION_VIEW(state) {
    state.translationView = null;
  },
  RESET_TRANSCRIPTION_ALIGNMENT_VIEW(state) {
    state.transcriptionAlignmentView = null;
  },
  UPDATE_ALL (state, payload) {
    state.documents = payload;
  },

  PARTIAL_UPDATE_DOCUMENT(state, payload) {
    state.document =  {
      ...state.document,
      ...payload
    };
  },
  
  LOADING_STATUS (state, payload) {
    state.loading = payload;
  },
};

const actions = {

  fetch ({ commit }, {id}) {
    commit('LOADING_STATUS', true);
    console.log("fetching doc")
    return http.get(`documents/${id}`).then( (response) => {
      commit('UPDATE_DOCUMENT', response.data.data)
      commit('RESET_TRANSCRIPTION_VIEW')
      commit('RESET_TRANSLATION_VIEW')
      console.log("doc ok")
      commit('LOADING_STATUS', false);
    }).catch((error) => {
      commit('LOADING_STATUS', false);
      throw error
    })
  },
  fetchTranscriptionView ({ dispatch, commit }, {id, userId}) {
    commit('LOADING_STATUS', true);
    console.log("fetching  tr")
    return http.get(`documents/${id}/view/transcription${userId ? '/from-user/' + userId: ''}`).then( (response) => {
      commit('UPDATE_TRANSCRIPTION_VIEW',  {
        content: response.data.data["content"],
        notes: response.data.data["notes"]
      })
      console.log("tr ok")
      dispatch('transcription/setError', null, {root: true} )
      commit('LOADING_STATUS', false);
    }).catch((error) => {
      dispatch('transcription/setError', error, {root: true} )
      commit('LOADING_STATUS', false);
      //throw error
    })
  },
  fetchTranslationView ({ dispatch, commit }, {id, userId}) {
    commit('LOADING_STATUS', true);
    console.log("fetching  tl")
    return http.get(`documents/${id}/view/translation${userId ? '/from-user/' + userId: ''}`).then( (response) => {
      commit('UPDATE_TRANSLATION_VIEW',  {
        content: response.data.data["content"],
        notes: response.data.data["notes"]
      })
      console.log("tl ok")
      dispatch('translation/setError', null, {root: true} )
      commit('LOADING_STATUS', false);
    }).catch((error) => {
      dispatch('translation/setError', error, {root: true} )
      commit('LOADING_STATUS', false);
      //throw error
    })
  },
  fetchTranscriptionAlignmentView ({ commit }, {id}) {
    commit('LOADING_STATUS', true);
    console.log("fetching tr alignments")
    return http.get(`documents/${id}/view/transcription-alignment`).then( (response) => {
      commit('UPDATE_TRANSCRIPTION_ALIGNMENT_VIEW',  {
        content: response.data.data["alignments"],
        notes: response.data.data["notes"]
      })
      console.log("tr alignments ok")
      commit('LOADING_STATUS', false);
    }).catch((error) => {
      commit('LOADING_STATUS', false);
      throw error
    })
  },
  fetchAll ({ commit }, {pageId, pageSize, filters}) {
    commit('LOADING_STATUS', true);
    return http.get(`documents?${filters}&page[size]=${pageSize}&page[number]=${pageId}`)
      .then( (response) => {
      commit('UPDATE_ALL', response.data.data);
      commit('LOADING_STATUS', false);
    }).catch((error) => {
      commit('LOADING_STATUS', false);
      throw error
    })
  },
  setValidationStep ({commit }, {docId, step}) {
    commit('LOADING_STATUS', true);
    http.get(`documents/${docId}/validate-${VALIDATION_STEPS_LABELS[step]}`).then( (response) => {
      commit('PARTIAL_UPDATE_DOCUMENT',  {
        validation_step: step
      })
      commit('LOADING_STATUS', false);
    }).catch((error) => {
      commit('LOADING_STATUS', false);
      throw error
    })
  }
  /*
  save ({ commit, rootGetters }, data) {

    const auth = rootGetters['user/authHeader'];

    return new Promise( ( resolve, reject ) => {
      axios.put(`/adele/api/1.0/documents`, { data: data }, auth)
        .then(response => {
          if (response.data.errors) {
            console.error("error", response.data.errors);
            reject(response.data.errors);
          } else {
            commit('UPDATE_DOCUMENT', response.data.data)
            resolve(response.data)
          }
        })
        .catch(error => {
          console.error("error", error)
          reject(error)
        });
    })
  },
  */
};

const getters = {

  //document: state => state.document,
  manifestURL: state => {
    const manifest_url = `documents/${state.document.id}/manifest`;
    return state.document && state.document.images && state.document.images.length > 0 ? manifest_url : null
  },
  documentOwner: state => {
    return state.document.whitelist.users.find(u => u.id === state.document.user_id)
  }
};

const documentModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default documentModule;
