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
        <div
          class="navbar-item"
          style="margin-right: 10px"
        >
          <user-menu />
        </div>
      </div>
    </div>
  </nav>
</template>


<script>
import { mapState, mapGetters } from 'vuex';
import UserMenu from '@/components/UserMenu';

export default {
    name: "NavBar",
    components: {UserMenu},
    computed: {
        ...mapState('user', ['currentUser']),
        ...mapGetters('user', ['isAuthenticated'])
    },
    methods: {
        logout() {
            this.$store.dispatch("user/logout")
        }
    }
}
</script>