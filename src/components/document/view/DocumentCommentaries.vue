<template>
  <div>
    <div class="columns">
      <div
        v-if="showTranscription"
        class="column is-two-fifths"
      >
        <div class="has-text-weight-medium subtitle m-b-xl">
          Transcription
        </div>
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
              v-for="(com, index) in readonlyData"
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
            v-for="(com, index) in readonlyData"
            :key="index"
          >
            <div
              v-show="index === activeIdx"
              class="com-content"
              v-html="com.content"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import { mapState, mapActions } from 'vuex';
import Vue from 'vue';
import addToolTip from '@/modules/tooltip';

import DocumentTranscription from '../view/DocumentTranscription.vue'

export default {
    name: "DocumentCommentaries",
    components: {
        DocumentTranscription
    },
    props: {
        readonlyData: {type: Array, default: null},
        showTranscription: {type: Boolean, default: false}
    },
    data() {
      return {
        activeIdx: 0  
      }
    },
    computed: {
      ...mapState('document', ['loading']),
      ...mapState('document', ['transcriptionView', 'commentariesView']),

    },
    async created() {
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

      selectItem(index) {
        this.activeIdx = index
      },
      insertTranscriptionTooltips() {
          // make tooltips
          Object.keys(this.transcriptionView.notes).forEach(noteId => {
            const paddedId = `${noteId}`.padStart(10, '0')
            Array.from(document.querySelectorAll(`[data-note-id='${paddedId}']`)).forEach(el => {
              addToolTip(el, this.transcriptionView.notes[noteId], null, {contentType: 'note'});
            })
          }) 

          // persnames && placenames
          Array.from(document.querySelectorAll(`persname, placename`)).forEach(el => {
              addToolTip(el, el.attributes.ref.value, null, {contentType: el.localName, position: el.localName === 'persname' ? 'is-left' : 'is-right'});
          })
      },
      insertCommentariesTooltips(){
          // make tooltips
          this.commentariesView.forEach(com => {
            Object.keys(com.notes).forEach(noteId => {
                const paddedId = `${noteId}`.padStart(10, '0')
                const spEl = document.querySelector(`[data-note-id='${paddedId}']`)
                addToolTip(spEl, com.notes[noteId], null, {contentType: 'note'});
            }) 
          })
      }
    }
}
</script>

<style>

</style>