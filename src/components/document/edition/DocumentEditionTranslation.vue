<template>
  <div
    v-if="transcriptionAlignmentMode"
    class="columns"
  >
    <transcription-editor
      :key="transcriptionLoading"
      class="column"
      :initial-content="transcriptionContent"
    />
    <translation-editor
      :key="translationLoading"
      class="column"
      :initial-content="translationContent"
    />
  </div>
  <translation-editor 
    v-else
    :key="translationLoading"
    :initial-content="translationWithNotes"
  />
</template>


<script>

import { mapState, mapGetters } from 'vuex';
import TranslationEditor from "@/components/editors/TranslationEditor.vue"
import TranscriptionEditor from "@/components/editors/TranscriptionEditor.vue"

export default {
    name: "DocumentEditionTranslation",
    components: {
        TranslationEditor,
        TranscriptionEditor
    },
    props: {
      translationWithNotes: {type: String, default: ""}
    },
    computed: {
      ...mapState('translation', ['translationLoading', 'translationContent']),
      ...mapState('transcription', ['transcriptionLoading', 'transcriptionContent']),
      ...mapState('workflow', ['transcriptionAlignmentMode']),
    },
    async created() {
    },
    methods: {

    }
}
</script>

<style>

</style>