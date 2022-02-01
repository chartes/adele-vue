<template>
  <div
    v-if="!isTranscriptionReadOnly"
    class="edition-action-bar m-b-md"
  >
    <div class="field is-grouped">
      <!-- SAVE TRANSCRIPTION --> 
      <p 
        class="control"
      >
        <save-transcription-button />
      </p>
      <!-- VALIDATE / UNVALIDATE TRANSCRIPTION --> 
      <p
        v-if="currentUserIsTeacher && selectedUserId == document.user_id"
        class="control"
      >
        <validate-transcription-button :doc-id="document.id" />
      </p>
      <!-- CLONE TRANSCRIPTION --> 
      <p
        v-if="currentUserIsTeacher && currentUser.id !== selectedUserId"
        class="control"
      >
        <clone-transcription-button />
      </p>
      <!-- DELETE TRANSCRIPTION --> 
      <p
        v-if="currentUserIsTeacher || !isTranscriptionReadOnly"
        class="control"
      >
        <delete-transcription-button
          :doc-id="document.id"
          :user-id="selectedUserId"
        />
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import SaveTranscriptionButton from '../actions/SaveTranscriptionButton.vue'
import ValidateTranscriptionButton from '../actions/ValidateTranscriptionButton.vue'
import DeleteTranscriptionButton from '../actions/DeleteTranscriptionButton.vue'
import CloneTranscriptionButton from '../actions/CloneTranscriptionButton.vue'

export default {
    name: 'TranscriptionActionBar',
    components: {
      SaveTranscriptionButton,
      ValidateTranscriptionButton,
      DeleteTranscriptionButton,
      CloneTranscriptionButton
    },
    computed: {
        ...mapState('document', ['document']),
        ...mapState('workflow', ['selectedUserId']),
        ...mapState('user', ['currentUser']),
        ...mapGetters('user', ['currentUserIsTeacher']),
        ...mapGetters('workflow', ['isTranscriptionValidated', 'isTranscriptionReadOnly' ])
    },
    methods: {
      
    }
}
</script>