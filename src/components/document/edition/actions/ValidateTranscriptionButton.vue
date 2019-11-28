<template>
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
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { TRANSCRIPTION_STEP, NONE_STEP} from '@/store/modules/workflow'

export default {
    name: 'ValidateTranscriptionButton',
    components: {

    },
    props: {
        docId: {type: Number, default: null}
    },
    computed: {
      ...mapGetters('workflow', ['isTranscriptionValidated', ])
    },
    methods: {
      validateTranscription() {
        // TODO: give warnings about side effects
        return this.$store.dispatch('document/setValidationStep', {docId: this.$props.docId, step: TRANSCRIPTION_STEP}) 
      },
      unvalidateTranscription() {
        // TODO: give warnings about side effects
        return this.$store.dispatch('document/setValidationStep', {docId: this.$props.docId, step: NONE_STEP}) 
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