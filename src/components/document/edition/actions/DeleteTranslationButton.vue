<template>
  <a
    class="button is-text is-small has-text-danger"
    @click="deleteTranslation"
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
        userId: {type: Number, default: null},
        docId: {type: Number, default: null}
    },
    computed: {
    },
    methods: {
      ...mapActions('translation', ['deleteTranslationFromUser']),
      async deleteTranslation() {
        console.log("delete translation")
        await this.deleteTranslationFromUser({
          docId: this.docId,
          userId: this.userId
        })
      }
    }
}
</script>