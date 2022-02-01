<template>
  <div>
    <section>
      <b-table
        :data="data"
        :loading="loading"
        striped

        paginated
        backend-pagination
        pagination-position="bottom"
        :total="total"
        :per-page="perPage"
        aria-next-label="Page suivante"
        aria-previous-label="Page précédente"
        aria-page-label="Page"
        aria-current-label="Page courante"
        backend-sorting

        :default-sort-direction="defaultSortOrder"
        :default-sort="[sortField, sortOrder]"

        :selected.sync="selected"

        @page-change="onPageChange"
        @sort="onSort"
      >
        <b-table-column
          v-slot="props"
          field="lastname"
          label="Nom"
          sortable
          width="240"
        >
          <span>
            {{ props.row.last_name }}
          </span>
        </b-table-column>

        <b-table-column
          v-slot="props"
          field="firstname"
          label="Prénom"
          width="240"
          sortable
        >
          <span>
            {{ props.row.first_name }}
          </span>
        </b-table-column>
        <b-table-column
          v-slot="props"
          field="email"
          label="Email"
          width="320"
          sortable
        >
          {{ props.row.email }}
        </b-table-column>
      </b-table>
    </section>
  </div>
</template>




<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import {debounce} from 'lodash'
import http from '@/modules/http-common.js';

export default {
    name: "UserList",
    components: {
        
    },
    data () {
        return {
                data: [],
                total: 0,
                loading: false,
                sortField: 'lastname',
                sortOrder: 'desc',
                defaultSortOrder: 'desc',
                page: 1,
                perPage: 20,

                selected: null
        }
    },
    watch: {
      selected() {
        this.$root.$emit('userlist:selected', this.selected)
      }
    },
    created() {
      this.$root.$on('userlist:unselect-user', () => {
        this.selected = null
      })
      this.$root.$on('userlist:refresh', () => {
        this.loadAsyncData()
      })
    },
    mounted() {
        this.loadAsyncData()
    },
    methods: {

      refreshTable() {
            this.loadAsyncData()
          },
          async loadAsyncData() {
                const params = [  
                    `sort-by=${this.sortField}.${this.sortOrder}`,
                    `num-page=${this.page}`,
                    `page-size=${this.perPage}`
                ].join('&')

                this.loading = true
                this.data = []

                try {
                  const response = await http.get(`users?${params}`)
                  const data = response.data.data

                  this.total = data.total

                  data.users.forEach(async (item) => {
                    this.data.push(item)
                  })
                  this.loading = false
                } catch (error) {
                  console.log(http)
                  console.warn(error)
                  this.data = []
                  this.total = 0
                  this.loading = false
                }
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
    }
}
</script>

<style>

</style>