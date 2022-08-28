<template>
  <section>
    <translation-action-bar/>
    <rich-text-editor
      v-if="!translationLoading"
      :key="translationLoading"
      :initial-content="translationContent"
      change-action="translation/changed"
    />
  </section>
</template>


<script>

import { mapState, mapGetters } from 'vuex';
import RichTextEditor from "@/components/editors/RichTextEditor.vue"
import TranslationActionBar from "@/components/document/edition/actionbars/TranslationActionBar.vue";

export default {
    name: "DocumentEditionTranslation",
    components: {
        RichTextEditor,
        TranslationActionBar
    },
    computed: {
      ...mapState('translation', ['translationContent', 'translationLoading']),

    },
    async created() {
    },
    methods: {

    }
}
</script>

<style>

</style>