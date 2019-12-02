<template>
  <div>
    <button
      class="button is-small is-primary"
      :disabled="isTranslationSaved"
      @click="saveTranslation"
    >
      <span> Sauvegarder la traduction</span>
      <span
        v-if="isTranslationSaved"
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
      v-if="translationError && !isTranslationSaved"
      message-class="is-small is-warning"
    >
      <span class="icon">
        <i class="fas fa-exclamation-triangle" /> 
      </span>
      {{ translationError }}
    </message>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Message from '@/components/Message.vue'

export default {
    name: 'SaveTranslationButton',
    components: {
      Message
    },
    computed: {
      ...mapState('translation', ['isTranslationSaved', 'savingStatus', 'translationError']),
      ...mapGetters('translation', ['isTranslationSaved'])
    },
    methods: {
      saveTranslation() {
        return this.$store.dispatch('translation/saveTranslation') 
      },
    }
}
</script>