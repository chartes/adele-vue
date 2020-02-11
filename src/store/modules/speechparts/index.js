import {http} from '../../../modules/http-common';

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
  UPDATE_ONE (state, speechpart) {
    let newEntry = {}
    newEntry[speechpart.ptr_start] = speechpart
    //state.speechparts = [...state.speechparts.filter(sp => sp.id !== speechpart.id), speechpart];
    state.speechparts = Object.assign({}, state.speechparts, newEntry)
    state.savingStatus = 'tobesaved'
  }

};

const actions = {
  /* useful */
  setError({commit}, payload) {
    commit('SET_ERROR', payload)
  },
  /* useful */
  fetchSpeechPartsFromUser ({dispatch, commit }, {docId, userId}) { 
    return http.get(`documents/${ docId }/speech-parts/from-user/${ userId }`).then(async response => {
      //commit('RESET')
      let sps = {}
      response.data.data.map(sp => {
        sps[sp.ptr_start] = sp
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
  add({commit}, speechpart) {
    commit('UPDATE_ONE', speechpart)
  },
  update({commit}, speechpart) {
    commit('UPDATE_ONE', speechpart)
  },
  setToBeSaved({commit}) {
    commit('SAVING_STATUS', 'tobesaved')
  },
  async saveSpeechParts({dispatch, commit, state, rootState, rootGetters}) {
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
        await dispatch('fetchSpeechPartsContent')
        commit('SAVING_STATUS', 'uptodate')
      } catch(error) {
        commit('SET_ERROR', error)
      }
  }
};

const getters = {

  speechparts: state => state.speechparts,
  newSpeechpart: state => state.newSpeechpart,

  isSpeechPartsSaved : state => {
    return state.savingStatus === 'uptodate'
  }
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
