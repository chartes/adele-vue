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
import ToolTip from '@/components/ui/ToolTip';

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
          // make tooltips
          let toolTipClass =  Vue.extend(ToolTip)
          this.transcriptionAlignmentView.notes.forEach(note => {
            const noteId = note.id;
            if (note.content) {
              const paddedId = `${note.id}`.padStart(10, '0')
              let spEl = document.querySelector(`[data-note-id='${paddedId}']`)
              let t = new toolTipClass({propsData: {
                element: spEl.outerHTML ,
                content: `
                  <span>
                    <span class="tt-content">${note.content}</span>
                  </span>
                `
              }})
              t.$mount(spEl)
            }
          })
    },
    methods: {
 
    }
}
</script>

<style>

</style>