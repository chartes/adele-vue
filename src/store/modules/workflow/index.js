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

const getters = {
  isTranscriptionValidated(state, getters, rootState, rootGetters) {
    return rootState.document.document.validation_flags.transcription
  },
  isTranslationValidated(state, getters, rootState, rootGetters) {
      return rootState.document.document.validation_flags.translation
  },
  isCommentariesValidated(state, getters, rootState, rootGetters) {
      return rootState.document.document.validation_flags.commentaries
  },
  isFacsimileValidated(state, getters, rootState, rootGetters) {
      return rootState.document.document.validation_flags.facsimile
  },
  isSpeechPartsValidated(state, getters, rootState, rootGetters) {
      return rootState.document.document.validation_flags['speech-parts']
  },
  isStepReadOnly: (state, getters, rootState, rootGetters) => (flag) => {
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
    
    return rootState.document.document.validation_flags[flag]
  },
  isTranscriptionReadOnly: (state, getters)  => {
    return getters.isStepReadOnly('transcription')
  },
  isTranslationReadOnly: (state, getters) => {
    return getters.isStepReadOnly('translation')
  },
  isCommentariesReadOnly: (state, getters)  => {
    return getters.isStepReadOnly('commentaries')
  },
  isSpeechPartsReadOnly: (state, getters)  => {
    return getters.isStepReadOnly('speech-parts')
  },
  selectedUserHasTranscription: (state, getters, rootState,) => {
    if (getters.isTranscriptionReadOnly) {
      return rootState.document.transcriptionView !== null
    } else {
      return rootState.transcription.transcription !== null
    }
  },
  selectedUserHasTranslation: (state, getters, rootState) => {
    if (getters.isTranslationReadOnly) {
      return rootState.document.translationView !== null
    } else {
      return rootState.translation.translation !== null
    }
  },
  selectedUserHasCommentaries: (state, getters, rootState) => {
    if (getters.isCommentariesReadOnly) {
      return rootState.document.commentariesView !== null
    } else {
      return rootState.commentaries.commentaries.length > 0
    }
  },
  selectedUserHasFacsimile: (state, getters, rootState) => {
    console.warn('not implemented')
    return false
  },
  selectedUserHasSpeechParts: (state, getters, rootState) => {
    if (getters.isSpeechPartsReadOnly) {
      return rootState.document.speechPartsView !== null
    } else {
      return rootState.speechparts.speechparts.length > 0
    }
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

}
