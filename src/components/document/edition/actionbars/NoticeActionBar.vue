<template>
  <div
    v-if="currentUserIsTeacher"
    class="edition-action-bar m-b-md"
  >
    <div class="field is-grouped">
      <!-- SAVE Notice --> 
      <p
       
        class="control"
      >
        <save-Notice-button :data="data" />
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import SaveNoticeButton from '../actions/SaveNoticeButton.vue'

export default {
    name: 'NoticeActionBar',
    components: {
      SaveNoticeButton
    },
    props: {
      data: {type: Object, default: () => {}}
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