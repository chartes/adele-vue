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
      </div>
    </div>
    <div class="debug-box">
      {{ annotation }}
    </div>
  </div>
</template>

<script>

  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.bubble.css';
  import 'quill/dist/quill.snow.css';
  import 'bulma/css/bulma.min.css';

  import EditorMixins from '../../mixins/EditorMixins'

  import {http} from '@/modules/http-common.js'
  import { quillToTEI, TEIToQuill } from '../../modules/quill/MarkupUtils';

  export default {
    name: "TextCutterEditor",
    components: {
    },
    mixins: [EditorMixins],
    props: { id: {type: String, required: true, default: '23'}},
    data() {
      return {
        delta: null,
        annotation: null,
        buttons: {
        },
        storeActions: {
          changed: this.sendTextSelectedEvent
        },
      }
    },
    computed: {

    },
    async mounted () {
      const response = await http.get(`documents/${parseInt(this.id)}/transcriptions`);
      const initialContent = response.data.data.content

      this.initEditor(this.$refs.editor, TEIToQuill(initialContent));
      this.preventKeyboard();
    },
    beforeDestroy () {
      this.allowKeyboard();
    },
    methods: {
      updateContent () {
        this.delta = this.editor.getContents().ops;
      },
      onSelection (range) {
    
        if (range && range.length > 0) {
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
      sendTextSelectedEvent(delta){
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
  annotation {
    background-color: #89c2d9;
    padding: 0.35em;
    border-radius: 5px;
  }
</style>