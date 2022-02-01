<template>
  <div>
    <nav-bar />
    <slot />
  </div>
</template>

<script>

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
    },
    created() {
    }
}
</script>

<style>

</style>