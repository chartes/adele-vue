<template>
  <div>
    <button
      class="button is-small is-primary"
      :disabled="error || loading"
      @click="saveArgument"
    >
      <span>Sauvegarder le regeste</span>
      <span
        v-if="!error && !loading"
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
      v-if="error"
      message-class="is-small is-warning"
    >
      <span class="icon">
        <i class="fas fa-exclamation-triangle" /> 
      </span>
      {{ error }}
    </message>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Message from '@/components/Message.vue'

export default {
    name: 'SaveArgumentButton',
    components: {
      Message
    },
    computed: {
      ...mapState('document', ['document', 'loading']),
      ...mapGetters('transcription', ['isTranscriptionSaved'])
    },
    data() {
      return {
        error: null
      }
    },
    methods: {
      saveArgument() {
          return this.$store.dispatch("document/save", {
              docId: this.document.id,
              data: {argument: this.document.argument}
            })
      },
    }
}
</script>