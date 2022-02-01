<template>
  <div
    id="delete-transcription-modal"
    class="modal"
  >
    <div
      class="modal-background"
    />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Suppression de la transcription
        </p>
        <button
          class="delete"
          aria-label="close"
          @click="closeModal"
        />
      </header>
      <section class="modal-card-body">
        <div v-if="dependencies.length > 0">
          <p>Il est impossible de supprimer ce contenu pour les raisons suivantes :</p>
          <ul
            v-for="dep in dependencies"
            :key="dep"
          >
            <li>
              <message message-class="is-warning">
                {{ dep }}
              </message>
            </li>
          </ul>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button
          class="button is-danger"
          :disabled="dependencies.length > 0"
          @click="deleteTranscription"
        >
          Confirmer la suppression
        </button>
        <button
          class="button"
          @click="closeModal"
        >
          Annuler
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Message from '@/components/Message.vue'

export default {
    name: "DeleteTranscriptionModal",
    components: {
        Message
    },
    props: {
        userId: {type: Number, default: null},
        docId: {type: Number, default: null}
    },
    computed: {
        ...mapGetters('workflow', ['selectedUserHasTranslation',
        'selectedUserHasFacsimile', 'selectedUserHasCommentaries', 'selectedUserHasSpeechParts']),

        dependencies() {
            let deps = []
            if (this.selectedUserHasTranslation) {
                deps.push('Ce document possède une traduction.')
            }
            if (this.selectedUserHasFacsimile) {
                deps.push('Ce document possède des alignements de facsimilé.')
            }
            if (this.selectedUserHasCommentaries) {
                deps.push('Ce document possède un ou plusieurs commentaires')
            }
            if (this.selectedUserHasSpeechParts) {
                deps.push('Ce document possède des parties de discours identifiées')
            }
            return deps
        }
    },
    methods: {
        ...mapActions('transcription', ['deleteTranscriptionFromUser']),
        
        closeModal() {
            document.querySelector('#delete-transcription-modal').classList.remove('is-active')
            document.querySelector('html').classList.remove('is-clipped')
        },
        
        async deleteTranscription() {
            console.log("delete transcription")
            await this.deleteTranscriptionFromUser({
                docId: this.docId,
                userId: this.userId
            })
            this.closeModal()
      }
    }
}
</script>