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
    name: "CloneTranslationModal",
    components: {
        
    },
    props: {
    },
    computed: {
        ...mapGetters('workflow', [])
    },
    methods: {
        ...mapActions('commentaries', ['cloneContent']),
        
        closeModal() {
            document.querySelector('#clone-translation-modal').classList.remove('is-active')
            document.querySelector('html').classList.remove('is-clipped')
        },
        
        async cloneTranslation() {
          await this.cloneContent()
          this.closeModal()
      }
    }
}
</script>