<template>
  <div class="section">
    <div
      v-if="document"
      class="container is-fluid"
    >
      <document-title-bar
        :document="document"
      />

      <!-- Visibility widget-->
      <div class="m-b-sm">
        <p class="is-size-6">
          <span class="tag">
            <visibility-toggle
              class="m-r-md"
              :action="toggleImageVisibility"
              :visible="imageVisibility"
            >
              image
            </visibility-toggle>
            <visibility-toggle
              v-if="transcriptionView && $attrs.section === 'transcription'"
              :action="toggleTranscriptionVisibility"
              :visible="transcriptionVisibility"
            >
              transcription
            </visibility-toggle>
            <visibility-toggle
              v-if="translationView && $attrs.section === 'transcription'"
              class="m-l-md"
              :action="toggleTranslationVisibility"
              :visible="translationVisibility"
            >
              traduction
            </visibility-toggle>
          </span>
        </p>
      </div>

      <div class="columns">
        <div
          v-show="imageVisibility"
          class="column m-t-sm"
          :class="`${imageVisibility ? 'is-two-fifths': ''}`"
        >
          <i-i-i-f-viewer />
        </div>
        <div
         
          class="column"
        >
          <div class="tabs">
            <ul>
              <li :class="$attrs.section === 'notice' || $attrs.section === undefined || !transcriptionView ? `is-active`: ''">
                <router-link :to="{name: 'document-view', params: {docId: $attrs.docId, section:'notice'}}">
                  Notice
                </router-link>
              </li>
              <li
                v-if="transcriptionView"
                :class="$attrs.section === 'transcription' ? `is-active`: ''"
              >
                <router-link :to="{name: 'document-view', params: {docId: $attrs.docId, section:'transcription'}}">
                  <span v-if="translationView"> Transcription et traduction</span>
                  <span v-else> Transcription </span>
                </router-link>
              </li>
              <li
                v-if="isTranscriptionValidated"
                :class="$attrs.section === 'commentaries' ? `is-active`: ''"
              >
                <router-link :to="{name: 'document-view', params: {docId: $attrs.docId, section:'commentaries'}}">
                  Commentaires
                </router-link>
              </li>
              <li
                v-if="isTranscriptionValidated"
                :class="$attrs.section === 'speech-parts' ? `is-active`: ''"
              >
                <router-link :to="{name: 'document-view', params: {docId: $attrs.docId, section:'speech-parts'}}">
                  Parties du discours
                </router-link>
              </li>
            </ul>
          </div>
          <div
            v-if="!!document"
            class=""
          >
            <document-notice
              v-if="$attrs.section === 'notice' || !transcriptionView"
              :document="document"
            />
            <div
              v-if="$attrs.section === 'transcription' && transcriptionView"
              class="content"
            >
              <document-transcription
                v-if="transcriptionVisibility && !translationVisibility"
                :readonly-data="transcriptionView"
              />
              <document-translation
                v-if="!transcriptionVisibility && translationVisibility"
                :readonly-data="translationView"
              />
              <document-transcription-alignment
                v-if="transcriptionVisibility && translationVisibility"
                :readonly-data="transcriptionAlignmentView"
              />
            </div>
            <document-commentaries
              v-if="isTranscriptionValidated && $attrs.section === 'commentaries'"
              :document="document"
            />
            <document-speech-parts
              v-if="isTranscriptionValidated && $attrs.section === 'speech-parts'"
              :document="document"
            />
          </div>
        </div>

        <div 
          v-show="!imageVisibility"
          class="column is-one-quarter"
        />
      </div>
    </div>
  </div>
</template>

<script>

import { mapState, mapGetters } from 'vuex';
import DocumentNotice from '../components/document/view/DocumentNotice.vue'
import DocumentTranscription from '../components/document/view/DocumentTranscription.vue'
import DocumentTranslation from '../components/document/view/DocumentTranslation.vue'
import DocumentTranscriptionAlignment from '../components/document/view/DocumentTranscriptionAlignment.vue'

import DocumentCommentaries from '../components/document/view/DocumentCommentaries.vue'
import DocumentSpeechParts from '../components/document/view/DocumentSpeechParts.vue'
import IIIFViewer from '../components/IIIFViewer.vue'
import VisibilityToggle from '../components/ui/VisibilityToggle.vue'
import DocumentTitleBar from '../components/document/DocumentTitleBar.vue'

export default {
    name: "DocumentPage",
    components: {
      DocumentTitleBar,
      DocumentNotice,
      DocumentTranscription,
      DocumentTranslation,
      DocumentTranscriptionAlignment,
      DocumentCommentaries,
      DocumentSpeechParts,
      IIIFViewer,
      VisibilityToggle
      
    },
    props: {
    },
    data() {
      return {
        imageVisibility: true,
        transcriptionVisibility: true,
        translationVisibility: true,
      }
    },
    computed: {
        ...mapState('document', ['document', 'loading',
                                 'transcriptionView', 'translationView', 'transcriptionAlignmentView']),
        ...mapGetters('user', ['loggedIn']),
        ...mapGetters('workflow', ['isTranscriptionValidated'])
    },
    async created() {
      try {
        await this.fetchOne()
      }
      catch (error) {
        this.$router.push({name: 'error', params: {error: error}})
      }
      try {
        await this.fetchTranscriptionView()
      } catch(error) {
        console.error(error)
      }
      try {
        await this.fetchTranslationView()
      } catch(error) {
        console.error(error)
      }
      try {
        await this.fetchTranscriptionAlignmentView()
      } catch(error) {
        console.error(error)
      }

      console.log(this.transcriptionView)
      this.transcriptionVisibility = this.transcriptionView !== null
      this.translationVisibility = this.translationView !== null
      // init notes popup
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
      },
      fetchTranscriptionAlignmentView() {
        return this.$store.dispatch('document/fetchTranscriptionAlignmentView', {
          id: this.$attrs.docId
        })
      },

      toggleImageVisibility() {
        // forbid hidding everything
        if (this.transcriptionVisibility || this.translationVisibility) {
          this.imageVisibility = !this.imageVisibility
        }
      },
      toggleTranscriptionVisibility() {
        // forbid hidding everything
        if (this.translationVisibility || this.imageVisibility) {
          this.transcriptionVisibility = !this.transcriptionVisibility
        }
      },
      toggleTranslationVisibility() {
        // forbid hidding everything
        if (this.transcriptionVisibility || this.imageVisibility) {
          this.translationVisibility = !this.translationVisibility
        }
      },
    }
}
</script>

<style>

</style>