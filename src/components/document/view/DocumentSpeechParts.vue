<template>
  <div>
    Parties du discours
  </div>
</template>


<script>

import { mapState } from 'vuex';

export default {
    name: "DocumentSpeechParts",
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