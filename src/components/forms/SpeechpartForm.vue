<template>
  <modal-form
    :title="title"
    :cancel="cancelAction"
    :submit="submitAction"
    :valid="true"
    :submittin="null"
  >
    <div class="SpeechpartForm">
      <form>
        <field-select
          autofocus
          :label="'Partie du discours'"
          :selected="form.type_id"
          :options="speechpartTypes"
          :on-change="onSelectChange"
        />
        <div class="field">
          <p class="control">
            <label class="label">Contenu</label>
          </p><div class="editor-area">
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
  import { mapState } from 'vuex';
  import ModalForm from './ModalForm';
  import FieldSelect from './FieldSelect';
  import EditorButton from '../editors/EditorButton.vue';

  export default {
    name: "SpeechpartForm",
    components: {
      EditorButton,
      FieldSelect,
      ModalForm
    },
    mixins: [EditorMixins],
    props: ['title', 'editedSpeechPart', 'cancel', 'submit'],
    data() {
      return {
        form: {},
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
      }
    },
    mounted () {
      const speechPart = this.$props.editedSpeechPart;
      const type_id = speechPart.type_id !== undefined ? speechPart.type_id : this.speechpartTypes[0].id;
      const note = speechPart.note !== undefined ? speechPart.note : '';
      this.$refs.editor.innerHTML = note
      this.editor = getNewQuill(this.$refs.editor);
      this.editor.on('selection-change', this.onSelection);
      this.editor.on('selection-change', this.onFocus);
      this.editor.on('text-change', this.onTextChange);
      this.textLength = this.editor.getLength();
      this.form = Object.assign({}, this.speechPart);
      this.form.type_id = type_id;
      this.form.note = note;
      console.log("SpeechpartForm.mounted", this.form)
    },
    methods: {

      onSelectChange (typeId) {
        this.form.type_id = typeId;
      },
      onTextChange () {
        this.textLength = this.editor.getLength();
        this.form.note = this.$refs.editor.childNodes[0].innerHTML;
      },
      onSelection (range) {
        if (range) {
          let formats = this.editor.getFormat(range.index, range.length);
          this.updateButtons(formats);
        }
      },

      submitAction () {
        this.$props.submit(this.form);
      },
      cancelAction () {
        this.$props.cancel();
      }
    },
    computed: {
      ...mapState('speechpartTypes', ['speechpartTypes'])
    }
  }
</script>
