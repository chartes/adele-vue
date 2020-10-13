<template>
  <span>
    <a
      v-if="!transcriptionAlignmentMode"
      class="button  is-small is-info is-light"
      :disabled="disabled"
      @click="startAlignmentMode"
    >
      <span>Aligner la traduction avec la transcription</span>
    </a>
    <a
      v-else
      class="button  is-small is-info is-light"
      @click="stopAlignmentMode"
    >
      <span v-if="!translationAlignmentSaved">Quitter sans sauvegarder</span>
      <span v-else>Quitter</span>
    </a>
  </span>
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
      ...mapState('transcription', ['translationAlignmentSaved']),
      ...mapGetters('user', ['loggedIn', 'currentUserIsTeacher']),
      ...mapState('workflow', ['transcriptionAlignmentMode']),
      ...mapGetters('workflow', ['isTranslationValidated']),
      disabled() {
        //TODO prendre en compte la transcription et le savingStatus uptodate également
        //TODO interdire les segments au milieu d'un placename/persname
        return this.savingStatus !== 'uptodate'
      }
    },
    methods: {
      startAlignmentMode() {
        if (!this.disabled) {
          this.$store.dispatch('workflow/setTranscriptionAlignmentMode', true)
        }
      },
      stopAlignmentMode() {
          this.$store.dispatch('workflow/setTranscriptionAlignmentMode', false)
      }
    }
}
</script>