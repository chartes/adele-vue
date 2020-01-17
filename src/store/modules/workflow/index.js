import {http} from '../../../modules/http-common'


const state = {
  selectedUserId: null,
}

const mutations = {
  SELECT_USER (state, userId) {
    state.selectedUserId = userId
  }
}

const actions = {
  changeSelectedUser ({ commit }, {userId}) { 
    commit('SELECT_USER', userId)
  }
}

const NONE_STEP = 0
const TRANSCRIPTION_STEP = 1
const TRANSLATION_STEP = 2
const COMMENTARIES_STEP = 3
const FACSIMILE_STEP = 4
const SPEECH_PARTS_STEP = 5

const VALIDATION_STEPS = [NONE_STEP, TRANSCRIPTION_STEP, TRANSLATION_STEP, COMMENTARIES_STEP, FACSIMILE_STEP, SPEECH_PARTS_STEP];
const VALIDATION_STEPS_LABELS = ['none', 'transcription', 'translation', 'commentaries', 'facsimile', 'speech-parts'];


const getters = {
  isTranscriptionValidated(state, getters, rootState, rootGetters) {
    return rootState.document.document.validation_step >= TRANSCRIPTION_STEP
  },
  isTranslationValidated(state, getters, rootState, rootGetters) {
      return rootState.document.document.validation_step >= TRANSLATION_STEP
  },
  isCommentariesValidated(state, getters, rootState, rootGetters) {
      return rootState.document.document.validation_step >= COMMENTARIES_STEP
  },
  isFacsimileValidated(state, getters, rootState, rootGetters) {
      return rootState.document.document.validation_step >= FACSIMILE_STEP
  },
  isSpeechPartsValidated(state, getters, rootState, rootGetters) {
      return rootState.document.document.validation_step >= SPEECH_PARTS_STEP
  },
  isStepReadOnly: (state, getters, rootState, rootGetters) => (step) => {
    // should be avoidable with guard routing 
    if (rootState.user.currentUser === null) {
      return true
    }

    // admin
    if (rootGetters['user/currentUserIsAdmin']) {
      return false
    } 
    // teacher
    if (rootGetters['user/currentUserIsTeacher']) {
       return rootState.user.currentUser.id !== state.selectedUserId
    }
    
    return rootState.document.document.validation_step >= step
  },
  isTranscriptionReadOnly: (state, getters)  => {
    return getters.isStepReadOnly(TRANSCRIPTION_STEP)
  },
  isTranslationReadOnly: (state, getters) => {
    return getters.isStepReadOnly(TRANSLATION_STEP)
  },
  isCommentariesReadOnly: (state, getters)  => {
    return getters.isStepReadOnly(COMMENTARIES_STEP)
  },
  isSpeechPartsReadOnly: (state, getters)  => {
    return getters.isStepReadOnly(SPEECH_PARTS_STEP)
  },
}

const workflowModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default workflowModule;

export {
  NONE_STEP,
  TRANSCRIPTION_STEP,
  TRANSLATION_STEP,
  COMMENTARIES_STEP,
  FACSIMILE_STEP,
  SPEECH_PARTS_STEP,
  VALIDATION_STEPS,
  VALIDATION_STEPS_LABELS
}
