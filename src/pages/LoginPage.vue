<template>
  <div>
    <div
      v-if="currentUser"
      class="welcome"
    >
      Bienvenue {{ currentUser.username }}
    </div>
    <form
      v-else
      @submit.prevent="login"
    >
      <label for="email">
        Email:
      </label>
      <input
        v-model="email"
        
        name="email"
        value
      >
          
      <label for="password">
        Password:
      </label>
      <input
        v-model="password"
        type="password"
        name="password"
        value
      >
      
      <button
        type="submit"
        name="login-btn"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script>

import {mapState} from 'vuex'

export default {
    name: "LoginPage",
    components: {
        
    },
    data () {
        return {
          email: '',
          password: ''
        }
    },
    computed: {
      ...mapState("user", ["currentUser"])
    },
    methods: {
        login () {
          return this.$store
            .dispatch('user/login', {
              email: this.email,
              password: this.password
            })
            .then(() => { 
              this.$router.go(-1)
            })
        }
      }

}
</script>

<style>

</style>