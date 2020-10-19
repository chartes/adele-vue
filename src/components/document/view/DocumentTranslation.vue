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
    name: "DocumentTranslation",
    components: {
        
    },
    props: {
        readonlyData: {type: Object, default: null}
    },
    computed: {
        ...mapState('document', ['loading', 'translationView']),
    },
    mounted() {
      if (this.translationView) {
         // make tooltips
          let toolTipClass =  Vue.extend(ToolTip)
           Object.keys(this.translationView.notes).forEach(noteId => {
              const paddedId = `${noteId}`.padStart(10, '0')
              const spEl = document.querySelector(`[data-note-id='${paddedId}']`)
              const noteContent = this.translationView.notes[noteId]
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
      }
    },
    methods: {
 
    }
}
</script>

<style>

</style>