<template>
  <div class="section">
    <div
      v-if="!!document"
      class="container is-fluid "
    > 
      <!-- header (title, workflow steps, switch) -->
      <div class="columns">
        <div class="column  is-half">
          <document-title-bar />
        </div>
        <div class="is-divider-vertical p-t-xl p-b-xl" />
        <div class="column">
          <workflow-radio-steps :section="$attrs.section" />
        </div>
      </div>
      <!-- main container -->
      <div class="m-t-md">
        <!-- section tabs (notice, transcription, commentaires, etc) -->
        <div class="section-tabs tabs">
          <ul>
            <li 
              :class="$attrs.section === 'notice' || $attrs.section === undefined ? `is-active`: ''"
              @click="showImage"
            >
              <router-link :to="{name: 'document-edition', params: {docId: $attrs.docId, section:'notice'}}">
                Notice
              </router-link>
            </li>
            <li
              :class="$attrs.section === 'transcription' ? `is-active`: ''"
              @click="showImage"
            >
              <router-link :to="{name: 'document-edition', params: {docId: $attrs.docId, section:'transcription'}}">
                Transcription
              </router-link>
            </li>
            <li
              v-if="isTranscriptionValidated || currentUserIsTeacher"
              :class="$attrs.section === 'translation' ? `is-active`: ''"
              @click="showImage"
            >
              <router-link :to="{name: 'document-edition', params: {docId: $attrs.docId, section:'translation'}}">
                <span v-if="currentUserIsTeacher">Traduction</span>
                <span v-else>Traduction</span>
              </router-link>
            </li>
            <li
              v-if="isTranscriptionValidated || currentUserIsTeacher"
              :class="$attrs.section === 'commentaries' ? `is-active`: ''"
              @click="hideImage"
            >
              <router-link :to="{name: 'document-edition', params: {docId: $attrs.docId, section:'commentaries'}}">
                Commentaires
              </router-link>
            </li>
            <!-- students don't get to deal with facsimile alignment -->
            <li
              v-if="currentUserIsTeacher && selectedUserId === documentOwner.id"
              :class="$attrs.section === 'facsimile' ? `is-active`: ''"
              @click="showImage"
            >
              <router-link :to="{name: 'document-edition', params: {docId: $attrs.docId, section:'facsimile'}}">
                Facsimilé
              </router-link>
            </li>
            <li
              v-if="isTranscriptionValidated || currentUserIsTeacher"
              :class="$attrs.section === 'speech-parts' ? `is-active`: ''"
              @click="showImage"
            >
              <router-link :to="{name: 'document-edition', params: {docId: $attrs.docId, section:'speech-parts'}}">
                Parties du discours
              </router-link>
            </li>
          </ul>
        </div>
        <!-- section content -->
        <div class="columns">
          <div
            v-show="imageVisibility"
            class="column m-t-sm"
            :class="`${imageVisibility && showContent ? 'is-two-fifths': ''}`"
          >
            <!-- Visibility widget-->
            <div 
              v-if="!showContent && $attrs.section !== 'commentaries'"
              class="visibility-controls m-b-md"
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
                  v-if="$attrs.section === 'notice'"
                  class="control"
                  :action="toggleNoticeVisibility"
                  :visible="noticeVisibility"
                >
                  notice
                </visibility-toggle>
                <visibility-toggle
                  v-if="$attrs.section === 'translation' || $attrs.section === 'transcription' || $attrs.section === 'facsimile'"
                  class="control"
                  :action="toggleTranscriptionVisibility"
                  :visible="transcriptionVisibility"
                >
                  transcription
                </visibility-toggle>
                <visibility-toggle
                  v-if="$attrs.section === 'translation'"
                  class="control"
                  :action="toggleTranslationVisibility"
                  :visible="translationVisibility"
                >
                  traduction
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

            <i-i-i-f-viewer
              v-if="canvasManifestInfo"
              :key="`${canvasManifestInfo}${showContent}`"
              :info="canvasManifestInfo"
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
            <div
              v-if="$attrs.section !== 'commentaries'"
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
                  v-if="$attrs.section === 'notice'"
                  class="control"
                  :action="toggleNoticeVisibility"
                  :visible="noticeVisibility"
                >
                  notice
                </visibility-toggle>
                <visibility-toggle
                  v-if="$attrs.section === 'translation' || $attrs.section === 'transcription' || $attrs.section === 'facsimile'"
                  class="control"
                  :action="toggleTranscriptionVisibility"
                  :visible="transcriptionVisibility"
                >
                  transcription
                </visibility-toggle>
                <visibility-toggle
                  v-if="$attrs.section === 'translation'"
                  class="control"
                  :action="toggleTranslationVisibility"
                  :visible="translationVisibility"
                >
                  traduction
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

            <div
              v-if="!!document"
              class="container"
              :class="`${imageVisibility ? '' : 'is-fluid' }`"
            >
              <!-- Notice -->
              <document-edition-notice
                v-if="$attrs.section === 'notice'"
                :document="document"
              />
              <!-- Transcription -->
              <div v-if="$attrs.section === 'transcription'">
                <!-- transcription error -->
                <div v-if="transcriptionError && !selectedUserHasTranscription">
                  <message
                    v-if="transcriptionError.response.status === 404"
                    message-class="is-info "
                  >
                    <p class="m-b-sm">
                      <span v-if="selectedUserId === currentUser.id">Vous n'avez</span>
                      <span v-else>{{ selectedUser.first_name }} {{ selectedUser.last_name }} n'a</span>
                      pas encore commencé à transcrire ce document.
                    </p>
                    <div
                      v-if="currentUser.id === selectedUser.id"
                      class="button is-info"
                      @click="addNewTranscription"
                    >
                      Commencer à transcrire
                    </div>
                  </message>
                  <message
                    v-else
                    message-class="is-danger"
                  >
                    {{ transcriptionError }}
                  </message>
                </div>
                <!-- transcription readonly -->
                <div v-else-if="isTranscriptionReadOnly">
                  <transcription-action-bar />
                  <message
                    v-if="isTranscriptionValidated || currentUser.id !== selectedUserId"
                    message-class=""
                  >
                    <span v-if="currentUser.id == documentOwner.id">
                      <p class="m-b-sm">Ce contenu a été soumis par {{ selectedUser.first_name }} {{ selectedUser.last_name }}.</p>
                    </span>
                    <span v-else>Ce contenu a été validé par {{ documentOwner.first_name }} {{ documentOwner.last_name }} et n'est plus modifiable.</span>
                  </message>
                  <document-transcription
                    :readonly-data="transcriptionView"
                  />
                </div>
                <!-- transcription edition -->
                <div v-else>
                  <transcription-action-bar />
                  <document-edition-transcription
                    :transcription-with-notes="transcriptionWithNotes"
                  />
                </div>
              </div>
              <!-- Translation -->
              <div v-if="$attrs.section === 'translation'">
                <!-- translation error -->
                <div v-if="translationError && !selectedUserHasTranslation || !isTranscriptionValidated">
                  <message
                    v-if="!isTranscriptionValidated"
                    message-class="is-info "
                  >
                    Vous devez valider la transcription avant d'entammer la traduction
                  </message>
                  <message
                    v-else-if="translationError.response.status === 404"
                    message-class="is-info"
                  >
                    <p class="m-b-sm">
                      <span v-if="selectedUserId === currentUser.id">Vous n'avez</span>
                      <span v-else>{{ selectedUser.first_name }} {{ selectedUser.last_name }} n'a</span>
                      pas encore commencé à traduire ce document.
                    </p>
                    <div 
                      v-if="currentUser.id === selectedUser.id"
                      class="button is-info"
                      @click="addNewTranslation"
                    >
                      Commencer à traduire
                    </div>
                  </message>
                  <message
                    v-else
                    message-class="is-danger"
                  >
                    {{ translationError }}
                  </message>
                </div>
                <!-- translation readonly -->
                <div v-else-if="isTranslationReadOnly">
                  <message
                    v-if="isTranslationValidated || currentUser.id !== selectedUserId"
                    message-class=""
                  >
                    <span v-if="currentUser.id == documentOwner.id">
                      Ce contenu a été soumis par {{ selectedUser.first_name }} {{ selectedUser.last_name }}.
                    </span>
                    <span v-else>Ce contenu a été validé par {{ documentOwner.first_name }} {{ documentOwner.last_name }} et n'est plus modifiable.</span>
                  </message>
                  <document-translation 
                    v-if="!transcriptionVisibility || currentUser.id !== selectedUserId"
                    :readonly-data="translationView"
                  />
                  <document-transcription-alignment
                    v-if="isTranslationValidated && transcriptionView && translationView && transcriptionVisibility && currentUser.id === selectedUserId"
                    :readonly-data="transcriptionAlignmentView"
                  />
                </div>
                <!-- translation edition -->
                <div v-else>
                  <translation-action-bar />
                  <document-edition-translation
                    :translation-with-notes="translationWithNotes"
                  />
                </div>
              </div>
              <!-- Facsimilé -->
              <div v-if="currentUserIsTeacher">
                <document-edition-facsimile
                  v-if="$attrs.section === 'facsimile'"
                  :transcription-with-notes="transcriptionWithNotes"
                />
              </div>

              <!-- Commentaires -->
              <div
                v-if="$attrs.section === 'commentaries'"
                class="m-t-md"
              >
                <!-- commentaries error -->
                <div v-if="commentariesError && !selectedUserHasCommentaries || !isTranscriptionValidated">
                  <message
                    v-if="!isTranscriptionValidated"
                    message-class="is-info "
                  >
                    Vous devez valider la transcription avant d'entammer la rédaction de commentaires
                  </message>
                  <message
                    v-else-if="commentariesError.response && commentariesError.response.status === 404"
                    message-class="is-info "
                  >
                    <p class="m-b-sm">
                      <span v-if="selectedUserId === currentUser.id">Vous n'avez</span>
                      <span v-else>{{ selectedUser.first_name }} {{ selectedUser.last_name }} n'a</span>
                      pas encore ajouté de commentaire pour ce document
                    </p>
                    <div
                      v-if="currentUser.id === selectedUser.id"
                      class="button is-info"
                      @click="addNewCommentaries"
                    >
                      Ajouter un commentaire
                    </div>
                  </message>
                  <message
                    v-else
                    message-class="is-danger"
                  >
                    {{ commentariesError }}
                  </message>
                </div>
                <!-- commentaries readonly -->
                <div v-else-if="isCommentariesReadOnly">
                  <message
                    v-if="isCommentariesValidated || currentUser.id !== selectedUserId"
                    message-class=""
                  >
                    <span v-if="currentUser.id == documentOwner.id">
                      <p class="m-b-sm">Ce contenu a été soumis par {{ selectedUser.first_name }} {{ selectedUser.last_name }}.</p>
                    </span>
                    <span v-else>Ce contenu a été validé par {{ documentOwner.first_name }} {{ documentOwner.last_name }} et n'est plus modifiable.</span>
                  </message>
                  <document-commentaries
                    :readonly-data="commentariesView"
                    :show-transcription="true"
                  />
                </div>
                <div v-else>
                  <!-- commentaries edition -->
                  <document-edition-commentaries />
                </div>
              </div>

              <!-- Parties du discours -->
              <div v-if="$attrs.section === 'speech-parts'">
                <!-- Parties du discours error -->
                <div v-if="!isTranscriptionValidated">
                  <message
                    v-if="!isTranscriptionValidated"
                    message-class="is-info "
                  >
                    Vous devez valider la transcription avant d'entammer l'identification des parties de discours
                  </message>
                  <message
                    v-else-if="speechPartsError.response.status !== 404"
                    message-class="is-danger"
                  >
                    {{ speechPartsError }}
                  </message>
                </div>
                <!-- speechparts readonly -->
                <div v-else-if="isSpeechPartsReadOnly">
                  <message
                    v-if="isSpeechPartsValidated || currentUser.id !== selectedUserId"
                    message-class=""
                  >
                    <span v-if="currentUser.id == documentOwner.id">
                      Ce contenu a été soumis par {{ selectedUser.first_name }} {{ selectedUser.last_name }}.
                    </span>
                    <span v-else>Ce contenu a été validé par {{ documentOwner.first_name }} {{ documentOwner.last_name }} et n'est plus modifiable.</span>
                  </message>
                  <document-speech-parts 
                    v-if="!speechpartsVisibility || currentUser.id !== selectedUserId"
                    :readonly-data="speechPartsView"
                  />
                </div>
                <!-- translation edition -->
                <div v-else>
                  <speech-parts-action-bar />
                  <document-edition-speech-parts
                    :transcription-with-speech-parts="transcriptionWithSpeechparts"
                  />
                </div>
              </div>
            </div>
            <div 
              v-show="!imageVisibility"
              class="column is-one-quarter"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- modals -->
    <div v-if="!loading">
      <delete-transcription-modal 
        v-if="$attrs.section === 'transcription'"
        :doc-id="parseInt($attrs.docId)"
        :user-id="selectedUserId"
      />
      <delete-translation-modal
        v-if="$attrs.section === 'translation'"
        :doc-id="parseInt($attrs.docId)"
        :user-id="selectedUserId"
      />
      <delete-commentary-modal v-if="$attrs.section === 'commentaries'" />
    </div>
  </div>
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'

import DocumentEditionNotice from '../components/document/edition/DocumentEditionNotice.vue'
import DocumentEditionTranscription from '../components/document/edition/DocumentEditionTranscription.vue'
import DocumentEditionTranslation from '../components/document/edition/DocumentEditionTranslation.vue'
import DocumentEditionFacsimile from '../components/document/edition/DocumentEditionFacsimile.vue'

import DocumentEditionCommentaries from '../components/document/edition/DocumentEditionCommentaries.vue'
import DocumentEditionSpeechParts from '../components/document/edition/DocumentEditionSpeechParts.vue'

import DocumentNotice from '../components/document/view/DocumentNotice.vue'
import DocumentTranscription from '../components/document/view/DocumentTranscription.vue'
import DocumentTranslation from '@/components/document/view/DocumentTranslation.vue'
import DocumentTranscriptionAlignment from '@/components/document/view/DocumentTranscriptionAlignment.vue'
import DocumentCommentaries from '@/components/document/view/DocumentCommentaries.vue'
import DocumentSpeechParts from '@/components/document/view/DocumentSpeechParts.vue'

import IIIFViewer from '@/components/IIIFViewer.vue'
import WorkflowRadioSteps from '@/components/WorkflowRadioSteps.vue'

import DocumentTitleBar from '../components/document/DocumentTitleBar.vue'
import TranscriptionActionBar from '@/components/document/edition/actionbars/TranscriptionActionBar.vue'
import TranslationActionBar from '@/components/document/edition/actionbars/TranslationActionBar.vue'
import SpeechPartsActionBar from '@/components/document/edition/actionbars/SpeechPartsActionBar.vue'

import Message from '@/components/Message.vue'
import VisibilityToggle from '@/components/ui/VisibilityToggle.vue'

import DeleteTranscriptionModal from '@/components/document/edition/modals/DeleteTranscriptionModal.vue'
import DeleteTranslationModal from '@/components/document/edition/modals/DeleteTranslationModal.vue'
import DeleteCommentaryModal from '@/components/document/edition/modals/DeleteCommentaryModal.vue'


export default {
    name: "DocumentEditionPage",
    components: {

        DocumentTitleBar,
        TranscriptionActionBar,
        TranslationActionBar,
        SpeechPartsActionBar,

        DocumentEditionNotice,
        DocumentEditionTranscription,
        DocumentEditionTranslation,
        DocumentEditionFacsimile,
        DocumentEditionCommentaries,
        DocumentEditionSpeechParts,

        DocumentTranscription,
        DocumentTranslation,
        DocumentTranscriptionAlignment,
        DocumentCommentaries,
        DocumentSpeechParts,

        IIIFViewer,
        WorkflowRadioSteps,

        Message,
        VisibilityToggle,

        DeleteTranscriptionModal,
        DeleteTranslationModal,
        DeleteCommentaryModal,

        /*

        */
    },
    props: {
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (!vm.loggedIn) {
          if (to.name === 'document-edition') {
            next({name: 'document-view'})
          } else {
            next({name: 'login'})
          }
        } else {
          next()
        }
      })
    },
    data() {
      return {
        
        init: false,

        transcriptionAlignmentError: null,

        imageVisibility: this.$attrs.section !== 'commentaries',
        noticeVisibility: true,
        transcriptionVisibility: true,
        translationVisibility: true,
        speechpartsVisibility: true,
      }
    },
    computed: {
        ...mapState('document', ['document', 'loading', 'transcriptionView', 
        'translationView', 'transcriptionAlignmentView', 'commentariesView', 'speechPartsView']),
        ...mapState('workflow', ['selectedUserId']),
        ...mapState('transcription', ['transcriptionWithNotes', 'transcriptionWithSpeechparts', 'transcriptionError']),
        ...mapState('translation', ['translationWithNotes', 'translationError']),
        ...mapState('commentaries', ['commentaries', 'commentariesError']),
        ...mapState('speechparts', ['speechPartsError']),

        ...mapState('user', ['currentUser']),

        ...mapGetters('user', ['loggedIn', 'currentUserIsAdmin', 'currentUserIsTeacher', 'currentUserIsStudent', 'userFromWhitelist']),
        ...mapGetters('workflow', ['isTranscriptionValidated', 'isTranslationValidated',
        'isTranscriptionReadOnly', 'isTranslationReadOnly', 'isSpeechPartsReadOnly', 'isSpeechPartsValidated',
        'isCommentariesReadOnly', 'isCommentariesValidated',
        'selectedUserHasTranscription', 'selectedUserHasTranslation', 
        'selectedUserHasFacsimile', 'selectedUserHasCommentaries', 'selectedUserHasSpeechParts']),
        ...mapGetters('document', ['documentOwner', 'getManifestInfoUrl']),

        showContent() {
          switch(this.$attrs.section){
            case 'transcription':
              return this.transcriptionVisibility
            case 'translation':
              return this.translationVisibility || this.transcriptionVisibility
            case 'facsimile':
              return this.transcriptionVisibility
            case 'notice':
              return this.noticeVisibility
            case 'commentaries':
              return true
            case 'speech-parts':
              return this.speechpartsVisibility
            default:
              return true
          }
          
        },
        selectedUser() {
          const u = this.userFromWhitelist(this.document.whitelist, this.selectedUserId)
          return u ? u : this.currentUser
        },

        canvasManifestInfo() {
          return this.getManifestInfoUrl(0)
        },
    },
    watch:{
      selectedUserId() {
        if (this.init) {
          this.fetchContentFromUser()
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
      await this.fetchContentFromUser()
      this.init = true
    },
    methods: {
      ...mapActions('transcription', {
        'fetchTranscriptionContent': 'fetchTranscriptionContent',
        'createTranscription': 'addNewTranscription'
        }),
      ...mapActions('translation', {
        'fetchTranslationContent': 'fetchTranslationContent',
        'createTranslation': 'addNewTranslation'
        }),
      ...mapActions('document', {
        'fetchOne': 'fetch',
        'fetchTranscriptionAlignmentView': 'fetchTranscriptionAlignmentView'
        }),
      ...mapActions('commentaries', {
        'fetchCommentariesContent': 'fetchCommentariesContent',
        'setCommentariesError' : 'setError'
        }),
      ...mapActions('speechparts', {
        'fetchSpeechPartsContent': 'fetchSpeechPartsContent',
        }),
      async fetchContentFromUser(){
        await this.fetchSpeechPartsContent()

        await this.fetchTranscriptionContent()
        await this.fetchTranslationContent()
        try {
          this.transcriptionAlignmentError = null
          await this.fetchTranscriptionAlignmentView()
        } catch(error) {
          this.transcriptionAlignmentError = error
        }
        await this.fetchCommentariesContent()
      },
      async addNewTranscription() {
        await this.createTranscription()
        if (!this.transcriptionError) {
          await this.fetchTranscriptionContent()
        }
      },
      async addNewTranslation() {
        await this.createTranslation()
        if (!this.translationError){
          await this.fetchTranslationContent()
        }
      },
      async addNewCommentaries() {
        this.setCommentariesError(null)
      },
      hideImage() {
        this.imageVisibility = false
      },
      showImage() {
        this.imageVisibility = true
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