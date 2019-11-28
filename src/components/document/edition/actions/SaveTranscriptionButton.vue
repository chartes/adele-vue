<template>
  <div>
    <button
      class="button is-small is-primary"
      :disabled="isTranscriptionSaved"
      @click="saveTranscription"
    >
      <span> Sauvegarder la transcription</span>
      <span
        v-if="isTranscriptionSaved"
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
      v-if="transcriptionError && !isTranscriptionSaved"
      message-class="is-small is-warning"
    >
      <span class="icon">
        <i class="fas fa-exclamation-triangle" /> 
      </span>
      {{ transcriptionError }}
    </message>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Message from '@/components/Message.vue'

export default {
    name: 'SaveTranscriptionButton',
    components: {
      Message
    },
    computed: {
      ...mapState('transcription', ['isTranscriptionSaved', 'savingStatus', 'transcriptionError']),
      ...mapGetters('transcription', ['isTranscriptionSaved'])
    },
    methods: {
      saveTranscription() {
        return this.$store.dispatch('transcription/saveTranscription') 
      },
    }
}
</script>