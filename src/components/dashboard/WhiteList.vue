<template>
  <div>
    <section>
      <b-table
        :data="data"
        :loading="loading"
        striped
        :total="total"
        backend-sorting

        :default-sort-direction="defaultSortOrder"
        :default-sort="[sortField, sortOrder]"

        :selected.sync="selectedUser" 
        @sort="onSort"
      >
        <b-table-column
          v-slot="props"
          field="lastname"
          label="Nom"
          width="230"
        >
          <span>
            {{ props.row.last_name }}
          </span>
        </b-table-column>

        <b-table-column
          v-slot="props"
          field="firstname"
          label="Prénom"
          width="230"
        >
          <span>
            {{ props.row.first_name }}
          </span>
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
    name: "Whitelist",
    components: {
        
    },
    props: {
      whitelistId: {type: Number, required: true}
    },
    data () {
        return {
                data: [],
                total: 0,
                loading: false,
                sortField: 'lastname',
                sortOrder: 'desc',
                defaultSortOrder: 'desc',

                selectedUser: null
        }
    },
    watch: {
      whitelistId() {
        this.loadAsyncData()
      },
      selectedUser() {
        this.$root.$emit('whitelist:selected-user', this.selectedUser)
      }
    },
    created() {
      this.$root.$on('whitelist:refresh', (payload) => {
        this.loadAsyncData()
      })
      this.$root.$on('whitelist:unselect-user', () => {
        this.selectedUser = null
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
                    `sort-by=${this.sortField}.${this.sortOrder}`
                ].join('&')

                this.loading = true
                this.data = []

                try {
                  const response = await http.get(`whitelists/${this.whitelistId}?${params}`)
                  const data = response.data.data
                  console.log('REFRESH TABLE')

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