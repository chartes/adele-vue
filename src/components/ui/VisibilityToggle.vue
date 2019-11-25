<template>
  <a
    href="#"
    @click.prevent="clickHandler"
  >
    <span v-show="visible"><i class="fas fa-eye m-r-xxs" /></span>
    <span v-show="!visible"><i class="fas fa-eye-slash" /></span>
    <slot />
  </a>
</template>

<script>
  export default {
    name: "VisibilityToggle",
    props: {
      visible : { type: Boolean, default: true},
      action: {type: Function, required:true}
    },
    created() {
    },
    methods: {
      clickHandler () {
        this.action();
      }
    }
  }
</script>