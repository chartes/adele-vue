<template>
  <div class="select-whitelist">
    <span v-if="currentUserIsStudent">
      <h3 v-if="selected"> {{ selected.label }}</h3>
    </span>
    <span
      v-else 
      class="field"
    >
      <span
        class="control dropdown"
        :class="open ?`is-active`: ''"
      >
        <div class="dropdown-trigger">
          <button
            class="button select-button"
            aria-haspopup="true"
            aria-controls="dropdown-menu3"
            @mousedown="open = true"
            @blur="open = false"
          >
            <h3
              v-if="selected"
              class="selected"
            >{{ selected.label }}</h3>
            <h3
              v-else
              class="selected"
            >Sélectionnez une liste...</h3>

            <span class="icon is-small">
              <i
                class="fas fa-angle-down"
                aria-hidden="true"
              />
            </span>
          </button>
        </div>
        <div
          id="dropdown-menu3"
          class="dropdown-menu"
          role="menu"
        >
          <div class="dropdown-content">
            <div
              v-for="w in whitelists"
              :key="w.id"
              class="dropdown-item"
              @mousedown="() => selectWhiteList(w.id)"
            >
              {{ w.label }}
            </div>
           
          </div>
        </div>
      </span>
    </span>
  </div>
</template>

<script>

import { mapState, mapActions, mapGetters } from 'vuex';
import Message from '@/components/Message';
import http from '@/modules/http-common.js';

export default {
    name: "WhitelistDropdown",
    components: {
      
    },
    props: {
        docId: {type: Number, required: true},
        initialSelection: {type: Number, default: null}
    },
    data() {
      return {
        open: false,
        loading: false,
        whitelists: [],
        selectedId: null,
      }
    },
    computed: {
      ...mapGetters("user", [
            "currentUserIsAdmin",
            "currentUserIsTeacher",
            "currentUserIsStudent",
      ]),
      selected() {
        if (this.selectedId) {
          return this.whitelists.find(w => w.id === this.selectedId)
        } 
        return null
      }
    },
    async created() {
      await this.loadWhiteLists()
      this.selectedId = this.initialSelection
      //this.$root.$emit('whitelist:selected-list', this.selected)
    },
    methods: {
      ...mapActions('document', ['addDocument']),
      async selectWhiteList(id) {
        this.selectedId = id;
        //this.$root.$emit('whitelist-dropdown:selected-list', {whitelist: this.selected, docId: this.docId})
        await this.updateDocumentWhitelist()
        this.open = false
      },
      updateDocumentWhitelist() {
          return http.post(`documents/${this.docId}/whitelist`, {data: {whitelist_id: this.selected ? this.selected.id: null}})
      },
      async loadWhiteLists() {
        this.loading = true
        try {
          const response = await http.get(`whitelists`)
          this.whitelists = response.data.data
        } catch (e) {
          console.error(e.msg)
          this.whitelists = []
        } finally {
          this.loading = false
        }
      },
      toggle() {
        this.open = !this.open
      }
    }
}
</script>

<style lang="scss" scoped>
.selected {
  min-width: 130px; 
}

.select-whitelist {
  display: flex;
}
.add-list {
  margin-left: 20px;
}
.select-button {
  justify-content: left
}
.dropdown-content {
  padding: 0;
  max-height: 400px;
  overflow-y: scroll;
}
.dropdown-item {
  &:hover {
    cursor: pointer;
    background: #FFD500;
  }
}
</style>