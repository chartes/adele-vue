<template>
  <div class="m-b-lg">
    <div class="tile is-ancestor is-vertical">
      <div class="tags tile has-text-uppercase">
        <span class="tag  is-size-4">
          Document {{ document.id }}
        </span>
        <div v-if="loggedIn && documentCanBeModified">
          <router-link
            v-if="!isInEditionMode"
            :to="{name: 'document-edition', params:{docId: document.id, section:'notice'}}"
          >
            <div class="tag button is-primary is-size-4">
              Modifier
            </div>
          </router-link> 
          <router-link
            v-else
            :to="{name: 'document-view', params:{docId: document.id, section:'notice'}}"
          >
            <div class="tag button is-primary is-size-4">
              Consulter
            </div>
          </router-link>
        </div>
      </div>
    
      <div class="tile is-parent">
        <div class="tile is-child is-7">
          <div class="heading title">
            {{ document.title }}
          </div>
          <div class="subtitle">
            {{ document.subtitle }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState, mapGetters } from 'vuex';

export default {
    name: "DocumentTitleBar",
    props: {
        document: {type: Object, default: null}
    },
    computed: {
        ...mapGetters('user', ['loggedIn', 'currentUserIsAdmin', 'currentUserIsTeacher', 'currentUserIsStudent']),
        ...mapState('user', ['currentUser']),

        isInEditionMode() {
          return this.$route.name.indexOf('edition') > -1
        },
        documentCanBeModified() {
          // admin
          if (this.currentUserIsAdmin) {
            return true
          }
          // student
          if (this.currentUserIsStudent) {
            return !this.document.is_closed
            // TODO: take the validation step in count too (like: if it reached the max step then it is like closed ?)
          } 
          // else, deny to different teachers
          if (this.currentUser.id !== this.document.user_id) {
            return false
          } 

          return true
        }
    }
}
</script>