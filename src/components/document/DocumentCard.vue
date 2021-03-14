<template>
  <router-link :to="{ name: 'document-view', params: { docId: doc.id, section: 'notice' }}">
    <div class="document-card card">
      <div class="card-header">
        <div class="document-folder">
          Document {{ doc.id }}
        </div>
        <div class="document-creation-lab">
          {{ doc.creation_lab }}
        </div>
      </div>
      <div class="card-image">
        <figure>
          <img
            :key="url"
            :class="thumbnail_error ? 'placeholder-image' : ''"
            :src="url"
            alt="thumbnail"
            @error="thumbnail_error = true"
          > 
        </figure>
      </div>
      <div class="card-content">
        <div class="content">
          <p class="title">
            {{ doc.title }}
          </p>
          <p class="subtitle">
            {{ doc.subtitle }}
          </p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "DocumentCard",
  props: {
      doc: {type: Object, default: null}
  },
  data() {
    return {
      thumbnail_error : false,
      url: null
    }
  },
  watch: {
    thumbnail_error() {
      console.log("wth", this.thumbnail_error)
      if (this.thumbnail_error) {
        this.url = require('@/assets/images/document_placeholder.svg')
      }
    }
  },
  created() {
    try {
      const first_img = this.doc.images[0];
      this.url = first_img["thumbnail_url"]
    } catch {
      this.thumbnail_error = true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
