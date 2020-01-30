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
        return this.$store.dispatch('document/setValidationFlag', {docId: this.$props.docId, flagName: 'transcription'}) 
      },
      unvalidateTranscription() {
        // TODO: give warnings about side effects
        return this.$store.dispatch('document/unsetValidationFlag', {docId: this.$props.docId, flagName: 'transcription'}) 
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