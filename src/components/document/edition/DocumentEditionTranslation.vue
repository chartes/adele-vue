<template>
  <div>
    <div
      v-if="transcriptionAlignmentMode"
      class="columns"
    >
      <transcription-editor
        v-if="transcriptionWithTextAlignment"
        class="column"
        :initial-content="transcriptionWithTextAlignment"
      />
      <translation-editor
        v-if="translationWithTextAlignment"
        class="column"
        :initial-content="translationWithTextAlignment"
      />
    </div>
    <translation-editor 
      v-else
      :key="'translation' + translationLoading"
      :initial-content="translationWithNotes"
    />
  </div>
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
      ...mapState('translation', ['translationLoading', 'savingStatus', 'translationContent', 'translationWithTextAlignment']),
      ...mapState('transcription', ['transcriptionLoading', 'savingStatus', 'transcriptionContent', 'transcriptionWithTextAlignment']),
      ...mapState('workflow', ['transcriptionAlignmentMode']),
      ...mapGetters('transcription', ['isTranscriptionSaved']),
      ...mapGetters('translation', ['isTranslationSaved'])
   },
    async created() {
    },
    methods: {

    }
}
</script>

<style>

</style>