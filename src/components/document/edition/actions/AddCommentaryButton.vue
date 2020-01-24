<template>
  <div>
    <button
      class="button is-small is-info"
      @click="addCommentary"
    >
      <span> Ajouter un commentaire {{ label }}</span>
      <span
    
        class="icon"
      >
        <i class="fas fa-plus" />
      </span>
    </button>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    name: 'AddCommentaryButton',
    components: {
   
    },
    props: {
      type: {type: Number, required: true},
      label: {type: String, required: true}
    },
    computed: {
      ...mapState('commentaries', ['commentariesError']),
    },
    methods: {
      addCommentary() {
        //return this.$store.dispatch('commentaries/initNewCommentary') 
      },
    }
}
</script>