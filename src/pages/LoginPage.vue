<template>
  <div class="container login-form">
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
              type="email"
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
        <div class="field">
          <span class="control">
            <button
              class="button  is-success"
              @click="login"
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
  </div>
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
      "loggedIn"
    ]),
    },
    mounted() {
      this.error = false
    },
     beforeRouteEnter(to, from, next) {
      next((vm) => {
        if (vm.loggedIn) {
          next({ name: "home" });
        } else {
          next();
        }
      })
    },
    methods: {
        login () {
          this.error = false
          return this.$store
            .dispatch('user/login', {
              email: this.email,
              password: this.password
            })
            .then((response) => { 
              if (this.currentUser) {
                if (this.$route.name === 'login' || location.pathname.indexOf('adele') === -1) {
                  this.$router.go('home')
                } else {
                  this.$router.go(-1)
                }
              } else {
                this.error = true
              }
            })
        }
      }

}
</script>

<style>

</style>