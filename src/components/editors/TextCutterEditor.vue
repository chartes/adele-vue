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
        :disabled="!isTextSelected"
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
  </div>
</template>

<script>

  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.bubble.css';
  import 'quill/dist/quill.snow.css';
  //import 'bulma/css/bulma.min.css';

  import EditorMixins from '../../mixins/EditorMixins'

  import {http} from '@/modules/http-common.js'

  export default {
    name: "TextCutterEditor",
    components: {
    },
    mixins: [EditorMixins],
    props: { id: {type: Number, required: true, default: 23}},
    data() {
      return {
        motivation: 'describing',
        buttons: {
        },
        storeActions: {
          changed: "transcription/changed"
        },
        isTextSelected: false,
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
      this.preventKeyboard();
      document.addEventListener("annotation-created", this.onAnnotationCreation);
      document.addEventListener("annotations-changed", this.init);
    },
    beforeDestroy () {
      this.allowKeyboard();
    },
    methods: {
      async init() {
        this.isTextSelected = false

        const response = await http.get(`documents/${this.id}/transcriptions`);
        const initialContent = response.data.data.content

        this.$refs.editor.innerHTML = ''
        this.initEditor(this.$refs.editor, initialContent);
        this.editor.on('selection-change', this.onSelection);
      },
      onSelection (range) {
        if (range && range.length > 0 && this.motivation === "describing") {
          this.setRangeBound(range);
          this.editor.format('annotation', {new: true});
          this.isTextSelected = true;
        }
      },
      onAnnotationCreation (event) {
        const annotationData = event.detail;
        const contents = this.editor.getContents();
        const newOps = contents.ops.map((op) => {
          if(op.attributes && op.attributes.annotation && op.attributes.annotation.new) {
            const {annotation, ...attrs} = op.attributes;
            return {...op, attributes: {...attrs, annotation: annotationData}}
          }
          return op
        });
        this.editor.setContents({ops: newOps});
        this.$store.dispatch('transcription/saveTranscription');
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
  adele-annotation {
    background-color: #89c2d9;
    padding: 0.35em;
    border-radius: 5px;
  }
</style>
