<template>
  <div id="root">
    <div class="container is-fluid search-page">
      <div class="columns">
        <div class="column filters">
          <section class="accordions">
            <article class="accordion">
              <div class="accordion-header no-toggle">
                <select v-model="dateMode">
                  <option value="witness">
                    Date du témoin présenté
                  </option>
                  <option value="creation-only">
                    Date de l'original 
                  </option>
                  <option value="copy-only">
                    Siècle de la copie
                  </option>
                  <option value="creation-and-copy">
                    Date de l'original et date de la copie
                  </option>
                </select>
                <div
                  v-if="dateMode !== 'copy-only'"
                  class="date-range-selector"
                >
                  <p>
                    <span v-if="dateMode === 'creation-and-copy'">Original</span>
                    Entre <input
                      v-model="creationDate.start"
                      class="min-date"
                      type="number"
                    > et <input
                      v-model="creationDate.end"
                      class="max-date"
                      type="number"
                    >

                    <label class="checkbox date-checkbox">
                      <b-field>
                        <b-checkbox
                          v-model="showDocsWithoutCreationDate"
                          :value="showDocsWithoutCreationDate"
                          type="is-light"
                        >
                          <span>Inclure les documents sans date</span>
                        </b-checkbox>
                      </b-field>
                    </label>
                  </p>
                  <b-field>
                    <b-slider
                      v-model="creationDateSliderRange"
                      :min="creationDate.min" 
                      :max="creationDate.max"
                      lazy
                      rounded
                      :step="10"
                      tooltip-type="is-light"
                      @change="fetchAll"
                    >
                      <template v-for="val in [750, 1000, 1250, 1500, 1750]">
                        <b-slider-tick
                          :key="val"
                          :value="val"
                        >
                          {{ val }}
                        </b-slider-tick>
                      </template>
                    </b-slider>
                  </b-field>
                </div>
                <div
                  v-if="dateMode === 'creation-and-copy' || dateMode === 'copy-only' "
                  class="date-range-selector"
                >
                  <p>
                    <span v-if="dateMode === 'creation-and-copy'">Copie</span> Entre le<input
                      v-model="copyDate.start"
                      class="min-date date-copy"
                      type="number"
                    ><sup>ème</sup> et le<input
                      v-model="copyDate.end"
                      class="max-date date-copy"
                      type="number"
                    ><sup>ème</sup> siècle
                    
                    <label class="checkbox date-checkbox">
                      <b-field>
                        <b-checkbox
                          v-model="showDocsWithoutCopyDate"
                          :value="showDocsWithoutCopyDate"
                          type="is-light"
                        >
                          <span>Inclure les documents sans date</span>
                        </b-checkbox>
                      </b-field>
                    </label>
                  </p>
                  <b-field>
                    <b-slider
                      v-model="copyDateSliderRange"
                      :min="copyDate.min" 
                      :max="copyDate.max"
                    
                      lazy
                      rounded
                      tooltip-type="is-light"
                      @change="fetchAll"
                    >
                      <template v-for="val in [5, 7, 9, 11, 13, 15, 17, 19, 21]">
                        <b-slider-tick
                          :key="val"
                          :value="val"
                        >
                          {{ val }}
                        </b-slider-tick>
                      </template>
                    </b-slider>
                  </b-field>
                </div>
              </div>
              <div class="accordion-body">
                <div class="accordion-content" />
              </div>
            </article>
            <article
              class="accordion mt-3"
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
                        v-if="meta.filterCount['traditions'] && meta.filterCount['traditions'][tradition.id]"
                        class="labelled-checkbox"
                      >
                        <label><input
                          type="checkbox"
                          :value="tradition.id"
                          :checked="isTraditionSelected(tradition.id)"
                        ><span
                          v-show="isTraditionSelected(tradition.id)"
                          class="checkmark"
                        />{{ tradition.label }} <span
                          class="filter-count"
                        >({{ meta.filterCount['traditions'][tradition.id] }})</span></label>
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
                <p>Type d’auteur ou de document</p>
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
                      v-for="section in methSortedActeTypes"
                      :key="section.sectionLabel"
                    >
                      <div class="section-label">
                        {{ section.sectionLabel }}
                      </div>
                      <div
                        v-for="acteType in section.acteTypes"
                        :key="acteType.id"
                        @click.prevent="toggleSelection({filter: 'acteTypes', item: acteType.id})"
                      >
                        <div
                          v-if="meta.filterCount['acteTypes'] && meta.filterCount['acteTypes'][acteType.id]"
                          class="labelled-checkbox"
                        >
                          <label><input
                            type="checkbox"
                            :value="acteType.id"
                            :checked="isActeTypeSelected(acteType.id)"
                          ><span
                            v-show="isActeTypeSelected(acteType.id)"
                            class="checkmark"
                          />{{ acteType.label }} <span
                            class="filter-count"
                          >({{ meta.filterCount['acteTypes'][acteType.id] }})</span></label>
                        </div>
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
                <p>Langues</p>
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
                        v-if="meta.filterCount['languages'] && meta.filterCount['languages'][lang.code]"
                        class="labelled-checkbox"
                      >
                        <label><input
                          type="checkbox"
                          :value="lang.code"
                          :checked="isLanguageSelected(lang.code)"
                        ><span
                          v-show="isLanguageSelected(lang.code)"
                          class="checkmark"
                        />{{ lang.label }} <span
                          class="filter-count"
                        >({{ meta.filterCount['languages'][lang.code] }})</span></label>
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
                <p>Pays contemporain</p>
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
                        v-if="meta.filterCount['countries'] && meta.filterCount['countries'][country.id]"
                        class="labelled-checkbox"
                      >
                        <label><input
                          type="checkbox"
                          :value="country.id"
                          :checked="isCountrySelected(country.id)"
                        ><span
                          v-show="isCountrySelected(country.id)"
                          class="checkmark"
                        />{{ country.label }} <span
                          class="filter-count"
                        >({{ meta.filterCount['countries'][country.id] || 0 }})</span></label>
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
                <p>District contemporain</p>
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
                        v-if="meta.filterCount['districts'] && meta.filterCount['districts'][district.id]"
                        class="labelled-checkbox"
                      >
                        <label><input
                          type="checkbox"
                          :value="district.id"
                          :checked="isDistrictSelected(district.id)"
                        ><span
                          v-show="isDistrictSelected(district.id)"
                          class="checkmark"
                        />{{ district.label }} <span
                          class="filter-count"
                        >({{ meta.filterCount['districts'][district.id] || 0 }})</span></label>
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
                        v-if="meta.filterCount['institutions'] && meta.filterCount['institutions'][institution.id]"
                        class="labelled-checkbox"
                      >
                        <label><input
                          type="checkbox"
                          :value="institution.id"
                          :checked="isInstitutionSelected(institution.id)"
                        ><span
                          v-show="isInstitutionSelected(institution.id)"
                          class="checkmark"
                        />{{ institution.name }} <span
                          class="filter-count"
                        >({{ meta.filterCount['institutions'][institution.id] || 0 }})</span></label>
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
                <div 
                  v-if="showFilters.availableCommentaries"
                  class="accordion-content"
                >
                  <ul>
                    <li
                      v-for="comType in availableCommentaries"
                      :key="comType.id"
                      @click.prevent="toggleSelection({filter: 'availableCommentaries', item: comType.id})"
                    >
                      <div
                        v-if="meta.filterCount['availableCommentaries'] && meta.filterCount['availableCommentaries'][comType.id]"
                        class="labelled-checkbox"
                      >
                        <label><input
                          type="checkbox"
                          :value="comType.id"
                          :checked="isAvailableCommentarySelected(comType.id)"
                        ><span
                          v-show="isAvailableCommentarySelected(comType.id)"
                          class="checkmark"
                        />{{ comType.label }} <span
                          class="filter-count"
                        >({{ meta.filterCount['availableCommentaries'][comType.id] || 0 }})</span></label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          </section>
        </div>

        <div class="column documents is-three-quarters">
          <div class="section">
            <header
              v-if="title"
              class="collection-title title"
            >
              <h1 v-html="title" />
            </header>
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
              <select v-model="selectedSort">
                <option value="witness_date">
                  Date du témoin présenté
                </option>
                <option value="creation">
                  Date de l'original
                </option>
                <option value="copy_cent">
                  Siècle de la copie
                </option>
                <option value="id">
                  Numéro de dossier
                </option>
                <option value="title">
                  Titre
                </option>
              </select>
              <button
                class="button is-light is-small sort-order"
                @click="sortOrder = sortOrder === '' ? '-' : ''"
              >
                <i
                  v-if="sortOrder === ''"
                  class="fas fa-arrow-down"
                />
                <i
                  v-else
                  class="fas fa-arrow-up"
                />
              </button>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import DocumentCard from '../components/document/DocumentCard.vue'
import DocumentCardPlaceholder from '../components/document/DocumentCardPlaceholder.vue'

import { mapState, mapGetters, mapActions } from 'vuex';
import {debounce} from '@/modules/utils'

export default {
    name: "SearchPage",
    components: {
        DocumentCard,
        DocumentCardPlaceholder,
    },
    data() {
      return {
        currentPage: 1,
        showFilters: {
          languages: false,
          traditions: false,
          acteTypes: false,
          countries: false,
          districts: false,
          institutions: false,
          availableCommentaries: false,
        },

        dateMode: 'witness',
        showDocsWithoutCreationDate: true,
        showDocsWithoutCopyDate: true,
        creationDate: {
          start: 700,
          end: 1700,
          min: 400,
          max: 2099,
          step: 1
        },
        copyDate: {
          start: 8,
          end: 18,
          min: 5,
          max: 21
        },
        selectedSort: 'witness_date',
        sortOrder: '',
      }
    },
    computed: {
        ...mapState('search', ['selection', 'title', 'sorts']),
        ...mapState('document', ['documents', 'document', 'loading', 'meta']),
        ...mapState('languages', ['languages']),
        ...mapState('countries', ['countries']),
        ...mapState('districts', ['districts']),
        ...mapState('traditions', ['traditions']),
        ...mapState('acteTypes', ['acteTypes']),
        ...mapState('editors', ['editors']),
        ...mapState('institutions', ['institutions']),
        ...mapState('commentaries', { availableCommentaries: 'commentaryTypes' }),
        ...mapGetters('search', [
          'isLanguageSelected',
          'isActeTypeSelected',
          'isTraditionSelected',
          'isInstitutionSelected',
          'isCountrySelected',
          'isDistrictSelected',
          'isAvailableCommentarySelected',
          'isCurrentlyFiltered'
        ]),
        ...mapGetters('acteTypes', ['methSortedActeTypes']),
        creationDateSliderOptions() {
          let start = parseInt(this.creationDate.start)
          let end = parseInt(this.creationDate.end)
          return {
            start: [isNaN(start) ? this.creationDate.min : start, isNaN(end) ? this.creationDate.max : end],
            range: {
                'min': [this.creationDate.min],
                'max': [this.creationDate.max]
            }
          }
        },
        creationDateSliderRange: {
          set(v) {
            this.creationDate.start = v[0];
            this.creationDate.end = v[1];
          },
          get() {
            return [parseInt(this.creationDate.start), parseInt(this.creationDate.end)]
          }
        },
        copyDateSliderOptions() {
          let start = parseInt(this.copyDate.start)
          let end = parseInt(this.copyDate.end)
          return {
            start: [isNaN(start) ? this.copyDate.min : start, isNaN(end) ? this.copyDate.max : end],
            range: {
                'min': [this.copyDate.min],
                'max': [this.copyDate.max]
            }
          }
        },
        copyDateSliderRange: {
          set(v) {
            this.copyDate.start = v[0];
            this.copyDate.end = v[1];
          },
          get() {
            return [parseInt(this.copyDate.start), parseInt(this.copyDate.end)]
          }
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
              label: 'Type d’auteur ou de document',
              values: this.acteTypes.filter(t => this.isActeTypeSelected(t.id)),
              getId: c => c.id,
              getLabel: c => c.label 
              },
            languages: {
              label: 'Langues',
              values: this.languages.filter(t => this.isLanguageSelected(t.code)),
              getId: c => c.code,
              getLabel: c => c.label 
            },
            countries: {
              label: 'Pays contemporain',
              values: this.countries.filter(t => this.isCountrySelected(t.id)),
              getId: c => c.id,
              getLabel: c => c.label
            },
            districts: {
              label: 'District contemporain',
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
            'availableCommentaries': {
              label: 'Types de commentaires fournis',
              values: this.availableCommentaries.filter(t => this.isAvailableCommentarySelected(t.id)),
              getId: c => c.id,
              getLabel: c => c.label 
            },
          }
        },
        activeFilterSection() {
          const active = Object.entries(this.showFilters).filter(e => e[1])
          return active.length > 0 ? active.map(a => a[0]) : false
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
      activeFilterSection() {
        this.fetchFilterCounts()
      },
      selectedSort() {
        this.setSort([`${this.sortOrder}${this.selectedSort}`])
        this.fetchAll()
      },
      sortOrder() {
        this.setSort([`${this.sortOrder}${this.selectedSort}`])
        this.currentPage = 1
        this.fetchAll()
      },
      "creationDate.start"() {
        this.fetchAll()
      },
      "creationDate.end"() {
        this.fetchAll()
      },
      "copyDate.start"() {
        this.fetchAll()
      },
      "copyDate.end"() {
        this.fetchAll()
      },
      dateMode() {
        this.fetchAll()
      },
      showDocsWithoutCreationDate() {
        this.fetchAll()
      },
      showDocsWithoutCopyDate() {
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
        this.$store.dispatch('institutions/fetch'),
        this.$store.dispatch('commentaries/fetchTypes')
      ])
    },
    mounted() {
      window.scrollTo(0, 0);
    },
    created() {
      if (this.isCurrentlyFiltered) {
        Object.keys(this.selection).forEach(k => {
          this.showFilters[k] = this.selection[k].length
        })
      }

      if (this.selection.creationRange.length) {
        this.creationDate.start = this.selection.creationRange[0]
        this.creationDate.end = this.selection.creationRange[1]
      }

      if (this.selection.copyRange.length) {
        this.copyDate.start = this.selection.copyRange[0]
        this.copyDate.end = this.selection.copyRange[1]
      }

      this.sortOrder = this.sorts[0].startsWith('-') ? '-' : ''
      this.selectedSort = this.sortOrder === '' ? this.sorts[0] : this.sorts[0].slice(1)
      console.log('restoring sorts', this.sorts, this.sortOrder, this.selectedSort)

      this.fetchAll()
    },
    methods: {
      ...mapActions('search', ['toggleSelection', 'clear', 'clearAll', 'setSort']),
      resetFilter(filter) {
        this.showFilters[filter] = false
        this.clear({filter: filter})
      },
      resetFilters() {
        this.showFilters.languages = false
        this.showFilters.traditions = false
        this.showFilters.acteTypes = false
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

        filters['dateMode'] = this.dateMode
        filters['creationRange'] = this.creationDateSliderOptions.start
        filters['copyRange'] = this.copyDateSliderOptions.start

        filters['showDocsWithoutCreationDate'] = this.showDocsWithoutCreationDate
        filters['showDocsWithoutCopyDate'] = this.showDocsWithoutCopyDate

        if (this.activeFilterSection) {
          filters['filtersToCount'] = this.activeFilterSection
        }

        const sorts = this.sorts

        this.$store.dispatch('document/fetchAll', {
          pageNum: this.currentPage,
          pageSize: 27,
          filters,
          sorts
        })

        this.fetchFilterCounts()
        
      }, 500),
      fetchFilterCounts: debounce(function() {
        let filters = {}
        for (let f in this.selectedFilters){
          filters[f] = this.selectedFilters[f].values
        }
        filters['dateMode'] = this.dateMode
        filters['creationRange'] = this.creationDateSliderOptions.start
        filters['copyRange'] = this.copyDateSliderOptions.start

        filters['showDocsWithoutCreationDate'] = this.showDocsWithoutCreationDate
        filters['showDocsWithoutCopyDate'] = this.showDocsWithoutCopyDate

        if (this.activeFilterSection) {
          filters['filtersToCount'] = this.activeFilterSection
        }

        return this.$store.dispatch('document/fetchFilterCounts', {
          filters
        })
      }, 300),
    }
}
</script>

<style>

</style>