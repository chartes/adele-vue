<template>
  <div class="field is-grouped">
    <!-- VALIDATE / UNVALIDATE TRANSLATION --> 
    <p class="control">
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
    </p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { TRANSCRIPTION_STEP, TRANSLATION_STEP, NONE_STEP} from '../../../store/modules/workflow'

export default {
    name: 'TranslationActionBar',
    components: {

    },
    computed: {
        ...mapState('document', ['document']),
        ...mapGetters('user', ['loggedIn', 'currentUserIsTeacher']),
        ...mapGetters('workflow', ['isTranslationValidated'])
    },
    methods: {
      validateTranslation() {
        // TODO: give warnings about side effects
        return this.$store.dispatch('document/setValidationStep', {docId: this.document.id, step: TRANSLATION_STEP}) 
      },
      unvalidateTranslation() {
        // TODO: give warnings about side effects
        return this.$store.dispatch('document/setValidationStep', {docId: this.document.id, step: TRANSCRIPTION_STEP}) 
      },
      toggleTranslationValidation() {
        if (this.isTranslationValidated) {
          return this.unvalidateTranslation()
        } else {
          return this.validateTranslation()
        }
      }
    }
}
</script>