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
import ToolTip from '@/components/ui/ToolTip';

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
          let toolTipClass =  Vue.extend(ToolTip)
           Object.keys(this.transcriptionView.notes).forEach(noteId => {
              const paddedId = `${noteId}`.padStart(10, '0')
              const spEl = document.querySelector(`[data-note-id='${paddedId}']`)
              const noteContent = this.transcriptionView.notes[noteId]
              const t = new toolTipClass({propsData: {
                element: spEl.outerHTML ,
                content: `
                  <span>
                    <span class="tt-content">${noteContent}</span>
                  </span>
                `
              }})
              t.$mount(spEl)
          }) 

          // persnames && placenames
          Array.from(document.querySelectorAll(`persname, placename`)).forEach(el => {
              const t = new toolTipClass({propsData: {
              element: el.outerHTML ,
              content: `
                <span>
                  <span class="tt-content">${el.attributes.ref.value}</span>
                </span>
              `,
              type: 'is-light'
              }})
              t.$mount(el)
          })
      },
      insertCommentariesTooltips(){
          // make tooltips
          let toolTipClass =  Vue.extend(ToolTip)
          this.commentariesView.forEach(com => {
            Object.keys(com.notes).forEach(noteId => {
                const paddedId = `${noteId}`.padStart(10, '0')
                const spEl = document.querySelector(`[data-note-id='${paddedId}']`)
                const noteContent = com.notes[noteId]
                const t = new toolTipClass({propsData: {
                  element: spEl.outerHTML ,
                  content: `
                    <span>
                      <span class="tt-content">${noteContent}</span>
                    </span>
                  `
                }})
                t.$mount(spEl)
            }) 
          })
      }
    }
}
</script>

<style>

</style>