<template>
  <div class="container login-form" />
</template>

<script>

import {mapState} from 'vuex'

export default {
    name: "UserProfilePage",
    components: {
        
    },
    data () {
        return {
          email: '',
          password: '',
          error: false
        }
    },
    computed: {
      ...mapState("user", ["currentUser"])
    },
    mounted() {
      this.error = false
    },
    methods: {
       
      }

}
</script>

<style>

</style>