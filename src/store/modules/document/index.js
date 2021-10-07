import {http} from '../../../modules/http-common';

const state = {

  document: null,
  documents: [],
  meta: {
    totalCount: 0,
    filterCount: {},
    currentPage: 0,
    nbPages: 0
  },
  
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
  UPDATE_META(state, payload) {
    state.meta = {
      ...state.meta,
      ...payload
    };
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
  SET_ERROR(state, error) {
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
  async addDocument ({ commit, rootState }, {title, subtitle}) {
    commit('SET_ERROR', null)
    let doc = null
    try {
      const user = rootState.user.currentUser;
      if (user === null || !user.roles.indexOf('admin') < 0 || user.roles.indexOf('teacher') < 0) {
        console.log("USER", user)
        throw 'Forbidden access!'
      }
      doc = await http.post('documents/add', {
        data: {
          title, 
          subtitle,
          user_id: rootState.user.currentUser.id
        }
      })
    } catch (e) {
      console.warn("cannot add document:", e)
      commit('SET_ERROR', 'cannot add document: ' + e)
    }
    return doc
  },
  fetch ({ commit }, {id}) {
    commit('LOADING_STATUS', true);
    console.log("fetching doc")
    return http.get(`documents/${id}`).then( (response) => {
      commit('UPDATE_DOCUMENT', response.data.data)
      commit('RESET_TRANSCRIPTION_VIEW')
      commit('RESET_TRANSLATION_VIEW')
      commit('RESET_COMMENTARIES_VIEW')
      commit('RESET_SPEECH_PARTS_VIEW')
      commit('RESET_TRANSCRIPTION_ALIGNMENT_VIEW')
      console.log("doc ok")
      commit('LOADING_STATUS', false);
    }).catch((error) => {
      commit('LOADING_STATUS', false);
      throw error
    })
  },
  fetchTranscriptionView ({ dispatch, commit, rootState }, userId) {
    commit('LOADING_STATUS', true);
    console.log("fetching tr view for user", userId)
    return http.get(`documents/${rootState.document.document.id}/view/transcriptions${userId ? '/from-user/' + userId: ''}`).then( (response) => {
      commit('UPDATE_TRANSCRIPTION_VIEW',  {
        content: response.data.data["content"],
        notes: response.data.data["notes"]
      })
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
      commit('LOADING_STATUS', false);
    }).catch((error) => {
      commit('RESET_TRANSCRIPTION_ALIGNMENT_VIEW')
      commit('LOADING_STATUS', false);
      throw error
    })
  },
  fetchCommentariesView ({ dispatch, commit, rootState }, userId) {
    commit('LOADING_STATUS', true);
    console.log("fetching  coms")
    return http.get(`documents/${rootState.document.document.id}/view/commentaries${userId ? '/from-user/' + userId: ''}`).then( (response) => {
      commit('UPDATE_COMMENTARIES_VIEW',  {
        commentaries: response.data.data.map(c => {
          return {
            type: c["type"],
            content: c["content"],
            notes: c["notes"]
          }
        })
      })
      dispatch('commentaries/setError', null, {root: true} )
      commit('LOADING_STATUS', false);
    }).catch((error) => {
      commit('RESET_COMMENTARIES_VIEW')
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
      dispatch('speechparts/setError', null, {root: true} )
      commit('LOADING_STATUS', false);
    }).catch((error) => {
      commit('RESET_SPEECH_PARTS_VIEW')
      dispatch('speechparts/setError', error, {root: true} )
      commit('LOADING_STATUS', false);
    })
  },
  fetchAll ({ commit }, {pageNum, pageSize, filters, sorts}) {
    commit('LOADING_STATUS', true)
    commit('SET_ERROR', null)
    return http.post('documents', {
      pageNum, pageSize, filters, sorts
    }).then( (response) => {
      commit('UPDATE_ALL', response.data.data.data);
      commit('UPDATE_META', response.data.data.meta);
      commit('LOADING_STATUS', false);
    }).catch((error) => {
      commit('LOADING_STATUS', false);
      commit('SET_ERROR', error)
    })
  },
  fetchFilterCounts ({ commit }, { filters}) {
    commit('SET_ERROR', null)
    return http.post('documents', {
      countOnly: true,
      filters
    }).then( (response) => {
      commit('UPDATE_META', response.data.data.meta);
    }).catch((error) => {
      commit('SET_ERROR', error)
    })
  },
  fetchBookmarks ({ commit },) {
    commit('LOADING_STATUS', true)
    commit('SET_ERROR', null)
    return http.get('documents/bookmarks').then( (response) => {
      commit('UPDATE_ALL', response.data.data);
      commit('UPDATE_META', response.data.meta);
      commit('LOADING_STATUS', false);
    }).catch((error) => {
      commit('LOADING_STATUS', false);
      commit('SET_ERROR', error)
    })
  },
  reorderBookmarks({commit}, bookmarks) {
    console.log(bookmarks)
    return http.post('dashboard/bookmarks/reorder', {bookmarks: bookmarks.map(b => { return {docId: b.id, bookmark_order: b.bookmark_order}})})
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
  deleteDocument ({commit }, docId) {
    return http.delete(`documents/${docId}`);
  }, 
  async toggleBookmark({commit}, docId) {
    const resp = await http.get(`dashboard/bookmarks/${docId}/toggle`)
    const order = resp.data.data.new_order ? resp.data.data.new_order :  null
    return order
  },
  async transferOwnership({commit}, {docId, userId}) {
    const resp = await http.get(`documents/${docId}/transfer-ownership/${userId}`)
    console.log(resp.data)
  }
};

const getters = {
  documentOwner: state => {
    return state.document.user
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
