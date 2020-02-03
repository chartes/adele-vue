<template>
  <div class="">
    <div class="columns">
      <div class="column">
        <div class="has-text-weight-medium subtitle m-b-xl">
          Transcription
        </div>
        <document-transcription
          :readonly-data="transcriptionView"
        />
      </div>
      <div class="column is-two-thirds">
        <div class="has-text-weight-medium subtitle m-b-xl">
          Commentaires
        </div>
        <div
          v-for="(com, index) in commentaryTypes"
          :key="index"
        >
          <div v-show="index === activeIdx">
            <commentaries-action-bar
              :type="com.id"
              :label="com.label"
            />
          </div>
        </div>
        <!-- commentary types tabs -->
        <div class="commentaries-tabs tabs is-small is-toggle">
          <ul>
            <li
              v-for="(comType, index) in commentaryTypes"
              :key="index"
              :class="`${index === activeIdx ? 'is-active' : ''}`"
              :data-com-type="comType.id"
            >
              <a @click="() => selectItem(index)">
                {{ comType.label }}
              </a>
            </li>
          </ul>
        </div>
        <!-- editor -->
        <div style="min-height: 100%">
          <div
            v-for="(com, index) in commentaryTypes"
            :key="index"
          >
            <div v-show="index === activeIdx">
              <commentary-editor
                v-if="hasCommentaryTypes[com.label]"
                :initial-content="getCommentaryContent(com.label)"
                :type="com.id"
              />
              <message
                v-else
                class="is-info"
              >
                Aucun commentaire de ce type 
              </message>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import { mapState, mapGetters, mapActions } from 'vuex';

import DocumentTranscription from '../view/DocumentTranscription.vue'
import CommentaryEditor from '../../editors/CommentaryEditor.vue'
import CommentariesActionBar from './actionbars/CommentariesActionBar.vue'
import Message from '../../Message'

export default {
    name: "DocumentEditionCommentaries",
    components: {
        DocumentTranscription,
        CommentaryEditor,
        CommentariesActionBar,
        Message
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
        ...mapGetters('commentaries', ['getCommentary'])
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
      },
      getCommentaryContent(label) {
        const com = this.getCommentary(label);
        return com ? com.content : ''
      }
    }
}
</script>

<style>

</style>