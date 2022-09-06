<template>
  <div v-if="!!readonlyData">
    <div
      class="has-text-weight-medium subtitle m-b-xl"
    >
      Transcription
    </div>
    <rich-text-editor v-if="content"
      :initial-content="content"
      :readonly="true"
    />
  </div>
</template>


<script>

import { mapActions, mapState } from 'vuex';
import addToolTip from '@/modules/tooltip';
import RichTextEditor from "@/components/editors/RichTextEditor.vue"

export default {
    name: "DocumentTranscription",
    components: {
       RichTextEditor 
    },
    props: {
        readonlyData: {type: Object, default: null}
    },
    data() {
      return {
        content: null
      }
    },
    computed: {
        ...mapState('document', ['loading', 'transcriptionView', 'transcriptionLoading']),
    },
    watch: {
      async transcriptionView() {
        this.content = await this.getTranscriptionViewContent()
      }
    },
    async created() {
       this.content = await this.getTranscriptionViewContent()
    },
    mounted() {
          // make tooltips
        if (this.transcriptionView) {
            // notes
            Object.keys(this.transcriptionView.notes).forEach(noteId => {
              const paddedId = `${noteId}`.padStart(10, '0')
              Array.from(document.querySelectorAll(`[data-note-id='${paddedId}']`)).forEach(el => {
                addToolTip(el, this.transcriptionView.notes[noteId], null, {contentType: 'note'});
              })
            });

            // persnames && placenames
            Array.from(document.querySelectorAll(`persname, placename`)).forEach(el => {
              addToolTip(el, el.attributes.ref.value, null, {contentType: el.localName, position: el.localName === 'persname' ? 'is-left' : 'is-bottom'});
            })
        }   
    },
    methods: {
      ...mapActions('transcription', ['getTranscriptionViewContent'])
    }
}
</script>

<style>

</style>