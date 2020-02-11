import {http} from '../../../modules/http-common';

const state = {
  speechparts: [],
  newSpeechpart: false,

  speechPartsError: null
};

const mutations = {
  SET_ERROR(state, payload) {
    state.speechPartsError = payload
  },
  UPDATE_ALL (state, speechparts) {
    state.speechparts = speechparts;
  },

  /* need review */
  NEW (state, speechpart) {
    state.newSpeechpart = speechpart;
    state.speechparts.push(speechpart);
  },
  UPDATE_ONE (state, speechpart) {
    state.speechparts = [...state.speechparts.filter(sp => sp.id !== speechpart.id), speechpart];
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
      commit('UPDATE_ALL', response.data.data)
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
  update({dispatch, rootState, rootGetters}, speechpart) {
    
  },
   /* useful */
  async saveSpeechParts({dispatch, commit, state, rootState, rootGetters}) {
      commit('SET_ERROR', false);
      const spWithPointers = await dispatch('transcription/updateSpeechpartsPointers', null, {root: true})
      //console.log("TODO: sp with pointers", spWithPointers)
      const data = {
        data: spWithPointers.map(sp => {
          return {
            speech_part_type_id: state.speechparts[sp.index].speech_part_type.id,
            ptr_start: sp.ptr_start,
            ptr_end: sp.ptr_end,
            note: state.speechparts[sp.index].note
          }
        })
      }
      try {
        await http.post(`documents/${rootState.document.document.id}/speech-parts/from-user/${rootState.user.currentUser.id}`, data)
        await dispatch('fetchSpeechPartsContent')
      } catch(error) {
        commit('SET_ERROR', error)
      }
  }
};

const getters = {

  speechparts: state => state.speechparts,
  newSpeechpart: state => state.newSpeechpart,

  isSpeechPartsSaved : state => {
    return false
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
