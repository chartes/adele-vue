<template>
  <div class="document-card card">
    <div class="card-header">
      <div class="document-folder">
        <div class="card-header-first-line">
          <router-link :to="{ name: 'document-view', params: { docId: doc.id, section: 'notice' }}">
            Document {{ doc.id }}
          </router-link>
          <div
            v-if="currentUserIsTeacher"
            class="actions field is-grouped"
          >
            <span
              class="bookmark button is-light " 
              @click="toggleBookmark(doc.id)"
            >
              <span 
                class="icon"
                :class="bookmarked ? 'active-bookmark' : 'inactive-bookmark'"
              >
                <i class="fas fa-bookmark" />
              </span>
            </span>

            <slot
              name="handle"
            />
          </div>
        </div>
      </div>
      <div class="document-creation-lab">
        {{ doc.creation_lab }}
      </div>
    </div>
    <router-link :to="{ name: 'document-view', params: { docId: doc.id, section: 'notice' }}">
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
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "DocumentCard",
  emit: ['toggle-bookmark'],
  props: {
      doc: {type: Object, default: null}
  },
  data() {
    return {
      thumbnail_error : false,
      url: null,
      bookmarked: null
    }
  },
  computed: {
    ...mapGetters('user', ['currentUserIsTeacher'])
  },
  watch: {
    thumbnail_error() {
      if (this.thumbnail_error) {
        this.url = require('@/assets/images/document_placeholder.svg')
      }
    }
  },
  created() {
    this.bookmarked = this.doc.bookmark_order;
    
    try {
      const first_img = this.doc.images[0];
      this.url = first_img["thumbnail_url"]
    } catch {
      this.thumbnail_error = true
    }
  },
  methods: {
    async toggleBookmark(docId) {
      this.bookmarked = await this.$store.dispatch('document/toggleBookmark', docId)
      this.$emit('toggle-bookmark')
      //const rowItemIndex = this.data.findIndex(item => item.id === docId)
      //this.data[rowItemIndex].bookmark_order = updated_order 
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
