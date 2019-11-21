<template>
  <div class="m-b-xl">
    <div class="tile is-ancestor  is-vertical">
      <div class="tile is-parent is-uppercase">
        <span class="has-text-info is-size-5">
          Avancement du dossier
        </span> 
        <span class="m-l-sm m-r-sm  is-size-5">
          |
        </span>
        <span class="m-r-sm  is-size-5">
          Édité par
        </span> 
        <!-- Select workflow user -->
        <div
          v-if="currentUser.roles.indexOf('teacher') >- 1"
          class="select is-small"
        >
          <select v-model="workflowUserId">
            <option
              v-for="user in whitelistUsers"
              :key="user.id"
              :value="user.id"
            >
              {{ user.username }}
            </option>
          </select>
        </div>
        <span
          v-else-if="document.is_closed"
          class="m-r-sm is-size-5"
        >
          {{ documentOwner.username }}
        </span> 
        <span
          v-else
          class="m-r-sm is-size-5"
        >
          {{ currentUser.username }}
        </span> 
      </div>
      <div class="tile steps">
        <div
          v-if="isTranscriptionValidated"
          class="step-item is-completed"
        >
          <div class="step-marker">
            <span class="icon">
              <i class="fa fa-check" />
            </span>
          </div>
          <div class="step-details">
            Transcription 
          </div>
        </div>
        <div
          v-else
          class="step-item"
        >
          <div class="step-marker" />
          <div class="step-details">
            Transcription 
          </div>
        </div>

  
        <div
          v-if="isTranslationValidated"
          class="step-item is-completed"
        >
          <div class="step-marker">
            <span class="icon">
              <i class="fa fa-check" />
            </span>
          </div>
          <div class="step-details">
            Traduction 
          </div>
        </div>
        <div
          v-else
          class="step-item"
        >
          <div class="step-marker" />
          <div class="step-details">
            Traduction 
          </div>
        </div>


        <div
          v-if="isCommentariesValidated"
          class="step-item is-completed"
        >
          <div class="step-marker">
            <span class="icon">
              <i class="fa fa-check" />
            </span>
          </div>
          <div class="step-details">
            Commentaires 
          </div>
        </div>
        <div
          v-else
          class="step-item"
        >
          <div class="step-marker" />
          <div class="step-details">
            Commentaires 
          </div>
        </div>


        <div
          v-if="isFacsimileValidated"
          class="step-item is-completed"
        >
          <div class="step-marker">
            <span class="icon">
              <i class="fa fa-check" />
            </span>
          </div>
          <div class="step-details">
            Facsimilé 
          </div>
        </div>
        <div
          v-else
          class="step-item"
        >
          <div class="step-marker" />
          <div class="step-details">
            Facsimilé 
          </div>
        </div>


        <div
          v-if="isSpeechPartsValidated"
          class="step-item is-completed"
        >
          <div class="step-marker">
            <span class="icon">
              <i class="fa fa-check" />
            </span>
          </div>
          <div class="step-details">
            Parties du discours 
          </div>
        </div>
        <div
          v-else
          class="step-item"
        >
          <div class="step-marker" />
          <div class="step-details">
            Parties du discours
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'WorkflowSteps',
    components: {
        
    },
    props: {
        document: {type: Object, default: null}
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapState('user', ['currentUser']),
        ...mapState('workflow', ['selectedUserId']),
        workflowUserId: {
            set(id) {
                this.$store.dispatch("workflow/changeSelectedUser", {userId: id})
            },
            get() {
               return this.selectedUserId 
            }
        },
        whitelistUsers() {
            return this.document.whitelist.users.map(u => {
                return {
                    username: `${u.first_name} ${u.last_name}`,
                    id: u.id
                }
            })
        },
        documentOwner() {
            const owner = this.document.whitelist.users.filter(u => u.id === this.document.user_id)[0]
            console.log(this.document.whitelist.users)
            console.log(this.document.user_id)
            return {
                username: `${owner.first_name} ${owner.last_name}`,
                id: owner.id
            }
        },
        isTranscriptionValidated() {
            return this.document.validation_step >= 1
        },
        isTranslationValidated() {
            return this.document.validation_step >= 2
        },
        isCommentariesValidated() {
            return this.document.validation_step >= 3
        },
        isFacsimileValidated() {
            return this.document.validation_step >= 4
        },
        isSpeechPartsValidated() {
            return this.document.validation_step >= 5
        }
    },
    watch: {

    },
    created() {
        this.workflowUserId = this.currentUser.id
    },
    methods: {
 
    }
}
</script>