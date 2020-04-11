<template>
  <div class="edition-action-bar m-b-md m-b-md">
    <!-- NEW COMMENTARIES --> 
    <div
      v-if="!hasCommentaryTypes(label)" 
      class="field is-grouped"
    >
      <div class="control">
        <add-commentary-button
          :type="type"
          :label="label"
        />
      </div>
      <div
        v-if="currentUserIsTeacher"
        class="control"
      >
        <validate-commentaries-button :doc-id="document.id" />
      </div>
    </div>
    <!-- EXISTING COMMENTARIES --> 
    <div
      v-else
      class="field is-grouped"
    >
      <div class="control">
        <save-commentaries-button
          v-if="!isCommentariesReadOnly"
        />
      </div>
      <div
        v-if="currentUserIsTeacher"
        class="control"
      >
        <validate-commentaries-button :doc-id="document.id" />
      </div>
      <div class="control">
        <delete-commentary-button />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import AddCommentaryButton from '../actions/AddCommentaryButton.vue'
import DeleteCommentaryButton from '../actions/DeleteCommentaryButton.vue'
import ValidateCommentariesButton from '../actions/ValidateCommentariesButton.vue'
import SaveCommentariesButton from '../actions/SaveCommentariesButton.vue'

export default {
    name: 'CommentariesActionBar',
    components: {
      AddCommentaryButton,
      DeleteCommentaryButton,
      ValidateCommentariesButton,
      SaveCommentariesButton
    },
    props: {
      type: {type: Number, required: true},
      label: {type: String, required: true}

    },
    computed: {
        ...mapState('document', ['document']),
        ...mapState('workflow', ['selectedUserId', 'isCommentariesReadOnly']),
        ...mapGetters('user', ['currentUserIsTeacher']),
        ...mapGetters('commentaries', ['hasCommentaryTypes']),
    },
    methods: {
      
    }
}
</script>