<template>
  <div>
    <speechparts-editor
      :key="transcriptionLoading"
      :initial-content="transcriptionWithSpeechParts"
    />
  </div>
</template>


<script>

import { mapState } from 'vuex';
import SpeechpartsEditor from "@/components/editors/SpeechpartsEditor.vue"

export default {
    name: "DocumentEditionSpeechParts",
    components: {
        SpeechpartsEditor
    },
    props: {
        transcriptionWithSpeechParts: {type: String, default: ""}
    },
    computed: {
      ...mapState('transcription', ['transcriptionLoading']),
    },
    created() {
      
    },
    methods: {
      
    }
}
</script>

<style>

</style>