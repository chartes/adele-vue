import {http} from '../../../modules/http-common';
import Vue from 'vue';

const state = {
  speechparts: [],
  newSpeechpart: false,
  savingStatus: 'uptodate',
  speechPartsError: null
};

const mutations = {
  SET_ERROR(state, payload) {
    state.speechPartsError = payload
  },
  UPDATE_ALL (state, speechparts) {
    state.speechparts = speechparts;
  },
  SAVING_STATUS (state, payload) {
    state.savingStatus = payload;
  },
  CLEAR(state) {
    state.speechparts = []
  },
  /* need review */
  /*
  NEW (state, speechpart) {
    state.newSpeechpart = speechpart;
    state.speechparts.push(speechpart);
    state.savingStatus = 'tobesaved'
  },
  */
  UPDATE_ONE (state, speechpart) {
    //delete the one one
    state.speechparts = state.speechparts.filter(item => {
      return item.id !== speechpart.id
    })
    //add the new one
    state.speechparts.push(speechpart)
    state.savingStatus = 'tobesaved'
  },
  DELETE (state, id) {
    state.speechparts = state.speechparts.filter(item => {
      return item.id !== id
    })
    state.savingStatus = 'tobesaved'
  }
};

const actions = {
  /* useful */
  setError({commit}, payload) {
    commit('SET_ERROR', payload)
  },
  /* useful */
  fetchSpeechPartsFromUser ({dispatch, getters, commit }, {docId, userId}) { 
    return http.get(`documents/${ docId }/speech-parts/from-user/${ userId }`).then(async response => {
      //commit('RESET')
      commit('UPDATE_ALL', response.data.data)
      // recompute transcriptionWithSpeechParts (may be overkill since it's already fetched once)
      //await dispatch('transcription/fetchTranscriptionFromUser', {userId, docId}, {root: true})
      
      commit('SET_ERROR', null)
    }).catch((error) => {
      commit('SET_ERROR', error)
      commit('CLEAR')
      //throw error
    })
  },
  /* useful */
  fetchSpeechPartsOrSpeechPartsView({dispatch, rootState, rootGetters}) {
    if (!rootGetters['workflow/isSpeechPartsReadOnly']) {
      // when in readonly mode
      // students see the reference content
      // teacher and admins can see other ppl readonly views
      return dispatch('document/fetchSpeechPartsView', 
        rootGetters['user/currentUserIsTeacher'] ? rootState.workflow.selectedUserId : rootState.document.user_id,
        {root: true})
    } else {
      return dispatch('fetchSpeechPartsFromUser', {
        docId: rootState.document.document.id,
        userId: rootState.workflow.selectedUserId
      })
    }
  },
  add({commit}, speechpart) {
    commit('UPDATE_ONE', speechpart)
  },
  update({commit}, speechpart) {
    commit('UPDATE_ONE', speechpart)
  },
  delete({commit}, speechpartId) {
    commit('DELETE', speechpartId)
  },
  setToBeSaved({commit}) {
    commit('SAVING_STATUS', 'tobesaved')
  },
  async saveSpeechParts({dispatch, commit, state, rootState}) {
      commit('SET_ERROR', false);
      const spWithPointers = await dispatch('transcription/updateSpeechpartsPointers', null, {root: true})
      //const sptrs = JSON.parse(JSON.stringify(state.speechparts))
      let data = []
      
      Array.from(spWithPointers).forEach(sp => {
        const stateSp = state.speechparts.find(e => e.id === sp.id)
        data.push({
          speech_part_type_id: stateSp.speech_part_type.id,
          ptr_start: sp.ptr_start,
          ptr_end: sp.ptr_end,
          note: stateSp.note
        })
      })
      try {
        await http.post(`documents/${rootState.document.document.id}/speech-parts/from-user/${rootState.workflow.selectedUserId}`, {data: data})

        commit('SAVING_STATUS', 'uptodate')
      } catch(error) {
        commit('SET_ERROR', `Error while saving 'parts of speech' (${error})`)
      }
  }
};

const getters = {

  speechparts: state => state.speechparts,
  newSpeechpart: state => state.newSpeechpart,

  isSpeechPartsSaved : state => {
    return state.savingStatus === 'uptodate'
  },
  /*
  getSpeechpartById: (state) => (id) => {
    id = parseInt(id);
    return state.speechparts.find(speechpart => {
      return speechpart.id === id;
    });
  }
  */
};

const speechpartsModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default speechpartsModule;
