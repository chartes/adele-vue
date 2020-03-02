<template>
  <div>
    <div class="container search-page">
      <div class="columns">
        <div class="column filters">
          <section class="accordions">
            <article class="accordion">
              <div class="accordion-header no-toggle">
                <p>Dates du document</p>
                <div class="date-range-selector">
                  <p>Entre <input class="min-date" type="text" value="1200" /> et <input class="max-date" type="text" value="1400" /></p>
                  <slider id="dateSlider" class="date-slider" :options="dateSliderOptions"  />
                </div>
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
            <article class="accordion is-active">
              <div class="accordion-header">
                <p>Langue du document</p>
                <button
                  class="toggle"
                  aria-label="toggle"
                />
              </div>
              <div class="accordion-body">
                <div class="accordion-content">
                  <ul>
                    <li>
                      <div class="labelled-checkbox">
                        <label><input
                          type="checkbox"
                          value="fr"
                          checked="checked"
                        ><span class="checkmark" />Français</label>
                      </div>
                    </li>
                    <li>
                      <div class="labelled-checkbox">
                        <label><input
                          type="checkbox"
                          value="latin"
                          checked="checked"
                        ><span class="checkmark" />Latin</label>
                      </div>
                    </li>
                    <li>
                      <div class="labelled-checkbox">
                        <label><input
                          type="checkbox"
                          value="occitan"
                        ><span class="checkmark" />Occitan</label>
                      </div>
                    </li>
                  </ul>
                </div>
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
            <div class="filters-sort-options">
              <h4>Filtres</h4>
              <div class="filter-tag-list">
                <div class="filter-tag-list field is-grouped is-grouped-multiline">
                  <div class="control">
                    <div class="tags filter-category">
                      <a
                        class="tag"
                        href="#"
                      />
                      <a
                        class="tag"
                        href="#"
                      >Type d’acte</a>
                    </div>
                  </div>
                  <div class="control">
                    <div class="tags">
                      <a
                        class="tag"
                        href="#"
                      >Actes privés sous le sceau et/ou la signature de l’auteur</a>
                    </div>
                  </div>
                  <div class="control">
                    <div class="tags">
                      <a
                        class="tag"
                        href="#"
                      >Actes privés sous le/les sceaux d’autorités locales</a>
                    </div>
                  </div>
                </div>
                <div class="filter-tag-list field is-grouped is-grouped-multiline">
                  <div class="control">
                    <div class="tags filter-category">
                      <a
                        class="tag"
                        href="#"
                      />
                      <a
                        class="tag"
                        href="#"
                      >Langue du document</a>
                    </div>
                  </div>
                  <div class="control">
                    <div class="tags">
                      <a
                        class="tag"
                        href="#"
                      >Latin</a>
                    </div>
                  </div>
                  <div class="control">
                    <div class="tags">
                      <a
                        class="tag"
                        href="#"
                      >Occitan</a>
                    </div>
                  </div>
                </div>
                <div class="filter-tag-list field is-grouped is-grouped-multiline">
                  <div class="control">
                    <div class="tags filter-category">
                      <a
                        class="tag"
                        href="#"
                      />
                      <a
                        class="tag"
                        href="#"
                      >Pays</a>
                    </div>
                  </div>
                  <div class="control">
                    <div class="tags">
                      <a
                        class="tag"
                        href="#"
                      >France</a>
                    </div>
                  </div>
                </div>
              </div>
              <h4>Tris</h4>
              <select>
                <option>Date de l'acte</option>
              </select>
            </div>

            <nav
              class="pagination"
              role="navigation"
              aria-label="pagination"
            >
              <span class="pagination-documents-count pagination-previous">32 documents</span>
              <ul class="pagination-list">
                <li>
                  <a
                    class="pagination-link"
                    aria-label="Goto page 1"
                  >1</a>
                  <a
                    class="pagination-link is-current"
                    aria-label="Goto page 2"
                  >2</a>
                  <a
                    class="pagination-link"
                    aria-label="Goto page 3"
                  >3</a>
                </li>
                <li>
                  <span class="pagination-ellipsis">&hellip;</span>
                </li>
                <li>
                  <a
                    class="pagination-link"
                    aria-label="Goto page 10"
                  >10</a>
                </li>
              </ul>
            </nav>
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
            <nav
              class="pagination bottom"
              role="navigation"
              aria-label="pagination"
            >
              <ul class="pagination-list">
                <li>
                  <a
                    class="pagination-link"
                    aria-label="Goto page 1"
                  >1</a>
                  <a
                    class="pagination-link is-current"
                    aria-label="Goto page 2"
                  >2</a>
                  <a
                    class="pagination-link"
                    aria-label="Goto page 3"
                  >3</a>
                </li>
                <li>
                  <span class="pagination-ellipsis">&hellip;</span>
                </li>
                <li>
                  <a
                    class="pagination-link"
                    aria-label="Goto page 10"
                  >10</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import DocumentCard from '../components/document/DocumentCard.vue'
import DocumentCardPlaceholder from '../components/document/DocumentCardPlaceholder.vue'
import Slider from '../components/ui/Slider.vue'

import { mapState } from 'vuex';

export default {
    name: "SearchPage",
    components: {
        DocumentCard,
        DocumentCardPlaceholder,
        Slider
    },
    data() {
      return {
        dateSliderOptions: {
          start: [1240, 1630],
          range: {
              'min': [500],
              'max': [1800]
          }
        }
      }
    },
    computed: {
        ...mapState('document', ['documents', 'document', 'loading']),
        ...mapState('languages', ['languages']),
        ...mapState('countries', ['countries']),
        ...mapState('districts', ['districts']),
        ...mapState('traditions', ['traditions']),
        ...mapState('acteTypes', ['acteTypes']),
        ...mapState('editors', ['editors']),
        ...mapState('institutions', ['institutions']),
    },
    beforeCreate() {
      Promise.all([
        this.$store.dispatch('languages/fetch'), 
        this.$store.dispatch('countries/fetch'),
        this.$store.dispatch('districts/fetch'),
        this.$store.dispatch('traditions/fetch'),
        this.$store.dispatch('acteTypes/fetch'),
        this.$store.dispatch('editors/fetch'),
        this.$store.dispatch('institutions/fetch')
      ])
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
    }
}
</script>

<style>

</style>