<template>
  <div class="documentation-page">
    <div class="top">
      <div class="columns main-columns">
        <div class="column main-column is-3 themes">
          <div class="content">
            <p class="column-title">
              Tableau de bord
            </p>
            <ul>
              <li>
                <div class="theme-card card">
                  <div class="card-header">
                    <p>Documents</p>
                  </div>
                  <div class="card-content">
                    <ul class="doc-tabs">
                      <li
                        id="work"
                        @click="goTo('work')"
                      >
                        Mon travail
                      </li>
                      <li
                        id="documents"
                        @click="goTo('documents')"
                      >
                        Gestion des documents
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
                        id="users"
                        @click="goTo('users')"
                      >
                        Gestion des comptes
                      </li>
                      <li
                        id="whitelists"
                        @click="goTo('whitelists')"
                      >
                        Gestion des listes
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="column content-column">
          <div
            v-if="$attrs.section === 'work' || $attrs.section === null"
          >
            <h1>Mon travail</h1>
            <p>
              Pour les prof : documents créés
              Pour les étudiants : documents pour lesquelles  est associée une liste d'accès nous contenant
            </p>
          </div>
          <div
            v-if="$attrs.section === 'documents'"
          >
            <h1>Gestion des documents</h1>
            <p>
              Création, suppression, état d'avancement du dossier
            </p>
          </div>
          <div
            v-if="$attrs.section === 'users'"
          >
            <h1>Gestion des utilisateurs</h1>
            <p>
              Invitation, suppression des comptes?
              Gestion des listes ?
            </p>
            <invite-user />
          </div>
          <div
            v-if="$attrs.section === 'whitelists'"
          >
            <h1>Listes d'utilisateurs</h1>
            <p>
              Création de listes, suppression de liste, modification de liste, voir quels documents pour la liste
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import InviteUser from '@/components/dashboard/InviteUser';


export default {
    name: "UserDashboardPage",
    components: {
      InviteUser
    },
    computed: {
            ...mapGetters("user", ["loggedIn"]),
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