<template>
  <div>
    <div
      v-if="!!readonlyData"
      class="content transcription-alignement"
    >
      <table>
        <thead>
          <th>Transcription</th>
          <th>Traduction</th>
        </thead>
        <tbody>
          <tr
            v-for="(seg, index) in readonlyData.content"
            :key="index"
          >
            <td v-html="seg[0]" />
            <td v-html="seg[1]" />
          </tr> 
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>

import { mapState } from 'vuex';
import Vue from 'vue';
import addToolTip from '@/modules/tooltip';

export default {
    name: "DocumentTranscriptionAlignment",
    components: {
        
    },
    props: {
        readonlyData: {type: Object, default: null}
    },
    computed: {
        ...mapState('document', ['loading', 'transcriptionAlignmentView']),
    },
    mounted() {
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
    },
    methods: {
 
    }
}
</script>

<style>

</style>