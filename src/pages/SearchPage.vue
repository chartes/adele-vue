<template>
  <div>
    <div class="container search-page">
      <div class="columns">
        <div class="column filters">
          <section class="accordions">
            <article class="accordion is-active">
              <div class="accordion-header toggle">
                <p>Dates du document</p>
              </div>
              <div class="accordion-body">
                <div class="accordion-content" />
              </div>
            </article>
            <article class="accordion">
              <div class="accordion-header">
                <p>Mode de tradition</p>
                <button
                  class="toggle"
                  aria-label="toggle"
                />
              </div>
              <div class="accordion-body">
                <div class="accordion-content" />
              </div>
            </article>
            <article class="accordion">
              <div class="accordion-header">
                <p>Type d’acte</p>
                <button
                  class="toggle"
                  aria-label="toggle"
                />
              </div>
              <div class="accordion-body">
                <div class="accordion-content" />
              </div>
            </article>
            <article class="accordion">
              <div class="accordion-header">
                <p>Langue du document</p>
                <button
                  class="toggle"
                  aria-label="toggle"
                />
              </div>
              <div class="accordion-body">
                <div class="accordion-content" />
              </div>
            </article>
            <article class="accordion">
              <div class="accordion-header">
                <p>Siècle du document</p>
                <button
                  class="toggle"
                  aria-label="toggle"
                />
              </div>
              <div class="accordion-body">
                <div class="accordion-content" />
              </div>
            </article>
            <article class="accordion">
              <div class="accordion-header">
                <p>Siècle de la copie</p>
                <button
                  class="toggle"
                  aria-label="toggle"
                />
              </div>
              <div class="accordion-body">
                <div class="accordion-content" />
              </div>
            </article>
            <article class="accordion">
              <div class="accordion-header">
                <p>Pays</p>
                <button
                  class="toggle"
                  aria-label="toggle"
                />
              </div>
              <div class="accordion-body">
                <div class="accordion-content" />
              </div>
            </article>
            <article class="accordion">
              <div class="accordion-header">
                <p>Région contemporaine</p>
                <button
                  class="toggle"
                  aria-label="toggle"
                />
              </div>
              <div class="accordion-body">
                <div class="accordion-content" />
              </div>
            </article>
            <article class="accordion">
              <div class="accordion-header">
                <p>Institution de conservation</p>
                <button
                  class="toggle"
                  aria-label="toggle"
                />
              </div>
              <div class="accordion-body">
                <div class="accordion-content" />
              </div>
            </article>
            <article class="accordion">
              <div class="accordion-header">
                <p>Types de commentaires fournis</p>
                <button
                  class="toggle"
                  aria-label="toggle"
                />
              </div>
              <div class="accordion-body">
                <div class="accordion-content" />
              </div>
            </article>
          </section>
        </div>

        <div class="column documents is-three-quarters">
          <div class="section">
            <progress
              v-show="loading" 
              class="progress is-small is-warning"
              max="100"
            >
              15%
            </progress>
            <div
              v-if="!loading"
              class="columns is-multiline "
            >
              <div
                v-for="d in documents"
                :key="d.id"
                class="column is-one-third"
              >
                <document-card :doc="d" />
              </div>
            </div>
            <div
              v-else
              class="columns is-multiline"
            >
              <div
                v-for="d in [1,2,3,4,5,6]"
                :key="d"
                class="column is-one-third"
              >
                <document-card-placeholder />
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
import DocumentCardPlaceholder from '../components/document/DocumentCardPlaceholder.vue'

import { mapState } from 'vuex';

export default {
    name: "SearchPage",
    components: {
        DocumentCard,
        DocumentCardPlaceholder
    },
    computed: {
            ...mapState('document', ['documents', 'document', 'loading'])
    },
    created() {
      this.fetchAll()
    },
    methods: {
      fetchAll() {
        this.$store.dispatch('document/fetchAll', {
          pageId: 1,
          pageSize: 50,
          filters: ''
        }).then(r => {
        });
      },
      /*
      fetchOne() {
        this.$store.dispatch('document/fetch', {
          id: 20,
        }).then(r => {
        });
      }
      */
    }
}
</script>

<style>

</style>