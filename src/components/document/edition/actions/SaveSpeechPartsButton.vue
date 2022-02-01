<template>
  <div>
    <button
      class="button is-small is-primary"
      :disabled="isSpeechPartsSaved"
      @click="saveSpeechParts"
    >
      <span>Sauvegarder</span>
      <span
        v-if="isSpeechPartsSaved"
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
      v-if="transcriptionError && !isSpeechPartsSaved"
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
    name: 'SaveSpeechPartsButton',
    components: {
      Message
    },
    computed: {
      ...mapState('transcription', ['savingStatus', 'transcriptionError']),
      ...mapGetters('speechparts', ['isSpeechPartsSaved'])
    },
    methods: {
      saveSpeechParts() {
        return this.$store.dispatch('speechparts/saveSpeechParts') 
      },
    }
}
</script>