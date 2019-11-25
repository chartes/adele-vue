<template>
  <div>
    <transcription-editor
      v-if="!!transcriptionWithNotes"
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
      transcriptionWithNotes: {type: String, default: null}
    },
    computed: {
    },
    async created() {
    },
    methods: {

    }
}
</script>

<style>

</style>