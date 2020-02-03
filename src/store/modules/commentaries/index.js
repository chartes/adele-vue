import {http} from '../../../modules/http-common';
import Quill from '../../../modules/quill/AdeleQuill';

import {
  TEIToQuill,
  quillToTEI,
  convertLinebreakTEIToQuill,
  convertLinebreakQuillToTEI,
  insertSegments,
  insertNotesAndSegments,
  insertNotes,
  stripSegments,
  computeNotesPointers,
  computeAlignmentPointers,
} from '../../../modules/quill/MarkupUtils'
import {filterDeltaOperations} from '../../../modules/quill/DeltaUtils'


const commentariesShadowQuillElement = document.createElement('div');
const notesShadowQuillElement = document.createElement('div');
let commentariesShadowQuill;
let notesShadowQuill;


const state = {
  commentaries: [],
  commentariesWithNotes: [],
  hasCommentaryTypes: {},
  commentaryTypes: [],
  savingStatus: 'uptodate',
  commentariesSaved: true,
  commentariesError: null
};

const mutations = {
  INIT(state, payload) {

      // TODO : le faire pour tous les coms


      commentariesShadowQuillElement.innerHTML = payload.content || "";
      commentariesShadowQuill = new Quill(commentariesShadowQuillElement);
      state.transcriptionContent = commentariesShadowQuillElement.children[0].innerHTML;
      //console.log("INIT with content", state.transcriptionContent);

      notesShadowQuillElement.innerHTML = payload.withNotes || "";
      notesShadowQuill = new Quill(notesShadowQuillElement);
      state.transcriptionWithNotes = notesShadowQuillElement.children[0].innerHTML;
      //console.log("INIT with notes", state.transcriptionWithNotes);

  },
  UPDATE_TYPES (state, payload) {
    state.commentaryTypes = payload
  },
  UPDATE (state, { commentaries, hasTypes}) {
    state.commentaries = commentaries;
    state.hasCommentaryTypes = hasTypes
  },
  ADD_COMMENTARY (state, {commentary}) {
    const comm = state.commentaries.find(c => c.type === commentary.type);
    if (!comm) {
      state.commentaries.push(commentary)
      const typeLabel = state.commentaryTypes[commentary.type]
      state.hasCommentaryTypes[typeLabel] = true
    }
  },
  /*
  UPDATE_COMMENTARY (state, {content, type}) {
    const comm = state.commentaries.find(c => c.type === type);
    comm.content = content
  },
  */
  SET_ERROR(state, payload) {
    state.commentariesError = payload
  },
  RESET(state) { 
    state.commentaries = []
    state.commentariesWithNotes = []
    state.hasTypes = []

    // TODO: le faire pour commentaries[current_com] et commentariesNotes[current_com]
    //if (transcriptionShadowQuillElement && transcriptionShadowQuillElement.children[0]) transcriptionShadowQuillElement.children[0].innerHTML = "";
    //if (notesShadowQuillElement && notesShadowQuillElement.children[0]) notesShadowQuillElement.children[0].innerHTML = "";
  },
  CHANGED (state) {
    // transcription changed and needs to be saved
    //console.log("STORE MUTATION transcription/CHANGED")
    state.commentariesSaved = false;
  },

  ADD_OPERATION (state, payload) {
    const deltaFilteredForContent = filterDeltaOperations(commentariesShadowQuill, payload, 'content');
    const deltaFilteredForNotes = filterDeltaOperations(notesShadowQuill, payload, 'notes');
  
    commentariesShadowQuill.updateContents(deltaFilteredForContent);
  
    notesShadowQuill.updateContents(deltaFilteredForNotes);

    // TODO: le faire pour commentaries[current_com] et commentariesNotes[current_com]
    state.transcriptionContent = commentariesShadowQuillElement.children[0].innerHTML;
    state.transcriptionWithNotes = notesShadowQuillElement.children[0].innerHTML;
  },
};

function parseComsFromResponse(response) {
  const commentaries = response.data.data;
  let hasTypes = {};
  let commentariesFormatted = [];
  commentaries.forEach(comm => {
    let quillContent = TEIToQuill(comm.content);
    let withNotes = insertNotes(quillContent, comm.notes);
    commentariesFormatted.push({
      type: comm.type.id,
      typeLabel: comm.type.label,
      content: withNotes,
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
    http.get(`documents/${ docId }/commentaries/from-user/${ userId }`).then( response => {
        //TODO commit('INIT', data);
        const formattedData = parseComsFromResponse(response)
        commit('RESET') // enlever quand le INIT sera ok
        commit('UPDATE', formattedData)
        commit('SET_ERROR', null)
      }).catch((error) => {
        commit('SET_ERROR', error)
        //throw error
      })
  },
  /* useful */
  fetchCommentariesContent({dispatch, rootState, rootGetters}) {
    //TODO: voir model dans translation
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

   /* useful */
   addNewCommentary({commit, dispatch, rootState}, {type}) {
    const newCommentary = {
      data: {
        doc_id : rootState.document.document.id,
        user_id : rootState.user.currentUser.id,
        type_id: type,
        content : '<p></p>'
      }
    }
    return http.post(`documents/${rootState.document.document.id}/commentaries`, newCommentary).then(response => {
      return dispatch('fetchCommentariesFromUser', {
        docId: rootState.document.document.id,
        userId: rootState.workflow.selectedUserId
      })
    }).catch(error => {
      commit('SET_ERROR', error)
    })
  },
   /* useful */
   async deleteCommentaryFromUser({dispatch, commit, rootState}, comType) {
    try {
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
    }
  },

  /* useful */
  changed ({ commit }, deltas) {
    console.warn('STORE ACTION commentaries/changed');
    commit('ADD_OPERATION', deltas);
    commit('CHANGED');
    commit('SAVING_STATUS', 'tobesaved')
  },

  /* useful */
  async saveCommentaries({dispatch, commit, state, rootState, rootGetters}) {
    commit('SAVING_STATUS', 'tobesaved')
    commit('LOADING_STATUS', true)
    /*
    try {
      // prepare notes
      let sanitizedWithNotes = stripSegments(state.transcriptionWithNotes)
      sanitizedWithNotes = convertLinebreakQuillToTEI(sanitizedWithNotes)
      const notes = computeNotesPointers(sanitizedWithNotes)
      notes.forEach(note => {
        const found = rootGetters['notes/notes'].find((element) => {
          return element.id === note.id
        })
        note.content = found.content
        note.type_id = found.note_type.id
      })

      // put content && update notes
      const tei = quillToTEI(state.transcriptionContent)
      const sanitizedContent = stripSegments(tei)
      await http.put(`documents/${rootState.document.document.id}/transcriptions/from-user/${rootState.user.currentUser.id}`, {
        data: {
          content: sanitizedContent,
          notes: notes.filter(n => n.id !== null)
        }
      })
            
      // and post new notes 
      const new_notes = notes.filter(n => n.id === null)
      if (new_notes.length > 0){
        await http.post(`documents/${rootState.document.document.id}/transcriptions/from-user/${rootState.user.currentUser.id}`, {
          data: {notes: new_notes}
        })
      }

      commit('SAVING_STATUS', 'uptodate')
      commit('SET_ERROR', false)
      commit('LOADING_STATUS', false)
    } catch(error) {
      // TODO: rollback to previous content and notes
      commit('SET_ERROR', error)
      commit('SAVING_STATUS', 'error')
      commit('LOADING_STATUS', false)
    }
    */
  },
  
  /*
  changed ({ commit, dispatch }, {content, type}) {
    commit('UPDATE_COMMENTARY', {content, type});
    commit('SAVED', false);
    //dispatch('transcription/translationChanged', null, {root:true})
  },
 

  add ({ commit, rootState }, typeId) {
    const config = { auth: { username: rootState.user.authToken, password: undefined }};
    const doc_id = rootState.document.document.id
    const newCommentaryData = {
      "data": {
        "doc_id": doc_id,
        "type_id": typeId,
        "user_id": rootState.user.currentUser.id,
        "content": "<p></p>"
      }
    }

    return http.post(`documents/${ doc_id }/commentaries`, newCommentaryData, config).then( response => {
      const respData = response.data.data;
      const isArray = Array.isArray(respData)

      const commentaries = isArray ? respData : [respData];
      let hasTypes = {};

      let commentariesFormatted = [];
      commentaries.forEach(comm => {
        let quillContent = TEIToQuill(comm.content);
        let withNotes = insertNotes(quillContent, comm.notes);
        commentariesFormatted.push({
          type: comm.type.id,
          typeLabel: comm.type.label,
          content: withNotes,
          notes: comm.notes
        });
        hasTypes[comm.type.label] = true;
      });
      console.log(commentariesFormatted);
      commit('UPDATE', { commentaries: commentariesFormatted, hasTypes })
    });
  },

  save ({ commit, dispatch }, typeId) {
    console.log('STORE ACTION commentaries/save', typeId);

    return dispatch('saveContent', typeId)
      .then(reponse => dispatch('saveNotes', typeId))
      .then(function(values) {
        console.log('commentary saved', values);
      })
  },
  saveContent ({ commit, rootState, rootGetters }, typeId) {

    const auth = rootGetters['user/authHeader'];
    const comm = state.commentaries.find(c => c.type === typeId)
    const tei = quillToTEI(comm.content);
    let sanitized = stripSegments(tei);
    sanitized = stripNotes(sanitized);
    const commData = {
      "data": {
        "doc_id": rootState.document.document.id,
        "type_id": typeId,
        "user_id": rootState.user.currentUser.id,
        "content": sanitized
      }
    }

    return new Promise( ( resolve, reject ) => {
      http.put(`documents/${rootState.document.document.id}/commentaries`, commData, auth)
        .then( response => {
          if (response.data.errors) {
            console.error("error", response.data.errors);
            reject(response.data.errors);
          }
          else resolve( response.data )
        })
        .catch( error => {
          console.error("error", error)
          reject( error )
        });
    } );


  },
  saveNotes ({ commit, rootState, rootGetters }, typeId) {
    console.log('STORE ACTION commentaries/saveContent', typeId);
    const auth = rootGetters['user/authHeader'];
    const comm = state.commentaries.find(c => c.type === typeId);
    let sanitizedWithNotes = stripSegments(comm.content);
    sanitizedWithNotes = convertLinebreakQuillToTEI(sanitizedWithNotes);
    const notes = computeNotesPointers(sanitizedWithNotes);
    notes.forEach(note => {
      let found = rootState.notes.notes.find(element => {
        return element.id === note.note_id;
      });
      note.content = found.content;
      note.commentary_username = rootState.user.author.username;
      note.commentary_type_id = comm.type;
      note.note_type = found.note_type.id;
    });


    return new Promise((resolve, reject) => {
      http.put(`documents/${rootState.document.document.id}/commentaries/notes`, {data: notes}, auth)
        .then(response => {
          if (response.data.errors) {
            console.error("error", response.data.errors);
            reject(response.data.errors);
          }
          else {
            resolve(response.data);
          }
        });
    })
  }
 */

};

const getters = {
  missingCommentaryTypes (state) {
    return state.commentaryTypes.filter(ct => {
      return !state.hasCommentaryTypes[ct.label]
    }
    )
  },
  getCommentary : (state) => (label) => {
    return state.commentaries.find(c => c.typeLabel === label)
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
