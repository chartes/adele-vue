<template>
  <div>
    <rich-text-editor
      v-if="!!transcriptionWithNotes"
      :initial-content="transcriptionWithNotes"
    />
  </div>
</template>


<script>

import { mapState, mapGetters } from 'vuex';
import RichTextEditor from "@/components/editors/RichTextEditor.vue"

export default {
    name: "DocumentEditionFacsimile",
    components: {
        RichTextEditor
    },
    props: {
      transcriptionWithNotes: {type: String, default: null}
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