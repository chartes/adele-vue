<template>
  <div class="title-bar m-b-lg">
    <div class="tile is-ancestor is-vertical">
      <div class="navbar inner-navbar">
        <a href="#" class="navbar-item">Dossier 34</a>
        <a href="#" class="navbar-item">Dossier 35</a>
      </div>
      <div class="tags tile has-text-uppercase">
        <span class="tag">
          Dossier {{ document.id }}
        </span>
        <hr class="navbar-divider">
        <div v-if="loggedIn && documentCanBeModified">
          <router-link
            v-if="!isInEditionMode"
            :to="{name: 'document-edition', params:{docId: document.id, section:'notice'}}"
          >
            <div class="tag button is-primary">
              Editer
            </div>
          </router-link> 
          <router-link
            v-else
            :to="{name: 'document-view', params:{docId: document.id, section:'notice'}}"
          >
             <div class="tag button is-primary is-size-5">
              Consulter
            </div>
          </router-link>
        </div>
      </div>
    
      <div class="tile is-parent">
        <div class="tile is-child is-12">
          <div class="heading title">
            {{ document.title }}
          </div>
          <div class="subtitle">
            {{ document.subtitle }}
          </div>
        </div>
      </div>

      <div class="tile is-parent dates">
        <div class="tile is-child is-5">
          <p>Date de l'acte : <span class="date">{{ document.creation_lab ? document.creation_lab : 'inconnue' }}</span></p>
          <p>Date du document : <span class="date">{{ document.copy_year ? document.copy_year : 'inconnue' }}</span></p>
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
    },
    computed: {
        ...mapGetters('user', ['loggedIn', 'currentUserIsAdmin', 'currentUserIsTeacher', 'currentUserIsStudent']),
        ...mapState('user', ['currentUser']),
        ...mapState('document', ['document']),

        isInEditionMode() {
          return this.$route.name.indexOf('edition') > -1
        },
        documentCanBeModified() {
          // admin
          if (this.currentUserIsAdmin) {
            return true
          }
          // student
          if (!this.currentUserIsTeacher) {
            return !this.document.is_closed
            // TODO: take the validation step in count too (like: if it reached the max step then it is like closed ?)
          } 
          // else, deny to teachers who don't own the doc
          if (this.currentUser.id !== this.document.user_id) {
            return false
          } 

          return true
        }
    }
}
</script>