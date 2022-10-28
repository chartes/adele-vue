<template>
  <div
    id="delete-speech-parts-modal"
    class="modal"
  >
    <div
      class="modal-background"
    />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Suppression des parties du discours
        </p>
        <button
          class="delete"
          aria-label="close"
          @click="closeModal"
        />
      </header>
      <footer class="modal-card-foot">
        <button
          class="button is-danger"
          @click="deleteSpeechPartsContent"
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
import { mapActions } from 'vuex'

export default {
    name: "DeleteSpeechPartsModal",
    props: {
        userId: {type: Number, default: null},
        docId: {type: Number, default: null}
    },
    methods: {
        ...mapActions('speechPartsContent', ['deleteSpeechPartsContentFromUser']),
        
        closeModal() {
            document.querySelector('#delete-speech-parts-modal').classList.remove('is-active')
            document.querySelector('html').classList.remove('is-clipped')
        },
        
        async deleteSpeechPartsContent() {
            console.log("delete speech parts content")
            await this.deleteSpeechPartsContentFromUser({
                docId: this.docId,
                userId: this.userId
            })
            this.closeModal()
      }
    }
}
</script>