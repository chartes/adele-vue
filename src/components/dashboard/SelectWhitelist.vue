<template>
  <div class="select-whitelist">
    <span class="field has-addons ">
      <span class="control">
        <button
          class="button is-static "
          disabled
        > Listes existantes</button>
      </span>

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

    <span class="field has-addons add-list">
      <span class="control">
        <a
          class="button is-primary"
          @click="addWhitelist"
        >
          Créer une liste
        </a>
      </span>
      <span class="control">
        <input
          v-model="newWhitelistLabel"
          class="input"
          type="text"
          placeholder="M1 TNAH 2021 - Groupe A"
        >
      </span>
    </span>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex';
import Message from '@/components/Message';
import http from '@/modules/http-common.js';

export default {
    name: "SelectWhitelist",
    components: {
      
    },
    data() {
      return {
        open: false,
        loading: false,
        whitelists: [],
        selectedId: null,
        newWhitelistLabel: null
      }
    },
    computed: {
      ...mapState('document', ['error']),
      selected() {
        if (this.selectedId) {
          return this.whitelists.find(w => w.id === this.selectedId)
        } 
        return null
      }
    },
    async mounted() {
      await this.loadWhiteLists()
      if (this.whitelists.length > 0) {
        this.selectedId = this.whitelists[0].id
      }
      this.$root.$emit('whitelist:selected-list', this.selected)
    },
    methods: {
      ...mapActions('document', ['addDocument']),
      selectWhiteList(id) {
        this.selectedId = id;
        this.$root.$emit('whitelist:selected-list', this.selected)
        this.open = false
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
      async addWhitelist() {
        if (this.newWhitelistLabel && this.newWhitelistLabel.length > 3) {
          try {
            const response = await http.post(`whitelists`, {label: this.newWhitelistLabel})
            this.newWhiteList = response.data.data
            await this.loadWhiteLists()
            this.selectWhiteList(this.newWhiteList.id)
          } catch (e) {
            console.error(e.msg)
          } finally {
            this.newWhitelistLabel = null
          }
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
  min-width: 150px; 
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