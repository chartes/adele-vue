<template>
  <div class="m-b-md">
    <div class="field is-grouped">
      <add-commentary-button
        v-if="!hasCommentaryTypes[label]"
        :type="type"
        :label="label"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import AddCommentaryButton from '../actions/AddCommentaryButton.vue'

export default {
    name: 'CommentariesActionBar',
    components: {
      AddCommentaryButton
    },
    props: {
      type: {type: Number, required: true},
      label: {type: String, required: true}

    },
    computed: {
        ...mapState('document', ['document']),
        ...mapState('workflow', ['selectedUserId']),
       ...mapState('commentaries', ['commentaryTypes', 'commentaries', 'hasCommentaryTypes']),
    },
    methods: {
      
    }
}
</script>