<template>
  <div class="section">
    <div
      v-if="!!document"
      class="container is-fluid"
    >
      <!-- header -->
      <document-title-bar
        :document="document"
      />
      <!-- main container -->
      <div class="m-t-md">
        <!-- section tabs (notice, transcription, commentaires, etc) -->
        <div class="section-tabs tabs">
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
              v-if="isCommentariesValidated && !!commentariesView && commentariesView.length > 0"
              :class="$attrs.section === 'commentaries' ? `is-active`: ''"
            >
              <router-link :to="{name: 'document-view', params: {docId: $attrs.docId, section:'commentaries'}}">
                Commentaires
              </router-link>
            </li>
            <li
              v-if="isSpeechPartsValidated && !!speechPartsView"
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
        >
          <div class="columns">
            <div
              v-show="imageVisibility"
              class="column"
              :class="`${imageVisibility && showContent ? 'is-half' : ''}`"
            >
              <!-- visibility widget -->
              <div
                v-if="!showContent"
                class="visibility-controls m-b-md"
              >
                <div class="field is-grouped">
                  <visibility-toggle
                    class="control"
                    :action="toggleImageVisibility"
                    :visible="imageVisibility"
                  >
                    image
                  </visibility-toggle>
                  <visibility-toggle
                    v-if="$attrs.section === 'notice'"
                    class="control"
                    :action="toggleNoticeVisibility"
                    :visible="noticeVisibility"
                  >
                    notice
                  </visibility-toggle>
                  <visibility-toggle
                    v-if="transcriptionView && $attrs.section === 'transcription' || $attrs.section === 'translation'"
                    class="control"
                    :action="toggleTranscriptionVisibility"
                    :visible="transcriptionVisibility"
                  >
                    transcription
                  </visibility-toggle>
                  <visibility-toggle
                    v-if="translationView && $attrs.section === 'transcription' || $attrs.section === 'translation'"
                    class="control"
                    :action="toggleTranslationVisibility"
                    :visible="translationVisibility"
                  >
                    traduction
                  </visibility-toggle>
                  <visibility-toggle
                    v-if="$attrs.section === 'commentaries'"
                    class="control"
                    :action="toggleCommentariesVisibility"
                    :visible="commentariesVisibility"
                  >
                    commentaires
                  </visibility-toggle>
                  <visibility-toggle
                    v-if="$attrs.section === 'speech-parts'"
                    class="control"
                    :action="toggleSpeechPartsVisibility"
                    :visible="speechpartsVisibility"
                  >
                    parties du discours
                  </visibility-toggle>
                </div>
              </div>

              <mirador-viewer
                v-if="document.manifest_origin_url && !isLoading"
                :manifest-url="document.manifest_origin_url"
                :canvas-index="0"
              />
              <img
                v-else
                :src="require('@/assets/images/document_placeholder.svg')"
                class="iiif-viewer-placeholder"
              >
            </div>

            <div
              v-if="showContent"
              class="column"
            >
              <!-- visibility widget -->
              <div class="visibility-controls m-b-md">
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
                    v-if="$attrs.section === 'notice'"
                    class="control"
                    :action="toggleNoticeVisibility"
                    :visible="noticeVisibility"
                  >
                    notice
                  </visibility-toggle>
                  <visibility-toggle
                    v-if="transcriptionView && $attrs.section === 'transcription' || $attrs.section === 'translation'"
                    class="control"
                    :action="toggleTranscriptionVisibility"
                    :visible="transcriptionVisibility"
                  >
                    transcription
                  </visibility-toggle>
                  <visibility-toggle
                    v-if="translationView && $attrs.section === 'transcription' || $attrs.section === 'translation'"
                    class="control"
                    :action="toggleTranslationVisibility"
                    :visible="translationVisibility"
                  >
                    traduction
                  </visibility-toggle>
                  <visibility-toggle
                    v-if="$attrs.section === 'commentaries'"
                    class="control"
                    :action="toggleCommentariesVisibility"
                    :visible="commentariesVisibility"
                  >
                    commentaires
                  </visibility-toggle>
                  <visibility-toggle
                    v-if="$attrs.section === 'speech-parts'"
                    class="control"
                    :action="toggleSpeechPartsVisibility"
                    :visible="speechpartsVisibility"
                  >
                    parties du discours
                  </visibility-toggle>
                </div>
              </div>

              <!-- section content -->
              <div>
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
                  v-if="isTranscriptionValidated && $attrs.section === 'speech-parts' && speechPartsView != null"
                  :readonly-data="speechPartsView"
                />
              </div>
            </div>
          </div>
        </div>
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
import MiradorViewer from '../components/MiradorViewer.vue'

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
      MiradorViewer,
      VisibilityToggle
    },
    props: {
    },
    data() {
      return {
        isLoading: false,
        imageVisibility: true,
        noticeVisibility: true,
        transcriptionVisibility: true,
        translationVisibility: true,
        commentariesVisibility: true,
        speechpartsVisibility: true,
      }
    },
    computed: {
        ...mapState('document', ['document', 
                                 'transcriptionView', 'translationView', 'transcriptionAlignmentView', 'speechPartsView',
                                 'commentariesView']),
        ...mapGetters('user', ['loggedIn']),
        ...mapGetters('document', ['getManifestInfoUrl']),
        ...mapGetters('workflow', ['isTranscriptionValidated', 'isTranslationValidated',
        'isTranscriptionReadOnly', 'isTranslationReadOnly', 'isSpeechPartsReadOnly', 'isSpeechPartsValidated',
        'isCommentariesReadOnly', 'isCommentariesValidated']),

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
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.dispatch('workflow/setEditionMode', false)
        vm.$store.dispatch('workflow/setCurrentSection', vm.$attrs.section)
        vm.setupVisibilityWidget(vm.$attrs.section)
      })
    },
    async beforeRouteUpdate (to, from, next) {
      this.$store.dispatch('workflow/setEditionMode', false)
      this.$store.dispatch('workflow/setCurrentSection', to.params.section)
      this.setupVisibilityWidget(to.params.section)

      //if (to.params.docId !== from.params.docId) {
      await this.loadDocument(to.params.docId);
      //}
      next()
    },
    beforeRouteLeave (to, from, next) {
      this.$store.dispatch('workflow/setCurrentSection', null)
      next()
    },
    async created() {
      await this.loadDocument(this.$attrs.docId)
    },
    methods: {
      ...mapActions('document', {
        'fetchOne': 'fetch',
        'fetchTranscriptionView': 'fetchTranscriptionView',
        'fetchTranslationView': 'fetchTranslationView',
        'fetchCommentariesView': 'fetchCommentariesView',
        'fetchSpeechPartsView': 'fetchSpeechPartsView',
        'fetchTranscriptionAlignmentView': 'fetchTranscriptionAlignmentView',
        }),

      setupVisibilityWidget(section) {
        switch (section) {
          case "transcription":
            this.transcriptionVisibility = true;
            this.translationVisibility = true;
            this.speechpartsVisibility = false;
            this.noticeVisibility = false;
            this.imageVisibility = true;
            this.commentariesVisibility = false;
            break;
          case "translation":
            this.transcriptionVisibility = true;
            this.translationVisibility = true;
            this.speechpartsVisibility = false;
            this.noticeVisibility = false;
            this.imageVisibility = true;
            this.commentariesVisibility = false;
            break;
          case "notice":
            this.transcriptionVisibility = false;
            this.translationVisibility = false;
            this.speechpartsVisibility = false;
            this.noticeVisibility = true;
            this.imageVisibility = true;
            this.commentariesVisibility = false;
            break;
          case "commentaries":
            this.transcriptionVisibility = false;
            this.translationVisibility = false;
            this.speechpartsVisibility = false;
            this.noticeVisibility = false;
            this.imageVisibility = true;
            this.commentariesVisibility = true;
            break;
          case "speech-parts":
            this.transcriptionVisibility = false;
            this.translationVisibility = false;
            this.speechpartsVisibility = true;
            this.noticeVisibility = false;
            this.imageVisibility = true;
            this.commentariesVisibility = false;
            break;
          default:
            this.transcriptionVisibility = false;
            this.translationVisibility = false;
            this.speechpartsVisibility = false;
            this.noticeVisibility = false;
            this.imageVisibility = true;
            this.commentariesVisibility = false;
            break;
        }
      },
      async loadDocument(docId) {
        this.isLoading = true;
        try {
          await this.fetchOne({id: docId})
        }
        catch (error) {
          this.$router.push({name: 'error', params: {error: error}})
        }

        await this.fetchSpeechPartsView()
        await this.fetchTranscriptionView()
        await this.fetchTranslationView()

        this.transcriptionVisibility = this.transcriptionView !== null
        this.translationVisibility = this.translationView !== null

        try {
          await this.fetchTranscriptionAlignmentView()
        } catch(error) {
          console.log("No tr/tl alignment", error)
        }

        try {
          this.fetchCommentariesView()
        } catch(error) {
          console.log("No commentaries", error)
        }

        this.isLoading = false;
        // init notes popup
      },
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