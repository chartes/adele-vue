<template>
  <div>
    Transcription et traduction
  </div>
</template>


<script>

import { mapState } from 'vuex';

export default {
    name: "DocumentTranscription",
    components: {
        
    },
    props: {
    },
    computed: {
        ...mapState('document', ['document', 'loading'])
    },
    created() {
      
    },
    methods: {
      
    }
}
</script>

<style>

</style>