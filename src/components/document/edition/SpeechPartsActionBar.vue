<template>
  <div class="m-b-md">
    <div class="field is-grouped">
      <!-- SAVE TRANSCRIPTION --> 
      <p 
        v-if="!isTranscriptionReadOnly"
        class="control"
      >
        <save-transcription-button />
      </p>
      <!-- VALIDATE / UNVALIDATE SPEECH PARTS --> 
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { TRANSCRIPTION_STEP, NONE_STEP} from '@/store/modules/workflow'

import SaveTranscriptionButton from './actions/SaveTranscriptionButton.vue'
import ValidateTranscriptionButton from './actions/ValidateTranscriptionButton.vue'
import DeleteTranscriptionButton from './actions/DeleteTranscriptionButton.vue'

export default {
    name: 'SpeechPartsActionBar',
    components: {
      SaveTranscriptionButton,
    },
    computed: {
        ...mapState('document', ['document']),
        ...mapState('workflow', ['selectedUserId']),
        ...mapState('user', ['currentUser']),
        ...mapGetters('user', ['loggedIn', 'currentUserIsTeacher']),
        ...mapGetters('workflow', ['isTranscriptionValidated', 'isTranscriptionReadOnly' ])
    },
    methods: {
      
    }
}
</script>