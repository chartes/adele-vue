
const state = {
  selectedUserId: null,
  transcriptionAlignmentMode: false,
  currentSection: 'notice',
  isInEditionMode: false,
}

const mutations = {
  SELECT_USER (state, userId) {
    state.selectedUserId = userId
  },
  SET_TRANSCRIPTION_ALIGNMENT_MODE (state, v) {
    state.transcriptionAlignmentMode = v
  },
  SET_CURRENT_SECTION (state, v) {
    state.currentSection = v
  },
  SET_EDITION_MODE (state, v) {
    state.isInEditionMode = v
  }
}

const actions = {
  changeSelectedUser ({ commit }, {userId}) { 
    commit('SELECT_USER', userId)
  },
  setCurrentSection({commit}, section) {
    commit('SET_CURRENT_SECTION', section)
  },
  setEditionMode({commit}, v) {
    commit('SET_EDITION_MODE', v)
  },
  async setTranscriptionAlignmentMode ({dispatch, commit, rootState}, v) { 
    await dispatch('transcription/fetchTranscriptionContent', null, {root: true})
    await dispatch('translation/fetchTranslationContent', null, {root: true})
    if (v) {
      await dispatch('transcription/fetchTextAlignments', null, {root: true})

      let transcriptionSegments = rootState.transcription.textAlignmentSegments.map(e => [e[0], e[1]]).flat()
      transcriptionSegments = Array.from(new Set(transcriptionSegments))
      transcriptionSegments.shift() //remove the first pointer (its the first, useless)
      transcriptionSegments.pop() //remove the last pointer (its the closing tag, useless)
      dispatch('transcription/insertSegments', transcriptionSegments, {root: true})

      let translationSegments = rootState.transcription.textAlignmentSegments.map(e => [e[2], e[3]]).flat()
      translationSegments = Array.from(new Set(translationSegments))
      translationSegments.shift() //remove the first pointer (its the first, useless)
      translationSegments.pop() //remove the last pointer (its the closing tag, useless)
      dispatch('translation/insertSegments', translationSegments, {root: true})
      
    }
    commit('SET_TRANSCRIPTION_ALIGNMENT_MODE', v)
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
      return Object.keys(rootState.commentaries.commentariesWithNotes).length > 0
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
