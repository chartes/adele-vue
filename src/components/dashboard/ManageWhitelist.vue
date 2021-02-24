<template>
  <div>
    <div class="columns">
      <div
        class="column "
        style="width: 530px;"
      >
        <div style="height:52px; width: auto" />

        <user-list />
      </div>
      <div
        class="column is-1"
        style="width:60px;"
      >
        <div style="height:175px; width: auto" />
        <button
          class="button is-primary move"
          @click="addToWhitelist"
        >
          <i class="fas fa-arrow-right" />
        </button>
        <button
          class="button is-primary move"
          @click="removeFromWhitelist"
        >
          <i class="fas fa-arrow-left" />
        </button>
      </div>
      <div class="column"> 
        <select-whitelist />

        <white-list
          v-if="selectedWhiteListId !== null"
          :whitelist-id="selectedWhiteListId"
        />
      </div>
    </div>  
  </div>
</template>




<script>

import {mapState, mapGetters, mapActions} from 'vuex'
import {debounce} from 'lodash'
import UserList from '@/components/dashboard/UserList'
import WhiteList from '@/components/dashboard/WhiteList'
import SelectWhitelist from '@/components/dashboard/SelectWhitelist'
import http from '@/modules/http-common.js';

export default {
    name: "ManageWhitelist",
    components: {
        UserList,
        WhiteList,
        SelectWhitelist
    },
    data () {
        return {
           selectedWhiteListId: null,
           selectedWhiteListUserId: null,
           selectedUserId: null
        }
    },
    watch: {
    },
    created() {
      this.$root.$on('whitelist:selected-list', (payload) => {
        this.selectedWhiteListId = payload ? payload.id : null
      })
      this.$root.$on('whitelist:selected-user', (payload) => {
        this.selectedWhiteListUserId = payload ?payload.id : null
      })
      this.$root.$on('userlist:selected', (payload) => {
        this.selectedUserId = payload ? payload.id : null
      })
    },
    methods: {
      ...mapActions('user', []),
      async addToWhitelist() {
        if (this.selectedWhiteListId > 0 && this.selectedUserId) {
          await http.get(`whitelists/${this.selectedWhiteListId}/add-user/${this.selectedUserId}`)
          this.$root.$emit('whitelist:refresh')
          this.$root.$emit('whitelist:unselect-user')
          this.$root.$emit('userlist:unselect-user')
        }
      },
      async removeFromWhitelist() {
        if (this.selectedWhiteListId > 0 && this.selectedWhiteListUserId) {
          await http.delete(`whitelists/${this.selectedWhiteListId}/remove-user/${this.selectedWhiteListUserId}`)
          this.$root.$emit('whitelist:refresh')
          this.$root.$emit('whitelist:unselect-user')
          this.$root.$emit('userlist:unselect-user')
        }
      }
    }

}
</script>

<style scoped>
.move  {
  height: 70px;
  padding: 12px;
  width: 100%;
  margin: auto;
  margin-bottom: 20px;
}

</style>