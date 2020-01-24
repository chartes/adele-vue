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
      ...mapState('document', ['transcriptionView']),

    },
    async created() {
      if (this.showTranscription) {
        await this.fetchTranscriptionView()
      }
    },
    methods: {
      ...mapActions('document', ['fetchTranscriptionView']),

      selectItem(index) {
        this.activeIdx = index
      }
    }
}
</script>

<style>

</style>