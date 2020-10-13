<template>
  <div class="edition-action-bar m-b-md">
    <div class="field is-grouped">
      <!-- SAVE TRANSLATION --> 
      <p 
        v-if="!isTranslationReadOnly && !transcriptionAlignmentMode"
        class="control"
      >
        <save-translation-button />
      </p>
      <!-- VALIDATE / UNVALIDATE TRANSLATION --> 
      <p
        v-if="currentUserIsTeacher && currentUser.id === selectedUserId && !transcriptionAlignmentMode"
        class="control"
      >
        <validate-translation-button :doc-id="document.id" />
      </p>
   
      <!-- DELETE TRANSLATION --> 
      <p
        v-if="currentUserIsTeacher && !transcriptionAlignmentMode"
        class="control"
      >
        <delete-translation-button
          :doc-id="document.id"
          :user-id="selectedUserId"
        />
      </p>
      <!-- ALIGNMENT TRANSLATION --> 
      <p
        v-if="transcriptionAlignmentMode"
        class="control "
      >
        <save-translation-alignment-button />
      </p>
      <p
        v-if="showAlignmentButton"
        class="control "
      >
        <transcription-alignment-button />
      </p>
      <p
        v-if="transcriptionAlignmentMode && !warningConditions"
        class="control"
      >
        <message>
          Le nombre de segments doit être identique entre la transcription et la traduction
        </message>
      </p>
      {{ transcriptionSegmentsFromQuill.length }} {{ this.translationSegmentsFromQuill.length }}
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import DeleteTranslationButton from '../actions/DeleteTranslationButton.vue'
import ValidateTranslationButton from '../actions/ValidateTranslationButton.vue'
import TranscriptionAlignmentButton from '../actions/TranscriptionAlignmentButton.vue'
import SaveTranslationButton from '../actions/SaveTranslationButton.vue'
import SaveTranslationAlignmentButton from '../actions/SaveTranslationAlignmentButton.vue'
import Message from '@/components/Message.vue'

export default {
    name: 'TranslationActionBar',
    components: {
      ValidateTranslationButton,
      DeleteTranslationButton,
      TranscriptionAlignmentButton,
      SaveTranslationButton,
      SaveTranslationAlignmentButton,
      Message
    },
    computed: {
        ...mapState('document', ['document']),
        ...mapState('workflow', ['selectedUserId', 'transcriptionAlignmentMode']),
        ...mapState('user', ['currentUser']),
        ...mapGetters('user', ['loggedIn', 'currentUserIsAdmin', 'currentUserIsTeacher', 'currentUserIsStudent']),
        ...mapGetters('workflow', [
          'isTranscriptionValidated', 'selectedUserHasTranscription',
          'isTranslationValidated', 'selectedUserHasTranslation', 'isTranslationReadOnly'
      ]),
      showAlignmentButton() {
          return this.isTranslationValidated && this.currentUserIsTeacher && this.currentUser.id === this.selectedUserId
      },
      ...mapGetters('translation', ['translationSegmentsFromQuill']),
      ...mapGetters('transcription', ['transcriptionSegmentsFromQuill']),
      warningConditions() {
        return this.transcriptionSegmentsFromQuill.length === this.translationSegmentsFromQuill.length
      }
    },
    methods: {
      
    }
}
</script>