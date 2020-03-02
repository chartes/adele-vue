<template>
  <div>
    <div class="container search-page">
      <div class="columns">
        <div class="column filters">
          <section class="accordions">
            <article class="accordion">
              <div class="accordion-header toggle">
                <p>Dates du document</p>
              </div>
              <div class="accordion-body">
                <div class="accordion-content" />
              </div>
            </article>
            <article
              class="accordion"
              :class="showTraditions ? 'is-active' : ''"
            >
              <div
                class="accordion-header"
                @click="showTraditions = !showTraditions"
              >
                <p>Mode de tradition</p>
                <button
                  class="toggle"
                  aria-label="toggle"
                />
              </div>
              <div class="accordion-body">
                <div
                  v-if="showTraditions"
                  class="accordion-content"
                />
              </div>
            </article>
            <article
              class="accordion"               
              :class="showActeTypes ? 'is-active' : ''"
            >
              <div
                class="accordion-header"     
                @click="showActeTypes = !showActeTypes"
              >
                <p>Type d’acte</p>
                <button
                  class="toggle"
                  aria-label="toggle"
                />
              </div>
              <div class="accordion-body">
                <div
                  v-if="showActeTypes"
                  class="accordion-content"
                />
              </div>
            </article>
            <article
              class="accordion"
              :class="showLanguages ? 'is-active' : ''"
            >
              <div
                class="accordion-header"
                @click="showLanguages = !showLanguages"
              >
                <p>Langue du document</p>
                <button
                  class="toggle"
                  aria-label="toggle"
                />
              </div>
              <div class="accordion-body">
                <div
                  v-if="showLanguages"
                  class="accordion-content"
                >
                  <ul>
                    <li
                      v-for="lang in languages"
                      :key="lang.code"
                      @click.prevent="toggleSelection({filter: 'languages', item: lang.code})"
                    >
                      <div
                        class="labelled-checkbox"
                      >
                        <label><input
                          type="checkbox"
                          :value="lang.code"
                          :checked="isLanguageSelected(lang.code)"
                        ><span
                          v-show="isLanguageSelected(lang.code)"
                          class="checkmark"
                        />{{ lang.label }}</label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
            <article 
              :class="showCenturies ? 'is-active' : ''"
              class="accordion"
            >
              <div 
                class="accordion-header"
                @click="showCenturies = !showCenturies"
              >
                <p>Siècle du document</p>
                <button
                  class="toggle"
                  aria-label="toggle"
                />
              </div>
              <div class="accordion-body">
                <div
                  v-if="showCenturies"
                  class="accordion-content"
                />
              </div>
            </article>
            <article 
              :class="showCopyCenturies ? 'is-active' : ''"
              class="accordion"
            >
              <div 
                class="accordion-header"
                @click="showCopyCenturies = !showCopyCenturies"
              >
                <p>Siècle de la copie</p>
                <button
                  class="toggle"
                  aria-label="toggle"
                />
              </div>
              <div class="accordion-body">
                <div
                  v-if="showCopyCenturies"
                  class="accordion-content"
                />
              </div>
            </article>
            <article 
              :class="showCountries ? 'is-active' : ''"
              class="accordion"
            >
              <div 
                class="accordion-header"
                @click="showCountries = !showCountries"
              >
                <p>Pays</p>
                <button
                  class="toggle"
                  aria-label="toggle"
                />
              </div>
              <div class="accordion-body">
                <div 
                  v-if="showCountries"
                  class="accordion-content"
                />
              </div>
            </article>
            <article 
              :class="showDistricts ? 'is-active' : ''"
              class="accordion"
            >
              <div 
                class="accordion-header"
                @click="showDistricts = !showDistricts"
              >
                <p>Région contemporaine</p>
                <button
                  class="toggle"
                  aria-label="toggle"
                />
              </div>
              <div class="accordion-body">
                <div 
                  v-if="showDistricts"
                  class="accordion-content"
                />
              </div>
            </article>
            <article 
              :class="showInstitutions ? 'is-active' : ''"
              class="accordion"
            >
              <div 
                class="accordion-header"
                @click="showInstitutions = !showInstitutions"
              >
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
            <article
              :class="showAvailableCommentaries ? 'is-active' : ''"
              class="accordion"
            >
              <div
                class="accordion-header"
                @click="showAvailableCommentaries = !showAvailableCommentaries"
              >
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

              <div
                v-show="false"
                style="width: 220px; margin-top: 20px"
              >
                <slider
                  id="dateSlider"
                  :options="dateSliderOptions"
                />
              </div>
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

import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    name: "SearchPage",
    components: {
        DocumentCard,
        DocumentCardPlaceholder,
        Slider
    },
    data() {
      return {
        showLanguages: false,
        showTraditions: false,
        showActeTypes: false,
        showCenturies: false,
        showCopyCenturies: false,
        showCountries: false,
        showDistricts: false,
        showInstitutions: false,
        showAvailableCommentaries: false,

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
        ...mapGetters('search', ['isLanguageSelected']),
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
      ...mapActions('search', ['toggleSelection']),
      fetchAll() {
        return this.$store.dispatch('document/fetchAll', {
          pageId: 1,
          pageSize: 50,
          filters: ''
        })
      },
    }
}
</script>

<style>

</style>