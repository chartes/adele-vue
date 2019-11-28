<template>
  <div class="m-b-md">
    <div class="field is-grouped">
      <!-- VALIDATE / UNVALIDATE TRANSLATION --> 
      <p
        v-if="currentUserIsTeacher"
        class="control"
      >
        <button
          class="button is-small"
          :class="`${isTranslationValidated ? 'is-success ' : 'is-light'}`"
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
      <!-- ALIGNMENT MODE --> 
      <!-- SI PAS ENCORE D'Alignement, afficher un message spécifique 'Aligner la traduction avec la transcription ? [Commencer]' -->
      <p
        v-if="isTranslationValidated && currentUserIsTeacher"
        class="control"
      >
        <button
          class="button is-small is-info is-light"
          :disabled="!isTranslationValidated"
          @click="toggleTranscriptionAlignmentMode"
        >
          <span> {{ isTranscriptionAlignmentMode ? 'Quitter le mode Alignement' : 'Aligner la traduction avec la transcription' }} </span>
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { TRANSCRIPTION_STEP, TRANSLATION_STEP, NONE_STEP} from '../../../store/modules/workflow'

export default {
    name: 'TranslationActionBar',
    components: {

    },
    data() {
      return {
        isTranscriptionAlignmentMode: false,
      }
    },
    computed: {
        ...mapState('document', ['document', 'transcriptionView', 'translationView', 'transcriptionAlignmentView']),
        ...mapGetters('user', ['loggedIn', 'currentUserIsTeacher']),
        ...mapGetters('workflow', ['isTranslationValidated']),
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
      },
      toggleTranscriptionAlignmentMode() {
        this.isTranscriptionAlignmentMode = !this.isTranscriptionAlignmentMode
      }
    }
}
</script>