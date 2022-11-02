<template>
  <div class="text-cutter"> 
    <div style="display: flex; justify-content: space-between ">
      <b-field>
        <b-radio-button
          v-model="motivation"
          native-value="describing"
          type="is-primary is-light is-outlined"
        >
          <b-icon
            pack="fas"
            icon="align-justify"
          />
          <span>Transcription</span>
        </b-radio-button>

        <b-radio-button
          v-model="motivation"
          native-value="commenting"
          type="is-info is-light is-outlined"
        >
          <b-icon
            pack="fas"
            icon="comment-dots"
          />
          <span>Commentaire libre</span>
        </b-radio-button>
      </b-field>

      <button
        v-show="motivation === 'describing'"
        :disabled="!annotation"
        class="button is-primary is-outlined"
        ml-3
        @click="init"
      >
        Effacer la sélection
      </button>
    </div>

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
      </div>
    </div>
    <div class="debug-box">
      {{ annotation }}
      <input
        id="ptr-start"
        type="hidden"
        :value="annotation ? annotation.ptr_start : null"
      >
      <input
        id="ptr-end"
        type="hidden"
        :value="annotation ? annotation.ptr_end : null"
      >
    </div>
  </div>
</template>

<script>

  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.bubble.css';
  import 'quill/dist/quill.snow.css';
  //import 'bulma/css/bulma.min.css';

  import EditorMixins from '../../mixins/EditorMixins'

  import {http} from '@/modules/http-common.js'
  import { quillToTEI, TEIToQuill } from '../../modules/quill/MarkupUtils';

  export default {
    name: "TextCutterEditor",
    components: {
    },
    mixins: [EditorMixins],
    props: { id: {type: Number, required: true, default: 23}},
    data() {
      return {
        delta: null,
        annotation: null,
        motivation: 'describing',
        buttons: {
        },
        storeActions: {
          changed: this.sendTextSelectedEvent
        },
      }
    },
    computed: {

    },
    watch: {
      motivation() {
        const commInputEl = document.querySelector('.mirador-companion-area-right').querySelectorAll('.MuiGrid-container')[2];
        if (this.motivation === 'commenting') {
          this.init()
          commInputEl.classList.remove('hide-input')
        } else {
          commInputEl.classList.add('hide-input')
        }
      }
    },
    mounted () {
      this.init();
      document.addEventListener('annotation-changed', this.init, false);
      this.preventKeyboard();
    },
    beforeDestroy () {
      this.allowKeyboard();
    },
    methods: {
      async init() {
        this.annotation = null
        this.delta = null

        const response = await http.get(`documents/${this.id}/transcriptions`);
        const initialContent = response.data.data.content

        this.$refs.editor.innerHTML = ''
        this.initEditor(this.$refs.editor, TEIToQuill(initialContent));
      },
      updateContent () {
        this.delta = this.editor.getContents().ops;
      },
      onSelection (range) {
    
        if (range && range.length > 0 && this.motivation === "describing") {
          this.setRangeBound(range);
          let formats = this.editor.getFormat(range.index, range.length);
          if (formats.annotation) {
            //deselect
            this.editor.format('annotation', false);
            // but if mutiple segments are created, cancel
            const quillContent = this.getEditorHTML()
            const count = (quillContent.match(/<annotation>/g) || []).length
            if (count > 1) {
               this.editor.format('annotation', true);
            }
          } else {
            //console.log("UPDATE ANNOTATION SEGMENT", {ptr_start: range.index})
            this.editor.format('annotation', true);
            if (document.querySelectorAll('annotation').length > 1) {
              // forbid more than one
              this.editor.format('annotation', false);
            }
          }
        } 
      },
      sendTextSelectedEvent({delta}){
        const quillContent = this.getEditorHTML()
        const annotations = this.computeAnnotationPointers(quillToTEI(quillContent))
        if (annotations) {
          this.annotation = annotations[0]
          const payload = {docId: this.id, ...this.annotation}
          console.log("payload:", payload)
          document.dispatchEvent(new CustomEvent('text-selected', payload))
          this.editor.blur();
        }
      },

      computeAnnotationPointers (htmlWithAnnotations){
        const regexpStart = /<annotation>/;
        const regexpEnd = /<\/annotation>/;
        let resStart, resEnd;
        const annotations = [];
        //console.log(htmlWithAnnotations)
        while((resStart = regexpStart.exec(htmlWithAnnotations)) !== null) {
          htmlWithAnnotations = htmlWithAnnotations.replace(regexpStart, '');
          resEnd = regexpEnd.exec(htmlWithAnnotations);
          htmlWithAnnotations = htmlWithAnnotations.replace(regexpEnd, '');

          annotations.push({
            "ptr_start": resStart.index,
            "ptr_end": resEnd.index
          });
        }
        return annotations;
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
    }
  }
</script>


<style>
  .hide-input {
    display: none !important;
  }
  .text-cutter {
    margin-top: 8px;
    min-height: 800px;
  }
  .debug-box {
    display: none;
    border: 1px dotted violet;
    width: 100%;
    height: 100px;
  }
  annotation {
    background-color: #89c2d9;
    padding: 0.35em;
    border-radius: 5px;
  }
</style>
