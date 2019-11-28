<template>
  <a
    class="button  is-small is-info is-light"
    :disabled="!isTranslationValidated"
    @click="toggleTranscriptionAlignmentMode"
  >
    <span> {{ isTranscriptionAlignmentMode ? 'Quitter le mode Alignement' : 'Aligner la traduction avec la transcription' }} </span>
  </a>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { TRANSCRIPTION_STEP, NONE_STEP} from '@/store/modules/workflow'

export default {
    name: 'TranscriptionAlignmentButton',
    components: {

    },
    props: {
        docId: {type: Number, default: null}
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
      toggleTranscriptionAlignmentMode() {
        this.isTranscriptionAlignmentMode = !this.isTranscriptionAlignmentMode
      }
    }
}
</script>