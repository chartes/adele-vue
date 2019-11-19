<template>
  <div>
    Commentaires
  </div>
</template>


<script>

import { mapState } from 'vuex';

export default {
    name: "DocumentCommentaries",
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