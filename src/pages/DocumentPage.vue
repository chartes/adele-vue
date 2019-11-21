<template>
  <div class="section">
    <div class="container is-fluid">
      <document-title-bar
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
                <router-link :to="{name: 'document-view', params: {docId: $attrs.docId, section:'notice'}}">
                  Notice
                </router-link>
              </li>
              <li :class="$attrs.section === 'transcription' ? `is-active`: ''">
                <router-link :to="{name: 'document-view', params: {docId: $attrs.docId, section:'transcription'}}">
                  Transcription et traduction
                </router-link>
              </li>
              <li :class="$attrs.section === 'commentaries' ? `is-active`: ''">
                <router-link :to="{name: 'document-view', params: {docId: $attrs.docId, section:'commentaries'}}">
                  Commentaires
                </router-link>
              </li>
              <li :class="$attrs.section === 'speech-parts' ? `is-active`: ''">
                <router-link :to="{name: 'document-view', params: {docId: $attrs.docId, section:'speech-parts'}}">
                  Parties du discours
                </router-link>
              </li>
            </ul>
          </div>
          <div
            v-if="!!document"
            class="container"
          >
            <document-notice
              v-if="$attrs.section === 'notice'"
              :document="document"
            />
            <div v-if="$attrs.section === 'transcription'">
              <document-transcription
                :readonly-data="transcriptionView"
              />
              <document-translation
                :readonly-data="translationView"
              />
            </div>
            <document-commentaries
              v-if="$attrs.section === 'commentaries'"
              :document="document"
            />
            <document-speech-parts
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

import { mapState, mapGetters } from 'vuex';
import DocumentNotice from '../components/document/view/DocumentNotice.vue'
import DocumentTranscription from '../components/document/view/DocumentTranscription.vue'
import DocumentTranslation from '../components/document/view/DocumentTranslation.vue'
import DocumentTranslationAlignment from '../components/document/view/DocumentTranslationAlignment.vue'

import DocumentCommentaries from '../components/document/view/DocumentCommentaries.vue'
import DocumentSpeechParts from '../components/document/view/DocumentSpeechParts.vue'
import IIIFViewer from '../components/IIIFViewer.vue'

import DocumentTitleBar from '../components/document/DocumentTitleBar.vue'

export default {
    name: "DocumentPage",
    components: {
      DocumentTitleBar,
      DocumentNotice,
      DocumentTranscription,
      DocumentTranslation,
      //DocumentTranslationAlignment,
      DocumentCommentaries,
      DocumentSpeechParts,
      IIIFViewer
    },
    props: {
    },
    computed: {
        ...mapState('document', ['document', 'loading', 'transcriptionView', 'translationView']),
        ...mapGetters('user', ['loggedIn'])
    },
    async created() {
      await this.fetchOne()
      this.fetchTranscriptionView()
      this.fetchTranslationView()
    },
    methods: {
      fetchOne() {
        return this.$store.dispatch('document/fetch', {
          id: this.$attrs.docId
        })
      },
      fetchTranscriptionView() {
        return this.$store.dispatch('document/fetchTranscriptionView', {
          id: this.$attrs.docId
        })
      },
      fetchTranslationView() {
        return this.$store.dispatch('document/fetchTranslationView', {
          id: this.$attrs.docId
        })
      }
    }
}
</script>

<style>

</style>