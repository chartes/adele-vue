<template>
  <modal-form
    :title="'Choisissez une note'"
    :cancel="cancelAction"
    :submit="submitAction"
    :valid="!!selected"
  >
    <div class="NoteForm">
      <div
        v-for="note in notes"
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

  import { mapGetters } from 'vuex'
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
    },
    computed: {
      ...mapGetters('notes', ['notes'])
    }
  }
</script>
