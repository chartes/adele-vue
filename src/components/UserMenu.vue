<template>
  <div>
    <router-link
      v-if="!loggedIn"
      :to="{name: 'login'}"
    >
      <a class="button is-primary">
        Connexion
      </a>
    </router-link>
    <div
      v-if="loggedIn"
      class="dropdown is-hoverable"
    >
      <div class="dropdown-trigger">
        <button
          class="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu3"
        >
          <span>{{ currentUser.username }}</span>
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
          <router-link
            :to="{name: 'user-profile'}"
          >
            <a
              href="#"
              class="dropdown-item"
            >
              Mon profil
            </a>
          </router-link>
          <router-link
            :to="{name: 'user-dashboard', params: {section: 'work'}}"
          >
            <a
              href="#"
              class="dropdown-item"
            >
              Tableau de bord
            </a>
          </router-link>
          <hr class="dropdown-divider">
          <a
            href="#"
            class="dropdown-item"
            @click="logout"
          >
            Se déconnecter
          </a>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState, mapGetters } from 'vuex';

export default {
    name: "UserMenu",
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