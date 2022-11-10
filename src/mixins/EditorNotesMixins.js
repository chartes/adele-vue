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
      if (Array.isArray(note)) {
        note = note[0]
      }
      this.selectedNoteId = note.id;
      //var deltas = this.editor.getContents().ops;
      //var length = deltas.length;
    },

    updateNoteId(newId) {
      this.editor.format('note', {id: newId});
      this.selectedNoteId = newId;
      this.closeNoteEdit();
    },
    updateNote(note) {
      const isNewNote = this.noteEditMode === 'new'
      const action = isNewNote ? `notes/createNote` : `notes/updateNote`

      // update the shadow quill content
      this.$store.dispatch(action, note).then((updatedNote)=>{
        if (isNewNote) {
          // finally, format the selection in the editor
          this.updateNoteId(updatedNote.id)
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
    /**
     * Deletes the note from backend and update loaded contents to remove
     * corresponding tags.
     */
    async deleteNote() {
      await this.$store.dispatch('notes/deleteNote', this.selectedNoteId)
      const contents = this.editor.getContents();
      const newOps = contents.ops.map((op) => {
        if(op.attributes && op.attributes.note && op.attributes.note.id === this.selectedNoteId) {
          const {note, ...attrs} = op.attributes;
          return {...op, attributes: attrs}
        }
        return op
      })
      this.editor.setContents({ops: newOps})
      // await this.$store.dispatch('translation/deleteNote', noteId)
      // await this.$store.dispatch('commentaries/deleteNote', noteId)
      // The note must be deleted only once no-one is referencing it

      // await this.$store.dispatch('transcription/fetchTranscriptionContent')
      // await this.$store.dispatch('translation/fetchTranslationContent')
      // await this.$store.dispatch('commentaries/fetchCommentariesContent')
      
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
      this.currentNote = this.$store.state.notes.notes[this.selectedNoteId]
      console.log(this.currentNote)
      console.log(this.selectedNoteId)
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
