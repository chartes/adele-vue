<template>
  <div>
    <div
      v-if="!!readonlyData"
      class="content"
      v-html="readonlyData.content"
    />
  </div>
</template>


<script>

import { mapState } from 'vuex';
import Vue from 'vue';
import ToolTip from '@/components/ui/ToolTip';

export default {
    name: "DocumentTranscription",
    components: {
        
    },
    props: {
        readonlyData: {type: Object, default: null}
    },
    computed: {
        ...mapState('document', ['loading', 'transcriptionView']),
    },
    mounted() {
          // make tooltips
        if (this.transcriptionView) {
            let toolTipClass =  Vue.extend(ToolTip)
            // notes
            Object.keys(this.transcriptionView.notes).forEach(noteId => {
              const paddedId = `${noteId}`.padStart(10, '0')
              const spEl = document.querySelector(`[data-note-id='${paddedId}']`)
              const noteContent = this.transcriptionView.notes[noteId]
              const t = new toolTipClass({propsData: {
                element: spEl.outerHTML ,
                content: `
                  <span>
                    <span class="tt-content">${noteContent}</span>
                  </span>
                `
              }})
              t.$mount(spEl)
            }) 
            // persnames && placenames
            Array.from(document.querySelectorAll(`persname, placename`)).forEach(el => {
              const t = new toolTipClass({propsData: {
              element: el.outerHTML ,
              content: `
                <span>
                  <span class="tt-content">${el.attributes.ref.value}</span>
                </span>
              `,
              type: 'is-light'
              }})
              t.$mount(el)
            })
        }   
    },
    methods: {
 
    }
}
</script>

<style>

</style>