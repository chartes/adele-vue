<template>
  <modal-form
    :title="title"
    :cancel="cancelAction"
    :submit="submitAction"
    :valid="textLength > 1"
    :submittin="null"
  >
    <div class="NoteForm">
      <form @submit.prevent="">
        <div class="field">
          <p class="control">
            <label class="label">Contenu</label>
          </p>
          <div class="editor-area">
            <!--
            <div
              ref="controls"
              class="editor-controls"
            >
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
              <editor-button
                :selected="buttons.del"
                :active="editorHasFocus"
                :callback="simpleFormat"
                :format="'del'"
              />
            </div>
            -->
            <div
              ref="editor"
              class="quill-editor"
              spellcheck="false"
            />
          </div>
        </div>
      </form>
    </div>
  </modal-form>
</template>

<script>

  import {getNewQuill} from '../../modules/quill/AdeleQuill';
  import EditorMixins from '../../mixins/EditorMixins'
  import { mapGetters } from 'vuex';
  import ModalForm from './ModalForm';
  //import EditorButton from '../editors/EditorButton.vue';

  export default {
    name: "NoteForm",
    components: {
      //EditorButton,
      ModalForm
    },
    mixins: [EditorMixins],
    props: ['title', 'noteId', 'note', 'cancel', 'submit'],
    data() {
      return {
        form: Object.assign({}, this.note),
        textLength: 0,
        editor: null,
        buttons: {
          bold: false,
          italic: false,
          superscript: false,
          smallcaps: false,
          underline: false,
          del: false,
        },
        loading: false,
      }
    },
    mounted () {
      this.$refs.editor.innerHTML = this.$props.note ? this.$props.note.content : '';
      this.editor = getNewQuill(this.$refs.editor);
      this.editor.on('selection-change', this.onSelection);
      this.editor.on('selection-change', this.onFocus);
      this.editor.on('text-change', this.onTextChange);
      this.textLength = this.editor.getLength();
      this.editor.focus()
    },
    methods: {

      onSelectChange (typeId) {
        this.form.type_id = typeId;
      },
      onTextChange () {
        this.textLength = this.editor.getLength();
        this.form.content = this.$refs.editor.childNodes[0].innerHTML;
      },
      onSelection (range) {
        if (range) {
          let formats = this.editor.getFormat(range.index, range.length);
          this.updateButtons(formats);
        }
      },

      submitAction () {
        if (!this.noteId) {
          this.loading = true;
        }
        this.submit(this.form)

      },
      cancelAction () {
        this.$props.cancel();
      }
    },
    computed: {
      ...mapGetters('noteTypes', ['noteTypes'])
    }
  }
</script>