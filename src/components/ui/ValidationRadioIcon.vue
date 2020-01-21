<template>
  <span
    v-if="isValidated"
    class="icon step-dot validated"
  >
    <i class="fa fa-check is-size-7" />
  </span>
  <span 
    v-else-if="!isContentEmpty"
    class="icon step-dot unvalidated"
  />
  <span
    v-else
    class="icon step-dot"
  />
</template>

<script>
export default {
    name: "ValidationRadioIcon",
    props: {
        isContentEmpty: {type: Boolean, required: true},
        isValidated: {type: Boolean, required: true},
    }
}
</script>


<style lang="scss" scoped>

.step-dot {
  height: 20px;
  width: 20px;
  
  background-color: #bbb;
  border-radius: 50%;
  margin-right: 0.75em;
  margin-bottom: 10px;

  color: white;
  vertical-align: text-top;

  &.unvalidated {
     background-color:hsl(48, 100%, 67%);
  }
  &.validated {
     background-color:hsl(141, 53%, 53%);
  }
}
</style>