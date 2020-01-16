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
        <figure
          class="image is-4by3"
        >
          <img
            :src="thumbnail_url"
            :key="thumbnail_url"
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
      thumbnail_error : false
    }
  },
  computed: {
      thumbnail_url() {
        if (this.thumbnail_error) {
          return  require('@/assets/images/document_placeholder.svg')
        } else {
          const first_img = this.doc.images[0];
          return first_img ? first_img["thumbnail_url"] : require('@/assets/images/document_placeholder.svg')
        }
      },
  }
}
</script>

<style lang="scss" scoped>
</style>
