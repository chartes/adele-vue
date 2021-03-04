<template>
  <div class="text-cutter"> 
    <div class="editor-area">
      <div
        ref="controls"
        class="editor-controls"
      />
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
    </div>
    <div class="debug-box">
      {{ selectedSpeechpartId }}
    </div>
  </div>
</template>

<script>

  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.bubble.css';
  import 'quill/dist/quill.snow.css';
  import 'bulma/css/bulma.min.css';

  import EditorMixins from '../../mixins/EditorMixins'
  import InEditorActions from './InEditorActions';

  import {http} from '@/modules/http-common.js'

  export default {
    name: "TextCutterEditor",
    components: {
      InEditorActions,
    },
    mixins: [EditorMixins],
    props: { initialContent: {type: String, default: '<p>hello world</p>'}},
    data() {
      return {
        selection: null,
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
    computed: {

    },
    async mounted () {
      //this.$store.dispatch('speechpartTypes/fetch')
      const response = await http.get(`documents/23/transcriptions/from-user/1010`);
      console.log('initial content', response)
      const initialContent = response.data.data.content

      this.initEditor(this.$refs.editor, initialContent);
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
      onSelection (range) {
        this.currentSpeechpart = null

        if (range && range.length > 0) {
          this.setRangeBound(range);
          let formats = this.editor.getFormat(range.index, range.length);
          console.log(formats);
          //this.updateButtons(formats);
          if (formats.speechpart) {
            this.onSpeechpartSelected(formats.speechpart, range);
            const spId = formats.speechpart.split(',')[0]
            const sp = this.speechparts.find(e => e.id === parseInt(spId))
            console.log("ID SP", sp)
            this.currentSpeechpart = sp
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
        //console.log("onspeechpart selected", speechpart, range)
        if (!range.length) return;
        this.selectedSpeechpartId = range.index;
        
      },

      updateSpeechpart(sp) {
        console.log("UPDATE SP", sp)
        sp.speech_part_type = this.getSpeechpartTypeById(sp.type_id);
        sp.ptr_start = this.selectedSpeechpartId;
        if (sp.id === undefined) {
          sp.id = 900000+sp.ptr_start
        }
        this.editor.format('speechpart', `${sp.id},${sp.speech_part_type.id}`);
        //this.$store.dispatch(`speechparts/update`, sp)
        //this.$store.dispatch('speechparts/saveSpeechParts')
        this.closeSpeechpartEdit()
      },
      deleteSpeechpart() {
        //console.log("this.currentSpeechpart", this.currentSpeechpart)
        //this.$store.dispatch(`speechparts/delete`, this.currentSpeechpart.id)
        this.editor.format('speechpart', false);

        this.selectedSpeechpartId = null;
        this.currentSpeechpart = { transcription_id: this.transcription.id };

        this.closeSpeechpartEdit();
        //this.$store.dispatch(`speechparts/setToBeSaved`)
        //this.$store.dispatch('speechparts/saveSpeechParts')
      },


      setSpeechpartEditModeDelete() {
        //this.currentSpeechpart = this.$store.state.speechparts.speechparts[this.selectedSpeechpartId];
        this.speechpartEditMode = 'delete';
      },
      setSpeechpartEditModeNew() {
        this.speechpartEditMode = 'new';
        this.currentSpeechpart = { transcription_id: this.transcription.id };
        this.newSpeechpartChoiceClose();
      },
      setSpeechpartEditModeEdit() {
        this.speechpartEditMode = 'edit';
        //this.currentSpeechpart = this.$store.state.speechparts.speechparts[this.selectedSpeechpartId];
        /*
       if (!this.currentSpeechpart) {
          this.currentSpeechpart = { transcription_id: this.transcription.id };
        }
        */
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
      }
    }
  }
</script>


<style lang="scss" scoped>
  .text-cutter {
    border: 1px solid orangered;
    margin: 0 auto;
    width: 50%;
    height: 500px;
  }
  .debug-box {
    border: 1px dotted violet;
    width: 100%;
    height: 100px;
  }
</style>