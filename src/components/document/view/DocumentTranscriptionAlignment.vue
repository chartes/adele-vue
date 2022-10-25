<template>
  <div>
    <div
      v-if="!!readonlyData"
      class="content transcription-alignement"
    >

      <div class="columns">
      <div class="column">       
      <section>
        <document-transcription
          :readonly-data="transcriptionView"
        />
        </section>
        </div>
      <div class="column">
        <section>
          <document-translation
            :readonly-data="translationView"
          />
        </section>
        </div>
      </div>
      
    </div>
  </div>
</template>


<script>

import { mapState } from 'vuex';
import addToolTip from '@/modules/tooltip';
import DocumentTranscription from '../view/DocumentTranscription.vue'
import DocumentTranslation from '../view/DocumentTranslation.vue'

export default {
    name: "DocumentTranscriptionAlignment",
    components: {
        DocumentTranscription,
        DocumentTranslation
    },
    props: {
        readonlyData: {type: Object, default: null}
    },
    computed: {
        ...mapState('document', ['loading', 'transcriptionView', 'translationView']),
    },
    mounted() {
      /*
      if (this.transcriptionAlignmentView) {
          // make tooltips
          this.transcriptionAlignmentView.notes.forEach(note => {
            const noteId = note.id;
            if (note.content) {
              const paddedId = `${note.id}`.padStart(10, '0')
              Array.from(document.querySelectorAll(`[data-note-id='${paddedId}']`)).forEach(el => {
                addToolTip(el, note.content, null, {contentType: 'note'});
              })
            }
          })

          // persnames && placenames
          Array.from(document.querySelectorAll(`persname, placename`)).forEach(el => {
            addToolTip(el, el.attributes.ref.value, null, {contentType: el.localName, position: el.localName == 'persname' ? 'is-left' : 'is-bottom'});
          })
      }
      */
    },
    methods: {
 
    }
}
</script>

<style>

</style>