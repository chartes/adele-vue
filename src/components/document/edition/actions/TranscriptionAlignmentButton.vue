<template>
  <a
    class="button  is-small is-info is-light"
    :disabled="disabled"
    @click="toggleTranscriptionAlignmentMode"
  >
    <span> {{ transcriptionAlignmentMode ? 'Quitter sans sauvegarder' : 'Aligner la traduction avec la transcription' }} </span>
  </a>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    name: 'TranscriptionAlignmentButton',
    components: {

    },
    props: {
       
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapState('document', ['document', 'transcriptionView', 'translationView', 'transcriptionAlignmentView']),
      ...mapState('translation', ['savingStatus']),
      ...mapGetters('user', ['loggedIn', 'currentUserIsTeacher']),
      ...mapState('workflow', ['transcriptionAlignmentMode']),
      ...mapGetters('workflow', ['isTranslationValidated']),
      disabled() {
        return !this.isTranslationValidated //|| this.savingStatus !== 'uptodate'
      }
    },
    methods: {
      toggleTranscriptionAlignmentMode() {
        if (!this.disabled) {
          this.$store.dispatch('workflow/setTranscriptionAlignmentMode', !this.transcriptionAlignmentMode)
        }
      }
    }
}
</script>