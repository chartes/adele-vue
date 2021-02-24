<template>
  <div class="invite-user">
    <div class="control teacher">
      <div class="control">
        <label class="radio">
          <input
            id="student"
            v-model="role"
            type="radio"
            value="student"
          >
          Étudiant
        </label>
        <label class="radio">
          <input
            id="teacher"
            v-model="role"
            type="radio"
            value="teacher"
          >
          Enseignant
        </label>
      </div>
    </div>
      
    <div class="field has-addons">
      <span class="control has-icons-left has-icons-right">
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
      </span>

      <span class="control">
        <button
          class="button is-primary is-right"
          :disabled="!emailIsValid || email.length < 4"
          @click="invite"
        >
          Inviter
        </button>
      </span>
    </div> 
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
            email: '',
            role: 'student'
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
            this.inviteUser({
                email: this.email,
                role: this.role
            })
            this.$root.$emit('userlist:refresh')
        }
      },
    }

}
</script>

<style>

</style>