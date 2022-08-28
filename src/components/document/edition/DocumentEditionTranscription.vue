<template>
  <section>
    <transcription-action-bar :section="section"/>
    <rich-text-editor
        v-if="!transcriptionLoading"
        :initial-content="transcriptionContent"
        change-action="transcription/changed"
    />
  </section>
</template>


<script>

import { mapState, mapGetters } from 'vuex';
import RichTextEditor from "@/components/editors/RichTextEditor.vue"
import TranscriptionActionBar from "@/components/document/edition/actionbars/TranscriptionActionBar.vue";

export default {
    name: "DocumentEditionTranscription",
    components: {
        RichTextEditor, TranscriptionActionBar
    },
    props: {
      section: {type: String, required: true}
    },
    computed: {
      ...mapState('transcription', ['transcriptionContent', 'transcriptionLoading']),
      ...mapGetters('document', ['documentOwner']),
      ...mapState('user', ['currentUser'])
    },
    async created() {
    },
    methods: {

    }
}
</script>

<style>

</style>