<template>
  <div class="documentation-page">
    <div class="top">
      <div class="columns main-columns is-3 themes">
        <div class="column main-column" />
        <div class="column is-two-thirds content-column">
          <div class="content">
            <div class="user-form">
              <article
                v-if="error"
                class="message is-danger"
              >
                <div class="message-header">
                  <p>Impossible d'enregistrer les modifications</p>
                </div>
                <div class="message-body">
                  {{ error }}
                </div>
              </article>
              <article
                v-if="saved"
                class="message is-info"
              >
                <div class="message-header">
                  <p>Sauvegarde effectuée</p>
                </div>
                <div class="message-body">
                  Les modifications ont été correctement enregistrées
                </div>
              </article>
              <div class="field">
                <label class="label">Nom</label>
                <div class="control">
                  <input
                    v-model="lastname"
                    class="input"
                    type="text"
                  >
                </div>
              </div>
              <div class="field">
                <label class="label">Prénom</label>
                <div class="control">
                  <input
                    v-model="firstname"
                    class="input"
                    type="text"
                  >
                </div>
              </div>
              <div class="field">
                <label class="label">Username</label>
                <div class="control has-icons-left has-icons-right">
                  <input
                    v-model="username"
                    class="input"
                    type="text"
                  >
                  <span class="icon is-small is-left">
                    <i class="fas fa-user" />
                  </span>
                </div>
              </div>

              <div class="field">
                <label class="label">Email</label>
                <div class="control has-icons-left">
                  <input
                    v-model="email"
                    class="input"
                    type="email"
                    placeholder="pliny@theyounger.it"
                    disabled
                  >
                  <span class="icon is-small is-left">
                    <i class="fas fa-envelope" />
                  </span>
                </div>
              </div>

              <div class="field">
                <label class="label">Mot de passe</label>
                <div class="control has-icons-left">
                  <input
                    v-model="password"
                    class="input"
                    type="password"
                  >
                  <span class="icon is-small is-left">
                    <i class="fas fa-unlock" />
                  </span>
                </div>
              </div>

              <div class="field">
                <label class="label">Confirmer le mot de passe</label>
                <div class="control has-icons-left">
                  <input
                    v-model="password2"
                    class="input"
                    type="password"
                  >
                  <span class="icon is-small is-left">
                    <i class="fas fa-unlock" />
                  </span>
                </div>
              </div>

              <div class="field is-grouped">
                <div class="control">
                  <button
                    class="button is-link"
                    :disabled="!canSave"
                    @click="saveUserProfile"
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapState, mapGetters, mapActions} from 'vuex'

export default {
    name: "UserProfilePage",
    components: {
        
    },
    data () {
        return {
          firstname: '',
          lastname: '',
          username: '',
          password: '',
          password2: '',
          email: '',

          error: null,
          saved: false
        }
    },
    computed: {
      ...mapState("user", ["currentUser"]),
      ...mapGetters("user", ["loggedIn"]),
      canSave() {
        return this.email.length > 5 && this.firstname && this.lastname && this.username.length >= 3 && this.password.length >= 5 && this.password2.length >= 5 && this.password == this.password2
      }
    },
    watch: {
    },
    created() {
      this.firstname = this.currentUser.firstname
      this.lastname = this.currentUser.lastname
      this.username = this.currentUser.username
      this.email = this.currentUser.email
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
    methods: {
      ...mapActions('user', ['save']),
      async saveUserProfile() {
        
          const response = await this.save({
            username: this.username,
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: this.password,
            password2: this.password2
          })
          if (response.error) {
            this.error = response.error
            this.saved = false
          } else {
            this.error = null
            this.saved = true
          }
        
      }
    }

}
</script>

<style>

</style>