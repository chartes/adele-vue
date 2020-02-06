<template>
  <div>
    <speechparts-editor
      v-if="!!transcriptionWithNotes"
      :initial-content="transcriptionWithNotes"
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