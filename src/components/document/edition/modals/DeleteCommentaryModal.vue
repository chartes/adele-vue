<template>
  <div
    id="delete-commentary-modal"
    class="modal"
  >
    <div
      class="modal-background"
    />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Suppression du commentaire
        </p>
        <button
          class="delete"
          aria-label="close"
          @click="closeModal"
        />
      </header>
      <section class="modal-card-body">
        <p />
      </section>
      <footer class="modal-card-foot">
        <button
          class="button is-danger"
          @click="deleteCommentary"
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
import Message from '@/components/Message.vue'

export default {
    name: "DeleteTranscriptionModal",
    components: {
        
    },
    props: {
    },
    computed: {
        ...mapGetters('workflow', []),
        dependencies() {
            let deps = []
            return deps
        }
    },
    methods: {
        ...mapActions('commentaries', ['deleteCommentaryFromUser']),
        
        closeModal() {
            document.querySelector('#delete-commentary-modal').classList.remove('is-active')
            document.querySelector('html').classList.remove('is-clipped')
        },
        
        async deleteCommentary() {
            const activeItem = document.querySelector('.commentaries-tabs li.is-active')
            await this.deleteCommentaryFromUser(activeItem.dataset.comType)
            this.closeModal()
      }
    }
}
</script>