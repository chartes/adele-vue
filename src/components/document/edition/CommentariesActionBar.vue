<template>
  <div class="m-b-md">
    <div class="field is-grouped" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { TRANSCRIPTION_STEP, NONE_STEP} from '@/store/modules/workflow'


export default {
    name: 'CommentariesActionBar',
    components: {

    },
    computed: {
        ...mapState('document', ['document']),
        ...mapState('workflow', ['selectedUserId']),
        ...mapState('user', ['currentUser']),
        ...mapGetters('user', ['loggedIn', 'currentUserIsTeacher']),
        ...mapGetters('workflow', ['isTranscriptionValidated', 'isTranscriptionReadOnly' ])
    },
    methods: {
      
    }
}
</script>