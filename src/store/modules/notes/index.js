import axios from "axios/index";

const state = {

};

const mutations = {

};

const actions = {


};

const getters = {
  notes: (state, getters, rootState, rootGetters) => {
    const tr = rootState.transcription
    const tl = rootState.translation

    const transcriptionNotes = tr !== undefined && tr.transcription ? tr.transcription.notes : []
    const translationNotes = tl !== undefined && tl.translation ? tl.translation.notes : []

    return transcriptionNotes.concat(translationNotes)
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
