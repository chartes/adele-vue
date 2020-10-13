<template>
  <div class="editor-area">
    <div
      ref="controls"
      class="editor-controls"
    >
      <div
        v-if="!transcriptionAlignmentMode"
        class="editor-controls-group"
      >
        <label>Structure éditoriale</label>
        <!--
        <editor-button
          :selected="buttons.paragraph"
          :active="editorHasFocus"
          :callback="simpleFormat"
          :format="'paragraph'"
        />
        <editor-button
          :selected="buttons.verse"
          :active="editorHasFocus"
          :callback="simpleFormat"
          :format="'verse'"
        />
        -->
        <editor-button
          :active="isNoteButtonActive"
          :callback="newNoteChoiceOpen"
          :format="'note'"
        />
      </div>
      <div
        v-if="!transcriptionAlignmentMode"
        class="editor-controls-group"
      >
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
      <div
        v-if="!transcriptionAlignmentMode"
        class="editor-controls-group"
      >
        <label>Enrichissements sémantiques</label>
        <editor-button
          :selected="buttons.del"
          :active="editorHasFocus"
          :callback="simpleFormat"
          :format="'del'"
        />
        <editor-button
          :selected="buttons.expan"
          :active="editorHasFocus"
          :callback="simpleFormat"
          :format="'expan'"
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
        id="translation-editor"
        ref="editor"
        class="quill-editor translation-editor"
        spellcheck="false"
      />
      <note-actions
        v-if="!transcriptionAlignmentMode"
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
    <div v-if="!transcriptionAlignmentMode">
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
      />
      <note-form
        v-if="noteEditMode == 'new' || noteEditMode == 'edit'"
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
  </div>
</template>

<script>

  import {mapState} from 'vuex';

  import Quill from '../../modules/quill/AdeleQuill';
  import EditorButton from './EditorButton.vue';
  import EditorMixins from '../../mixins/EditorMixins'
  import EditorNotesMixins from '../../mixins/EditorNotesMixins'
  //import InEditorActions from './InEditorActions';
  import NoteActions from './NoteActions';
  import NoteForm from '../forms/NoteForm';
  import NotesListForm from '../forms/NotesListForm';
  import ModalConfirmNoteDelete from '../forms/ModalConfirmNoteDelete';
  //import SaveBar from "../ui/SaveBar";
  import TextfieldForm from "../forms/TextfieldForm";
  import SegmentBlot from '../../modules/quill/blots/semantic/Segment';

  export default {
    name: "TranslationEditor",
    components: {
      TextfieldForm,
      //SaveBar,
      //InEditorActions,
      EditorButton,
      ModalConfirmNoteDelete,
      NoteActions,
      NotesListForm,
      NoteForm,
    },
    mixins: [EditorMixins, EditorNotesMixins],
    props: ['initialContent'],
    data() {
      return {
        storeActions: {
          save: 'translation/save',
          changed: 'translation/changed'
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
        }
      }
    },
    computed: {
      ...mapState('workflow', ['transcriptionAlignmentMode']),
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

      if (this.transcriptionAlignmentMode) {
        this.editor.root.addEventListener('click', (ev) => {
          let segment = Quill.find(ev.target);
          if (segment && segment instanceof SegmentBlot) {
            this.editor.deleteText(segment.offset(this.editor.scroll), 1)
            this.$store.dispatch('transcription/textAlignmentsNeedToBeSaved')
          } else {
            const range = this.editor.getSelection()
            if (range && range.length === 0) {
              this.insertSegment('segment')
              this.$store.dispatch('transcription/textAlignmentsNeedToBeSaved')
            }
          }
        });
      }
    },
    methods: {
      updateContent () {
        this.delta = this.editor.getContents().ops;
      }
    }
  }
</script>