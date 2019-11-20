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

export default {
    name: "DocumentTranscription",
    components: {
        
    },
    props: {
        readonlyData: {type: Object, default: null}
    },
    computed: {
        ...mapState('document', ['loading']),
    },
    created() {
      
    },
    methods: {
 
    }
}
</script>

<style>

</style>