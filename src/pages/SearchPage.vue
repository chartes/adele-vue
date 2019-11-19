<template>
  <div>
    <div class="container">
      <progress
        v-show="loading" 
        class="progress is-small is-primary"
        max="100"
      >
        15%
      </progress>
      <div class="columns">
        <div class="column">
          First column
        </div>
        <div class="column is-three-quarters">
          <div class="section">
            <div class="columns is-multiline ">
              <div
                v-for="d in documents"
                :key="d.id"
                class="column is-one-third"
              >
                <document-card :doc="d" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import DocumentCard from '../components/document/DocumentCard.vue'
import { mapState } from 'vuex';

export default {
    name: "SearchPage",
    components: {
        DocumentCard
    },
    computed: {
            ...mapState('document', ['documents', 'document', 'loading'])
    },
    created() {
      this.fetchAll()
      //this.fetchOne()
    },
    methods: {
      fetchAll() {
        this.$store.dispatch('document/fetchAll', {
          pageId: 1,
          pageSize: 100,
          filters: ''
        }).then(r => {
        });
      },
      fetchOne() {
        this.$store.dispatch('document/fetch', {
          id: 20,
        }).then(r => {
        });
      }
    }
}
</script>

<style>

</style>