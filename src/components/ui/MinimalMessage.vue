<template>
  <article
    class="message"
    :class="type"
  >
    <div class="message-body">
      <p v-html="body" />
    </div>
  </article>
</template>

<script>
  export default {
    name: "MinimalMessage",
    props: ['type', 'body']
  }
</script>