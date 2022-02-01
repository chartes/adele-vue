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

        @page-change="onPageChange"
        @sort="onSort" 
      >
        <b-table-column
          v-slot="props"
          field="bookmark_order"
          label="Favori"
          sortable
          width="80"
        >
          <div
            class="bookmark" 
            @click="toggleBookmark(props.row.id)"
          >
            <span 
              class="icon"
              :class="props.row.bookmark_order ? 'active-bookmark' : 'inactive-bookmark'"
            >
              <i class="fas fa-bookmark" />
            </span>
          </div>
        </b-table-column>
      
        <b-table-column
          v-slot="props"
          field="id"
          label="Dossier"
          sortable
          width="200"
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
          width="360"
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
          field="whitelist_id"
          label="Liste d'accès"
          width="150"
          sortable
        >
          <whitelist-dropdown
            :initial-selection="props.row['whitelist'].id"
            :doc-id="props.row.id"
          />
        </b-table-column>

        <b-table-column
          v-slot="props"
          field="user_id"
          label="Propriétaire"
          width="300"
          sortable
          centered
        >
          <div class="owner-container">
            {{ props.row.owner['username'] }}
            <b-button
              v-if="currentUserIsAdmin"
              type="is-primary is-outlined"
              size="is-small"
              @click="setOwnerModalProps(props.row)"
            >
              <i class="fas fa-exchange-alt" />
            </b-button>
          </div>
        </b-table-column>
        <b-table-column
          v-slot="props"
          label="Avancement du propriétaire"
          width="230"
          centered
        >
          <workflow-radio-steps-light
            :validation="props.row.validation"
            :exist="props.row.exist"
          /> 
        </b-table-column>
        <b-table-column
          v-slot="props"
          label="Actions"
          width="110"
        >
          <div class="action-buttons">
            <publish-button
              :doc-id="props.row.id"
              :initial-status="props.row['is-published']"
            />
            <close-button
              :doc-id="props.row.id"
              :initial-status="props.row['is-closed']"
            />
            <delete-button
              v-if="currentUserIsTeacher || currentUserIsAdmin"
              :doc-id="props.row.id"
              @document-deleted="refreshTable"
            />
          </div>
        </b-table-column>
      </b-table>

      <b-modal
        v-model="isComponentModalActive"
        has-modal-card
        trap-focus
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-label="Example Modal"
        aria-modal
      >
        <template #default="props">
          <confirm-ownership-transfer
            v-bind="formProps"
            @close="closeOwnershipModal(props.close)"
          />
        </template>
      </b-modal>
    </section>
  </div>
</template>

<script>

import {  mapGetters } from 'vuex';
import http from '@/modules/http-common.js';
import WorkflowRadioStepsLight from "@/components/dashboard/WorkflowRadioStepsLight.vue";

import PublishButton from "./actions/PublishButton.vue";
import DeleteButton from "./actions/DeleteButton.vue";
import CloseButton from "./actions/CloseButton.vue";
import WhitelistDropdown from './actions/WhitelistDropdown.vue'
import ConfirmOwnershipTransfer from '@/components/dashboard/ConfirmOwnershipTransfer'


export default {
    name: "ManageDocumentTable",
    components: {
      WorkflowRadioStepsLight,
      PublishButton, DeleteButton, CloseButton,
      WhitelistDropdown,
      ConfirmOwnershipTransfer
    },

     data() {
        return {
                //ModalForm data
                isComponentModalActive: false,
                formProps: {
                  row: null,
                },

                data: [],
                total: 0,
                loading: false,
                sortField: 'id',
                sortOrder: 'asc',
                defaultSortOrder: 'desc',
                page: 1,
                perPage: 20,

        }
      },
      computed: {
           ...mapGetters("user", [
            "currentUserIsAdmin",
            "currentUserIsTeacher",
            "currentUserIsStudent"
          ]),
      },
      async created() {
        this.$on('document-created:show', (event) => {
          this.refreshTable()
        });
        
      },
      mounted() {
            this.loadAsyncData()
      },
      methods: {
          async toggleBookmark(docId) {
            const updated_order = await this.$store.dispatch('document/toggleBookmark', docId)
            const rowItemIndex = this.data.findIndex(item => item.id === docId)
            this.data[rowItemIndex].bookmark_order = updated_order 
          },
          getThumbnailUrl(url) {
            return url ? url.replace('/full/full', '/full/200,') : require('@/assets/images/document_placeholder.svg')
          },
          /*
          * Load async data
          */
          refreshTable() {
            this.loadAsyncData()
          },
          async loadAsyncData() {
                this.$root.$emit('document-created:hide')

                const params = [
                    `sort-by=${this.sortField}.${this.sortOrder}`,
                    `num-page=${this.page}`,
                    `page-size=${this.perPage}`
                ].join('&')

                this.loading = true
                this.data = []

                try {
                  const response = await http.get(`dashboard/document-management?${params}`)
                  const data = response.data.data

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

          setOwnerModalProps(row) {
            this.formProps.row = {id: row.id, username: row.owner['username']}
            this.isComponentModalActive = true
          },
          closeOwnershipModal(close) {
            close()
            this.refreshTable()
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

.bookmark {
    &:hover {
    cursor: pointer
  }
}
.active-bookmark {
  color: #48c774;
}
.inactive-bookmark {
  color: rgb(155, 155, 155);
}
.action-buttons {
  margin-top: 6px;
  .action {
    margin-top: 6px;
    width: 120px;
  }
}
.gotodoc {
  &:hover {
    color: #FFD500 !important;
    cursor: pointer;
  }
}
.owner-container{
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  padding-left: 20px;
  padding-right: 40px;
}
</style>