<template>
  <div>
    <div class="columns">
      <div
        v-if="showTranscription"
        class="column is-two-fifths"
      >
        <document-transcription
          :readonly-data="transcriptionView"
        />
      </div>
      <div class="column  ">
        <div
          v-if="showTranscription"
          class="has-text-weight-medium subtitle m-b-xl"
        >
          Commentaires
        </div>
    
        <div class="commentaries-tabs tabs is-small is-toggle">
          <ul>
            <li
              v-for="(com, index) in coms"
              :key="index"
              :class="`${index === activeIdx ? 'is-active' : ''}`"
            >
              <a @click="() => selectItem(index)">
                <span>{{ com.type.label }}</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div
            v-for="(com, index) in coms"
            :key="index"
          >

              <rich-text-editor v-if="com.content" v-show="index === activeIdx"
                :initial-content="com.content"
                :readonly="true"
              />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import { mapState, mapActions } from 'vuex';
import addToolTip from '@/modules/tooltip';
import RichTextEditor from "@/components/editors/RichTextEditor.vue"

import DocumentTranscription from '../view/DocumentTranscription.vue'

export default {
    name: "DocumentCommentaries",
    components: {
        DocumentTranscription,
        RichTextEditor
    },
    props: {
        readonlyData: {type: Array, default: null},
        showTranscription: {type: Boolean, default: false}
    },
    data() {
      return {
        activeIdx: 0 ,
        coms: null 
      }
    },
    computed: {
      ...mapState('document', ['loading']),
      ...mapState('document', ['transcriptionView', 'commentariesView']),

    },
    watch: {
      async commentariesView() {
        this.coms = await this.getCommentariesViewContent()
      }
    },
    async created() {
      this.coms = await this.getCommentariesViewContent()
      if (this.showTranscription) {
        await this.fetchTranscriptionView()
        this.insertTranscriptionTooltips()
      }
    },
    mounted() {
      this.insertCommentariesTooltips()
    },
    methods: {
      ...mapActions('document', ['fetchTranscriptionView']),
      ...mapActions('commentaries', ['getCommentariesViewContent']),

      selectItem(index) {
        this.activeIdx = index
      },
      insertTranscriptionTooltips() {
          // make tooltips
          Array.from(document.getElementsByTagName(`adele-note`)).forEach(el => {
            const noteId = el.getAttribute('id')
            const paddedId = `${noteId}`.padStart(10, '0')
            if (this.transcriptionView.notes[paddedId]) {
              addToolTip(el, this.transcriptionView.notes[paddedId], null, {contentType: 'note'});
            }
          })
          // persnames && placenames
          Array.from(document.querySelectorAll(`persname, placename`)).forEach(el => {
              addToolTip(el, el.attributes.ref.value, null, {contentType: el.localName, position: el.localName === 'persname' ? 'is-left' : 'is-bottom'});
          })
      },
      insertCommentariesTooltips(){
          // make tooltips
          this.commentariesView.forEach(com => {
          Array.from(document.getElementsByTagName(`adele-note`)).forEach(el => {
            const noteId = el.getAttribute('id')
            const paddedId = `${noteId}`.padStart(10, '0')
            if (com.notes[paddedId]) {
              addToolTip(el, com.notes[paddedId], null, {contentType: 'note'});
            }
          })
        })
      }
    }
}
</script>

<style>

</style>
