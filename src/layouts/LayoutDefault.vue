<template>
  <div>
    <nav-bar />
    <slot />
  </div>
</template>

<script>

import {mapState} from 'vuex'
import NavBar from '@/components/NavBar.vue'

export default {
    name: "LayoutDefault",
    components: {
      NavBar
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapState("user", ["currentUser"])
    },

    created() {
       //this.$store.dispatch('user/fetchCurrent');
    }
}
</script>

<style>

</style>