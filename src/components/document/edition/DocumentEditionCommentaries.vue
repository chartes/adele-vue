<template>
  <div class="">
    <div class="columns">
      <div class="column is-two-fifths">
        <div class="has-text-weight-medium subtitle m-b-xl">
          Transcription
        </div>
        <document-transcription
          :readonly-data="transcriptionView"
        />
      </div>
      <div class="column  ">
        <div class="has-text-weight-medium subtitle m-b-xl">
          Commentaires
        </div>
    
        <!-- commentary types tabs -->
        <div class="tabs is-small is-toggle is-fullwidth">
          <ul>
            <li
              v-for="(comType, index) in commentaryTypes"
              :key="index"
              :class="`${index === activeIdx ? 'is-active' : ''}`"
            >
              <a @click="() => selectItem(index)">
                <span>{{ comType.label }}</span>
              </a>
            </li>
          </ul>
        </div>
        <!-- content -->
        <div>
          <div
            v-for="(com, index) in commentaries"
            :key="index"
          >
            <div v-show="index === activeIdx">
              <commentary-editor
                :initial-content="com.content"
                :type="com.type"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import { mapState, mapActions } from 'vuex';

import DocumentTranscription from '../view/DocumentTranscription.vue'
import CommentaryEditor from '../../editors/CommentaryEditor.vue'

export default {
    name: "DocumentEditionCommentaries",
    components: {
        DocumentTranscription,
        CommentaryEditor
    },
    props: {
        
    },
    data() {
      return {
        activeIdx: 0  
      }
    },
    computed: {
        ...mapState('document', ['transcriptionView']),
        ...mapState('commentaries', ['commentaryTypes', 'commentaries', 'hasCommentaryTypes']),
    },
    async created() {
      await this.fetchTypes()
      await this.fetchTranscriptionView()
    },
    methods: {
      ...mapActions('document', ['fetchTranscriptionView']),
      ...mapActions('commentaries', ['fetchTypes']),
      selectItem(index) {
        this.activeIdx = index
      }
    }
}
</script>

<style>

</style>