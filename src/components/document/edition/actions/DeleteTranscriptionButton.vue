<template>
  <div>
    <div>
      <a
        class="button is-text is-small has-text-danger"
        @click="openDeleteModal"
      >
        <span>Supprimer la transcription</span>
      </a>
    </div>
  </div>
</template>


<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    name: 'DeleteTranscriptionButton',
    components: {

    },
    computed: {

    },
    methods: {
      openDeleteModal() {
        document.querySelector('#delete-transcription-modal').classList.add('is-active')
        document.querySelector('html').classList.add('is-clipped')
      },
     
    }
}
</script>