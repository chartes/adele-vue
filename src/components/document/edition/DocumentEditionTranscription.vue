<template>
  <div>
    <transcription-editor
      :key="transcriptionLoading"
      :initial-content="transcriptionWithNotes"
    />
  </div>
</template>


<script>

import { mapState, mapGetters } from 'vuex';
import TranscriptionEditor from "@/components/editors/TranscriptionEditor.vue"

export default {
    name: "DocumentEditionTranscription",
    components: {
        TranscriptionEditor
    },
    props: {
      transcriptionWithNotes: {type: String, default: ""}
    },
    computed: {
      ...mapState('transcription', ['transcriptionLoading'])
    },
    async created() {
    },
    methods: {

    }
}
</script>

<style>

</style>