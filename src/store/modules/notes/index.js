import {http} from '../../../modules/http-common';

/**
 * @typedef {Object} Note
 * @property {number} id
 * @property {string} content
 * @property {0} type_id 
 */

/**
 * @typedef {Object} NotesModuleState
 * @property {Record<string, Note>} notes 
 * @property {boolean} notesLoading
 * @property {Object} notesError
 */

/** @type {NotesModuleState} **/
function initialState() {
  return {
    notes: {},
    notesLoading: true,
    notesError: null
  }
}

const mutations = {
  /**
   * @param {NotesModuleState} state
   * @param {{notes: Array<Note>}} payload
   *
   * @returns {NotesModuleState}
   */
  NOTES_RECEIVED(state, {notes}) {
    const notesById = Object.fromEntries(notes.map(note => [note.id, note]))
    state.notes = notesById,
    state.notesLoading = false;
    state.notesError = null;
  },
  /**
   * @param {NotesModuleState} state
   * @param {{error: any}} payload 
   *
   * @returns {NotesModuleState}
   */
  ERROR_RECEIVED(state, {error}) {
      state.notes = {};
      state.notesLoading = false;
      state.notesError = error;
  },
  /**
   * @param {NotesModuleState} state
   * @param {{note: Note}} payload
   *
   * @returns {NotesModuleState}
   */
  INSERT(state, {note}) {
    state.notes[note.id] = note
  },
  /**
   * @param {NotesModuleState} state
   * @param {{note: Note}} payload 
   *
   * @returns {NotesModuleState}
   */
  UPDATE(state, {note}) {
    state.notes[note.id] = note
  },
  /**
   * @param {NotesModuleState} state
   * @param {{noteId: number}} payload 
   *
   * @returns {NotesModuleState}
   */
  DELETE(state, {noteId}) {
    const notes = Object.assign({}, state.notes)
    delete notes[noteId]
    return {...state, notes}
  },

  /**
   * @param {NotesModuleState} state
   *
   * @returns {NotesModuleState}
   */
  RESET(state) {
    Object.assign(state, initialState())
  }
};

const actions = {
  
  /**
   * @param {{data: {content: string, type: 0}}} note - the note to create
   *
   * @returns {{content: string, type: 0, id: number}} - the new note with its
   * id
   */
  async createNote({commit, rootState}, note) {
    const userId = rootState.workflow.selectedUserId
    const response = await http.post(`documents/notes/from-user/${userId}`, {data:note});
    const createdNote = response.data.data;
    commit('INSERT', {note: createdNote});
    return createdNote;

  },

  
  /**
   * @param {{data: {content: string, type: 0, id: number}}} note - the note to update
   *
   * @returns {{content: string, type: 0, id: number}} - the updated note
   */
  async updateNote({commit, rootState}, note) {
    const userId = rootState.workflow.selectedUserId
    const response = await http.put(`documents/notes/from-user/${userId}`, {data:note})
    commit('UPDATE', {note})
    return response.data.data
  },

  /**
   * @param {number} noteId - the id of the note to delete
   */
  async deleteNote({commit}, noteId) {
    await http.delete(`documents/notes/${noteId}`)
    commit('DELETE', {noteId})
  },

  async fetchNotesFromUser({commit}, {docId, userId}) {
    commit('RESET');
    try {
      const response = await http.get(`documents/${docId}/notes/from-user/${userId}`);
      const notes = response.data.data;
      commit('NOTES_RECEIVED', {notes});
    } catch (error) {
      commit('ERROR_RECEIVED', {error})
    }
  },

  async fetchNotes({dispatch, rootState}) {
    await dispatch('fetchNotesFromUser', {
        docId: rootState.document.document.id,
        userId: rootState.workflow.selectedUserId
    })
  }
};

const getters = { };

const notesModule = {
  namespaced: true,
  state: initialState(),
  mutations,
  actions,
  getters
}

export default notesModule;
