import {http} from '../../../modules/http-common';

const state = {

};

const mutations = {

};

const actions = {

  async deleteNote({getters, rootState, rootGetters}, noteId) {
    console.log("TODO delete note", noteId)
    //await http.delete(`/documents/${rootState.document.document.id}/notes`)
  }
};

const getters = {
  notes: (state, getters, rootState, rootGetters) => {
    const tr = rootState.transcription
    const tl = rootState.translation
    const coms = rootState.commentaries

    const transcriptionNotes = tr !== undefined && tr.transcription ? tr.transcription.notes : []
    const translationNotes = tl !== undefined && tl.translation ? tl.translation.notes : []
    let commentariesNotes = []
    Object.keys(coms.commentariesWithNotes).forEach(t => {
      coms.commentariesWithNotes[t].notes.forEach(n => {
        commentariesNotes.push(n)
      })
    });
    let notes = [...transcriptionNotes]
    translationNotes.forEach(n => {
      if (notes.findIndex((e) => { return e.id === n.id}) === -1) {
        notes.push(n)
      }
    })
    commentariesNotes.forEach(n => {
      if (notes.findIndex((e) => { return e.id === n.id}) === -1) {
        notes.push(n)
      }
    })
    return notes
  },
  getNoteById: (state, getters) => (id) => {
    id = parseInt(id)
    return getters.notes.find(note => {
      return note.id === id;
    });
  }
  /*
  notes: state => state.notes,
  newNote: state => state.newNote,
  getNoteById: (state) => (id) => {
    id = parseInt(id);
    return state.notes.find(note => {
      return note.id === id;
    });
  }
  */

};

const notesModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default notesModule;
