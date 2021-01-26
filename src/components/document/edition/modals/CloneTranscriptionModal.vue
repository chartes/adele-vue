<template>
  <div
    id="clone-transcription-modal"
    class="modal"
  >
    <div
      class="modal-background"
    />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Cloner la transcription
        </p>
        <button
          class="delete"
          aria-label="close"
          @click="closeModal"
        />
      </header>
      <section class="modal-card-body">
        <p>
          TBD
        </p>
      </section>
      <footer class="modal-card-foot">
        <button
          class="button is-danger"
          @click="cloneTranscription"
        >
          Valider
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
import Message from '@/components/Message.vue'

export default {
    name: "CloneTranscriptionModal",
    methods: {
        ...mapActions('transcription', ['cloneContent']),
        
        closeModal() {
            document.querySelector('#clone-transcription-modal').classList.remove('is-active')
            document.querySelector('html').classList.remove('is-clipped')
        },
        
        cloneTranscription() {
          this.cloneContent()
          this.closeModal()
      }
    }
}
</script>