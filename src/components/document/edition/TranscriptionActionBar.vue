<template>
  <div class="field is-grouped">
    <!-- VALIDATE / UNVALIDATE TRANSCRIPTION --> 
    <p class="control">
      <button
        v-if="isTranscriptionValidated"
        class="button is-success is-small"
        @click="unvalidateTranscription"
      >
        <span> Validé </span>
        <span class="icon">
          <i class="fa fa-check" />
        </span>
      </button>
      <button
        v-else
        class="button is-light is-small"
        @click="validateTranscription"
      >
        <span> Valider </span>
      </button>
    </p>
   
    <p class="control m-l-md">
      <button class="button is-light is-small">
        Cloner
      </button>
    </p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { TRANSCRIPTION_STEP, NONE_STEP} from '../../../store/modules/workflow'

export default {
    name: 'TranscriptionActionBar',
    components: {

    },
    computed: {
        ...mapState('document', ['document']),
        ...mapGetters('user', ['loggedIn', 'currentUserIsTeacher']),
        ...mapGetters('workflow', ['isTranscriptionValidated'])
    },
    methods: {
      validateTranscription() {
        // TODO: give warnings about side effects
        return this.$store.dispatch('document/setValidationStep', {docId: this.document.id, step: TRANSCRIPTION_STEP}) 
      },
      unvalidateTranscription() {
        // TODO: give warnings about side effects
        return this.$store.dispatch('document/setValidationStep', {docId: this.document.id, step: NONE_STEP}) 
      }
    }
}
</script>