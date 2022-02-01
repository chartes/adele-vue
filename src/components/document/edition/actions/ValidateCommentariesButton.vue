<template>
  <button
    class="button is-small"
    :class="`${isCommentariesValidated ? 'is-success' : 'is-light'}`"
    :disabled="!isTranscriptionValidated"
    @click="toggleCommentariesValidation"
  >
    <span> {{ isCommentariesValidated ? 'Commentaires validés' : 'Valider' }} </span>
    <span
      v-show="isCommentariesValidated"
      class="icon"
    >
      <i class="fa fa-check" />
    </span>
  </button>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    name: 'ValidateCommentariesButton',
    components: {

    },
    props: {
        docId: {type: Number, default: null}
    },
    computed: {
      ...mapGetters('workflow', ['isCommentariesValidated', 'isTranscriptionValidated'])
    },
    methods: {
      validateCommentaries() {
        // TODO: give warnings about side effects
        return this.$store.dispatch('document/setValidationFlag', {docId: this.$props.docId, flagName: 'commentaries'}) 
      },
      unvalidateCommentaries() {
        // TODO: give warnings about side effects
        return this.$store.dispatch('document/unsetValidationFlag', {docId: this.$props.docId, flagName: 'commentaries'}) 
      },
      toggleCommentariesValidation() {
        if (this.isCommentariesValidated) {
          return this.unvalidateCommentaries()
        } else {
          return this.validateCommentaries()
        }
      },
    }
}
</script>