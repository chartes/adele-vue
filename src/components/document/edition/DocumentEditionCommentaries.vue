<template>
  <div class="">
    <div class="columns">
      <div
        class="column"
        :class="imageVisibility ? 'is-half' : 'is-two-fifths'"
      >
        <div class="has-text-weight-medium subtitle m-b-xl">
          <!-- visibility widget -->
          <div
            class="visibility-controls"
          >
            <div class="field is-grouped">
              <div class="control">
                <span>AFFICHAGE</span>
              </div>
              <visibility-toggle
                class="control"
                :action="toggleImageVisibility"
                :visible="imageVisibility"
              >
                image
              </visibility-toggle>
              <visibility-toggle
                class="control"
                :action="toggleImageVisibility"
                :visible="!imageVisibility"
              >
                transcription
              </visibility-toggle>
            </div>
          </div>
        </div>
        <document-transcription
          v-show="!imageVisibility"
          :key="transcriptionLoading"
          :readonly-data="transcriptionView"
        />
        <div v-show="imageVisibility">
          <mirador-viewer
            v-if="document.manifest_origin_url"
            :manifest-url="document.manifest_origin_url"
            :canvas-index="0"
          />
          <img
            v-else
            :src="require('@/assets/images/document_placeholder.svg')"
            class="iiif-viewer-placeholder"
          >
        </div>
      </div>
      <div class="column">
        <div
          :key="transcriptionLoading"
          class="has-text-weight-medium subtitle m-b-xl"
        >
          Commentaires
        </div>
        <div
          v-for="com in commentaryTypes"
          :key="com.id"
        >
          <div v-show="com.label === selectedCommentaryLabel">
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
              v-for="comType in commentaryTypes"
              :key="comType.id"
              :class="`${comType.label === selectedCommentaryLabel ? 'is-active' : ''}`"
              :data-com-type="comType.id"
            >
              <a @click="() => selectItem(comType.label)">
                {{ comType.label }}
              </a>
            </li>
          </ul>
        </div>
        <!-- editor -->
        <div style="min-height: 100%">
          <div
            v-for="com in commentaryTypes"
            :key="com.label"
          >
            <div v-show="com.label === selectedCommentaryLabel">
              <commentary-editor
                v-if="hasCommentaryTypes(com.label)"
                :key="commentariesLoading"
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
import VisibilityToggle from '@/components/ui/VisibilityToggle.vue'
import Message from '../../Message'
import MiradorViewer from '@/components/MiradorViewer.vue'

export default {
    name: "DocumentEditionCommentaries",
    components: {
        DocumentTranscription,
        CommentaryEditor,
        CommentariesActionBar,
        Message,
        MiradorViewer,
        VisibilityToggle
    },
    props: {
        
    },
    data() {
      return {
        imageVisibility: false,
      }
    },
    computed: {
        ...mapState('document', ['transcriptionView', 'document']),
        ...mapState('document', ['transcriptionLoading']),
        ...mapState('commentaries', ['commentaryTypes', 'selectedCommentaryLabel', 'commentariesLoading']),
        ...mapGetters('commentaries', ['getCommentary', 'hasCommentaryTypes']),
    },
    async created() {
      this.imageVisibility = false
      await this.fetchTypes()
      await this.fetchTranscriptionView()
    },
    methods: {
      ...mapActions('document', ['fetchTranscriptionView']),
      ...mapActions('commentaries', ['fetchTypes']),
      async selectItem(typeLabel) {
        await this.$store.dispatch('commentaries/selectCommentaryTab', typeLabel)
      },
      getCommentaryContent(label) {
        const com = this.getCommentary(label);
        return com ? com.withNotes : ''
      },
      toggleImageVisibility() {
        this.imageVisibility = !this.imageVisibility
      }
    }
}
</script>

<style>

</style>