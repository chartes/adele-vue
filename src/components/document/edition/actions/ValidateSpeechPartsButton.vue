<template>
  <button
    class="button is-small"
    :class="`${isSpeechPartsValidated ? 'is-success' : 'is-light'}`"
    :disabled="!isTranscriptionValidated"
    @click="toggleSpeechPartsValidation"
  >
    <span> {{ isSpeechPartsValidated ? 'Parties du discours validées' : 'Valider' }} </span>
    <span
      v-show="isSpeechPartsValidated"
      class="icon"
    >
      <i class="fa fa-check" />
    </span>
  </button>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    name: 'ValidateSpeechPartsButton',
    components: {

    },
    props: {
        docId: {type: Number, default: null}
    },
    computed: {
      ...mapGetters('workflow', ['isSpeechPartsValidated', 'isTranscriptionValidated' ])
    },
    methods: {
      validateSpeechParts() {
        // TODO: give warnings about side effects
        return this.$store.dispatch('document/setValidationFlag', {docId: this.$props.docId, flagName: 'speech-parts'}) 
      },
      unvalidateSpeechParts() {
        // TODO: give warnings about side effects
        return this.$store.dispatch('document/unsetValidationFlag', {docId: this.$props.docId, flagName: 'speech-parts'}) 
      },
      toggleSpeechPartsValidation() {
        if (this.isSpeechPartsValidated) {
          return this.unvalidateSpeechParts()
        } else {
          return this.validateSpeechParts()
        }
      },
    }
}
</script>