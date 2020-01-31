<template>
  <div class="m-b-md">
    <div
      v-if="!hasCommentaryTypes[label]"
      class="field is-grouped"
    >
      <add-commentary-button
        :type="type"
        :label="label"
      />
    </div>
    <div
      v-else
      class="field is-grouped"
    >
      <validate-commentaries-button :doc-id="document.id" />
      <delete-commentary-button
        v-if="hasCommentaryTypes[label]"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import AddCommentaryButton from '../actions/AddCommentaryButton.vue'
import DeleteCommentaryButton from '../actions/DeleteCommentaryButton.vue'
import ValidateCommentariesButton from '../actions/ValidateCommentariesButton.vue'

export default {
    name: 'CommentariesActionBar',
    components: {
      AddCommentaryButton,
      DeleteCommentaryButton,
      ValidateCommentariesButton
    },
    props: {
      type: {type: Number, required: true},
      label: {type: String, required: true}

    },
    computed: {
        ...mapState('document', ['document']),
        ...mapState('workflow', ['selectedUserId']),
        ...mapState('commentaries', ['hasCommentaryTypes']),
    },
    methods: {
      
    }
}
</script>