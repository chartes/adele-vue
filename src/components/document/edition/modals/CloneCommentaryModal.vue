<template>
  <div
    id="clone-commentary-modal"
    class="modal"
  >
    <div class="modal-background" />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Cloner le commentaire
        </p>
        <button
          class="delete"
          aria-label="close"
          @click="closeModal"
        />
      </header>
      <section class="modal-card-body">
        <p>
          Vous allez copier le contenu du commentaire de <b>{{ selectedUsername }}</b>.
        </p>
        <br>
        <article class="message is-info">
          <div class="message-body">
            <div class="has-text-danger">
              Cette opération écrasera votre propre version de ce commentaire et la
              remplacera par celle de <b>{{ selectedUsername }}</b>.
            </div>
            <br>
            Vos commentaires devront à nouveau être validés manuellement.
          </div>
        </article>
      </section>
      <footer class="modal-card-foot">
        <button
          class="button is-danger"
          @click="cloneCommentary"
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
import { mapActions, mapGetters } from "vuex";
import Message from "@/components/Message.vue";

export default {
  name: "CloneCommentaryModal",
  computed: {
    ...mapGetters("workflow", ["selectedUsername"]),
  },
  methods: {
    ...mapActions("commentaries", ["cloneContent"]),

    closeModal() {
      document.querySelector("#clone-commentary-modal").classList.remove("is-active");
      document.querySelector("html").classList.remove("is-clipped");
    },

    cloneCommentary() {
      this.cloneContent();
      this.closeModal();
    },
  },
};
</script>
