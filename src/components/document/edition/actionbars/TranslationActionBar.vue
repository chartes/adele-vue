<template>
  <div
    v-if="!isTranslationReadOnly"
    class="edition-action-bar m-b-md"
  >
    <div class="field is-grouped">
      <!-- SAVE TRANSLATION --> 
      <p 
        class="control"
      >
        <save-translation-button />
      </p>
      <!-- VALIDATE / UNVALIDATE TRANSLATION --> 
      <p
        v-if="currentUserIsTeacher && selectedUserId == document.user_id && isTranscriptionValidated"
        class="control"
      >
        <validate-translation-button :doc-id="document.id" />
      </p>
      <!-- CLONE TRANSCRIPTION --> 
      <p
        v-if="currentUserIsTeacher && currentUser.id !== selectedUserId"
        class="control"
      >
        <clone-translation-button />
      </p>
      <!-- DELETE TRANSLATION --> 
      <p
        v-if="currentUserIsTeacher"
        class="control"
      >
        <delete-translation-button
          :doc-id="document.id"
          :user-id="selectedUserId"
        />
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import DeleteTranslationButton from '../actions/DeleteTranslationButton.vue'
import ValidateTranslationButton from '../actions/ValidateTranslationButton.vue'
import SaveTranslationButton from '../actions/SaveTranslationButton.vue'
import CloneTranslationButton from '../actions/CloneTranslationButton.vue'

export default {
    name: 'TranslationActionBar',
    components: {
      ValidateTranslationButton,
      DeleteTranslationButton,
      SaveTranslationButton,
      CloneTranslationButton
    },
    computed: {
        ...mapState('document', ['document']),
        ...mapState('workflow', ['selectedUserId']),
        ...mapState('user', ['currentUser']),
        ...mapGetters('user', ['isAuthenticated', 'currentUserIsAdmin', 'currentUserIsTeacher', 'currentUserIsStudent']),
        ...mapGetters('workflow', [
          'isTranscriptionValidated', 'selectedUserHasTranscription',
          'isTranslationValidated', 'selectedUserHasTranslation', 'isTranslationReadOnly'
      ]),
      showAlignmentButton() {
          return this.isTranslationValidated && this.currentUserIsTeacher
      },
    },
    methods: {
      
    }
}
</script>