<template>
  <div class="add-document">
    <h2>
      Création d'un nouveau dossier
    </h2>
    <div class="buttons">
      <span class="control">
        <input
          v-model="newTitle"
          class="input"
          type="text"
          placeholder="Titre du nouveau document"
        >
 
      </span>
      <button
        class="button is-info"
        @click="makeNewDoc"
      >
        Ajouter
      </button>
    </div>   
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex';
import Message from '@/components/Message';

export default {
    name: "AddDocument",
    components: {
      
    },
    data() {
      return {
        newTitle: 'Titre du nouveau document',
        subtitle: 'Sous-titre'      }
    },
    computed: {
      ...mapState('document', ['error'])
    },
    created() {
     
    },
    methods: {
      ...mapActions('document', ['addDocument']),
      async makeNewDoc() {
        const doc = await this.addDocument({
          title: this.newTitle || 'Titre du nouveau document',
          subtitle: this.subtitle
        })
        this.$root.$emit('document-created:show', {doc})
      }
    }
}
</script>

<style scoped>
.input {
  min-width: 300px;
}
.add-document { 
  padding-bottom: 20px;
}
.button {
  margin-bottom: 0px !important;
  margin-left: 12px;
  width:100px;
}
.buttons {
  margin-top: 20px;
}
</style>