<template>
  <div class="section">
    <div
      v-if="document"
      class="container is-fluid"
    >
      <document-title-bar />
      <workflow-steps />
      
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
              <li
                v-if="isTranscriptionValidated || currentUserIsTeacher"
                :class="$attrs.section === 'translation' ? `is-active`: ''"
              >
                <router-link :to="{name: 'document-edition', params: {docId: $attrs.docId, section:'translation'}}">
                  <span v-if="currentUserIsTeacher">Traduction et alignement</span>
                  <span v-else>Traduction</span>
                </router-link>
              </li>
              <li
                :class="$attrs.section === 'commentaries' ? `is-active`: ''"
              >
                <router-link :to="{name: 'document-edition', params: {docId: $attrs.docId, section:'commentaries'}}">
                  Commentaires
                </router-link>
              </li>
              <!-- students don't get to deal with facsimile alignment -->
              <li
                v-if="currentUserIsTeacher"
                :class="$attrs.section === 'facsimile' ? `is-active`: ''"
              >
                <router-link :to="{name: 'document-edition', params: {docId: $attrs.docId, section:'facsimile'}}">
                  Facsimilé
                </router-link>
              </li>
              <li
                v-if="currentUserIsTeacher"
                :class="$attrs.section === 'speech-parts' ? `is-active`: ''"
              >
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
            <!-- Notice -->
            <document-edition-notice
              v-if="$attrs.section === 'notice'"
              :document="document"
            />
            <!-- Transcription -->
            <div v-if="$attrs.section === 'transcription'">
              <!-- transcription read only-->
              <div v-if="isTranscriptionReadOnly && transcriptionError === null">
                <message
                  v-if="isTranscriptionValidated"
                  message-class=" is-small"
                >
                  Ce contenu a été édité par 
                  <span v-if="currentUserIsTeacher">{{ selectedUser.first_name }} {{ selectedUser.last_name }}.</span>
                  <span v-else>{{ documentOwner.first_name }} {{ documentOwner.last_name }}</span>
                </message>
                <document-transcription
                  :readonly-data="transcriptionView"
                />
              </div>
              <div v-else-if="transcriptionError">
                <message
                  v-if="transcriptionError.response.status === 404"
                  message-class="is-info is-small"
                >
                  <span v-if="selectedUserId === currentUser.id">Vous n'avez</span>
                  <span v-else>{{ selectedUser.first_name }} {{ selectedUser.last_name }} n'a</span>
                  pas encore soumis de transcription pour ce document.
                </message>
                <message
                  v-else
                  message-class="is-danger"
                >
                  {{ transcriptionError }}
                </message>
              </div>
              <!-- transcription edition -->
              <div v-else>
                <transcription-action-bar v-if="currentUserIsTeacher" />
                <document-edition-transcription
                  :transcription-with-notes="transcriptionWithNotes"
                />
              </div>
            </div>
            <!-- Translation -->
            <div v-if="$attrs.section === 'translation'">
              <!-- translation read only-->
              <div v-if="isTranslationReadOnly && translationError === null">
                <message
                  v-if="isTranslationValidated"
                  message-class="is-small"
                >
                  Ce contenu a été édité par 
                  <span v-if="currentUserIsTeacher">{{ selectedUser.first_name }} {{ selectedUser.last_name }}.</span>
                  <span v-else>{{ documentOwner.first_name }} {{ documentOwner.last_name }}</span>
                </message>
                <document-translation
                  :readonly-data="translationView"
                />
              </div>
              <div v-else-if="translationError">
                <message
                  v-if="translationError.response.status === 404"
                  message-class="is-info is-small"
                >
                  <span v-if="selectedUserId === currentUser.id">Vous n'avez</span>
                  <span v-else>{{ selectedUser.first_name }} {{ selectedUser.last_name }} n'a</span>
                  pas encore soumis de traduction pour ce document.
                </message>
                <message
                  v-else
                  message-class="is-danger"
                >
                  {{ translationError }}
                </message>
              </div>
              <!-- translation edition -->
              <div v-else>
                <translation-action-bar v-if="currentUserIsTeacher" />
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
            <document-edition-commentaries
              v-if="$attrs.section === 'commentaries'"
              :document="document"
            />
            <!-- Parties du discours -->
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

import { mapState, mapGetters } from 'vuex'

import DocumentEditionNotice from '../components/document/edition/DocumentEditionNotice.vue'
import DocumentEditionTranscription from '../components/document/edition/DocumentEditionTranscription.vue'
import DocumentEditionTranslation from '../components/document/edition/DocumentEditionTranslation.vue'
import DocumentEditionFacsimile from '../components/document/edition/DocumentEditionFacsimile.vue'

import DocumentEditionCommentaries from '../components/document/edition/DocumentEditionCommentaries.vue'
import DocumentEditionSpeechParts from '../components/document/edition/DocumentEditionSpeechParts.vue'

import DocumentNotice from '../components/document/view/DocumentNotice.vue'
import DocumentTranscription from '../components/document/view/DocumentTranscription.vue'
import DocumentTranslation from '../components/document/view/DocumentTranslation.vue'
import DocumentCommentaries from '../components/document/view/DocumentCommentaries.vue'
import DocumentSpeechParts from '../components/document/view/DocumentSpeechParts.vue'

import IIIFViewer from '../components/IIIFViewer.vue'
import WorkflowSteps from '../components/WorkflowSteps.vue'
import DocumentTitleBar from '../components/document/DocumentTitleBar.vue'
import TranscriptionActionBar from '../components/document/edition/TranscriptionActionBar.vue'
import TranslationActionBar from '../components/document/edition/TranslationActionBar.vue'

import Message from '../components/Message.vue'

import {TRANSCRIPTION_STEP, TRANSLATION_STEP, NONE_STEP} from '../store/modules/workflow'

export default {
    name: "DocumentEditionPage",
    components: {

        DocumentTitleBar,
        TranscriptionActionBar,
        TranslationActionBar,
        
        DocumentEditionNotice,
        DocumentEditionTranscription,
        DocumentEditionTranslation,
        DocumentEditionFacsimile,
        DocumentEditionCommentaries,
        DocumentEditionSpeechParts,

        DocumentTranscription,
        DocumentTranslation,

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
        transcriptionError: null,
        translationError: null
      }
    },
    computed: {
        ...mapState('document', ['document', 'loading', 'transcriptionView', 'translationView', 'transcriptionAlignmentView']),
        ...mapState('workflow', ['selectedUserId']),
        ...mapState('transcription', ['transcriptionWithNotes', 'transcriptionLoading']),
        ...mapState('translation', ['translationWithNotes', 'transcriptionLoading']),
        ...mapState('user', ['currentUser']),

        ...mapGetters('user', ['loggedIn', 'currentUserIsAdmin', 'currentUserIsTeacher', 'currentUserIsStudent', 'userFromWhitelist']),
        ...mapGetters('workflow', ['isTranscriptionValidated', 'isTranslationValidated']),
        ...mapGetters('document', ['documentOwner']),

        isTranscriptionReadOnly() {
          return this.isStepReadOnly(TRANSCRIPTION_STEP)
        },
        isTranslationReadOnly() {
          return this.isStepReadOnly(TRANSLATION_STEP)
        },
        selectedUser() {
          const u = this.userFromWhitelist(this.document.whitelist, this.selectedUserId)
          return u ? u : this.currentUser
        }
    },
    watch:{
      selectedUserId() {
        this.fetchContentFromUser()
      }
    },
    async created() {
      try {
        await this.fetchOne()
      }
      catch (error) {
        this.$router.push({name: 'error', params: {error: error}})
      }
      this.fetchContentFromUser()
    },
    methods: {
      fetchOne() {
        return this.$store.dispatch('document/fetch', {
          id: this.$attrs.docId
        })
      },
      fetchTranscriptionContent() {
        if (this.isTranscriptionReadOnly) {
          // when in readonly mode
          // students see the reference content
          let params = {
            id: this.document.id
          }
          // teacher and admins can see other ppl readonly views
          if (this.currentUserIsTeacher) {
            params.userId = this.selectedUserId 
          }
          return this.$store.dispatch('document/fetchTranscriptionView', params)
        } else {
          return this.$store.dispatch('transcription/fetchTranscriptionFromUser', {
            docId: this.document.id,
            userId: this.selectedUserId
          })
        }
      },
      fetchTranslationContent() {
        if (this.isTranslationReadOnly) {
          // when in readonly mode
          // students see the reference content
          let params = {
            id: this.document.id
          }
          // teacher and admins can see other ppl readonly views
          if (this.currentUserIsTeacher) {
            params.userId = this.selectedUserId 
          }
          return this.$store.dispatch('document/fetchTranslationView', params)
        } else {
          return this.$store.dispatch('translation/fetchTranslationFromUser', {
            docId: this.document.id,
            userId: this.selectedUserId
          })
        }
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
      },

        isStepReadOnly(step) {
          // should be avoidable with guard routing 
          if (this.currentUser === null) {
            return true
          }

          // admin
          if (this.currentUserIsAdmin) {
            return false
          } 
          // teacher
          if (this.currentUserIsTeacher) {
             return this.currentUser.id !== this.selectedUserId
          }
          
          return this.document.validation_step >= step

        },
    }
}
</script>

<style>

</style>