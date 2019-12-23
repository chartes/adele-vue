<template>
  <div>
    <transcription-editor
      v-if="!!transcriptionWithNotes"
      :initial-content="transcriptionWithNotes"
    />
  </div>
</template>


<script>

import { mapState } from 'vuex';
import TranscriptionEditor from "@/components/editors/TranscriptionEditor.vue"

export default {
    name: "DocumentEditionSpeechParts",
    components: {
        TranscriptionEditor
    },
    props: {
        transcriptionWithNotes: {type: String, default: null}
    },
    computed: {
        ...mapState('document', ['loading']),
    },
    created() {
      
    },
    methods: {
      
    }
}
</script>

<style>

</style>