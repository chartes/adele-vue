<template>
  <div class="field is-grouped">
    <!-- VALIDATE / UNVALIDATE TRANSLATION --> 
    <p class="control">
      <button
        v-if="isTranslationValidated"
        class="button is-success is-small"
        @click="unvalidateTranslation"
      >
        <span> Validé </span>
        <span class="icon">
          <i class="fa fa-check" />
        </span>
      </button>
      <button
        v-else
        class="button is-light is-small"
        @click="validateTranslation"
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
import { TRANSCRIPTION_STEP, TRANSLATION_STEP, NONE_STEP} from '../../../store/modules/workflow'

export default {
    name: 'TranslationActionBar',
    components: {

    },
    computed: {
        ...mapState('document', ['document']),
        ...mapGetters('user', ['loggedIn', 'currentUserIsTeacher']),
        ...mapGetters('workflow', ['isTranslationValidated', 'isTranscriptionValidated'])
    },
    methods: {
      validateTranslation() {
        // TODO: give warnings about side effects
        return this.$store.dispatch('document/setValidationStep', {docId: this.document.id, step: TRANSLATION_STEP}) 
      },
      unvalidateTranslation() {
        // TODO: give warnings about side effects
        return this.$store.dispatch('document/setValidationStep', {docId: this.document.id, step: TRANSCRIPTION_STEP}) 
      }
    }
}
</script>