import Quill from '../../../modules/quill/AdeleQuill';
import {http} from '../../../modules/http-common';

import {
  TEIToQuill,
  quillToTEI,
  convertLinebreakTEIToQuill,
  convertLinebreakQuillToTEI,
  insertSegments,
  insertNotesAndSegments,
  insertNotes,
  insertSpeechparts,
  insertFacsimileZones,
  stripSegments,
  computeNotesPointers,
  computeAlignmentPointers,
  computeSpeechpartsPointers,
  computeImageAlignmentsPointers
} from '../../../modules/quill/MarkupUtils'
import {filterDeltaOperations} from '../../../modules/quill/DeltaUtils'


const transcriptionShadowQuillElement = document.createElement('div');
const notesShadowQuillElement = document.createElement('div');
const speechpartsShadowQuillElement = document.createElement('div');
const facsimileShadowQuillElement = document.createElement('div');
let transcriptionShadowQuill;
let notesShadowQuill;
let speechpartsShadowQuill;
let facsimileShadowQuill;

const state = {

  transcriptionLoading: true,
  transcription: null,
  transcriptionContent: null,
  transcriptionWithNotes: null,
  transcriptionWithSpeechparts: null,
  transcriptionWithFacsimile: null,
  transcriptionSaved: true,
  transcriptionError: null,
  transcriptionAlignments: [],
  savingStatus: 'uptodate'
};

const mutations = {


  INIT(state, payload) {
      transcriptionShadowQuillElement.innerHTML = "<p></p>" 
      transcriptionShadowQuill = new Quill(transcriptionShadowQuillElement);
      transcriptionShadowQuillElement.children[0].innerHTML = payload.content || "";
      state.transcriptionContent = transcriptionShadowQuillElement.children[0].innerHTML;
      //console.log("INIT with content", state.transcriptionContent);

      notesShadowQuillElement.innerHTML = "<p></p>" 
      notesShadowQuill = new Quill(notesShadowQuillElement);
      notesShadowQuillElement.children[0].innerHTML = payload.withNotes || "";
      state.transcriptionWithNotes = notesShadowQuillElement.children[0].innerHTML;
      //console.log("INIT with notes", state.transcriptionWithNotes);

      speechpartsShadowQuillElement.innerHTML = "<p></p>" 
      speechpartsShadowQuill = new Quill(speechpartsShadowQuillElement);
      speechpartsShadowQuillElement.children[0].innerHTML = payload.withSpeechparts || "";
      state.transcriptionWithSpeechparts = speechpartsShadowQuillElement.children[0].innerHTML;

      facsimileShadowQuillElement.innerHTML = "<p></p>" 
      facsimileShadowQuill = new Quill(facsimileShadowQuillElement);
      facsimileShadowQuillElement.children[0].innerHTML = payload.withFacsimile || "";
      state.transcriptionWithFacsimile = facsimileShadowQuillElement.children[0].innerHTML;
  },
  RESET(state) {

    console.log("STORE MUTATION transcription/RESET");
    state.transcription = null;
    state.transcriptionAlignments = [];
    state.transcriptionContent = null;
    state.transcriptionWithNotes = null;
    state.transcriptionWithSpeechparts = null;
    state.transcriptionWithFacsimile = null;

    if (transcriptionShadowQuillElement && transcriptionShadowQuillElement.children[0]) transcriptionShadowQuillElement.children[0].innerHTML = "";
    if (notesShadowQuillElement && notesShadowQuillElement.children[0]) notesShadowQuillElement.children[0].innerHTML = "";
    if (speechpartsShadowQuillElement && speechpartsShadowQuillElement.children[0]) speechpartsShadowQuillElement.children[0].innerHTML = "";
    if (facsimileShadowQuillElement && facsimileShadowQuillElement.children[0]) facsimileShadowQuillElement.children[0].innerHTML = "";
    
  },
  SET_ERROR(state, payload) {
    state.transcriptionError = payload
  },
  LOADING_STATUS (state, payload) {
    state.transcriptionLoading = payload;
  },
  SAVING_STATUS (state, payload) {
    //console.log("STORE MUTATION transcription/SAVING_STATUS", payload)
    state.savingStatus = payload;
  },
  ALIGNMENTS(state, payload) {
    state.transcriptionAlignments = payload;
  },
  UPDATE (state, payload) {
    //console.log("STORE MUTATION transcription/UPDATE")
    if (payload.transcription) {
      state.transcription = payload.transcription;
    }
    if (payload.withNotes) {
      state.transcriptionWithNotes = payload.withNotes;
    }
    if (payload.withSpeechparts) {
      state.transcriptionWithSpeechparts = payload.withSpeechparts;
    }
    if (payload.withFacsimile) {
      state.transcriptionWithFacsimile = payload.withFacsimile;
    }
    //state.transcriptionSaved = true;
  },
  CHANGED (state) {
    // transcription changed and needs to be saved
    //console.log("STORE MUTATION transcription/CHANGED")
    state.transcriptionSaved = false;
  },
  ADD_OPERATION (state, payload) {

    const deltaFilteredForContent = filterDeltaOperations(transcriptionShadowQuill, payload, 'content');
    const deltaFilteredForNotes = filterDeltaOperations(notesShadowQuill, payload, 'notes');
    const deltaFilteredForSpeechparts = filterDeltaOperations(speechpartsShadowQuill, payload, 'speechparts');
    const deltaFilteredForFacsimile = filterDeltaOperations(facsimileShadowQuill, payload, 'facsimile');
  
    transcriptionShadowQuill.updateContents(deltaFilteredForContent);
    notesShadowQuill.updateContents(deltaFilteredForNotes);
    speechpartsShadowQuill.updateContents(deltaFilteredForSpeechparts);
    facsimileShadowQuill.updateContents(deltaFilteredForFacsimile);

    state.transcriptionContent = transcriptionShadowQuillElement.children[0].innerHTML;
    state.transcriptionWithNotes = notesShadowQuillElement.children[0].innerHTML;
    state.transcriptionWithSpeechparts = speechpartsShadowQuillElement.children[0].innerHTML;
    state.transcriptionWithFacsimile = facsimileShadowQuillElement.children[0].innerHTML;
  },
  SAVED (state) {
    // transcription saved
    state.transcriptionSaved = true;
  }

};

const actions = {
 
  /* useful */
  fetchTranscriptionFromUser ({dispatch, commit, state, rootState}, {docId, userId}) {
    commit('RESET')
    commit('LOADING_STATUS', true);
    return http.get(`documents/${docId}/transcriptions/from-user/${userId}`).then(async response => {

      let transcription = response.data.data;

      let quillContent = TEIToQuill(transcription.content);
      let content = insertSegments(quillContent, state.transcriptionAlignments, 'transcription');
      const withNotes = insertNotesAndSegments(quillContent, transcription.notes, state.transcriptionAlignments, 'transcription')
      const withSpeechparts = insertSpeechparts(quillContent, rootState.speechparts.speechparts);
      const withFacsimile = insertFacsimileZones(quillContent, rootState.facsimile.alignments);
      console.log("fetchTranscriptionFromUser withNotes", withNotes)

      const data = {
        transcription: transcription,
        content: convertLinebreakTEIToQuill(content),
        withNotes: convertLinebreakTEIToQuill(withNotes),
        withSpeechparts: convertLinebreakTEIToQuill(withSpeechparts),
        withFacsimile: convertLinebreakTEIToQuill(withFacsimile),
      };

      commit('INIT', data);
      commit('UPDATE', data);
      commit('SET_ERROR', null)
      commit('LOADING_STATUS', false);
    }).catch((error) => {
      commit('SET_ERROR', error)
      commit('LOADING_STATUS', false);
      //throw error
    })
  },
  fetchTranscriptionContent({dispatch, rootState, rootGetters}) {
    if (rootGetters['workflow/isTranscriptionReadOnly']) {
      // when in readonly mode
      // students see the reference content
      // teacher and admins can see other ppl readonly views
      return dispatch('document/fetchTranscriptionView', 
       rootGetters['user/currentUserIsTeacher'] ? rootState.workflow.selectedUserId : rootState.document.user_id,
       {root: true})
    } else {
      return dispatch('fetchTranscriptionFromUser', {
        docId: rootState.document.document.id,
        userId: rootState.workflow.selectedUserId
      })
    }
  },
  /* useful */
  fetchAlignments ({commit}, {doc_id, user_id}) {
    return http.get(`documents/${doc_id}/transcriptions/alignments/from-user/${user_id}`).then( response => {
      //console.log("STORE ACTION transcription/fetchAlignments", response)
      if (response.data.errors) {
        commit('ALIGNMENTS', []);
        return;
      }
      const alignments = response.data.data && Array.isArray(response.data.data[0]) ? response.data.data : [response.data.data];
      commit('ALIGNMENTS', alignments);
    })
  },
  /* useful */
  addNewTranscription ({commit, dispatch, rootState}) {
    const emptyTranscription = {
      data: {
        notes: [],
        content: ""
      }
    }
    return http.post(`documents/${rootState.document.document.id}/transcriptions/from-user/${rootState.user.currentUser.id}`, emptyTranscription).then(response => {
      commit('SET_ERROR', null)
    }).catch(error => {
      commit('SET_ERROR', error)
    })
  },
  /* useful */
  setError({commit}, payload) {
    commit('SET_ERROR', payload)
  },
  /* useful */
  async deleteTranscriptionFromUser({dispatch, commit}, {docId, userId}) {
    try {
      commit('SET_ERROR', null)
      const response = await http.delete(`documents/${docId}/transcriptions/from-user/${userId}`)
      await dispatch('document/partialUpdate', {
        validation_flags: response.data.data.validation_flags
      }, {root: true})
      await dispatch('fetchTranscriptionContent')
    } catch(error) {
      commit('SET_ERROR', error)
    }
  },
  /* useful */
  async saveTranscription({dispatch, commit, state, rootState, rootGetters}) {
    commit('SAVING_STATUS', 'tobesaved')
    commit('LOADING_STATUS', true)

    try {
      // prepare notes
      const tei = quillToTEI(state.transcriptionContent)
      const sanitizedContent = stripSegments(tei)

      console.log("saveTranscription state.transcriptionWithNotes", state.transcriptionWithNotes)
      const teiWithNotes = quillToTEI(state.transcriptionWithNotes)
      console.log("saveTranscription teiWithNotes", teiWithNotes)
      let sanitizedWithNotes = stripSegments(teiWithNotes)
      console.log("saveTranscription sanitizedWithNotes", sanitizedWithNotes)
      sanitizedWithNotes = convertLinebreakQuillToTEI(sanitizedWithNotes)
      console.log("saveTranscription sanitizedWithNotes", sanitizedWithNotes)

      const notes = computeNotesPointers(sanitizedWithNotes)

      notes.forEach(note => {
        const found = rootGetters['notes/getNoteById'](note.id)
        note.content = found.content
        if (found.note_type) {
          note.type_id = found.note_type.id
        }
      })

      // put content && update notes
      await http.put(`documents/${rootState.document.document.id}/transcriptions/from-user/${rootState.user.currentUser.id}`, {
        data: {
          content: sanitizedContent,
          notes: notes.filter(n => n.id !== null && n.id >= 0)
        }
      })
            
      // and post new notes 
      const new_notes = notes.filter(n => n.id === null || n.id < 0).map(n => {
        delete n.id
        return n
       })
      if (new_notes.length > 0){
        await http.post(`documents/${rootState.document.document.id}/transcriptions/from-user/${rootState.user.currentUser.id}`, {
          data: {notes: new_notes}
        })
      }
      
      // update the store content
      await dispatch('fetchTranscriptionContent')

      commit('SAVING_STATUS', 'uptodate')
      commit('SET_ERROR', false)
      commit('LOADING_STATUS', false)
    } catch(error) {
      commit('SET_ERROR', error)
      commit('SAVING_STATUS', 'error')
      commit('LOADING_STATUS', false)
    }
  },
  insertNote({commit, rootState, state}, newNote) {
    const quillContent = TEIToQuill(state.transcriptionContent)
    const textWithNotes = insertNotes(quillContent,  [newNote])
    const data = {
      transcription: {
        ...state.transcription,
        notes: state.transcription.notes.concat(newNote)
      },
      withNotes: convertLinebreakTEIToQuill(textWithNotes),
    }
    /* save the shadow content with notes */
    commit('UPDATE', data)
    return newNote
  },
  cloneContent: function ({dispatch, state, rootGetters, rootState}) {
    console.log('STORE ACTION transcription/cloneContent', state.transcriptionContent);
    const auth = rootGetters['user/authHeader'];
    console.log(`%c clone transcription`, 'color:red');
    const doc_id = rootState.document.document.id;
    const user_id = rootState.user.author.id;
    return new Promise((resolve, reject) => {
      http.get(`documents/${doc_id}/transcriptions/clone/from-user/${user_id}`, auth)
        .then(response => {
          if (response.data.errors) {
            console.error("error", response.data.errors);
            reject(response.data.errors);
          } else resolve(response.data)
        })
        .then(response => {
          dispatch("unvalidate");
        })
        .catch(error => {
          console.error("error", error);
          reject(error)
        });
    });
  },
  updateSpeechpartsPointers({state}) {
      //console.log("state.transcriptionWithSpeechparts", sanitizedWithSpeechparts)
      let sanitizedWithSpeechparts = stripSegments(state.transcriptionWithSpeechparts);
      //console.log("sanitizedWithSpeechparts", sanitizedWithSpeechparts)
      sanitizedWithSpeechparts = convertLinebreakQuillToTEI(sanitizedWithSpeechparts);
      return computeSpeechpartsPointers(sanitizedWithSpeechparts);
  },
  /*
  saveNotes ({ commit, rootState, state, rootGetters }) {

      console.warn('STORE ACTION transcription/saveNotes');

      // compute notes pointers
      let sanitizedWithNotes = stripSegments(state.transcriptionWithNotes);

      console.warn(sanitizedWithNotes);
      sanitizedWithNotes = convertLinebreakQuillToTEI(sanitizedWithNotes);
      console.warn(sanitizedWithNotes);
      const notes = computeNotesPointers(sanitizedWithNotes);
      notes.forEach(note => {
          let found = rootState.notes.notes.find((element) => {
              return element.id === note.note_id;
          });
          console.log(rootState.notes.notes, notes, found);
          note.content = found.content;
          note.transcription_username = rootState.user.author.username;
          note.note_type = found.note_type.id;
      });
      const auth = rootGetters['user/authHeader'];

      return new Promise((resolve, reject) => {
          http.put(`documents/${rootState.document.document.id}/transcriptions/notes`, {data: notes}, auth)
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
  },
  */
 /*
  saveSpeechparts ({ commit, rootState, state, rootGetters }) {


    console.warn('STORE ACTION transcription/saveSpeechparts');

    // compute notes pointers
    //console.log("state.transcriptionWithSpeechparts", sanitizedWithSpeechparts)
    let sanitizedWithSpeechparts = stripSegments(state.transcriptionWithSpeechparts);
    //console.log("sanitizedWithSpeechparts", sanitizedWithSpeechparts)
    sanitizedWithSpeechparts = convertLinebreakQuillToTEI(sanitizedWithSpeechparts);
    const speechparts = computeSpeechpartsPointers(sanitizedWithSpeechparts);

    speechparts.forEach(sp => {
      let found = rootState.speechparts.speechparts[sp.index];
      sp.type_id = found.speech_part_type ? found.speech_part_type.id : found.type_id;
      if(found.note) sp.note = found.note;
    });

    const auth = rootGetters['user/authHeader'];
    const data = {
      username: rootState.user.author.username,
      speech_parts: speechparts
    };
    //console.log("saveSpeechparts", speechparts)

    return new Promise( ( resolve, reject ) => {
      return http.post(`documents/${rootState.document.document.id}/transcriptions/alignments/discours`, { data: data }, auth)
        .then( response => {
          if (response.data.errors) {
            console.error("error", response.data.errors);
            reject(response.data.errors);
          }
          else resolve( response.data )
        })
        .catch( error => {
          console.error("error", error);
          reject( error )
        });
    } );
  },
  saveImageAlignments ({ commit, rootState, state, rootGetters }) {


    console.warn('STORE ACTION transcription/saveImageAlignments');

    // compute image alignments pointers
    let sanitizedWithFacsimile = stripSegments(state.transcriptionWithFacsimile);
    sanitizedWithFacsimile = convertLinebreakQuillToTEI(sanitizedWithFacsimile);
    const imageAlignments = computeImageAlignmentsPointers(sanitizedWithFacsimile);
    imageAlignments.forEach(ia => {
      let found = rootGetters['facsimile/getZoneById'](ia.zone_id);
      ia.canvas_idx = found.canvas_idx;
      ia.img_idx = found.img_idx;
    });

    const auth = rootGetters['user/authHeader'];
    const data = {
      username: rootState.user.author.username,
      alignments: imageAlignments
    };

    return new Promise( ( resolve, reject ) => {
      return http.post(`documents/${rootState.document.document.id}/transcriptions/alignments/images`, { data: data }, auth)
        .then( response => {
          if (response.data.errors) {
            console.error("error", response.data.errors);
            reject(response.data.errors);
          }
          else resolve( response.data )
        })
        .catch( error => {
          console.error("error", error);
          reject( error )
        });
    } );
  },
  saveAlignment ({rootState, rootGetters}) {
    console.warn('STORE ACTION transcription/saveAlignment');
    const transcriptionTEI = quillToTEI(state.transcriptionContent);
    const translationTEI = quillToTEI(rootState.translation.translationContent);
    const transcriptionPointers = computeAlignmentPointers(transcriptionTEI);
    const translationPointers = computeAlignmentPointers(translationTEI);
    let pointers = [];
    for (let i = 0; i < Math.max(transcriptionPointers.length, translationPointers.length); ++i) {
      pointers.push([
        ...(transcriptionPointers[i] ? transcriptionPointers[i] : [0,0]),
        ...(translationPointers[i] ? translationPointers[i] : [0,0])
      ]);
    }
    console.log("Alignmant pointers", pointers);
    const auth = rootGetters['user/authHeader'];
    const data = { data: {
        username: rootState.user.author.username,
        ptr_list : pointers,
      }};
    return new Promise( ( resolve, reject ) => {
      http.post(`documents/${rootState.document.document.id}/transcriptions/alignments`, data, auth)
        .then( response => {
          if (response.data.errors) {
            console.error("error", response.data.errors);
            reject(response.data.errors);
          }
          else resolve( response.data )
        })
        .catch( error => {
          console.error("error", error);
          reject( error )
        });
    } );
  },
  */
  changed ({ commit }, deltas) {
    commit('ADD_OPERATION', deltas);
    commit('CHANGED');
    commit('SAVING_STATUS', 'tobesaved')
  },
  reset({commit}) {
    commit('RESET')
  }

};

const getters = {
  isTranscriptionSaved(state) {
    return state.savingStatus === 'uptodate'
  }
};

const transcriptionModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default transcriptionModule;
