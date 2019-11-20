<template>
  <div class="section">
    <div class="container is-fluid">
      <document-title-bar
        v-if="!!document"
        :document="document"
      />
      
      <workflow-steps
        v-if="!!document"
        :document="document"
      />

      <div class="columns">
        <div class="column is-two-fifths">
          <i-i-i-f-viewer />
        </div>
        <div class="column">
          <div class="tabs">
            <ul>
              <li :class="$attrs.section === 'notice' || $attrs.section === undefined ? `is-active`: ''">
                <router-link :to="{name: 'document-edition', params: {docId: $attrs.docId, section:'notice'}}">
                  Notice
                </router-link>
              </li>
              <li :class="$attrs.section === 'transcription' ? `is-active`: ''">
                <router-link :to="{name: 'document-edition', params: {docId: $attrs.docId, section:'transcription'}}">
                  Transcription
                </router-link>
              </li>
              <li :class="$attrs.section === 'translation' ? `is-active`: ''">
                <router-link :to="{name: 'document-edition', params: {docId: $attrs.docId, section:'translation'}}">
                  Traduction
                </router-link>
              </li>
              <li :class="$attrs.section === 'commentaries' ? `is-active`: ''">
                <router-link :to="{name: 'document-edition', params: {docId: $attrs.docId, section:'commentaries'}}">
                  Commentaires
                </router-link>
              </li>
              <li :class="$attrs.section === 'facsimile' ? `is-active`: ''">
                <router-link :to="{name: 'document-edition', params: {docId: $attrs.docId, section:'facsimile'}}">
                  Facsimilé
                </router-link>
              </li>
              <li :class="$attrs.section === 'speech-parts' ? `is-active`: ''">
                <router-link :to="{name: 'document-edition', params: {docId: $attrs.docId, section:'speech-parts'}}">
                  Parties du discours
                </router-link>
              </li>
            </ul>
          </div>
          <div
            v-if="!!document"
            class="container"
          >
            <document-edition-notice
              v-if="$attrs.section === 'notice'"
              :document="document"
            />
            <div v-if="$attrs.section === 'transcription'">
              <message
                v-if="transcriptionError"
                message-class="is-danger"
              >
                {{ transcriptionError }}
              </message>
              <document-edition-transcription
                v-else
                :transcription-with-notes="transcriptionWithNotes"
              />
            </div>
            <div v-if="$attrs.section === 'translation'">
              <message
                v-if="translationError"
                message-class="is-danger"
              >
                {{ translationError }}
              </message>
              <document-edition-translation
                v-else
                :translation-with-notes="translationWithNotes"
              />
            </div>
            <document-edition-facsimile
              v-if="$attrs.section === 'facsimile'"
              :transcription-with-notes="transcriptionWithNotes"
            />
            <document-edition-commentaries
              v-if="$attrs.section === 'commentaries'"
              :document="document"
            />
            <document-edition-speech-parts
              v-if="$attrs.section === 'speech-parts'"
              :document="document"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import DocumentEditionNotice from '../components/document/edition/DocumentEditionNotice.vue'
import DocumentEditionTranscription from '../components/document/edition/DocumentEditionTranscription.vue'
import DocumentEditionTranslation from '../components/document/edition/DocumentEditionTranslation.vue'
import DocumentEditionFacsimile from '../components/document/edition/DocumentEditionFacsimile.vue'

import DocumentEditionCommentaries from '../components/document/edition/DocumentEditionCommentaries.vue'
import DocumentEditionSpeechParts from '../components/document/edition/DocumentEditionSpeechParts.vue'

import DocumentNotice from '../components/document/view/DocumentNotice.vue'
import DocumentTranscription from '../components/document/view/DocumentTranscription.vue'
import DocumentCommentaries from '../components/document/view/DocumentCommentaries.vue'
import DocumentSpeechParts from '../components/document/view/DocumentSpeechParts.vue'

import IIIFViewer from '../components/IIIFViewer.vue'
import WorkflowSteps from '../components/WorkflowSteps.vue'
import DocumentTitleBar from '../components/document/DocumentTitleBar.vue'
import Message from '../components/Message.vue'

export default {
    name: "DocumentEditionPage",
    components: {

        DocumentTitleBar,
        
        DocumentEditionNotice,
        DocumentEditionTranscription,
        DocumentEditionTranslation,
        DocumentEditionFacsimile,
        DocumentEditionCommentaries,
        DocumentEditionSpeechParts,

        IIIFViewer,
        WorkflowSteps,
        Message

        /*
        DocumentNotice,
        DocumentTranscription,
        DocumentCommentaries,
        DocumentSpeechParts
        */
    },
    props: {
    },
    data() {
      return {
        transcriptionError: null,
        translationError: null
      }
    },
    computed: {
        ...mapState('document', ['document', 'loading']),
        ...mapState('workflow', ['selectedUserId']),
        ...mapState('transcription', ['transcriptionWithNotes', 'transcriptionLoading']),
        ...mapState('translation', ['translationWithNotes', 'transcriptionLoading']),
    },
    watch:{
      selectedUserId() {
        this.fetchContentFromUser()
      }
    },
    async created() {
      await this.fetchOne()
      this.fetchContentFromUser()
      //eventually watch for a 'section' change to refetch data from server
    },
    methods: {
      fetchOne() {
        return this.$store.dispatch('document/fetch', {
          id: this.$attrs.docId
        })
      },
      fetchTranscriptionContent() {
        return this.$store.dispatch('transcription/fetchTranscriptionFromUser', {
          docId: this.document.id,
          userId: this.selectedUserId
        })
      },
      fetchTranslationContent() {
        return this.$store.dispatch('translation/fetchTranslationFromUser', {
          docId: this.document.id,
          userId: this.selectedUserId
        })
      },
      async fetchContentFromUser(){
        try {
          this.transcriptionError = null
          await this.fetchTranscriptionContent()
        } catch (error) {
          this.transcriptionError = error
        }

        try {
          this.translationError = null
          await this.fetchTranslationContent()
        } catch (error) {
          this.translationError = error
        }
      }
    }
}
</script>

<style>

</style>