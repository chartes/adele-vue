import {http} from '../../../modules/http-common';
import Vue from 'vue';

const state = {
  speechparts: {},
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
  /* need review */
  NEW (state, speechpart) {
    state.newSpeechpart = speechpart;
    state.speechparts.push(speechpart);
    state.savingStatus = 'tobesaved'
  },
  UPDATE_ONE (state, {id, speechpart}) {
    let newEntry = {}
    newEntry[id] = speechpart
    state.speechparts = Object.assign({}, state.speechparts, newEntry)
    state.savingStatus = 'tobesaved'
  },
  DELETE (state, id) {
    Vue.delete(state.speechparts, id)
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
      let sps = {}
      response.data.data.map(sp => {
        const spId = getters.computeId(sp);
        console.log("SP ID", spId);
        sps[spId] = sp
      })
      commit('UPDATE_ALL', sps)
      // recompute transcriptionWithSpeechParts (may be overkill since it's already fetched once)
      //await dispatch('transcription/fetchTranscriptionFromUser', {userId, docId}, {root: true})

      commit('SET_ERROR', null)
    }).catch((error) => {
      commit('SET_ERROR', error)
      //throw error
    })
  },
  /* useful */
  fetchSpeechPartsContent({dispatch, rootState, rootGetters}) {
    if (rootGetters['workflow/isSpeechPartsReadOnly']) {
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
  add({commit, getters}, speechpart) {
    commit('UPDATE_ONE', {id: getters.computeId(speechpart), speechpart})
  },
  update({commit, getters}, speechpart) {
    commit('UPDATE_ONE', {id: getters.computeId(speechpart), speechpart})
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
      console.log("SP in state:", state.speechparts)
      console.log("SP computed:", spWithPointers)

      //const sptrs = JSON.parse(JSON.stringify(state.speechparts))
      const obj = Object.assign ({}, state.speechparts)
      //console.log("SP obj:", obj)

      const state_ptrs = Object.keys(obj).map((k) => obj[k])
      const computed_ptrs = Array.from(spWithPointers)

      let data = []
      computed_ptrs.forEach((sp, index) => {
        data.push({
          speech_part_type_id: state_ptrs[index].speech_part_type.id,
          ptr_start: sp.ptr_start,
          ptr_end: sp.ptr_end,
          note: state_ptrs[index].note
        })
      })

      try {
        await http.post(`documents/${rootState.document.document.id}/speech-parts/from-user/${rootState.user.currentUser.id}`, {data: data})
        //dispatch('transcription/reloadSpeechparts', null, {root: true})

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
  computeId: (state) => (sp) => {
    return `${sp.transcription_id}000${sp.ptr_start}`
  },
  getSpeechpartTypeCount: (state) => (typeId) => {
    const t = parseInt(typeId);
    let count = 1;
    Object.values(state.speechparts).forEach(sp => {
      if (sp.speech_part_type.id == t) {
        count += 1
      }
    })
    return count;
  }
};

const speechpartsModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default speechpartsModule;
