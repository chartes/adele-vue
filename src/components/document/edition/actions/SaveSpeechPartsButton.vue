<template>
  <div>
    <button
      class="button is-small is-primary"
      :disabled="isSpeechPartsContentSaved"
      @click="saveSpeechParts"
    >
      <span>Sauvegarder</span>
      <span
        v-if="isSpeechPartsContentSaved"
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
      v-if="speechPartsContentError && !isSpeechPartsContentSaved"
      message-class="is-small is-warning"
    >
      <span class="icon">
        <i class="fas fa-exclamation-triangle" /> 
      </span>
      {{ speechPartsContentError }}
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
      ...mapState('speechPartsContent', ['savingStatus', 'speechPartsContentError']),
      ...mapGetters('speechPartsContent', ['isSpeechPartsContentSaved'])
    },
    methods: {
      saveSpeechParts() {
        return this.$store.dispatch('speechPartsContent/saveSpeechPartsContent')
      },
    }
}
</script>
