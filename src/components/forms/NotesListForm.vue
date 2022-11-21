<template>
  <modal-form
    :title="'Choisissez une note'"
    :cancel="cancelAction"
    :submit="submitAction"
    :valid="!!selected"
  >
    <div class="NoteForm">
      <div
        v-for="note in sortedNotes"
        :key="note.id"
        class="notes-list-item"
        :class="{ selected: note.id == selected }"
        :data-note-id="note.id"
        @click="selectItem(note.id)"
      >
        <p
          class="content"
          v-html="note.content"
        />
      </div>
    </div>
  </modal-form>
</template>

<script>

  import { mapState } from 'vuex'
  import ModalForm from './ModalForm';

  export default {
    name: "NoteForm",
    components: {
      ModalForm
    },
    props: ['title', 'noteId', 'cancel', 'submit'],
    data() {
      return {
        selected: null
      }
    },
    computed: {
      ...mapState('notes', ['notes']),
      sortedNotes() {
        return Object.values(this.notes)
          .sort((n1, n2) => n1.content >= n2.content);
      }
    },
    mounted () {
      console.log('NoteListForm mounted', this.noteId)
      this.selected = this.noteId
    },
    methods: {
      selectItem (noteId) {
        this.selected = noteId;
      },
      submitAction () {
        console.log("NotesListForm.submitAction", this.selected)
        this.$props.submit(this.selected);
      },
      cancelAction () {
        this.$props.cancel();
      }
    }
  }
</script>
