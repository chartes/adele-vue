<template>
  <div class="documentation-page">
    <div class="top">
      <div class="columns main-columns">
        <div class="column main-column is-2 themes">
          <div class="content">
            <p class="column-title">
              Tableau de bord
            </p>
            <nav>
              <section>
                <header>
                  <h2>Dossiers</h2>
                </header>
                <ul class="doc-tabs">
                  <li
                    id="documents"
                    @click="goTo('documents')"
                  >
                    Gestion des dossiers
                  </li>
                </ul>
              </section>
              
              <section v-if="currentUserIsTeacher || currentUserIsAdmin">
                <header>
                  <h2>Utilisateurs</h2>
                </header>
                <ul class="doc-tabs">
                  <li
                    id="whitelists"
                    @click="goTo('whitelists')"
                  >
                    Gestion des listes d'accès
                  </li>
                </ul>
              </section>
            </nav>
          </div>
        </div>
        <div class="column content-column dashboard">
          <div
            v-if="$attrs.section === 'documents' || $attrs.section === null"
          >
            <add-document v-if="currentUserIsTeacher || currentUserIsAdmin" />

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
            v-if="$attrs.section === 'whitelists' && (currentUserIsTeacher || currentUserIsAdmin)"
          >
            <h2>Inviter un nouvel utilisateur</h2>

            <invite-user />
            <div style="height:50px; width: auto" />

            <h2>Gestion des listes d'accès</h2>

            <manage-whitelist />
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
        ...mapGetters("user", ["isAuthenticated", "currentUserIsTeacher", "currentUserIsAdmin"]),
    },

    beforeRouteEnter(to, from, next) {
      next((vm) => {
        if (!vm.isAuthenticated) {
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