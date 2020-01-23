<template>
  <div
    id="delete-translation-modal"
    class="modal"
  >
    <div
      class="modal-background"
    />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Suppression de la traduction
        </p>
        <button
          class="delete"
          aria-label="close"
          @click="closeModal"
        />
      </header>
      <section class="modal-card-body">
        <div>
          <p>
            La suppression de la traduction entraînera également la suppression
            des marqueurs d'alignement avec la transcription
          </p>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button
          class="button is-danger"
          :disabled="dependencies.length > 0"
          @click="deleteTranslation"
        >
          Confirmer la suppression
        </button>
        <button
          class="button"
          @click="closeModal"
        >
          Annuler
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: "DeleteTranslationModal",
    props: {
        userId: {type: Number, default: null},
        docId: {type: Number, default: null}
    },
    computed: {
        ...mapGetters('workflow', ['selectedUserHasTranslation',
        'selectedUserHasFacsimile', 'selectedUserHasCommentaries', 'selectedUserHasSpeechParts']),

        dependencies() {
            let deps = []
           
            return deps
        }
    },
    methods: {
        ...mapActions('translation', ['deleteTranslationFromUser']),
        
        closeModal() {
            document.querySelector('#delete-translation-modal').classList.remove('is-active')
            document.querySelector('html').classList.remove('is-clipped')
        },
        
        async deleteTranslation() {
            console.log("delete translation")
            await this.deleteTranslationFromUser({
                docId: this.docId,
                userId: this.userId
            })
            this.closeModal()
      }
    }
}
</script>