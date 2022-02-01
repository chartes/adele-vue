<template>
  <div class="document-card card">
    <div class="card-header">
      <div class="document-folder">
        Document
      </div>
      <div class="document-creation-lab" />
    </div>
    <div class="card-image">
      <figure
        
        class="image is-4by3"
      >
        <img
          :src="require('@/assets/images/document_placeholder.svg')"
          alt="Placeholder image"
        >
      </figure>
    </div>
    <div class="">
      <div class="content">
        <div class="document-card-placeholder" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DocumentCardPlaceholder",
  props: {
    
  },
  computed: {
      
  }
}
</script>

<style lang="scss" scoped>
</style>
