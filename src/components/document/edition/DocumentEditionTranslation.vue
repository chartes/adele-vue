<template>
  <div>
    <translation-editor
      :key="translationLoading"
      :initial-content="translationWithNotes"
    />
  </div>
</template>


<script>

import { mapState, mapGetters } from 'vuex';
import TranslationEditor from "@/components/editors/TranslationEditor.vue"

export default {
    name: "DocumentEditionTranslation",
    components: {
        TranslationEditor
    },
    props: {
      translationWithNotes: {type: String, default: ""}
    },
    computed: {
      ...mapState('translation', ['translationLoading'])
    },
    async created() {
    },
    methods: {

    }
}
</script>

<style>

</style>