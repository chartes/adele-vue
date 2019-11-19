<template>
  <div>
    Parties du discours
  </div>
</template>


<script>

import { mapState } from 'vuex';

export default {
    name: "DocumentEditionSpeechParts",
    components: {
        
    },
    props: {
        document: {type: Object, default: null}
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