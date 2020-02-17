<template>
  <button
    class="button is-small"
    :class="{'selected': selected}"
    :disabled="!active"
    @click="callback(format)"
  >
    <!-- <i class="fa fa-bold" /> -->
    <img
      :src="iconSvg"
    >

  </button>
</template>

<script>
  import icons from '../../modules/quill/icons'

  export default {
    name: "EditorButton",
    components: {
    },
    props: ['selected', 'active', 'callback', 'format'],
    computed: {
      iconClass () {
        return 'fa fa-' + this.icon;
      },
      iconSvg () {
        return icons[this.format]
      }
    }
  }
</script>

<style scoped>
</style>