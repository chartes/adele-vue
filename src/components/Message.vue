<template>
  <div class="box is-info">
    <slot />
  </div>
</template>

<script>
    export default {
        name: "Message"
    }
</script>

<style scoped>
  .box {
    background: #eee;
    padding: 1em;
    border: 1px solid #ccc;
  }
</style>
