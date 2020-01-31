<template>
  <button
    class="button is-small"
    :class="`${isTranslationValidated ? 'is-success' : 'is-light'}`"
    :disabled="!isTranscriptionValidated"
    @click="toggleTranslationValidation"
  >
    <span> {{ isTranslationValidated ? 'Traduction validée' : 'Valider la traduction' }} </span>
    <span
      v-show="isTranslationValidated"
      class="icon"
    >
      <i class="fa fa-check" />
    </span>
  </button>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    name: 'ValidateTranslationButton',
    components: {

    },
    props: {
        docId: {type: Number, default: null}
    },
    computed: {
      ...mapGetters('workflow', ['isTranslationValidated', 'isTranscriptionValidated' ])
    },
    methods: {
      validateTranslation() {
        // TODO: give warnings about side effects
        return this.$store.dispatch('document/setValidationFlag', {docId: this.$props.docId, flagName: 'translation'}) 
      },
      unvalidateTranslation() {
        // TODO: give warnings about side effects
        return this.$store.dispatch('document/unsetValidationFlag', {docId: this.$props.docId, flagName: 'translation'}) 
      },
      toggleTranslationValidation() {
        if (this.isTranslationValidated) {
          return this.unvalidateTranslation()
        } else {
          return this.validateTranslation()
        }
      },
    }
}
</script>