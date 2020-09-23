<template>
  <b-tooltip
    type="is-light"
    multilined
    class="tooltip"
  >
    <template v-slot:content>
      <span v-html="content" />
    </template>
    <span v-html="element" />
  </b-tooltip>
</template>

<script>
export default {
    name: "ToolTip",
    props: ['element', 'content'],
    mounted() {
    
    }
}
</script>

<style lang="scss" scoped>

</style>