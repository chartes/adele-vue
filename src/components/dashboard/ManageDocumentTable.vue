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
        pagination-position="both"
        :total="total"
        :per-page="perPage"
        aria-next-label="Page suivante"
        aria-previous-label="Page précédente"
        aria-page-label="Page"
        aria-current-label="Page courante"
        backend-sorting

        :default-sort-direction="defaultSortOrder"
        :default-sort="[sortField, sortOrder]"
        narrowed

        @page-change="onPageChange"
        @sort="onSort" 
      >
        <b-table-column
          v-slot="props"
          field="id"
          label="Dossier"
          sortable
          width="160"
        >
          <span
            class="gotodoc"
            @click="$router.push({name: 'document-view', params: {docId: props.row.id, section: 'notice'}})"
          >
            {{ props.row.id }}
            <img
              :src="getThumbnailUrl(props.row['thumbnail-url'])"
              width="150"
            >
          </span>
        </b-table-column>

        <b-table-column
          v-slot="props"
          field="title"
          label="Titre"
          width="400"
          sortable
        >
          <span
            class="gotodoc"
            @click="$router.push({name: 'document-view', params: {docId: props.row.id, section: 'notice'}})"
          >
            <div class="doc-title">
              {{ props.row.title }}
            </div>
            <div>{{ props.row.pressmark }}</div>
          </span>
        </b-table-column>
        <b-table-column
          v-slot="props"
          field="whitelist"
          label="Liste d'accès"
          width="150"
          sortable
          centered
        >
          {{ props.row['whitelist'].id }} - {{ props.row['whitelist'].label }}
        </b-table-column>

        <b-table-column
          v-slot="props"
          field="user"
          label="Propriétaire"
          width="120"
          sortable
          centered
        >
          {{ props.row.owner['username'] }}
        </b-table-column>
        <b-table-column
          v-slot="props"
          label="Avancement"
          width="150"
        >
          <workflow-radio-steps-light
            :validation="props.row.validation"
            :exist="props.row.exist"
          /> 
        </b-table-column>
        <b-table-column
          v-slot="props"
          label="Actions"
          width="150"
        >
          <workflow-radio-steps-light
            :validation="props.row.validation"
            :exist="props.row.exist"
          /> 
        </b-table-column>
      </b-table>
    </section>
  </div>
</template>

<script>

import { mapState, mapActions, mapGetters } from 'vuex';
import http from '@/modules/http-common.js';
import WorkflowRadioStepsLight from "@/components/dashboard/WorkflowRadioStepsLight.vue";

export default {
    name: "ManageDocumentTable",
    components: {
      WorkflowRadioStepsLight
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
                sortField: 'id',
                sortOrder: 'desc',
                defaultSortOrder: 'desc',
                page: 1,
                perPage: 25
        }
      },
      computed: {
        ...mapGetters('user', ['getUser'])
      },
      mounted() {
            this.loadAsyncData()
      },
      methods: {
          getThumbnailUrl(url) {
            return url ? url.replace('/full/full', '/full/200,') : require('@/assets/images/document_placeholder.svg')
          },
          /*
          * Load async data
          */
          async loadAsyncData() {
                const params = [
                    `sort-by=${this.sortField}.${this.sortOrder}`,
                    `num-page=${this.page}`,
                    `page-size=${this.perPage}`
                ].join('&')

                this.loading = true

                try {
                  const response = await http.get(`dashboard/document-management?${params}`)
                  const data = response.data.data
                  
                  this.data = []
                  /*
                  let currentTotal = data.documents.length
                  if (data.total / this.perPage > 1000) {
                    currentTotal = this.perPage * 1000
                  }
                  */
                  
                  this.total = data.total

                  data.documents.forEach(async (item) => {
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

<style scoped lang="scss">
.doc-title {
    font-size: 18px;
    line-height: 18px;
    text-transform: none;
  }
.dashboard, ul {
  list-style-type: none !important;
  padding: 0 important;
}
img {
  margin: 0px !important;
  margin-right: 20px;
  position: relative;
  float: right;
}
.add-document { 
  padding-bottom: 20px;
}
.buttons {
  margin-top: 20px;
}
.gotodoc {
  &:hover {
    color: #FFD500 !important;
    cursor: pointer;
  }
}
</style>