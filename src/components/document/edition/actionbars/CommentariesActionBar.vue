<template>
  <div
    v-if="!isCommentariesReadOnly"
    class="edition-action-bar m-b-md"
  >
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
        v-if="currentUserIsTeacher && selectedUserId == document.user_id"
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
        <save-commentaries-button />
      </div>
      <div
        v-if="currentUserIsTeacher"
        class="control"
      >
        <validate-commentaries-button :doc-id="document.id" />
      </div>
      <!-- CLONE COMMENTARY --> 
      <p
        v-if="currentUserIsTeacher && currentUser.id !== selectedUserId"
        class="control"
      >
        <clone-commentary-button />
      </p>
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
import CloneCommentaryButton from '../actions/CloneCommentaryButton.vue'

export default {
    name: 'CommentariesActionBar',
    components: {
      AddCommentaryButton,
      DeleteCommentaryButton,
      ValidateCommentariesButton,
      SaveCommentariesButton,
      CloneCommentaryButton
    },
    props: {
      type: {type: Number, required: true},
      label: {type: String, required: true}

    },
    computed: {
        ...mapState('document', ['document']),
        ...mapState('workflow', ['selectedUserId', 'isCommentariesReadOnly']),
        ...mapState('user', ['currentUser']),
        ...mapGetters('user', ['currentUserIsTeacher']),
        ...mapGetters('commentaries', ['hasCommentaryTypes']),
    },
    methods: {
      
    }
}
</script>