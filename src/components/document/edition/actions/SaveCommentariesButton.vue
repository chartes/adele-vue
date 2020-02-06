<template>
  <div>
    <button
      class="button is-small is-primary"
      :disabled="isCommentariesSaved"
      @click="saveCommentaries"
    >
      <span>Sauvegarder tous les commentaires</span>
      <span
        v-if="isCommentariesSaved"
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
      v-if="commentariesError && !isCommentariesSaved"
      message-class="is-small is-warning"
    >
      <span class="icon">
        <i class="fas fa-exclamation-triangle" /> 
      </span>
      {{ commentariesError }}
    </message>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Message from '@/components/Message.vue'

export default {
    name: 'SaveCommentariesButton',
    components: {
      Message
    },
    computed: {
      ...mapState('commentaries', ['savingStatus', 'commentariesError']),
      ...mapGetters('commentaries', ['isCommentariesSaved'])
    },
    methods: {
      saveCommentaries() {
        return this.$store.dispatch('commentaries/saveCommentaries') 
      },
    }
}
</script>