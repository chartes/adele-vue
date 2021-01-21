<template>
  <div
    id="clone-translation-modal"
    class="modal"
  >
    <div
      class="modal-background"
    />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Cloner la traduction
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
          @click="cloneTranslation"
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
    name: "DeleteTranslationModal",
    components: {
        
    },
    props: {
    },
    computed: {
        ...mapGetters('workflow', [])
    },
    methods: {
        //...mapActions('commentaries', ['cloneCommentaryFromUser']),
        
        closeModal() {
            document.querySelector('#clone-translation-modal').classList.remove('is-active')
            document.querySelector('html').classList.remove('is-clipped')
        },
        
        async cloneTranslation() {
          /*
            const activeItem = document.querySelector('.commentaries-tabs li.is-active')
            await this.cloneCommentaryFromUser(activeItem.dataset.comType)
          */
          this.closeModal()
      }
    }
}
</script>