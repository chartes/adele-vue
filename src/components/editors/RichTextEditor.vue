<template>
  <div class="editor-area">
    <div
      v-if="currentSection !== 'speech-parts'"
      ref="controls"
      class="editor-controls"
    >
      <div
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
      
        <!-- commentaries only; list, blockquote -->
        <editor-button
          v-if="currentSection === 'commentaries'"
          :selected="buttons.list"
          :active="editorHasFocus"
          :callback="simpleFormat"
          format="list"
        />
        <editor-button
          v-if="currentSection === 'commentaries'"
          :selected="buttons.blockquote"
          :active="editorHasFocus"
          :callback="simpleFormat"
          format="blockquote"
        />
        <editor-button
          :selected="buttons.note"
          :active="editorHasFocus"
          :callback="newNoteChoiceOpen"
          format="note"
        />
      </div>
      <div
        class="editor-controls-group"
      >
        <label>Enrichissements typographiques</label>
        <editor-button
          :selected="buttons.bold"
          :active="editorHasFocus"
          :callback="simpleFormat"
          format="bold"
        />
        <editor-button
          :selected="buttons.italic"
          :active="editorHasFocus"
          :callback="simpleFormat"
          format="italic"
        />
        <editor-button
          :selected="buttons.smallcaps"
          :active="editorHasFocus"
          :callback="simpleFormat"
          format="smallcaps"
        />
        <editor-button
          :selected="buttons.superscript"
          :active="editorHasFocus"
          :callback="simpleFormat"
          format="superscript"
        />
        <editor-button
          :selected="buttons.underline"
          :active="editorHasFocus"
          :callback="simpleFormat"
          format="underline"
        />
      </div>
      <div
        class="editor-controls-group"
      >
        <label>Enrichissements sémantiques</label>
        <editor-button
          :selected="buttons.del"
          :active="editorHasFocus"
          :callback="simpleFormat"
          format="del"
        />
        <editor-button
          :selected="buttons.expan"
          :active="editorHasFocus"
          :callback="simpleFormat"
          format="expan"
        />

        <!-- commentaries only: link, quote, cite -->
        <editor-button
          v-if="currentSection === 'commentaries'"
          :selected="buttons.link"
          :active="editorHasFocus"
          :callback="simpleFormat"
          format="link"
        />
        <editor-button
          v-if="currentSection === 'commentaries'"
          :selected="buttons.quote"
          :active="editorHasFocus"
          :callback="simpleFormat"
          format="quote"
        />
        <editor-button
          v-if="currentSection === 'commentaries'"
          :selected="buttons.cite"
          :active="editorHasFocus"
          :callback="displayCiteForm"
          format="cite"
        />

        <editor-button
          :selected="buttons.person"
          :active="editorHasFocus"
          :callback="displayPersonForm"
          format="person"
        />
        <editor-button
          :selected="buttons.location"
          :active="editorHasFocus"
          :callback="displayLocationForm"
          format="location"
        />
      </div>
      <div
        class="editor-controls-group"
      >
        <label>Segments</label>
        <editor-button
          :selected="buttons.segment"
          :active="currentSelection && currentSelection.length === 0 && currentSelection.index > 0"
          :callback="insertSegment"
          format="segment"
        />
      </div>
    </div>
    <div class="editor-container">
      <div
        id="transcription-editor"
        ref="editor"
        class="quill-editor transcription-editor"
        spellcheck="false"
      />
      <note-actions
        v-show="noteEditMode === null && (defineNewNote || selectedNoteId) && (currentSelection && currentSelection.length > 0)"
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
    <div>
      <notes-list-form
        v-if="noteEditMode === 'list'"
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
        v-if="noteEditMode === 'new' || noteEditMode === 'edit'"
        :title="noteEditMode === 'new' ? 'nouvelle note' : 'Éditer la note'"
        :note="currentNote"
        :note-id="selectedNoteId"
        :submit="updateNote"
        :cancel="closeNoteEdit"
      />
      <modal-confirm-note-delete
        v-if="noteEditMode === 'delete'"
        :cancel="closeNoteEdit"
        :submit="deleteNote"
      />
      <div v-if="currentSection === 'speech-parts'">
        <speechpart-form
          v-if="editedSpeechPart"
          :edited-speech-part="editedSpeechPart"
          :submit="updateSpeechpart"
          :cancel="closeSpeechpartEdit"
        />
        <modal-confirm-speechpart-delete
          v-if="confirmingSpeechPartDeletion"
          :cancel="closeSpeechpartEdit"
          :submit="deleteSpeechpart"
        />
        <in-editor-actions
          v-show="!editedSpeechPart && !confirmingSpeechPartDeletion && currentSelection && currentSelection.length > 0"
          class="speechpart-actions"
          :style="actionsPosition"
          refs="speechpartActions"
          :edit="setEditedSpeechPart"
          :delete="confirmSpeechPartDeletion"
          :edit-text="'Éditer'"
          :delete-text="'Supprimer'"
        />
      </div>
    </div>
  </div>
</template>

<script>

import Quill from 'quill';
    
import { mapState, mapGetters } from 'vuex'
import EditorButton from './EditorButton.vue';

import EditorMixins from '../../mixins/EditorMixins'
import EditorNotesMixins from '../../mixins/EditorNotesMixins'

import NoteActions from './NoteActions';
import NoteForm from '../forms/NoteForm';
import NotesListForm from '../forms/NotesListForm';
import ModalConfirmNoteDelete from '../forms/ModalConfirmNoteDelete';

import TextfieldForm from "../forms/TextfieldForm";

import InEditorActions from './InEditorActions';
import SpeechpartForm from "../forms/SpeechpartForm";
import ModalConfirmSpeechpartDelete from "../forms/ModalConfirmSpeechpartDelete";

import SegmentBlot from "../../modules/quill/blots/semantic/Segment";


export default {
  name: "RichTextEditor",
  components: {
    TextfieldForm,
 
    EditorButton,
    ModalConfirmNoteDelete,
    NoteActions,
    NotesListForm,
    NoteForm,

    ModalConfirmSpeechpartDelete,
    SpeechpartForm,
    InEditorActions,
  },
  mixins: [EditorMixins, EditorNotesMixins],
  props: {
    initialContent: {type: String, default: ''},
    changeAction: {type: String, required: true}
  },
  data() {
    return {
      storeActions: {
        changed: this.$props.changeAction
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
        list: false,
        blockquote: false,
        quote: false,
        link: false,
        cite: false,
      },
      // speechparts
      editedSpeechPart: null,
      confirmingSpeechPartDeletion: false,
    }
  },
  computed: {
    ...mapState('workflow', [ 'currentSection']),
    ...mapState('speechparts', ['newSpeechpart', 'speechparts']),
    ...mapGetters('speechpartTypes', ['getSpeechpartTypeById']),
  },
  watch: {
    currentSelection() {
      if (this.currentSelection && this.currentSelection.length == 0) {
        this.defineNewNote = false
      }
    }
  },
  created() {
    this.$store.dispatch('speechpartTypes/fetch')
  },
  beforeDestroy () {
    this.allowKeyboard();
    this.deactivateMouseOver();
  },
  mounted () {
    this.initEditor(this.$refs.editor, this.$props.initialContent);
    this.preventKeyboard();
    this.activateMouseOver();
    document.addEventListener("click", (e) => {
        const foundBlot = Quill.find(e.target)
        if (foundBlot && foundBlot instanceof SegmentBlot) {
          this.editor.deleteText(foundBlot.offset(this.editor.scroll), 1)
        }
      }
    )
  },
  methods: {
    updateContent () {
      this.delta = this.editor.getContents().ops;
    },
    
      updateSpeechpart(sp) {
        this.editor.format('speechpart', sp);
        this.closeSpeechpartEdit()
      },
      deleteSpeechpart() {
        this.editor.format('speechpart', false);
        this.closeSpeechpartEdit();
      },

      confirmSpeechPartDeletion() {
        this.confirmingSpeechPartDeletion = true;
      },

      setEditedSpeechPart() {
        const range = this.editor.getSelection();
        const speechPartsInRange = this.editor.getFormat(range).speechpart;
        if (speechPartsInRange === undefined) {
          this.editedSpeechPart = { type_id: 1, note: ""}
        } else if (Array.isArray(speechPartsInRange)) {
          this.editedSpeechPart = {...speechPartsInRange[0]}
        } else {
          this.editedSpeechPart = {...speechPartsInRange}
        }
      },

      closeSpeechpartEdit() {
        this.editedSpeechPart = null;
        this.confirmingSpeechPartDeletion = false;
        this.editor.focus();
      },


       /*
        Prevent keyboard methods
       */
      preventKeyboard () {
        document.addEventListener('keydown', this.keyboardPreventHandler, true)
      },
      allowKeyboard () {
        document.removeEventListener('keydown', this.keyboardPreventHandler, true)

      },
      keyboardPreventHandler (event) {
        if (!this.editor.hasFocus()) return;
        /*
        if (event.keyCode < 37 || event.keyCode > 40) {
          event.preventDefault();
        }
        */
      },

      /* Speechpart mouse over */
      activateMouseOver () {
        this.$refs.editor.addEventListener('mouseover', this.mouseOverHandler)
        this.$refs.editor.addEventListener('mouseout', this.mouseOutHandler)
        //.querySelectorAll('speechpart')
      },
      deactivateMouseOver () {

        this.$refs.editor.removeEventListener('mouseover', this.mouseOverHandler)
        this.$refs.editor.removeEventListener('mouseout', this.mouseOutHandler)
      },
      mouseOverHandler (e) {
        let id = null;
        if (e.target.tagName.toLowerCase() === 'speechpart') {
          id = parseInt(e.target.getAttribute('id'));
        } else if (e.target.parentNode.tagName.toLowerCase() === 'speechpart') {
          id = parseInt(e.target.parentNode.getAttribute('id'));
        }
        if (id === null) return;
        //this.$store.dispatch('speechparts/mouseover', {speechpart: this.$store.state.speechparts.speechparts[id], posY: e.clientY});

      },
      mouseOutHandler (e) {
        //this.$store.dispatch('speechparts/mouseover', {speechpart: false, posY: 0});
      }
  }
}
</script>
