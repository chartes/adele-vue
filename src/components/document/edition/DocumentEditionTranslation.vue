<template>
  <div>
    <translation-editor
      v-if="!!translationWithNotes"
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
      translationWithNotes: {type: String, default: null}
    },
    computed: {
    },
    async created() {
    },
    methods: {

    }
}
</script>

<style>

</style>