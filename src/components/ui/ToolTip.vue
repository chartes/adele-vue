<template>
  <b-tooltip
    :type="type"
    multilined
    size="is-small"
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
    props: {
      element: {type: String, default: ''},
      content: {type: String, default: ''},
      type: {type: String, default: 'is-light'}
    },
    mounted() {
    
    }
}
</script>

<style lang="scss" scoped>

</style>