<template>
  <div>
    <button
      class="button is-small is-primary"
      :disabled="translationAlignmentSaved || !conditions"
      @click="saveTranslationAlignment"
    >
      <span>Sauvegarder les alignements</span>
      <span
        v-if="translationAlignmentSaved"
        class="icon"
      >
        <i class="fa fa-check" />
      </span>
      <span
        v-else
        class="icon"
      >
        <i class="fas fa-save" />
      </span>
    </button>
    
    <message
      v-if="translationAlignmentError && !translationAlignmentSaved"
      message-class="is-small is-danger"
    >
      {{ translationAlignmentError }}
    </message>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Message from '@/components/Message.vue'

export default {
    name: 'SaveTranslationAlignmentButton',
    components: {
      Message
    },
    computed: {
      ...mapGetters('translation', ['translationSegmentsFromQuill']),
      ...mapGetters('transcription', ['transcriptionSegmentsFromQuill']),

      ...mapState('workflow', ['transcriptionAlignmentMode']),
      ...mapState('transcription', ['translationAlignmentSaved', 'translationAlignmentError']),
      conditions() {
        return this.transcriptionSegmentsFromQuill.length === this.translationSegmentsFromQuill.length
      }
    },
    methods: {
      saveTranslationAlignment() {
          return this.$store.dispatch('transcription/saveTranslationAlignment') 
      },
    }
}
</script>