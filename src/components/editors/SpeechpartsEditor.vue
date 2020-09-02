<template>
  <div> 
    <div class="editor-area">
      <div
        ref="controls"
        class="editor-controls"
      >
        <div class="editor-controls-group">
          <!--
          <label>Structure éditoriale</label>
          <editor-button
            :active="isSpeechpartButtonActive"
            :callback="setSpeechpartEditModeNew"
            :format="'speechpart'"
          />
          -->
        </div>
      </div>
      <div class="editor-container">
        <div
          ref="editor"
          class="quill-editor"
          spellcheck="false"
        />
        <in-editor-actions
          v-show="selectedSpeechpartId !== null && editor.hasFocus()"
          class="speechpart-actions"
          :style="actionsPosition"
          refs="speechpartActions"
          :edit="setSpeechpartEditModeEdit"
          :delete="setSpeechpartEditModeDelete"
          :edit-text="'Éditer'"
          :delete-text="'Supprimer'"
        />
      </div>

      <speechpart-form
        v-if="selectedSpeechpartId !== null && (speechpartEditMode === 'new' || speechpartEditMode === 'edit')"
        :speechpart="currentSpeechpart"
        :speechpart-id="selectedSpeechpartId"
        :submit="updateSpeechpart"
        :cancel="closeSpeechpartEdit"
      />
      <modal-confirm-speechpart-delete
        v-if="speechpartEditMode === 'delete'"
        :cancel="closeSpeechpartEdit"
        :submit="deleteSpeechpart"
      />
    </div>
  </div>
</template>

<script>

  import { mapGetters, mapState } from 'vuex';
  import EditorButton from './EditorButton.vue';
  import EditorMixins from '../../mixins/EditorMixins'
  import InEditorActions from './InEditorActions';
  import SpeechpartForm from "../forms/SpeechpartForm";
  import ModalConfirmSpeechpartDelete from "../forms/ModalConfirmSpeechpartDelete";

  export default {
    name: "SpeechpartsEditior",
    components: {
      ModalConfirmSpeechpartDelete,
      SpeechpartForm,
      InEditorActions,
      //EditorButton,
    },
    mixins: [EditorMixins],
    props: ['initialContent'],
    data() {
      return {
        storeActions: {
          changed: 'transcription/changed'
        },
        delta: null,
        speechpartEditMode: null,
        selectedSpeechpartId: null,
        currentSpeechpart: null,
        defineNewSpeechpart: false,
        buttons: {
          //speechpart: false,
        }
      }
    },
    watch: {

    },
    mounted () {
      this.$store.dispatch('speechpartTypes/fetch')

      this.initEditor(this.$refs.editor, this.$props.initialContent);
      this.preventKeyboard();
      this.activateMouseOver()

    },
    beforeDestroy () {
      this.allowKeyboard();
      this.deactivateMouseOver();
    },
    methods: {

      updateContent () {
        this.delta = this.editor.getContents().ops;

      },
      /*
      updateButtons (formats) {
        for (let key in this.buttons) {
          this.buttons[key] = !!formats[key];
        }
      },
      */
      onSelection (range) {
        if (range && range.length > 0) {
          this.setRangeBound(range);
          let formats = this.editor.getFormat(range.index, range.length);
          console.log(formats);
          //this.updateButtons(formats);
          if (formats.speechpart) {
            this.onSpeechpartSelected(formats.speechpart, range);
            //this.buttons.speechpart = false;
          } else {
            this.selectedSpeechpartId = range.index;
            //this.buttons.speechpart = true;
          }
        } else if (this.editor.hasFocus()){
          this.selectedSpeechpartId = null
        }
      },
      onSpeechpartSelected (speechpart, range) {
        if (!range.length) return;
        this.selectedSpeechpartId = speechpart;
      },

      updateSpeechpart(sp) {
        const isNewSpeechpart = this.speechpartEditMode === 'new';
        const action = isNewSpeechpart ? 'add' : 'update';
        sp.speech_part_type = this.getSpeechpartTypeById(sp.type_id);
        sp.ptr_start = this.selectedSpeechpartId;
        this.editor.format('speechpart', sp.ptr_start.toString());
        this.$store.dispatch(`speechparts/${action}`, sp)
        this.closeSpeechpartEdit()
      },
      deleteSpeechpart() {
        this.editor.format('speechpart', false);
        this.selectedSpeechpartId = null;
        this.closeSpeechpartEdit();
        this.$store.dispatch(`speechparts/setToBeSaved`)
      },


      setSpeechpartEditModeDelete() {
        this.speechpartEditMode = 'delete';
      },
      setSpeechpartEditModeNew() {
        this.speechpartEditMode = 'new';
        this.currentSpeechpart = { transcription_id: this.transcription.id };
        this.newSpeechpartChoiceClose();
      },
      setSpeechpartEditModeEdit() {
        this.speechpartEditMode = 'edit';
        this.currentSpeechpart = this.$store.state.speechparts.speechparts[this.selectedSpeechpartId];
        if (!this.currentSpeechpart) {
                  this.currentSpeechpart = { transcription_id: this.transcription.id };
        }
      },

      newSpeechpartChoiceClose() {
        this.defineNewSpeechpart = false;
        this.selectedSpeechpartId = null
      },

      closeSpeechpartEdit() {
        this.speechpartEditMode = null;
        this.currentSpeechpart = null;
        this.selectedSpeechpartId = null
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
        if (event.keyCode < 37 || event.keyCode > 40) {
          event.preventDefault();
        }
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
      },

    },

    computed: {
      /*
      isSpeechpartButtonActive () {
        const cond = this.editorHasFocus && this.buttons.speechpart;
        return cond;
      },
      */
      ...mapState('transcription', ['transcription']),
      ...mapState('speechparts', ['newSpeechpart']),
      ...mapGetters('speechpartTypes', ['getSpeechpartTypeById']),
    }
  }
</script>