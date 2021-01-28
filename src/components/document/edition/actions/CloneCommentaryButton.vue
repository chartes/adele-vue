<template>
  <div
    class="button "
    @click="openCloneModal"
  >
    Cloner le commentaire
  </div>
</template>


<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    name: 'CloneCommentaryButton',
    components: {

    },
    computed: {

    },
    methods: {
      openCloneModal() {
        document.querySelector('#clone-commentary-modal').classList.add('is-active')
        document.querySelector('html').classList.add('is-clipped')
      },
     
    }
}
</script>