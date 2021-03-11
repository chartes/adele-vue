<template>
  <div class="title-bar m-b-lg">
    <div
      class="tile is-ancestor is-vertical"
      :class="isInEditionMode?'is-edition-mode':''"
    >
      <div class="navbar inner-navbar">
        <router-link
          v-show="document.prev_doc_id"
          class="navbar-item"
          :to="{name: 'document-view', params: {docId:document.prev_doc_id, section: 'notice'}}"
        >
          Dossier {{ document.prev_doc_id }}
        </router-link>
        <router-link
          v-show="document.next_doc_id"
          class="navbar-item"
          :to="{name: 'document-view', params: {docId: document.next_doc_id, section: 'notice'}}"
        >
          Dossier {{ document.next_doc_id }}
        </router-link>
      </div>
      <div class="tags tile has-text-uppercase">
        <span class="tag">
          Dossier {{ document.id }}
        </span>
        <hr class="navbar-divider">
        <div v-if="loggedIn && documentCanBeModified">
          <router-link
            v-if="!isInEditionMode"
            :to="{name: 'document-edition', params:{docId: document.id, section: currentSection || 'notice'}}"
          >
            <div class="tag button is-primary">
              Editer
            </div>
          </router-link> 
          <router-link
            v-else
            :to="{name: 'document-view', params:{docId: document.id, section: currentSection || 'notice'}}"
          >
            <div class="tag button is-primary">
              Consulter
            </div>
          </router-link>
        </div>
        <div v-else-if="loggedIn && currentUserIsStudent && !documentCanBeModified">
          <div
            class="tag is-primary"
            style="margin-left: 10px"
          >
            Fermé en écriture
          </div>
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
        ...mapState('workflow', ['isInEditionMode', 'currentSection']),
     
        documentCanBeModified() {
          // admin
          if (this.currentUserIsAdmin) {
            return true
          }
          // student
          if (this.currentUserIsStudent) {
            const me = this.document.whitelist.users.find(u => u.id === this.currentUser.id)
            return !this.document.is_closed && me !== undefined
          } 
          // else, deny to teachers who don't own the doc
          //if (this.currentUser.id !== this.document.user_id) {
          //  return false
          //} 

          return true
        }
    }
}
</script>