<template>
  <div class="m-b-md">
    <div class="field is-grouped">
      <!-- VALIDATE / UNVALIDATE TRANSCRIPTION --> 
      <p
        v-if="currentUserIsTeacher && currentUser.id === selectedUserId"
        class="control"
      >
        <validate-transcription-button :doc-id="document.id" />
      </p>
      <!-- DELETE / TRANSCRIPTION --> 
      <p
        v-if="currentUserIsTeacher"
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
import { TRANSCRIPTION_STEP, NONE_STEP} from '@/store/modules/workflow'

import DeleteTranscriptionButton from './actions/DeleteTranscriptionButton.vue'
import ValidateTranscriptionButton from './actions/ValidateTranscriptionButton.vue'

export default {
    name: 'TranscriptionActionBar',
    components: {
      ValidateTranscriptionButton,
      DeleteTranscriptionButton
    },
    computed: {
        ...mapState('document', ['document']),
        ...mapState('workflow', ['selectedUserId']),
        ...mapState('user', ['currentUser']),
        ...mapGetters('user', ['loggedIn', 'currentUserIsTeacher']),
        ...mapGetters('workflow', ['isTranscriptionValidated', ])
    },
    methods: {
      
    }
}
</script>