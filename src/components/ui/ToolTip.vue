<template>
  <b-tooltip
    type="is-light"
    size="is-large"
    multilined
    class="tooltip"
  >
    <template v-slot:content>
      <div v-html="content" />
    </template>
    <div v-html="element" />
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