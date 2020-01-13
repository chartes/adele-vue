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
          v-if="thumbnail_url"
          class="image is-4by3"
        >
          <img
            :src="thumbnail_url"
            alt="Placeholder image"
          >
        </figure>
      </div>
      <div class="card-content">
        <div class="content">
          <p class="title">{{ doc.title }}</p>
          <p class="subtitle">{{ doc.subtitle }}</p>
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
  computed: {
      thumbnail_url() {
          const first_img = this.doc.images[0];
          return first_img ? first_img["thumbnail_url"] : null
      } 
  }
}
</script>

<style lang="scss" scoped>
</style>
