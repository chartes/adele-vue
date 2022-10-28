import Quill from '../../../modules/quill/AdeleQuill';
import {http} from '../../../modules/http-common';
import Vue from 'vue';

const state = {
  speechPartsContent: null,
  speechPartsContentError: null,
  savingStatus: 'uptodate',
  speechPartsContentLoading: true,
};

const speechPartsContentShadowQuillElement = document.createElement('div');
let speechPartsContentShadowQuill;

const mutations = {
  INIT(state, {content}) {
      speechPartsContentShadowQuillElement.innerHTML = "<p></p>"
      speechPartsContentShadowQuill = new Quill(speechPartsContentShadowQuillElement);
      speechPartsContentShadowQuillElement.children[0].innerHTML = content || "";
      state.speechPartsContent = speechPartsContentShadowQuillElement.children[0].innerHTML;
  },
  SET_ERROR(state, payload) {
    state.speechPartsContentError = payload
  },
  UPDATE (state, {content}) {
    state.speechPartsContent = content;
    state.savingStatus = 'tobesaved'
  },
  CLEAR(state) {
    state.speechPartsContent = null
  },
  SAVING_STATUS (state, payload) {
    //console.log("STORE MUTATION transcription/SAVING_STATUS", payload)
    state.savingStatus = payload;
  },
  LOADING_STATUS (state, payload) {
    state.speechPartsContentLoading = payload;
  },
}

const actions = {
  /* useful */
  setError({commit}, payload) {
    commit('SET_ERROR', payload)
  },
  /* useful */
  async fetchSpeechPartsContentFromUser ({commit }, {docId, userId}) {
    commit('LOADING_STATUS', true);
    try {
      const response = await http.get(`documents/${ docId }/speech-parts-content/from-user/${ userId }`);
      commit('INIT', {content: response.data.data.content})
      commit('SET_ERROR', null)
      commit('LOADING_STATUS', false)
    } catch (error) {
      commit('SET_ERROR', error)
      commit('CLEAR')
      commit('LOADING_STATUS', false)
    }
  },
  async addNewSpeechPartsContent ({commit, rootState}) {
    commit('LOADING_STATUS', true)
    const docId = rootState.document.document.id;
    let userId = rootState.workflow.selectedUserId;
    try {
      const response = await http.post(`documents/${ docId }/speech-parts-content/from-user/${ userId }`);
      commit('INIT', {content: response.data.data.content})
      commit('SET_ERROR', null)
      commit('LOADING_STATUS', false)
    } catch (error) {
      commit('SET_ERROR', error)
      commit('CLEAR')
      commit('LOADING_STATUS', false)
    }
  },
  /* useful */
  changed({commit}, delta) {
    speechPartsContentShadowQuill.updateContents(delta)
    commit('UPDATE', {content: speechPartsContentShadowQuillElement.children[0].innerHTML } )
  },
  async saveSpeechPartsContent({commit, state, rootState}) {
    commit('SAVING_STATUS', 'tobesaved')
    commit('LOADING_STATUS', true)

    try {
      // prepare notes
      const response = await http.put(`documents/${rootState.document.document.id}/speech-parts-content/from-user/${rootState.workflow.selectedUserId}`, {
        data: {
          content: state.speechPartsContent,
        }
      })

      commit('SAVING_STATUS', 'uptodate')
      commit('SET_ERROR', false)
      commit('LOADING_STATUS', false)
    } catch(error) {
      commit('SET_ERROR', error)
      commit('SAVING_STATUS', 'error')
      commit('LOADING_STATUS', false)
    }
  },
  async deleteSpeechPartsContentFromUser({commit, state, rootState}) {
    commit('LOADING_STATUS', true)

    try {
      // prepare notes
      const response = await http.delete(`documents/${rootState.document.document.id}/speech-parts-content/from-user/${rootState.workflow.selectedUserId}`)
      commit('SET_ERROR', false)
      commit('CLEAR')
      commit('LOADING_STATUS', false)
    } catch(error) {
      commit('SET_ERROR', error)
      commit('SAVING_STATUS', 'error')
      commit('LOADING_STATUS', false)
    }
  },
  /* useful */
  fetchSpeechPartsContent({dispatch, rootState, rootGetters}) {
    const docId = rootState.document.document.id;
    let userId = rootState.workflow.selectedUserId;
    if (rootGetters['workflow/isSpeechPartsReadOnly'] && !rootGetters['user/currentUserIsTeacher']) {
      // when in readonly mode
      // students see the reference content
      // teacher and admins can see other ppl readonly views
        userId = rootState.document.user_id
    }
    return dispatch('fetchSpeechPartsContentFromUser', {
      docId,
      userId,
    })
  }
};

const getters = {
  isSpeechPartsContentSaved : state => {
    return state.savingStatus === 'uptodate'
  },

};

const speechpartsModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default speechpartsModule;
