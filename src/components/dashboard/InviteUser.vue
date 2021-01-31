<template>
  <div class="invite-user">
    <label class="label">Email</label>
    <div class="field has-addons">
      <div class="control has-icons-left has-icons-right">
        <input
          v-model="email"
          class="input"
          :class="!emailIsValid && email.length > 0 ? 'is-danger' : ''"
          type="email"
          placeholder="elizabeth2@chartes.psl.eu"
        >
        <span class="icon is-small is-left">
          <i class="fas fa-envelope" />
        </span>
        <span
          v-if="!emailIsValid && email.length > 0"
          class="icon is-small is-right"
        >
          <i class="fas fa-exclamation-triangle" />
        </span>
      </div>
      <p
        v-if="!emailIsValid && email.length > 0"
        class="help is-danger"
      >
        This email is invalid
      </p>

      <div class="control">
        <button class="button is-primary">
          Inviter
        </button>
      </div>
    </div>
  </div>
</template>




<script>

import {mapState, mapGetters, mapActions} from 'vuex'

export default {
    name: "InviteUser",
    components: {
        
    },
    data () {
        return {
            email: ''
        }
    },
    computed: {
      ...mapState("user", ["currentUser"]),
      ...mapGetters("user", ["loggedIn"]),
      emailIsValid() {
          return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email)
      }
    },
    watch: {
    },
    created() {
    },
    methods: {
      ...mapActions('user', ['save']),
      async saveUserProfile() {
        
        
        
      }
    }

}
</script>

<style>

</style>