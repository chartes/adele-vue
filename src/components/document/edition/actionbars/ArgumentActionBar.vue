<template>
  <div class="m-b-md">
    <div class="field is-grouped">
      <!-- SAVE ARGUMENT --> 
      <p
        v-if="currentUserIsTeacher"
        class="control"
      >
        <save-argument-button />
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import SaveArgumentButton from '../actions/SaveArgumentButton.vue'

export default {
    name: 'ArgumentActionBar',
    components: {
      SaveArgumentButton
    },
    computed: {
        ...mapState('document', ['document']),
        ...mapState('workflow', ['selectedUserId']),
        ...mapState('user', ['currentUser']),
        ...mapGetters('user', ['currentUserIsTeacher']),
    },
    methods: {
      
    }
}
</script>