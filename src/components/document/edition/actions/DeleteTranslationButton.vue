<template>
  <a
    class="button is-text is-small has-text-danger"
    @click="openDeleteModal"
  >
    <span>Supprimer la traduction</span>
  </a>
</template>


<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    name: 'DeleteTranslationButton',
    components: {

    },
    props: {

    },
    computed: {
    },
    methods: {
      openDeleteModal() {
        document.querySelector('#delete-translation-modal').classList.add('is-active')
        document.querySelector('html').classList.add('is-clipped')
      },
    }
}
</script>