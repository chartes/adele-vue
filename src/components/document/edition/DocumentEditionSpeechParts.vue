<template>
  <section>
    <speech-parts-content-action-bar />
    <rich-text-editor
      v-if="!speechPartsContentLoading"
      :initial-content="speechPartsContent"
      change-action="speechPartsContent/changed"
    />
  </section>
</template>


<script>

import { mapState, mapGetters } from 'vuex';
import RichTextEditor from "@/components/editors/RichTextEditor.vue"
import SpeechPartsContentActionBar from "@/components/document/edition/actionbars/SpeechPartsActionBar.vue";

export default {
    name: "DocumentEditionTranscription",
    components: {
        RichTextEditor,
        SpeechPartsContentActionBar 
    },
    props: {
    },
    computed: {
      ...mapState('speechPartsContent', ['speechPartsContent', 'speechPartsContentLoading']),
      ...mapGetters('document', ['documentOwner']),
      ...mapState('user', ['currentUser'])
    },
    async created() {
    console.log(this.speechPartsContent)
    },
    methods: {

    }
}
</script>

<style>

</style>
