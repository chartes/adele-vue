<template>
  <div class="documentation-page">
    <div class="top">
      <div class="columns main-columns">
        <div class="column main-column is-3 themes">
          <div class="content">
            <div class="user-form">
              <div class="field">
                <label class="label">Nom</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    :model="lastname"
                  >
                </div>
              </div>
              <div class="field">
                <label class="label">Prénom</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    :model="firstname"
                  >
                </div>
              </div>
              <div class="field">
                <label class="label">Username</label>
                <div class="control has-icons-left has-icons-right">
                  <input
                    class="input"
                    type="text"
                    :model="username"
                  >
                  <span class="icon is-small is-left">
                    <i class="fas fa-user" />
                  </span>
                </div>
              </div>

              <div class="field">
                <label class="label">Email</label>
                <div class="control has-icons-left has-icons-right">
                  <input
                    class="input"
                    type="email"
                    placeholder="pliny@theyounger.it"
                    :model="email"
                  >
                  <span class="icon is-small is-left">
                    <i class="fas fa-envelope" />
                  </span>
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <label class="checkbox">
                    <input type="checkbox">
                    I agree to the <a href="#">terms and conditions</a>
                  </label>
                </div>
              </div>

              <div class="field is-grouped">
                <div class="control">
                  <button
                    class="button is-link"
                    :disabled="canSave && !error"
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

import {mapState, mapGetters } from 'vuex'

export default {
    name: "UserProfilePage",
    components: {
        
    },
    data () {
        return {
          email: '',
          firstname: '',
          lastname: '',
          username: '',
          password: '',

          canSave: true,
          error: null
        }
    },
    computed: {
      ...mapState("user", ["currentUser"]),
      ...mapGetters("user", ["loggedIn"]),
    },
    mounted() {
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
       
    }

}
</script>

<style>

</style>