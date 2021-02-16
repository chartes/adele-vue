<template>
  <div class="add-document">
    <h2>
      Gestion des dossiers
    </h2>
    
    <section>
      <b-table
        :data="data"
        :loading="loading"

        paginated
        backend-pagination
        :total="total"
        :per-page="perPage"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
        backend-sorting

        :default-sort-direction="defaultSortOrder"
        :default-sort="[sortField, sortOrder]"
        @page-change="onPageChange"
        @sort="onSort"
      >
        <b-table-column
          v-slot="props"
          field="original_title"
          label="Numéro du dossier"
          sortable
        >
          {{ props.row.original_title }}
        </b-table-column>

        <b-table-column
          v-slot="props"
          field="vote_average"
          label="Titre"
          numeric
          sortable
        >
          <span
            class="tag"
            :class="type(props.row.vote_average)"
          >
            {{ props.row.vote_average }}
          </span>
        </b-table-column>

        <b-table-column
          v-slot="props"
          field="vote_count"
          label="Propriétaire"
          numeric
          sortable
        >
          {{ props.row.vote_count }}
        </b-table-column>

        <b-table-column
          v-slot="props"
          field="release_date"
          label="Liste d'accès"
          sortable
          centered
        >
          {{ props.row.release_date ? new Date(props.row.release_date).toLocaleDateString() : 'unknown' }}
        </b-table-column>

        <b-table-column
          v-slot="props"
          label="Statut"
          width="500"
        >
          {{ props.row.overview | truncate(80) }}
        </b-table-column>
      </b-table>
    </section>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex';
import {http} from '@/modules/http-common.js';

export default {
    name: "ManageDocumentTable",
    components: {
    },
        filters: {
            /**
        * Filter to truncate string, accepts a length parameter
        */
            truncate(value, length) {
                return value.length > length
                    ? value.substr(0, length) + '...'
                    : value
            }
        },
   data() {
            return {
                data: [],
                total: 0,
                loading: false,
                sortField: 'vote_count',
                sortOrder: 'desc',
                defaultSortOrder: 'desc',
                page: 1,
                perPage: 20
            }
        },
        mounted() {
            this.loadAsyncData()
        },
        methods: {
            /*
        * Load async data
        */
            loadAsyncData() {
                const params = [
                    'api_key=bb6f51bef07465653c3e553d6ab161a8',
                    'language=en-US',
                    'include_adult=false',
                    'include_video=false',
                    `sort_by=${this.sortField}.${this.sortOrder}`,
                    `page=${this.page}`
                ].join('&')

                this.loading = true
                http.get(`dashboard/document-management?${params}`)
                    .then(async (response) => {
                        const data = response.data//await response.json()
                        // api.themoviedb.org manage max 1000 pages
                        this.data = []
                        let currentTotal = data.total_results
                        if (data.total_results / this.perPage > 1000) {
                            currentTotal = this.perPage * 1000
                        }
                        this.total = currentTotal
                        data.results.forEach((item) => {
                            item.release_date = item.release_date ? item.release_date.replace(/-/g, '/') : null
                            this.data.push(item)
                        })
                        this.loading = false
                    })
                    .catch((error) => {
                        this.data = []
                        this.total = 0
                        this.loading = false
                        throw error
                    })
            },
            /*
        * Handle page-change event
        */
            onPageChange(page) {
                this.page = page
                this.loadAsyncData()
            },
            /*
        * Handle sort event
        */
            onSort(field, order) {
                this.sortField = field
                this.sortOrder = order
                this.loadAsyncData()
            },
            /*
        * Type style in relation to the value
        */
            type(value) {
                const number = parseFloat(value)
                if (number < 6) {
                    return 'is-danger'
                } else if (number >= 6 && number < 8) {
                    return 'is-warning'
                } else if (number >= 8) {
                    return 'is-success'
                }
            }
        }
}
</script>

<style scoped>
.add-document { 
  padding-bottom: 20px;
}
.buttons {
  margin-top: 20px;
}
</style>