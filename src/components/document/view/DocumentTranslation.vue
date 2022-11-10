<template>
  <div v-if="!!readonlyData">
    <div
      class="has-text-weight-medium subtitle m-b-xl"
    >
      Traduction
    </div>
    <div
      class="content"
      v-html="readonlyData.content"
    />
  </div>
</template>


<script>

import { mapState } from 'vuex';
import Vue from 'vue';
import addToolTip from '@/modules/tooltip';

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
        Array.from(document.getElementsByTagName(`adele-note`)).forEach(el => {
          const noteId = el.getAttribute('id')
          const paddedId = `${noteId}`.padStart(10, '0')

          addToolTip(el, this.translationView.notes[paddedId], null, {contentType: 'note'});
        })

          // persnames && placenames
          Array.from(document.querySelectorAll(`persname, placename`)).forEach(el => {
            addToolTip(el, el.attributes.ref.value, null, {contentType: el.localName, position: el.localName === 'persname' ? 'is-left' : 'is-bottom'});
          })
      }
    },
    methods: {
 
    }
}
</script>

<style>

</style>
