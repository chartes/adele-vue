import axios from "axios/index";

const state = {

};

const mutations = {

};

const actions = {


};

const getters = {
  notes: (state, getters, rootState, rootGetters) => {
    const transcriptionNotes = rootState.transcription.transcription.notes
    const translationNotes = rootState.transcription.transcription.notes
    return transcriptionNotes.concat(translationNotes)
  },

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
