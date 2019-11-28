<template>
  <div class="m-b-md">
    <div class="field is-grouped">
      <!-- VALIDATE / UNVALIDATE TRANSCRIPTION --> 
      <p
        v-if="currentUserIsTeacher && currentUser.id === selectedUserId"
        class="control"
      >
        <button
          class="button is-small"
          :class="`${isTranscriptionValidated ? 'is-success' : 'is-light'}`"
          @click="toggleTranscriptionValidation"
        >
          <span> {{ isTranscriptionValidated ? 'Transcription validée' : 'Valider la transcription' }} </span>
          <span
            v-show="isTranscriptionValidated"
            class="icon"
          >
            <i class="fa fa-check" />
          </span>
        </button>
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
import { TRANSCRIPTION_STEP, NONE_STEP} from '../../../store/modules/workflow'

import DeleteTranscriptionButton from './actions/DeleteTranscriptionButton.vue'

export default {
    name: 'TranscriptionActionBar',
    components: {
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
      validateTranscription() {
        // TODO: give warnings about side effects
        return this.$store.dispatch('document/setValidationStep', {docId: this.document.id, step: TRANSCRIPTION_STEP}) 
      },
      unvalidateTranscription() {
        // TODO: give warnings about side effects
        return this.$store.dispatch('document/setValidationStep', {docId: this.document.id, step: NONE_STEP}) 
      },
      toggleTranscriptionValidation() {
        if (this.isTranscriptionValidated) {
          return this.unvalidateTranscription()
        } else {
          return this.validateTranscription()
        }
      },
    }
}
</script>