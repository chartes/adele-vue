<template>
  <div class="m-b-md">
    <div class="field is-grouped">
      <!-- SAVE TRANSCRIPTION --> 
      <p 
        v-if="!isSpeechPartsReadOnly"
        class="control"
      >
        <save-transcription-button />
      </p>
      <!-- VALIDATE / UNVALIDATE SPEECH PARTS --> 
      <!-- VALIDATE / UNVALIDATE TRANSCRIPTION --> 
      <p
        v-if="currentUserIsTeacher && currentUser.id === selectedUserId"
        class="control"
      >
        <validate-speech-parts-button :doc-id="document.id" />
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import SaveTranscriptionButton from '../actions/SaveTranscriptionButton.vue'
import ValidateSpeechPartsButton from '../actions/ValidateSpeechPartsButton.vue'
import DeleteTranscriptionButton from '../actions/DeleteTranscriptionButton.vue'

export default {
    name: 'SpeechPartsActionBar',
    components: {
      SaveTranscriptionButton,
      ValidateSpeechPartsButton
    },
    computed: {
        ...mapState('document', ['document']),
        ...mapState('workflow', ['selectedUserId']),
        ...mapState('user', ['currentUser']),
        ...mapGetters('user', ['loggedIn', 'currentUserIsTeacher']),
        ...mapGetters('workflow', ['isTranscriptionValidated', 'isTranscriptionReadOnly',
        'isSpeechPartsValidated', 'isSpeechPartsReadOnly' ])
    },
    methods: {
      
    }
}
</script>