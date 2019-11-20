<template>
  <div class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-two-fifths">
          column 1
          <router-link :to="{name: 'document-view', params:{docId: $attrs.docId}}">
            <div class="button">
              Consulter le dossier
            </div>
          </router-link>
        </div>
        <div class="column">
          <div class="tabs">
            <ul>
              <li :class="$attrs.section === 'notice' || $attrs.section === undefined ? `is-active`: ''">
                <router-link :to="{name: 'document-edition', params: {docId: $attrs.docId, section:'notice'}}">
                  notice
                </router-link>
              </li>
              <li :class="$attrs.section === 'transcription' ? `is-active`: ''">
                <router-link :to="{name: 'document-edition', params: {docId: $attrs.docId, section:'transcription'}}">
                  transcription
                </router-link>
              </li>
              <li :class="$attrs.section === 'commentaries' ? `is-active`: ''">
                <router-link :to="{name: 'document-edition', params: {docId: $attrs.docId, section:'commentaries'}}">
                  Commentaires
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
            <document-edition-transcription
              v-if="$attrs.section === 'transcription'"
              :document="document"
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
import DocumentEditionCommentaries from '../components/document/edition/DocumentEditionCommentaries.vue'
import DocumentEditionSpeechParts from '../components/document/edition/DocumentEditionSpeechParts.vue'

import DocumentNotice from '../components/document/view/DocumentNotice.vue'
import DocumentTranscription from '../components/document/view/DocumentTranscription.vue'
import DocumentCommentaries from '../components/document/view/DocumentCommentaries.vue'
import DocumentSpeechParts from '../components/document/view/DocumentSpeechParts.vue'


export default {
    name: "DocumentEditionPage",
    components: {
        DocumentEditionNotice,
        DocumentEditionTranscription,
        DocumentEditionCommentaries,
        DocumentEditionSpeechParts,

        /*
        DocumentNotice,
        DocumentTranscription,
        DocumentCommentaries,
        DocumentSpeechParts
        */
    },
    props: {
    },
    computed: {
        ...mapState('document', ['document', 'loading', 'transcriptionView'])
    },
    async created() {
      await this.fetchOne()
    },
    methods: {
      fetchOne() {
        this.$store.dispatch('document/fetch', {
          id: this.$attrs.docId
        })
      }
    }
}
</script>

<style>

</style>