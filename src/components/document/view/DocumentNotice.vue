<template>
  <div>
    Notice
  </div>
</template>


<script>

import { mapState } from 'vuex';

export default {
    name: "DocumentNotice",
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