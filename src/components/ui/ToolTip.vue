<template>
  <b-tooltip
    :type="type"
    multilined
    size="is-medium"
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
      contentType: {type: String, default: 'note'},
      content: {type: String, default: ''},
      type: {type: String, default: 'is-light'}
    },
    mounted() {
    
    }
}
</script>

<style lang="scss" scoped>

</style>