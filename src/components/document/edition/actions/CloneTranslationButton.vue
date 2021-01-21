<template>
  <div
    class="button "
    @click="openCloneModal"
  >
    Cloner
  </div>
</template>


<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    name: 'CloneTranslationButton',
    components: {

    },
    computed: {

    },
    methods: {
      openCloneModal() {
        document.querySelector('#clone-translation-modal').classList.add('is-active')
        document.querySelector('html').classList.add('is-clipped')
      },
     
    }
}
</script>