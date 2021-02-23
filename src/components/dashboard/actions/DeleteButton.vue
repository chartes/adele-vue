<template>
  <div class="action">
    <button
      class="button is-danger is-outlined"
      style="width: 120px"
      @click="toggleModal"
    >
      <span>Supprimer</span>
      <span
        class="icon "
        style="top: 0.075em; position: relative; font-size: 18px"
      >
        <i class="fas fa-times" />
      </span>
    </button>

    <div
      class="modal"
      :class="open ? `is-active` : ''"
    >
      <div class="modal-background" />
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            Suppression du document {{ docId }}
          </p>
          <button
            class="delete"
            aria-label="close"
            @click="toggleModal"
          />
        </header>
        <section class="modal-card-body">
          Êtes-vous sûr(e) de vouloir supprimer le document {{ docId }} ?
        </section>
        <footer class="modal-card-foot">
          <button
            class="button is-danger"
            @click="deleteDoc"
          >
            Supprimer
          </button>
          <button
            class="button"
            @click="toggleModal"
          >
            Annuler
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>

import {mapState, mapActions, mapGetters} from 'vuex'
import http from '@/modules/http-common.js';

export default {
    name: "DeleteButton",
    components: {
    },
    props: {
        'docId' : {type: Number, required: true},
    },
    data() {
        return {
          open: false
        }
    },
    computed: {

    },
    mounted() {
    },
    methods: {
      ...mapActions('document', ['deleteDocument']),
      toggleModal() {
        this.open = !this.open
      },
      async deleteDoc() {
        await this.deleteDocument(this.docId)
        this.$emit('document-deleted')
        this.toggleModal()
      }
    }
}
</script>

<style>
</style>