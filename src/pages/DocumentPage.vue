<template>
  <div class="section">
    <div
      v-if="document"
      class="container is-fluid"
    >
      <document-title-bar
        :document="document"
      />

      <!-- Visibility widgets -->
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
              v-if="$attrs.section === 'notice'"
              :action="toggleNoticeVisibility"
              :visible="noticeVisibility"
            >
              notice
            </visibility-toggle>
            <visibility-toggle
              v-if="transcriptionView && $attrs.section === 'transcription' || $attrs.section === 'translation'"
              :action="toggleTranscriptionVisibility"
              :visible="transcriptionVisibility"
            >
              transcription
            </visibility-toggle>
            <visibility-toggle
              v-if="translationView && $attrs.section === 'transcription' || $attrs.section === 'translation'"
              class="m-l-md"
              :action="toggleTranslationVisibility"
              :visible="translationVisibility"
            >
              traduction
            </visibility-toggle>
            <visibility-toggle
              v-if="$attrs.section === 'commentaries'"
              :action="toggleCommentariesVisibility"
              :visible="commentariesVisibility"
            >
              commentaires
            </visibility-toggle>
            <visibility-toggle
              v-if="$attrs.section === 'speech-parts'"
              :action="toggleSpeechPartsVisibility"
              :visible="speechpartsVisibility"
            >
              parties du discours
            </visibility-toggle>
          </span>
        </p>
      </div>

      <div class="columns">
        <div
          v-show="imageVisibility"
          class="column m-t-sm"
          :class="`${imageVisibility && showContent ? 'is-half' : ''}`"
        >
          <i-i-i-f-viewer
            :key="`${canvasManifestInfo}${showContent}`"
            :info="canvasManifestInfo"
          />
        </div>
        <div
          v-if="showContent"
          class="column"
        >
          <!-- section tabs (notice, transcription, commentaires, etc) -->
          <div class="tabs">
            <ul>
              <li :class="$attrs.section === 'notice' || $attrs.section === undefined || !transcriptionView ? `is-active`: ''">
                <router-link :to="{name: 'document-view', params: {docId: $attrs.docId, section:'notice'}}">
                  Notice
                </router-link>
              </li>
              <li
                v-if="transcriptionView"
                :class="$attrs.section === 'transcription' || $attrs.section === 'translation'
                  ? 'is-active': '' "
              >
                <router-link :to="{name: 'document-view', params: {docId: $attrs.docId, section:'transcription'}}">
                  <span v-if="translationView"> Transcription et traduction</span>
                  <span v-else> Transcription </span>
                </router-link>
              </li>
              <li
                v-if="isTranscriptionValidated && !!commentariesView && commentariesView.length > 0"
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
          <!-- section content -->
          <div
            v-if="!!document"
            class=""
          >
            <document-notice
              v-if="$attrs.section === 'notice' || !transcriptionView"
              :document="document"
            />
            <div
              v-if="($attrs.section === 'transcription' || $attrs.section === 'translation') && transcriptionView"
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
                v-if="transcriptionAlignmentView && transcriptionVisibility && translationVisibility"
                :readonly-data="transcriptionAlignmentView"
              />
            </div>
            <document-commentaries
              v-if="isTranscriptionValidated && $attrs.section === 'commentaries'"
              :readonly-data="commentariesView"
            />
            <document-speech-parts
              v-if="isTranscriptionValidated && $attrs.section === 'speech-parts'"
              :document="document"
            />
          </div>
        </div>

        <div 
          v-show="false && !imageVisibility && showContent"
          class="column is-one-quarter"
        />
      </div>
    </div>
  </div>
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'

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
        noticeVisibility: true,
        transcriptionVisibility: true,
        translationVisibility: true,
        commentariesVisibility: true,
        speechpartsVisibility: true,
      }
    },
    computed: {
        ...mapState('document', ['document', 'loading',
                                 'transcriptionView', 'translationView', 'transcriptionAlignmentView',
                                 'commentariesView']),
        ...mapGetters('user', ['loggedIn']),
        ...mapGetters('document', ['getManifestInfoUrl']),
        ...mapGetters('workflow', ['isTranscriptionValidated']),

        canvasManifestInfo() {
          return this.getManifestInfoUrl(0)
        },

        showContent() {
          switch(this.$attrs.section){
            case 'transcription':
              return this.transcriptionVisibility || this.translationVisibility
            case 'translation':
              return this.translationVisibility || this.transcriptionVisibility
            case 'notice':
              return this.noticeVisibility
            case 'commentaries':
              return this.commentariesVisibility
            case 'speech-parts':
              return this.speechpartsVisibility
            default:
              return true
          }
        }
    },
    async created() {
      try {
        await this.fetchOne({id: this.$attrs.docId})
      }
      catch (error) {
        this.$router.push({name: 'error', params: {error: error}})
      }

      await this.fetchTranscriptionView()
      await this.fetchTranslationView()

      this.transcriptionVisibility = this.transcriptionView !== null
      this.translationVisibility = this.translationView !== null

      if (!this.transcriptionVisibility && !this.translationVisibility) {
        this.$router.replace('document-view', {section: 'notice', docId: 20})
      }

      try {
        await this.fetchTranscriptionAlignmentView()
      } catch(error) {
        console.log("No tr/tl alignemnt", error)
      }

      try {
        await this.fetchCommentariesView()
      } catch(error) {
        console.log("No commentaries", error)
      }

      // init notes popup
    },
    methods: {
      ...mapActions('document', {
        'fetchOne': 'fetch',
        'fetchTranscriptionView': 'fetchTranscriptionView',
        'fetchTranslationView': 'fetchTranslationView',
        'fetchCommentariesView': 'fetchCommentariesView',
        'fetchTranscriptionAlignmentView': 'fetchTranscriptionAlignmentView',
        }),
      toggleImageVisibility() {
        // forbid hidding everything
        if (this.showContent) {
          this.imageVisibility = !this.imageVisibility
        }
      },
      toggleNoticeVisibility() {
        // forbid hidding everything
        if (this.imageVisibility) {
          this.noticeVisibility = !this.noticeVisibility
        }
      },
      toggleTranscriptionVisibility() {
        // forbid hidding everything
        if (this.imageVisibility || this.translationVisibility) {
          this.transcriptionVisibility = !this.transcriptionVisibility
        }
      },
      toggleTranslationVisibility() {
        // forbid hidding everything
        if (this.imageVisibility || this.transcriptionVisibility) {
          this.translationVisibility = !this.translationVisibility
        }
      },
      toggleCommentariesVisibility() {
        // forbid hidding everything
        if (this.imageVisibility) {
          this.commentariesVisibility = !this.commentariesVisibility
        }
      },
      toggleSpeechPartsVisibility() {
        // forbid hidding everything
        if (this.imageVisibility) {
          this.speechpartsVisibility = !this.speechpartsVisibility
        }
      },
    }
}
</script>

<style>

</style>