<template>
  <div>
    <slot />
  </div>
</template>

<script>

import {mapState} from 'vuex'
 

export default {
    name: "LayoutDefault",
    data() {
      return {
        current_user: null
      }
    },
    computed: {
      //...mapState("user", ["current_user"])
    },

    created() {
       //this.$store.dispatch('user/fetchCurrent');
    }
}
</script>

<style>

</style>