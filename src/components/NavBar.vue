<template>
  <nav
    class="navbar is-light"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <span class="navbar-item title is-4 navbar-title">Adele</span>
      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>

    <div
      id="navbarBasicExample"
      class="navbar-menu"
    >
      <div class="navbar-start">
        <router-link
          :to="{name: 'home'}"
          class="navbar-item"
        >
          Accueil
        </router-link>
        <router-link
          :to="{name: 'search'}"
          class="navbar-item"
        >
          Dossiers
        </router-link>
        <router-link
          :to="{name: 'documentation', params: {section: 'about'}}"
          class="navbar-item"
        >
          Documentation
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <span
              v-if="loggedIn"
              class="button is-light is-uppercase is-info m-r-sm"
            >
              {{ currentUser.username }}
            </span>
            <router-link
              v-if="!loggedIn"
              :to="{name: 'login'}"
            >
              <a class="button is-primary">
                Connexion
              </a>
            </router-link>
            <span
              v-else
              class="button is-light"
              @click="logout"
            >
              Se déconnecter
            </span>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>


<script>
import { mapState, mapGetters } from 'vuex';

export default {
    name: "NavBar",
    computed: {
        ...mapState('user', ['currentUser']),
        ...mapGetters('user', ['loggedIn'])
    },
    methods: {
        logout() {
            this.$store.dispatch("user/logout")
        }
    }
}
</script>