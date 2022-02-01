<template>
  <div
    v-if="!isSpeechPartsReadOnly"
    class="edition-action-bar"
  >
    <div class="field is-grouped">
      <!-- SAVE SPEECH PARTS 
      <p 
        class="control"
      >
        <save-speech-parts-button />
      </p>
      --> 
      <!-- VALIDATE / UNVALIDATE SPEECH PARTS --> 
      <p
        v-if="currentUserIsTeacher && selectedUserId == document.user_id"
        class="control  m-b-md"
      >
        <validate-speech-parts-button :doc-id="document.id" />
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

//import SaveSpeechPartsButton from '../actions/SaveSpeechPartsButton.vue'
import ValidateSpeechPartsButton from '../actions/ValidateSpeechPartsButton.vue'

export default {
    name: 'SpeechPartsActionBar',
    components: {
     // SaveSpeechPartsButton,
      ValidateSpeechPartsButton
    },
    computed: {
        ...mapState('document', ['document']),
        ...mapState('workflow', ['selectedUserId']),
        ...mapState('user', ['currentUser']),
        ...mapGetters('user', ['isAuthenticated', 'currentUserIsTeacher']),
        ...mapGetters('workflow', ['isTranscriptionValidated', 'isTranscriptionReadOnly',
        'isSpeechPartsValidated', 'isSpeechPartsReadOnly' ])
    },
    methods: {
      
    }
}
</script>