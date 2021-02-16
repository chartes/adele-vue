<template>
  <div class="add-document">
    <h2>
      Création d'un nouveau dossier
    </h2>
    <div class="buttons">
      <button
        class="button"
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
        title: 'Titre du document',
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
          title: this.title,
          subtitle: this.subtitle
        })
      }
    }
}
</script>

<style scoped>
.add-document { 
  padding-bottom: 20px;
}
.button {
  background-color: #FFD500;
}
.buttons {
  margin-top: 20px;
}
</style>