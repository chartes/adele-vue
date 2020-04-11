<template>
  <div class="edition-action-bar m-b-md">
    <div class="field is-grouped">
      <!-- SAVE TRANSLATION --> 
      <p 
        v-if="!isTranslationReadOnly"
        class="control"
      >
        <save-translation-button />
      </p>
      <!-- VALIDATE / UNVALIDATE TRANSLATION --> 
      <p
        v-if="currentUserIsTeacher && currentUser.id === selectedUserId"
        class="control"
      >
        <validate-translation-button :doc-id="document.id" />
      </p>
      <!-- TRANSCRIPTION ALIGNMENT MODE 
      <p
        v-if="currentUserIsTeacher && currentUser.id === selectedUserId"
        class="control"
      >
        <transcription-alignment-button :doc-id="document.id" />
      </p>
      --> 
      <!-- DELETE TRANSLATION --> 
      <p
        v-if="currentUserIsTeacher"
        class="control"
      >
        <delete-translation-button
          :doc-id="document.id"
          :user-id="selectedUserId"
        />
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import DeleteTranslationButton from '../actions/DeleteTranslationButton.vue'
import ValidateTranslationButton from '../actions/ValidateTranslationButton.vue'
import TranscriptionAlignmentButton from '../actions/TranscriptionAlignmentButton.vue'
import SaveTranslationButton from '../actions/SaveTranslationButton.vue'

export default {
    name: 'TranslationActionBar',
    components: {
      ValidateTranslationButton,
      DeleteTranslationButton,
      //TranscriptionAlignmentButton,
      SaveTranslationButton
    },
    computed: {
        ...mapState('document', ['document']),
        ...mapState('workflow', ['selectedUserId']),
        ...mapState('user', ['currentUser']),
        ...mapGetters('user', ['currentUserIsTeacher']),
        ...mapGetters('workflow', ['isTranslationValidated', 'isTranslationReadOnly' ])

    },
    methods: {
      
    }
}
</script>