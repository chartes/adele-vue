import {http} from '../../../modules/http-common';

const state = {

  document: null,
  documents: [],
  
  transcriptionView: null,
  translationView: null,
  transcriptionAlignmentView: null,
  commentariesView: null,
  speechPartsView: {content: null, notes: null},

  loading: false,
  error: null,
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
  UPDATE_COMMENTARIES_VIEW (state, {commentaries}) {
    state.commentariesView = commentaries
  },
  UPDATE_SPEECH_PARTS_VIEW(state, payload) {
    state.speechPartsView = {
      content: payload.content,
      notes: payload.notes
    }
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
  RESET_COMMENTARIES_VIEW(state) {
    state.commentariesView = null;
  },
  RESET_SPEECH_PARTS_VIEW(state) {
    state.speechPartsView = null;
  },
  UPDATE_ALL (state, payload) {
    state.documents = payload;
  },
  SET_ERROR(error) {
    state.error = error
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
      commit('RESET_COMMENTARIES_VIEW')
      commit('RESET_SPEECH_PARTS_VIEW')
      console.log("doc ok")
      commit('LOADING_STATUS', false);
    }).catch((error) => {
      commit('LOADING_STATUS', false);
      throw error
    })
  },
  fetchTranscriptionView ({ dispatch, commit, rootState }, userId) {
    commit('LOADING_STATUS', true);
    console.log("fetching  tr")
    return http.get(`documents/${rootState.document.document.id}/view/transcriptions${userId ? '/from-user/' + userId: ''}`).then( (response) => {
      commit('UPDATE_TRANSCRIPTION_VIEW',  {
        content: response.data.data["content"],
        notes: response.data.data["notes"]
      })
      console.log("tr ok")
      dispatch('transcription/setError', null, {root: true} )
      commit('LOADING_STATUS', false);
    }).catch((error) => {
      dispatch('transcription/setError', error, {root: true} )
      commit('RESET_TRANSCRIPTION_VIEW')
      commit('LOADING_STATUS', false);
      //throw error
    })
  },
  fetchTranslationView ({ dispatch, commit, rootState }, userId) {
    commit('LOADING_STATUS', true);
    console.log("fetching  tl")
    return http.get(`documents/${rootState.document.document.id}/view/translations${userId ? '/from-user/' + userId: ''}`).then( (response) => {
      commit('UPDATE_TRANSLATION_VIEW',  {
        content: response.data.data["content"],
        notes: response.data.data["notes"]
      })
      console.log("tl ok")
      dispatch('translation/setError', null, {root: true} )
      commit('LOADING_STATUS', false);
    }).catch((error) => {
      dispatch('translation/setError', error, {root: true} )
      commit('RESET_TRANSLATION_VIEW')
      commit('LOADING_STATUS', false);
      //throw error
    })
  },
  fetchTranscriptionAlignmentView ({ commit, rootState }) {
    commit('LOADING_STATUS', true);
    console.log("fetching tr alignments")
    return http.get(`documents/${rootState.document.document.id}/view/transcription-alignment`).then( (response) => {
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
  fetchCommentariesView ({ dispatch, commit, rootState }, userId) {
    commit('LOADING_STATUS', true);
    console.log("fetching  coms")
    return http.get(`documents/${rootState.document.document.id}/view/commentaries${userId ? '/from-user/' + userId: ''}`).then( (response) => {
      console.log(response.data)
      commit('UPDATE_COMMENTARIES_VIEW',  {
        commentaries: response.data.data.map(c => {
          return {
            type: c["type"],
            content: c["content"],
            notes: c["notes"]
          }
        })
      })
      console.log("coms ok")
      dispatch('commentaries/setError', null, {root: true} )
      commit('LOADING_STATUS', false);
    }).catch((error) => {
      dispatch('commentaries/setError', error, {root: true} )
      commit('LOADING_STATUS', false);
      //throw error
    })
  },
  async fetchSpeechPartsView ({ dispatch, commit, rootState }, userId) {
    commit('LOADING_STATUS', true)
    console.log("fetching speech parts view")
    await dispatch('speechpartTypes/fetch', null, {root: true} )
    return http.get(`documents/${rootState.document.document.id}/view/speech-parts${userId ? '/from-user/' + userId: ''}`).then( (response) => {
      commit('UPDATE_SPEECH_PARTS_VIEW', {
        content: response.data.data["content"],
        notes: response.data.data["notes"]
      })
      console.log("speech parts view ok")
      dispatch('speechparts/setError', null, {root: true} )
      commit('LOADING_STATUS', false);
    }).catch((error) => {
      dispatch('speechparts/setError', error, {root: true} )
      commit('LOADING_STATUS', false);
    })
  },
  fetchAll ({ commit }, {pageId, pageSize, filters}) {
    commit('LOADING_STATUS', true)
    commit('SET_ERROR', null)
    return http.get(`documents?${filters}&page[size]=${pageSize}&page[number]=${pageId}`)
      .then( (response) => {
      commit('UPDATE_ALL', response.data.data);
      commit('LOADING_STATUS', false);
    }).catch((error) => {
      commit('LOADING_STATUS', false);
      commit('SET_ERROR', error)
    })
  },
  setValidationFlag ({commit }, {docId, flagName}) {
    commit('LOADING_STATUS', true);
    commit('SET_ERROR', null)
    http.get(`documents/${docId}/validate-${flagName}`).then( (response) => {
      commit('PARTIAL_UPDATE_DOCUMENT',  {
        validation_flags: response.data.data.validation_flags
      })
      commit('LOADING_STATUS', false);
    }).catch((error) => {
      commit('LOADING_STATUS', false);
      commit('SET_ERROR', error)
    })
  },
  unsetValidationFlag ({commit }, {docId, flagName}) {
    commit('LOADING_STATUS', true)
    commit('SET_ERROR', null)
    http.get(`documents/${docId}/unvalidate-${flagName}`).then( (response) => {
      commit('PARTIAL_UPDATE_DOCUMENT',  {
        validation_flags: response.data.data.validation_flags
      })
      commit('LOADING_STATUS', false);
    }).catch((error) => {
      commit('LOADING_STATUS', false);
      commit('SET_ERROR', error)
    })
  },
  partialUpdate({commit}, payload) {
    commit('PARTIAL_UPDATE_DOCUMENT', payload)
  },
  save ({ commit }, {docId, data}) {
    commit('LOADING_STATUS', true);
    commit('SET_ERROR', null)
    return http.put(`documents/${docId}`, {data: data})
      .then( (response) => {
      commit('PARTIAL_UPDATE_DOCUMENT', response.data.data)
      commit('LOADING_STATUS', false)
    }).catch((error) => {
      commit('LOADING_STATUS', false)
      commit('SET_ERROR', error)
    })
  },
};

const getters = {
  documentOwner: state => {
    return state.document.whitelist.users.find(u => u.id === state.document.user_id)
  },
  getManifestInfoUrl: state => (canvasIdx) => {
    try {
      return state.document.images[canvasIdx].info
    } catch (error) {
      console.warn(error)
      return null
    }
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
