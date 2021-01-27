import {http} from '../../../modules/http-common';
import Quill from '../../../modules/quill/AdeleQuill';
import Vue from 'vue';

import {
  TEIToQuill,
  quillToTEI,
  convertLinebreakTEIToQuill,
  convertLinebreakQuillToTEI,
  insertNotes,
  stripNotes,
  computeNotesPointers,
} from '../../../modules/quill/MarkupUtils'
import {filterDeltaOperations} from '../../../modules/quill/DeltaUtils'


let notesShadowQuillElements = {} 
let notesShadowQuills = {}

const state = {

  commentaryTypes: [],
  selectedCommentaryLabel : null,

  commentariesWithNotes: {},
  savingStatus: 'uptodate',
  commentariesLoading: false,
  commentariesSaved: true,
  commentariesError: null,
};

async function saveCom(rootState, rootGetters, com) {
  //console.log("saving", state.commentariesWithNotes, com)
  const contentWithNotes = quillToTEI(com.withNotes)
  const content = stripNotes(contentWithNotes)

  // prepare notes
  const teiWithNotes = contentWithNotes
  let sanitizedWithNotes = convertLinebreakQuillToTEI(teiWithNotes)

  const notes = computeNotesPointers(sanitizedWithNotes)
  console.log("building notes to be saved", [...notes])

  notes.forEach(note => {
    const found = rootGetters['notes/getNoteById'](note.id)
    console.log("building note found in comm for save,", note, found)

    note.content = found.content
    if (found.note_type) {
      note.type_id = found.note_type.id
    }
  })
  console.log("building notes to be saved", notes.filter(n => n.id !== null && n.id >= 0))


  // put content & update notes
  await http.put(`documents/${rootState.document.document.id}/commentaries`, {
    data: {
      type_id: com.type,
      content: content,
      notes: notes.filter(n => n.id !== null && n.id >= 0)
    }
  })
        
  // and post new notes 
  const new_notes = notes.filter(n => n.id === null || n.id < 0).map(n => {
    delete n.id
    return n
  })

  if (new_notes.length > 0){
    await http.post(`documents/${rootState.document.document.id}/commentaries`, {
      data: {
        type_id: com.type,
        notes: new_notes
      }
    })
  }
}  

const mutations = {
  INIT(state, data) {
      state.commentariesWithNotes = {}
      state.selectedCommentaryLabel = null

      data.forEach(commentary => {
        const t = commentary.typeLabel

        notesShadowQuillElements[t] = document.createElement('div')
        notesShadowQuillElements[t].innerHTML = "<p></p>"
        notesShadowQuills[t] = new Quill(notesShadowQuillElements[t]);
        notesShadowQuillElements[t].children[0].innerHTML = commentary.withNotes || ""
        
        console.log("commentary source", t, data)

        Vue.set(state.commentariesWithNotes, t, {
          ...commentary,
          withNotes: notesShadowQuillElements[t].children[0].innerHTML
        })
      })

      if (data.length > 0) {
        state.selectedCommentaryLabel = data[0].typeLabel
      }
  },
  UPDATE_TYPES (state, payload) {
    state.commentaryTypes = payload
  },
  SELECT(state, label) {
    state.selectedCommentaryLabel = label
  },
  LOADING_STATUS (state, payload) {
    state.commentariesLoading = payload;
  },
  /*
  ADD_COMMENTARY (state, {commentary}) {
    const comm = state.commentaries.find(c => c.type === commentary.type);
    if (!comm) {
      state.commentaries.push(commentary)
      const typeLabel = state.commentaryTypes[commentary.type]
      state.hasCommentaryTypes[typeLabel] = true
    }
  },
  */
  /*
  UPDATE_COMMENTARY (state, {content, type}) {
    const comm = state.commentaries.find(c => c.type === type);
    comm.content = content
  },
  */
  UPDATE(state, payload) {
    const t = state.selectedCommentaryLabel
    Vue.set(state.commentariesWithNotes, t, {
      ...state.commentariesWithNotes[t],
      notes: payload.notes,
      withNotes : payload.withNotes
    })
  },
  SET_ERROR(state, payload) {
    state.commentariesError = payload
  },
  RESET(state) { 
    state.commentariesWithNotes = {}
    state.selectedCommentaryLabel = null
    // TODO: le faire pour commentaries[current_com] et commentariesNotes[current_com]
    //if (transcriptionShadowQuillElement && transcriptionShadowQuillElement.children[0]) transcriptionShadowQuillElement.children[0].innerHTML = "";
    //if (notesShadowQuillElement && notesShadowQuillElement.children[0]) notesShadowQuillElement.children[0].innerHTML = "";
  },
  CHANGED (state) {
    // transcription changed and needs to be saved
    state.commentariesSaved = false;
  },
  SAVING_STATUS (state, payload) {
    state.savingStatus = payload;
  },
  ADD_OPERATION (state, payload) {
    const t = state.selectedCommentaryLabel

    const deltaFilteredForNotes = filterDeltaOperations(notesShadowQuills[t], payload, 'notes')
    
    notesShadowQuills[t].updateContents(deltaFilteredForNotes)

    Vue.set(state.commentariesWithNotes, t, {
      ...state.commentariesWithNotes[t],
      withNotes: notesShadowQuillElements[t].children[0].innerHTML
    })
  },
};

function parseComsFromResponse(response) {
  const commentaries = response.data.data;
  let hasTypes = {};
  let commentariesFormatted = [];
  commentaries.forEach(comm => {
    let quillContent = TEIToQuill(comm.content);
    let withNotes = insertNotes(quillContent, comm.notes);
    //console.log("commentaries", comm, quillContent, withNotes)
    commentariesFormatted.push({
      type: comm.type.id,
      typeLabel: comm.type.label,
      content: quillContent,
      withNotes: withNotes,
      notes: comm.notes
    });
    hasTypes[comm.type.label] = true
  })
  return { commentaries: commentariesFormatted, hasTypes }
}

const actions = {

  fetchTypes ({ commit }) {
    return http.get(`commentary-types`).then( response => {
      commit('UPDATE_TYPES', response.data.data)
    });
  },

  fetchCommentariesFromUser ({ commit }, {docId, userId}) {
    commit('LOADING_STATUS', true);
    return http.get(`documents/${ docId }/commentaries/from-user/${ userId }`).then( response => {
        const formattedData = parseComsFromResponse(response)
        commit('INIT', formattedData.commentaries); 
        commit('SET_ERROR', null)
        commit('LOADING_STATUS', false);
      }).catch((error) => {
        commit('SET_ERROR', error)
        commit('RESET')
        commit('LOADING_STATUS', false);
        //throw error
      })
  },
  /* useful */
  fetchCommentariesContent({dispatch, rootState, rootGetters}) {
    if (rootGetters['workflow/isCommentariesReadOnly']) {
      // when in readonly mode
      // students see the reference content
      // teacher and admins can see other ppl readonly views
      return dispatch('document/fetchCommentariesView', 
        rootGetters['user/currentUserIsTeacher'] ? rootState.workflow.selectedUserId : rootState.document.user_id,
        {root: true})
    } else {
      return dispatch('fetchCommentariesFromUser', {
        docId: rootState.document.document.id,
        userId: rootState.workflow.selectedUserId
      })
    }
  },
  /* useful */
  setError({commit}, payload) {
    commit('SET_ERROR', payload)
  },
  selectCommentaryTab({commit}, label) {
    commit('SELECT', label)
  },

  insertNote({commit, rootState, state}, newNote) {
    const t = state.selectedCommentaryLabel
    const quillContent = TEIToQuill(state.commentariesWithNotes[t].content)
    const textWithNotes = insertNotes(quillContent,  [newNote])

    const payload = {
      notes: state.commentariesWithNotes[t].notes.concat(newNote),
      withNotes: convertLinebreakTEIToQuill(textWithNotes)
    }
    /* save the shadow content with notes */
    commit('UPDATE', payload)
    return newNote
  },
  updateNote({commit, rootState, state}, updatedNote) {
    const t = state.selectedCommentaryLabel
    const currentNotes = state.commentariesWithNotes[t].notes;
    const payload = {
        ...state.commentariesWithNotes[t],
        notes: [...currentNotes.filter(n => n.id !== updatedNote.id), updatedNote]
    }
    /* save the note modification in the store */
    commit('SAVING_STATUS', 'tobesaved')
    commit('UPDATE', payload)
    return updatedNote
  },
  /* useful */
  addNewCommentary({commit, state, dispatch, rootState}, {type}) {
    commit('LOADING_STATUS', true);
    const newCommentary = {
      data: {
        doc_id : rootState.document.document.id,
        user_id : rootState.user.currentUser.id,
        type_id: type,
        content : '<p></p>'
      }
    }
    const newLabel = state.selectedCommentaryLabel
    return http.post(`documents/${rootState.document.document.id}/commentaries`, newCommentary).then(response => {
      return dispatch('fetchCommentariesFromUser', {
        docId: rootState.document.document.id,
        userId: rootState.workflow.selectedUserId
      }).then(() => {
        commit('SELECT', newLabel)
        commit('LOADING_STATUS', false);
      })
    }).catch(error => {
      commit('SET_ERROR', error)
      commit('LOADING_STATUS', false);
    })
  },
   /* useful */
   async deleteCommentaryFromUser({dispatch, commit, rootState}, comType) {
    try {
      commit('LOADING_STATUS', true);
      commit('SET_ERROR', null)
      const response = await http.delete(`documents/${rootState.document.document.id}/commentaries/from-user/${rootState.workflow.selectedUserId}/and-type/${comType}`)
     /*
     //TODO: faire le bouton de validation avant, histoire de tester facilement
      await dispatch('document/partialUpdate', {
        validation_flags: response.data.data.validation_flags
      }, {root: true})
      */
      await dispatch('fetchCommentariesContent')
    } catch(error) {
      commit('SET_ERROR', error)
      commit('LOADING_STATUS', false);
    }
  },

  /* useful */
  changed ({ commit }, deltas) {
    commit('ADD_OPERATION', deltas);
    commit('CHANGED');
    commit('SAVING_STATUS', 'tobesaved')
  },

  /* useful */
  async saveCommentaries({dispatch, commit, state, rootState, rootGetters}) {
    commit('SAVING_STATUS', 'tobesaved')
    commit('LOADING_STATUS', true);

    try {
      // save each commentary independently in parallel
      await Promise.all(Object.values(state.commentariesWithNotes).map(com => saveCom(rootState, rootGetters, com)))
      // update the store content
      await dispatch('fetchCommentariesContent')
  
      commit('SAVING_STATUS', 'uptodate')
      commit('SET_ERROR', false)
      commit('LOADING_STATUS', false)
    } catch(error) {
      commit('SET_ERROR', error)
      commit('SAVING_STATUS', 'error')
      commit('LOADING_STATUS', false)
    }
  },
};

const getters = {
  missingCommentaryTypes (state) {
    return state.commentaryTypes.filter(ct => {
        return !(ct.label in state.commentariesWithNotes)
      }
    )
  },
  hasCommentaryTypes: (state) => (typeLabel) => {
    return  typeLabel in state.commentariesWithNotes
  },
  getCommentary : (state) => (label) => {
    let c
    try {
      c = state.commentariesWithNotes[label]
    } catch (e) {
      c = null
    }
    return c
  },
  isCommentariesSaved(state) {
    return state.savingStatus === 'uptodate'
  }
};

const commentariesModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default commentariesModule;
