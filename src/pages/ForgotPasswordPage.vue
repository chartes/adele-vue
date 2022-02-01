<template>
  <form
    class="container login-form"
    @submit.prevent="sendPasswordResetLink"
  >
    <article class="message m-t-xxl">
      <div class="message-header">
        Mot de passe oublié ?
      </div>
      <div class="message-body">
        <p class="m-b-sm">
          Entrez votre adresse email, si votre compte existe, vous recevrez un lien pour réinitialiser votre mot de passe.
        </p>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              v-model="email"
              class="input"
              type="email"
              required
              placeholder="Email"
            >
            <span class="icon is-small is-left">
              <i class="fas fa-envelope" />
            </span>
          </p>
        </div>
        <div class="field">
          <span class="control">
            <button
              class="button is-success"
            >
              Envoyer
            </button>
            <span
              v-show="error"
              class="control has-text-danger is-pulled-right p-t-sm"
            >Une erreur est survenue.</span>
          </span>
        </div>
        <span
          v-show="linkSent"
          class="control has-text-success p-t-sm"
        >Un lien vous a été envoyé.</span>
      </div>
    </article>
  </form>
</template>

<script>

import {mapState, mapGetters} from 'vuex'

export default {
    name: "ForgotPasswordPage",
    data () {
        return {
          email: '',
          linkSent: false,
          error: false
        }
    },
    mounted() {
      this.error = false
    },
    methods: {
        sendPasswordResetLink () {
          this.error = false
          return this.$store
            .dispatch('user/sendPasswordResetLink', {
              email: this.email,
            })
            .then(() => {
              this.linkSent = true;
            }).catch(() => {
              this.error=true
            })
        }
      }

}
</script>

<style>

</style>
