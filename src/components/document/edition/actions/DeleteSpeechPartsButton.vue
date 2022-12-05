<template>
  <div>
    <div>
      <a
        class="button is-text is-small has-text-danger"
        @click="openDeleteModal"
      >
        <span>Supprimer les parties du discours</span>
      </a>
    </div>
  </div>
</template>


<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    name: 'DeleteSpeechPartsButton',
    components: {

    },
    computed: {

    },
    methods: {
      openDeleteModal() {
        document.querySelector('#delete-speech-parts-modal').classList.add('is-active')
        document.querySelector('html').classList.add('is-clipped')
      },
     
    }
}
</script>