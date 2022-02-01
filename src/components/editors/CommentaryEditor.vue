<template>
  <div class="editor-area">
    <div
      ref="controls"
      class="editor-controls"
    >
      <div class="editor-controls-group">
        <label>Structure éditoriale</label>
        <!--
        <editor-button
          :selected="buttons.paragraph"
          :active="editorHasFocus"
          :callback="simpleFormat"
          :format="'paragraph'"
        />
        -->
        <editor-button
          :selected="buttons.list"
          :active="editorHasFocus"
          :callback="simpleFormat"
          :format="'list'"
        />
        <editor-button
          :selected="buttons.blockquote"
          :active="editorHasFocus"
          :callback="simpleFormat"
          :format="'blockquote'"
        />
        <editor-button
          :active="isNoteButtonActive"
          :callback="newNoteChoiceOpen"
          :format="'note'"
        />
      </div>
      <div class="editor-controls-group">
        <label>Enrichissements typographiques</label>
        <editor-button
          :selected="buttons.bold"
          :active="editorHasFocus"
          :callback="simpleFormat"
          :format="'bold'"
        />
        <editor-button
          :selected="buttons.italic"
          :active="editorHasFocus"
          :callback="simpleFormat"
          :format="'italic'"
        />
        <editor-button
          :selected="buttons.superscript"
          :active="editorHasFocus"
          :callback="simpleFormat"
          :format="'superscript'"
        />
        <editor-button
          :selected="buttons.smallcaps"
          :active="editorHasFocus"
          :callback="simpleFormat"
          :format="'smallcaps'"
        />
        <editor-button
          :selected="buttons.underline"
          :active="editorHasFocus"
          :callback="simpleFormat"
          :format="'underline'"
        />
      </div>
      <div class="editor-controls-group">
        <label>Enrichissements sémantiques</label>
        <editor-button
          :selected="buttons.link"
          :active="editorHasFocus"
          :callback="simpleFormat"
          :format="'link'"
        />
        <editor-button
          :selected="buttons.quote"
          :active="editorHasFocus"
          :callback="simpleFormat"
          :format="'quote'"
        />
        <editor-button
          :selected="buttons.cite"
          :active="editorHasFocus"
          :callback="displayCiteForm"
          :format="'cite'"
        />
        <editor-button
          :selected="buttons.person"
          :active="editorHasFocus"
          :callback="displayPersonForm"
          :format="'person'"
        />
        <editor-button
          :selected="buttons.location"
          :active="editorHasFocus"
          :callback="displayLocationForm"
          :format="'location'"
        />
      </div>
    </div>
    <div class="editor-container">
      <div
        id="commentary-editor"
        ref="editor"
        class="quill-editor"
        spellcheck="false"
      />
      <note-actions
        v-show="noteEditMode == null && (defineNewNote || selectedNoteId) && (currentSelection && currentSelection.length > 0)"
        :selected-note-id="selectedNoteId"
        refs="noteActions"
        :style="actionsPosition"
        :new-note="setNoteEditModeNew"
        :edit="setNoteEditModeEdit"
        :update-link="setNoteEditModeList"
        :unlink="unlinkNote"
        :delete="setNoteEditModeDelete"
      />
    </div>

    <notes-list-form
      v-if="noteEditMode == 'list'"
      :note-id="selectedNoteId"
      :submit="updateNoteId"
      :cancel="closeNoteEdit"
    />
    <textfield-form
      v-if="formTextfield"
      :title="formTextfield.title"
      :label="formTextfield.label"
      :value="formTextfield.value"
      :submit="submitTextfieldForm"
      :cancel="cancelTextfieldForm"
      :remove="removeFormat"
    />
    <note-form
      v-if="noteEditMode == 'new' || noteEditMode == 'edit'"
      :title="noteEditMode == 'new' ? 'nouvelle note' : 'Éditer la note'"
      :note="currentNote"
      :note-id="selectedNoteId"
      :submit="updateNote"
      :cancel="closeNoteEdit"
    />
    <modal-confirm-note-delete
      v-if="noteEditMode == 'delete'"
      :cancel="closeNoteEdit"
      :submit="deleteNote"
    />
  </div>
</template>

<script>

  import { mapState } from 'vuex'
  import EditorButton from './EditorButton.vue';
  import EditorMixins from '../../mixins/EditorMixins'
  import EditorNotesMixins from '../../mixins/EditorNotesMixins'
  import NoteActions from './NoteActions';
  import NoteForm from '../forms/NoteForm';
  import NotesListForm from '../forms/NotesListForm';
  import ModalConfirmNoteDelete from '../forms/ModalConfirmNoteDelete';
  import TextfieldForm from "../forms/TextfieldForm";

  const texts = {
    normal: 'Enregistrer les modifications',
    working: 'Enregistrement en cours...',
    success: 'Enregistrement terminé',
    error: 'Enregistrement terminé',
  }

  export default {
    name: "CommentaryEditor",
    components: {
      TextfieldForm,
      EditorButton,
      ModalConfirmNoteDelete,
      NoteActions,
      NotesListForm,
      NoteForm,
    },
    mixins: [EditorMixins, EditorNotesMixins],
    props: ['initialContent', 'type'],
    data() {
      return {
        status: 'normal',
        buttonText: texts.normal,
        storeActions: {
          changed: 'commentaries/changed'
        },
        delta: null,
        buttons: {
          bold: false,
          italic: false,
          superscript: false,
          smallcaps: false,
          underline: false,
          del: false,
          expan: false,
          person: false,
          location: false,
          note: false,
          segment: false,
          //paragraph: false,
          list: false,
          //verse: false,
          blockquote: false,
          cite: false,
        }
      }
    },
        watch: {
          currentSelection() {
            if (this.currentSelection && this.currentSelection.length == 0) {
              this.defineNewNote = false
            }
          }
        },
    mounted () {

      this.initEditor(this.$refs.editor, this.$props.initialContent);

    },
    beforeDestroy () {
      this.deactivateEvents();
    },

    methods: {
/*
      onTextChange (delta, oldDelta, source) {
        this.lastOperations = delta;
        if (this.editorInited) {
          this.$store.dispatch(this.storeActions.changed,
            {type: this.type, content: this.editorContentElement.innerHTML})
        }
      },
*/
      updateContent () {
        this.delta = this.editor.getContents().ops;

      },

    }
  }
</script>