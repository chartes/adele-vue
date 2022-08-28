var EditorNotesMixin = {

  data() {
    return {
      selectedNoteId: null,
      currentNote: null,
      noteEditMode: null,
      defineNewNote: false,
    }
  },

  methods: {

    onNoteSelected (note, range) {
      if (!range.length) return;
      this.selectedNoteId = note;
      //var deltas = this.editor.getContents().ops;
      //var length = deltas.length;
    },

    updateNoteId(newId) {
      this.editor.format('note', newId);
      this.selectedNoteId = newId;
      this.closeNoteEdit();
    },
    updateNote(note) {
      const isNewNote = this.noteEditMode === 'new'
      const store = this.$route.params['section'];
      const action = isNewNote ? `${store}/insertNote` : `${store}/updateNote`

      // set note missing data (ptrs)
      note.ptr_start = this.currentSelection.index
      note.ptr_end = note.ptr_start + this.currentSelection.length

      if (isNewNote) {
        // generate a temporary unique-ish id to avoid duplicates before saving
        note.id = 0 - new Date().getTime()
      }
      // update the shadow quill content
      this.$store.dispatch(action, note).then((response)=>{
        if (isNewNote) {
          // finally, format the selection in the editor
          this.updateNoteId(response.id)
        } else {
          this.closeNoteEdit()
        }
      })
    },
    unlinkNote() {
      //console.log('unlinkNote')
      this.editor.format('note', false);
      this.selectedNoteId = null;
    },
    async deleteNote() {
      //console.log('deleteNote')
      // TODO delete note
      this.editor.format('note', false);
      
      await this.$store.dispatch('notes/deleteNote', this.selectedNoteId)

      await this.$store.dispatch('transcription/saveTranscription')
      await this.$store.dispatch('translation/saveTranslation')
      await this.$store.dispatch('commentaries/saveCommentaries')

      //await this.$store.dispatch('transcription/fetchTranscriptionContent')
      //await this.$store.dispatch('translation/fetchTranslationContent')
      //await this.$store.dispatch('commentaries/fetchCommentariesContent')
      
      this.selectedNoteId = null;
      this.closeNoteEdit();
    },

    setNoteEditModeList() {
      this.noteEditMode = 'list';
      this.newNoteChoiceClose();
    },
    setNoteEditModeDelete() {
      this.noteEditMode = 'delete';
    },
    setNoteEditModeNew() {
      this.noteEditMode = 'new';
      this.newNoteChoiceClose();
    },
    setNoteEditModeEdit() {
      this.noteEditMode = 'edit';
      this.currentNote = this.$store.getters['notes/getNoteById'](this.selectedNoteId)
    },
    closeNoteEdit() {
     //console.log("closeNoteEdit")
      this.noteEditMode = null;
      this.currentNote = null;
      this.editor.blur();
      this.selectedNoteId = null;
      this.defineNewNote = false;
    },
    newNoteChoiceOpen() {
      this.defineNewNote = true;
    },
    newNoteChoiceClose() {
      this.defineNewNote = false;
    },


  },

  computed: {
    isNoteButtonActive () {
      const cond = this.editorHasFocus && this.buttons.note;
      return cond;
    }
  }

}


export default EditorNotesMixin;