<template>
  <div>
    <button
      class="button is-small is-primary"
      :disabled="error || loading"
      @click="saveNotice"
    >
      <span>Sauvegarder</span>
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
    name: 'SaveNoticeButton',
    components: {
      Message
    },
    props: {
      data: {type: Object, default: () => {}}
    },
    computed: {
      ...mapState('document', ['loading']),
    },
    data() {
      return {
        error: null
      }
    },
    methods: {
        saveNotice() {
            return this.$store.dispatch("document/save", {
              docId: this.data.id,
              data: this.data
            })
        }
    }
}
</script>