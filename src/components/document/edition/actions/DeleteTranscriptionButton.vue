<template>
  <a
    class="button is-text is-small  has-text-danger"
    @click="deleteTranscription"
  >
    <span>Supprimer la transcription</span>
  </a>
</template>


<script>
import { mapState, mapGetters } from 'vuex'

export default {
    name: 'TranscriptionActionBar',
    components: {

    },
    props: {
        userId: {type: Number, default: null},
        docId: {type: Number, default: null}
    },
    computed: {
    },
    methods: {
      async deleteTranscription() {
        console.log("delete transcription")
        try {
          await this.$store.dispatch('transcription/deleteTranscriptionFromUser', {
              docId: this.docId,
              userId: this.userId
          })
        } catch(error) {
            //must use a shared transcriptionError ??
            
        }
      }
    }
}
</script>