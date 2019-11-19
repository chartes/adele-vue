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