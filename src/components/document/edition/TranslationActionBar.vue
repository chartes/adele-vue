<template>
  <div class="m-b-md">
    <div class="field is-grouped">
      <!-- VALIDATE / UNVALIDATE TRANSLATION --> 
      <p
        v-if="currentUserIsTeacher && currentUser.id === selectedUserId"
        class="control"
      >
        <validate-translation-button :doc-id="document.id" />
      </p>
      <p
        v-if="currentUserIsTeacher && currentUser.id === selectedUserId"
        class="control"
      >
        <transcription-alignment-button :doc-id="document.id" />
      </p>
      <!-- DELETE / TRANSLATION --> 
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
import { TRANSLATION_STEP, NONE_STEP} from '@/store/modules/workflow'

import DeleteTranslationButton from './actions/DeleteTranslationButton.vue'
import ValidateTranslationButton from './actions/ValidateTranslationButton.vue'
import TranscriptionAlignmentButton from './actions/TranscriptionAlignmentButton.vue'

export default {
    name: 'TranslationActionBar',
    components: {
      ValidateTranslationButton,
      DeleteTranslationButton,
      TranscriptionAlignmentButton
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