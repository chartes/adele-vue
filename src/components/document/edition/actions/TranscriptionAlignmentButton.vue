<template>
  <a
    class="button  is-small is-info is-light"
    :disabled="!isTranslationValidated || savingStatus !== 'uptodate'"
    @click="toggleTranscriptionAlignmentMode"
  >
    <span> {{ transcriptionAlignmentMode ? 'Quitter le mode Alignement' : 'Aligner la traduction avec la transcription' }} </span>
  </a>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    name: 'TranscriptionAlignmentButton',
    components: {

    },
    props: {
        docId: {type: Number, default: null}
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
    },
    methods: {
      toggleTranscriptionAlignmentMode() {
        this.$store.dispatch('workflow/setTranscriptionAlignmentMode', !this.transcriptionAlignmentMode)
      }
    }
}
</script>