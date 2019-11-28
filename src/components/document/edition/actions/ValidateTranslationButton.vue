<template>
  <button
    class="button is-small"
    :class="`${isTranslationValidated ? 'is-success' : 'is-light'}`"
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
import { TRANSLATION_STEP, TRANSCRIPTION_STEP} from '@/store/modules/workflow'

export default {
    name: 'ValidateTranslationButton',
    components: {

    },
    props: {
        docId: {type: Number, default: null}
    },
    computed: {
      ...mapGetters('workflow', ['isTranslationValidated', ])
    },
    methods: {
      validateTranslation() {
        // TODO: give warnings about side effects
        return this.$store.dispatch('document/setValidationStep', {docId: this.$props.docId, step: TRANSLATION_STEP}) 
      },
      unvalidateTranslation() {
        // TODO: give warnings about side effects
        return this.$store.dispatch('document/setValidationStep', {docId: this.$props.docId, step: TRANSCRIPTION_STEP}) 
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