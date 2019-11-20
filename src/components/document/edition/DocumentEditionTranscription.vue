<template>
  <div>
    <transcription-editor />
  </div>
</template>


<script>

import { mapState } from 'vuex';
import TranscriptionEditor from "@/components/editors/TranscriptionEditor.vue"

export default {
    name: "DocumentEditionTranscription",
    components: {
        TranscriptionEditor
    },
    props: {
      document: {type: Object, default: null}
    },
    computed: {
        ...mapState('document', ['loading']),
    },
    created() {
      this.fetchTranscriptionContent();
    },
    methods: {
      fetchTranscriptionContent() {
        this.$store.dispatch('transcription/fetchTranscriptionFromUser', {
          docId: this.document.id,
          userId: 4
        })
      }
    }
}
</script>

<style>

</style>