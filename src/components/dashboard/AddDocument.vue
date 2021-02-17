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

    <message v-if="status !== -1">
      Document <b>{{ status.data.data.id }}</b> ajouté ! <router-link
        :to="{name:'document-edition', params:{docId: status.data.data.id, section: 'notice'}}"
      >
        Modifier le nouveau document
      </router-link>.
    </message>
    <message
      v-if="error && status !== -1"
      message-class="is-danger"
    >
      {{ error }}
    </message>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex';
import Message from '@/components/Message';

export default {
    name: "AddDocument",
    components: {
      Message
    },
    data() {
      return {
        newTitle: 'Titre du nouveau document',
        subtitle: 'Sous-titre',
        status: -1
      }
    },
    computed: {
      ...mapState('document', ['error'])
    },
    created() {
     
    },
    methods: {
      ...mapActions('document', ['addDocument']),
      async makeNewDoc() {
        this.status = null
        this.status = await this.addDocument({
          title: this.newTitle || 'Titre du nouveau document',
          subtitle: this.subtitle
        })
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