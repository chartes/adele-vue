<template>
  <div class="invite-user">
    <label class="label">Email</label>
    <div class="field has-addons">
      <div class="control has-icons-left has-icons-right">
        <input
          v-model="email"
          class="input email"
          :class="!emailIsValid && email.length > 4 ? 'is-danger' : ''"
          type="email"
          placeholder="elizabeth2@chartes.psl.eu"
        >
        <span class="icon is-small is-left">
          <i class="fas fa-envelope" />
        </span>
        <span
          v-if="!emailIsValid && email.length > 4"
          class="icon is-small is-right"
        >
          <i class="fas fa-exclamation-triangle" />
        </span>
      </div>

      <div class="control">
        <button
          class="button is-primary"
          :disabled="!emailIsValid || email.length < 4"
          @click="invite"
        >
          Inviter
        </button>
      </div>
    </div>
    <p
      v-if="!emailIsValid && email.length > 4"
      class="help is-danger"
    >
      This email is invalid
    </p>
  </div>
</template>




<script>

import {mapState, mapGetters, mapActions} from 'vuex'
import {debounce} from 'lodash'

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
        this.invite = debounce(this._invite, 1000)
    },
    methods: {
      ...mapActions('user', ['inviteUser']),
      _invite() {
        if (this.emailIsValid) {
            this.inviteUser(this.email)
        }
      },
    }

}
</script>

<style>

</style>