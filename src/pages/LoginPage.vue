<template>
  <form
    class="container login-form"
    @submit.prevent="authenticate"
  >
    <article class="message m-t-xxl">
      <div class="message-header">
        Connexion
      </div>
      <div class="message-body">
        <div
          v-if="currentUser"
          class="welcome"
        >
          Bienvenue {{ currentUser.username }}
        </div>

        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              v-model="email"
              class="input"
              type="text"
              placeholder="Nom d'utilisateur ou email"
            >
            <span class="icon is-small is-left">
              <i class="fas fa-envelope" />
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input
              v-model="password"
              class="input"
              type="password"
              placeholder="Mot de passe"
            >
            <span class="icon is-small is-left">
              <i class="fas fa-lock" />
            </span>
          </p>
        </div>
        <router-link :to="{name: 'forgot-password'}">
          Mot de passe oublié
        </router-link>
        <div class="field">
          <span class="control">
            <button
              class="button  is-success"
            >
              Valider
            </button>
            <span
              v-show="error"
              class="control has-text-danger is-pulled-right p-t-sm"
            >Nom d'utilisateur ou mot de passe incorrect(s)</span>
          </span>
        </div>
      </div>
    </article>
  </form>
</template>

<script>

import {mapState, mapGetters} from 'vuex'

export default {
    name: "LoginPage",
    components: {
        
    },
    data () {
        return {
          email: '',
          password: '',
          error: false
        }
    },
    computed: {
      ...mapState("user", ["currentUser"]),
      ...mapGetters("user", [
      "isAuthenticated"
    ]),
    },
    created() {
      if (this.isAuthenticated) {
        this.$router.push({path: this.$route.query.from})
      }
    },
    mounted() {
      this.error = false
    },
    methods: {
        authenticate () {
          this.error = false
          return this.$store
            .dispatch('user/login', {
              email: this.email,
              password: this.password
            })
            .then(() => { 
	      this.$router.push({name: "home"})
            }).catch(() => {
              this.error=true
            })
        }
      }

}
</script>

<style>

</style>
