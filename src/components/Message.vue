<template>
  <article
    class="message is-small"
    :class="messageClass"
  >
    <div class="message-body">
      <slot />
    </div>
  </article>
</template>

<script>
    export default {
        name: "Message",
        props: {
          messageClass: {type: String, default: 'is-info'}
        }
    }
</script>

<style scoped>

</style>
