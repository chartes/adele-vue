<template>
  <div 
    class="container login-form"
  >
    <article class="message m-t-xxl">
      <div class="message-header">
        Réinitialisation de votre mot de passe.
      </div>
      <div class="message-body">
        <form
          v-if="!success"
          class="container login-form"
          @submit.prevent="resetPassword"
        >
          <p
            v-show="error"
            class="control has-text-danger m-b-sm"
          >
            {{ error }}
          </p>
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input
                v-model="password"
                autocomplete="off"
                class="input"
                type="text"
                required
                minlength="5"
                placeholder="Nouveau mot de passe"
              >
              <span class="icon is-small is-left">
                <i class="fas fa-lock" />
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input
                v-model="password2"
                class="input"
                type="password"
                required
                minlength="5"
                placeholder="Confirmation du mot de passe"
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
              >
                Valider
              </button>
            </span>
          </div>
        </form>
        <p v-show="success">
          Le changement de votre mot de passe a été effectué.
        </p>
      </div>
    </article>
  </div>
</template>

<script>

export default {
    name: "PasswordResetPage",
    data () {
        return {
          password: '',
          password2: '',
          error: false,
          success: false,
        }
    },
    computed: {
      token() { 
        return this.$route.query.token
      },
      passwordsMatch() {
        return this.password == this.passwordConfirmation
      },
    },
    methods: {
        resetPassword () {
          this.$store
            .dispatch('user/resetPassword', {
              token: this.token,
              password: this.password,
              password2: this.password2,
            })
            .then(() => {
              this.error = false;
              this.success = true;
            }).catch(({response}) => {
              if (response.data.error) {
                this.error = response.data.error
              } else {
                this.error = "Une erreur est survenue. Veuillez renouveler votre demande."
              }
            })
        }
      }

}
</script>

<style>

</style>
