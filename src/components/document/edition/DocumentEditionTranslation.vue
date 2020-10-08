<template>
  <div
    v-if="transcriptionAlignmentMode"
    class="columns"
  >
    <transcription-editor
      :key="'transcriptionAlignment' + transcriptionLoading"
      class="column"
      :initial-content="transcriptionWithTextAlignment"
    />
    <translation-editor
      :key="'translationAlignment' + translationLoading"
      class="column"
      :initial-content="translationContent"
    />
  </div>
  <translation-editor 
    v-else
    :key="'translation' + translationLoading"
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
      ...mapState('transcription', ['transcriptionLoading', 'transcriptionContent', 'transcriptionWithTextAlignment']),
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