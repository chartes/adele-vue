<template>
  <div class="documentation-page">
    <div class="top">
      <div class="columns main-columns">
        <div class="column main-column is-2 themes">
          <div class="content">
            <p class="column-title">
              Tableau de bord
            </p>
            <ul>
              <li>
                <div class="theme-card card">
                  <div class="card-header">
                    <p>Dossiers</p>
                  </div>
                  <div class="card-content">
                    <ul class="doc-tabs">
                      <li
                        id="documents"
                        @click="goTo('documents')"
                      >
                        Gestion des dossiers
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <div class="theme-card card">
                  <div class="card-header">
                    <p>Utilisateurs</p>
                  </div>
                  <div class="card-content">
                    <ul class="doc-tabs">
                      <li
                        id="whitelists"
                        @click="goTo('whitelists')"
                      >
                        Gestion des listes d'accès
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="column content-column dashboard">
          <div
            v-if="$attrs.section === 'documents' || $attrs.section === null"
          >
            <add-document />

            <message v-if="newDocMessage">
              Document <b>{{ newDocMessage }}</b> ajouté ! <router-link
                :to="{name:'document-edition', params:{docId: newDocMessage, section: 'notice'}}"
              >
                Modifier le nouveau document
              </router-link>.
            </message>

            <div style="height:50px; width: auto" />
            <manage-document-table />
          </div>
          <div
            v-if="$attrs.section === 'whitelists'"
          >
            <h2>Inviter un nouvel utilisateur</h2>

            <invite-user v-if="currentUserIsTeacher" />
            <div style="height:50px; width: auto" />

            <h2>Gestion des listes d'accès</h2>

            <manage-whitelist v-if="currentUserIsTeacher" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import InviteUser from '@/components/dashboard/InviteUser';
import AddDocument from '@/components/dashboard/AddDocument';
import ManageDocumentTable from '@/components/dashboard/ManageDocumentTable';
import ManageWhitelist from '@/components/dashboard/ManageWhitelist';

import Message from '@/components/Message.vue'

export default {
    name: "UserDashboardPage",
    components: {
      InviteUser,
      AddDocument,
      ManageDocumentTable,
      ManageWhitelist,
      Message
    },
    data() {
      return {
        newDocMessage: null
      }
    },
    computed: {
        ...mapGetters("user", ["loggedIn", "currentUserIsTeacher"]),
    },

    beforeRouteEnter(to, from, next) {
      next((vm) => {
        if (!vm.loggedIn) {
          next({ name: "login" });
        } else {
          next();
        }
      })
    },
    created() {
      this.$root.$on('document-created:show', (event) => {
        this.newDocMessage = event.doc.data.data.id
      });
      this.$root.$on('document-created:hide', (event) => {
        this.newDocMessage = null
      });
    },
    mounted() {
        document.querySelectorAll('.active').forEach(element => {
          element.classList.remove('active')
        });
        const activeSection = document.querySelector('#' + this.$route.params.section)
        if (activeSection) {
          activeSection.classList.add('active');
        }    },
    methods: {
     goTo(section) {
       if (section !=  this.$route.params.section) {
        document.querySelectorAll('.active').forEach(element => {
          element.classList.remove('active')
        });
        const activeSection = document.querySelector('#' + section)
        if (activeSection) {
          activeSection.classList.add('active');
        }
        this.$router.push({name: 'user-dashboard', params: {section: section}})
        }
     }
    }
}
</script>

<style lang="scss" scoped>
  .content {
    min-height: 100vh;
  }
</style>