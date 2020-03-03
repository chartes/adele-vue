<template>
  <div>
    <div class="container is-fluid search-page">
      <div class="columns">
        <div class="column filters">
          <section class="accordions">
            <article class="accordion">
              <div class="accordion-header no-toggle">
                <p>Dates du document</p>
                <div class="date-range-selector">
                  <p>
                    Entre <input
                      class="min-date"
                      type="text"
                      value="1200"
                    > et <input
                      class="max-date"
                      type="text"
                      value="1400"
                    >
                  </p>
                  <slider
                    id="dateSlider"
                    class="date-slider"
                    :options="dateSliderOptions"
                  />
                </div>
              </div>
              <div class="accordion-body">
                <div class="accordion-content" />
              </div>
            </article>
            <article
              class="accordion"
              :class="showFilters.traditions ? 'is-active' : ''"
            >
              <div
                class="accordion-header"
                @click="showFilters.traditions = !showFilters.traditions"
              >
                <p>Mode de tradition</p>
                <button
                  class="toggle"
                  aria-label="toggle"
                />
              </div>
              <div class="accordion-body">
                <div
                  v-if="showFilters.traditions"
                  class="accordion-content"
                >
                  <ul>
                    <li
                      v-for="tradition in traditions"
                      :key="tradition.id"
                      @click.prevent="toggleSelection({filter: 'traditions', item: tradition.id})"
                    >
                      <div
                        class="labelled-checkbox"
                      >
                        <label><input
                          type="checkbox"
                          :value="tradition.id"
                          :checked="isTraditionSelected(tradition.id)"
                        ><span
                          v-show="isTraditionSelected(tradition.id)"
                          class="checkmark"
                        />{{ tradition.label }}</label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
            <article
              class="accordion"               
              :class="showFilters.acteTypes ? 'is-active' : ''"
            >
              <div
                class="accordion-header"     
                @click="showFilters.acteTypes = !showFilters.acteTypes"
              >
                <p>Type d’acte</p>
                <button
                  class="toggle"
                  aria-label="toggle"
                />
              </div>
              <div class="accordion-body">
                <div
                  v-if="showFilters.acteTypes"
                  class="accordion-content"
                >
                  <ul>
                    <li
                      v-for="acteType in acteTypes"
                      :key="acteType.id"
                      @click.prevent="toggleSelection({filter: 'acteTypes', item: acteType.id})"
                    >
                      <div
                        class="labelled-checkbox"
                      >
                        <label><input
                          type="checkbox"
                          :value="acteType.id"
                          :checked="isActeTypeSelected(acteType.id)"
                        ><span
                          v-show="isActeTypeSelected(acteType.id)"
                          class="checkmark"
                        />{{ acteType.label }}</label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
            <article
              class="accordion"
              :class="showFilters.languages ? 'is-active' : ''"
            >
              <div
                class="accordion-header"
                @click="showFilters.languages = !showFilters.languages"
              >
                <p>Langue du document</p>
                <button
                  class="toggle"
                  aria-label="toggle"
                />
              </div>
              <div class="accordion-body">
                <div
                  v-if="showFilters.languages"
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
              :class="showFilters.centuries ? 'is-active' : ''"
              class="accordion"
            >
              <div 
                class="accordion-header"
                @click="showFilters.centuries = !showFilters.centuries"
              >
                <p>Siècle du document</p>
                <button
                  class="toggle"
                  aria-label="toggle"
                />
              </div>
              <div class="accordion-body">
                <div
                  v-if="showFilters.centuries"
                  class="accordion-content"
                >
                  <ul>
                    <li
                      v-for="century in centuries"
                      :key="century.id"
                      @click.prevent="toggleSelection({filter: 'centuries', item: century.id})"
                    >
                      <div
                        class="labelled-checkbox"
                      >
                        <label><input
                          type="checkbox"
                          :value="century.id"
                          :checked="isCenturySelected(century.id)"
                        ><span
                          v-show="isCenturySelected(century.id)"
                          class="checkmark"
                        />{{ century.label }}</label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
            <article 
              :class="showFilters.copyCenturies ? 'is-active' : ''"
              class="accordion"
            >
              <div 
                class="accordion-header"
                @click="showFilters.copyCenturies = !showFilters.copyCenturies"
              >
                <p>Siècle de la copie</p>
                <button
                  class="toggle"
                  aria-label="toggle"
                />
              </div>
              <div class="accordion-body">
                <div
                  v-if="showFilters.copyCenturies"
                  class="accordion-content"
                >
                  <ul>
                    <li
                      v-for="century in copyCenturies"
                      :key="century.id"
                      @click.prevent="toggleSelection({filter: 'copyCenturies', item: century.id})"
                    >
                      <div
                        class="labelled-checkbox"
                      >
                        <label><input
                          type="checkbox"
                          :value="century.id"
                          :checked="isCopyCenturySelected(century.id)"
                        ><span
                          v-show="isCopyCenturySelected(century.id)"
                          class="checkmark"
                        />{{ century.label }}</label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
            <article 
              :class="showFilters.countries ? 'is-active' : ''"
              class="accordion"
            >
              <div 
                class="accordion-header"
                @click="showFilters.countries = !showFilters.countries"
              >
                <p>Pays</p>
                <button
                  class="toggle"
                  aria-label="toggle"
                />
              </div>
              <div class="accordion-body">
                <div 
                  v-if="showFilters.countries"
                  class="accordion-content"
                >
                  <ul>
                    <li
                      v-for="country in countries"
                      :key="country.id"
                      @click.prevent="toggleSelection({filter: 'countries', item: country.id})"
                    >
                      <div
                        class="labelled-checkbox"
                      >
                        <label><input
                          type="checkbox"
                          :value="country.id"
                          :checked="isCountrySelected(country.id)"
                        ><span
                          v-show="isCountrySelected(country.id)"
                          class="checkmark"
                        />{{ country.label }}</label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
            <article 
              :class="showFilters.districts ? 'is-active' : ''"
              class="accordion"
            >
              <div 
                class="accordion-header"
                @click="showFilters.districts = !showFilters.districts"
              >
                <p>Région contemporaine</p>
                <button
                  class="toggle"
                  aria-label="toggle"
                />
              </div>
              <div class="accordion-body">
                <div 
                  v-if="showFilters.districts"
                  class="accordion-content"
                >
                  <ul>
                    <li
                      v-for="district in districts"
                      :key="district.id"
                      @click.prevent="toggleSelection({filter: 'districts', item: district.id})"
                    >
                      <div
                        class="labelled-checkbox"
                      >
                        <label><input
                          type="checkbox"
                          :value="district.id"
                          :checked="isDistrictSelected(district.id)"
                        ><span
                          v-show="isDistrictSelected(district.id)"
                          class="checkmark"
                        />{{ district.label }}</label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
            <article 
              :class="showFilters.institutions ? 'is-active' : ''"
              class="accordion"
            >
              <div 
                class="accordion-header"
                @click="showFilters.institutions = !showFilters.institutions"
              >
                <p>Institution de conservation</p>
                <button
                  class="toggle"
                  aria-label="toggle"
                />
              </div>
              <div class="accordion-body">
                <div 
                  v-if="showFilters.institutions"
                  class="accordion-content"
                >
                  <ul>
                    <li
                      v-for="institution in institutions"
                      :key="institution.id"
                      @click.prevent="toggleSelection({filter: 'institutions', item: institution.id})"
                    >
                      <div
                        class="labelled-checkbox"
                      >
                        <label><input
                          type="checkbox"
                          :value="institution.id"
                          :checked="isInstitutionSelected(institution.id)"
                        ><span
                          v-show="isInstitutionSelected(institution.id)"
                          class="checkmark"
                        />{{ institution.name }}</label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
            <article
              :class="showFilters.availableCommentaries ? 'is-active' : ''"
              class="accordion"
            >
              <div
                class="accordion-header"
                @click="showFilters.availableCommentaries = !showFilters.availableCommentaries"
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
            <div class="filters-sort-options">
              <h4 v-if="isFiltered">
                Filtres  <a
                  href="#"
                  @click="resetFilters()"
                >tout effacer</a>
              </h4>
              <div class="filter-tag-list">
                <div 
                  v-for="(filter, idFilter) in selectedFilters"
                  :key="idFilter"
                  class="filter-tag-list field is-grouped is-grouped-multiline"
                >
                  <div
                    v-if="filter.values.length > 0"
                    class="control"
                  >
                    <div 
                      class="tags filter-category"
                      @click.prevent="resetFilter(idFilter)"
                    >
                      <a
                        class="tag"
                        href="#"
                      />
                      <a
                        class="tag"
                        href="#"
                      >{{ filter.label }}</a>
                    </div>
                  </div>
                  <div
                    v-for="item in filter.values" 
                    :key="filter.getId(item)"
                    class="control"
                  >
                    <div
                      class="tags"  
                      @click.prevent="toggleSelection({filter: idFilter, item: filter.getId(item)})"
                    >
                      <a 
                        class="tag"
                        href="#"
                      >{{ filter.getLabel(item) }}</a>
                    </div>
                  </div>
                </div>
              </div>
              <h4>Tris</h4>
              <select>
                <option>Date de l'acte</option>
              </select>
            </div>
            <progress
              v-show="loading" 
              class="progress is-small is-warning"
              max="100"
            >
              15%
            </progress>

            <nav 
              class="pagination"
              role="navigation"
              aria-label="pagination"
            >
              <span class="pagination-documents-count pagination-previous">{{ meta.totalCount }} {{ meta.totalCount === 1 ? 'document' : 'documents' }}</span>
              <ul class="pagination-list">
                <li v-if="pagination.first">
                  <a
                    class="pagination-link"
                    :aria-label="`Goto page ${pagination.first}`"
                    @click="currentPage=pagination.first"
                  >{{ pagination.first }}</a>
                </li>
                <li v-if="pagination.first && pagination.previous - 1 > pagination.first">
                  <span class="pagination-ellipsis">&hellip;</span>
                </li>
                <li v-if="pagination.previous">
                  <a
                    class="pagination-link"
                    :aria-label="`Goto page ${pagination.previous}`"
                    @click="currentPage=pagination.previous"
                  >{{ pagination.previous }}</a>
                </li>
                <li>
                  <a
                    class="pagination-link is-current"
                    :aria-label="`Goto page ${pagination.current}`"
                  >{{ pagination.current }}</a>
                </li>
                <li v-if="pagination.next">
                  <a
                    class="pagination-link"
                    :aria-label="`Goto page ${pagination.next}`"
                    @click="currentPage=pagination.next"
                  >{{ pagination.next }}</a>
                </li>
                <li v-if="pagination.last && pagination.next + 1 < pagination.last">
                  <span class="pagination-ellipsis">&hellip;</span>
                </li>
                <li v-if="pagination.last">
                  <a
                    class="pagination-link"
                    :aria-label="`Goto page ${pagination.last}`"
                    @click="currentPage=pagination.last"
                  >{{ pagination.last }}</a>
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
import {centuries, debounce} from '@/modules/utils'

export default {
    name: "SearchPage",
    components: {
        DocumentCard,
        DocumentCardPlaceholder,
        Slider
    },
    data() {
      return {
        currentPage: 1,
        showFilters: {
          languages: false,
          traditions: false,
          acteTypes: false,
          centuries: false,
          copyCenturies: false,
          countries: false,
          districts: false,
          institutions: false,
          availableCommentaries: false,
        },
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
        ...mapState('document', ['documents', 'document', 'loading', 'meta']),
        ...mapState('languages', ['languages']),
        ...mapState('countries', ['countries']),
        ...mapState('districts', ['districts']),
        ...mapState('traditions', ['traditions']),
        ...mapState('acteTypes', ['acteTypes']),
        ...mapState('editors', ['editors']),
        ...mapState('institutions', ['institutions']),
        ...mapGetters('search', [
          'isLanguageSelected',
          'isActeTypeSelected',
          'isTraditionSelected',
          'isCenturySelected',
          'isCopyCenturySelected',
          'isInstitutionSelected',
          'isCountrySelected',
          'isDistrictSelected',
          'isAvailableCommentarySelected'
        ]),
        centuries() {
          return Object.keys(centuries).map(arb => {
            return {id: arb, label: centuries[arb]}
          })
        },
        copyCenturies() {
          return Object.keys(centuries).map(arb => {
            return {id: arb, label: centuries[arb]}
          })
        },
        isFiltered() {
          for(let f in this.selectedFilters) {
            if (this.selectedFilters[f].values.length > 0) {
              return true
            }  
          }
          return false
        },
        selectedFilters() {
          return {
            traditions: {
              label: 'Mode de tradition',
              values: this.traditions.filter(t => this.isTraditionSelected(t.id)),
              getId: c => c.id,
              getLabel: c => c.label 
            },
            acteTypes: {
              label: 'Type d\'acte',
              values: this.acteTypes.filter(t => this.isActeTypeSelected(t.id)),
              getId: c => c.id,
              getLabel: c => c.label 
              },
            languages: {
              label: 'Langue du document',
              values: this.languages.filter(t => this.isLanguageSelected(t.code)),
              getId: c => c.code,
              getLabel: c => c.label 
            },
            centuries: {
              label: 'Siècle du document', 
              values: this.centuries.filter(t => this.isCenturySelected(t.id)),
              getId: c => c.id,
              getLabel: c => c.label 
            },
            copyCenturies: {
              label: 'Siècle de la copie', 
              values: this.copyCenturies.filter(t => this.isCopyCenturySelected(t.id)),
              getId: c => c.id,
              getLabel: c => c.label 
            },
            countries: {
              label: 'Pays',
              values: this.countries.filter(t => this.isCountrySelected(t.id)),
              getId: c => c.id,
              getLabel: c => c.label
            },
            districts: {
              label: 'Région contemporaine',
              values: this.districts.filter(t => this.isDistrictSelected(t.id)),
              getId: c => c.id,
              getLabel: c => c.label
            },
            institutions: {
              label: 'Institution de conservation',
              values: this.institutions.filter(t => this.isInstitutionSelected(t.id)),
              getId: c => c.id,
              getLabel: c => c.name 
            },
          }
        },
        pagination() {
          let pagination = {
            current: this.meta.currentPage
          }
          if (pagination.current > 1) {
            pagination.previous = pagination.current - 1
          } 
          if (pagination.current < this.meta.nbPages) {
            pagination.next = pagination.current + 1
          }
          if (pagination.previous > 1) {
            pagination.first = 1
          } 
          if (pagination.next < this.meta.nbPages) {
            pagination.last = this.meta.nbPages
          } 
          return pagination
        }
    },
    watch: {
      selectedFilters() {
        this.fetchAll()
      },
      currentPage() {
        this.fetchAll()
      }
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
      ...mapActions('search', ['toggleSelection', 'clear', 'clearAll']),
      resetFilter(filter) {
        this.showFilters[filter] = false
        this.clear({filter: filter})
      },
      resetFilters() {
        this.showFilters.languages = false
        this.showFilters.traditions = false
        this.showFilters.acteTypes = false
        this.showFilters.centuries = false
        this.showFilters.copyCenturies = false
        this.showFilters.countries = false
        this.showFilters.districts = false
        this.showFilters.institutions = false
        this.showFilters.availableCommentaries = false
        this.clearAll()
      },
      fetchAll: debounce(function() {
        let filters = {}
        for (let f in this.selectedFilters){
          filters[f] = this.selectedFilters[f].values
        }

        let sorts = {}

        return this.$store.dispatch('document/fetchAll', {
          pageNum: this.currentPage,
          pageSize: 10,
          filters,
          sorts
        })
      }, 750),
    }
}
</script>

<style>

</style>