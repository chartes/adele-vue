<template>
  <router-link :to="{ name: 'document', params: { docId: doc.id }}">
    <div class="document-card card">
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
          {{ doc.title }}
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
