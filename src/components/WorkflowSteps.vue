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
          v-if="currentUserIsTeacher"
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
          {{ documentOwner.first_name }}  {{ documentOwner.las_name }}
        </span> 
        <span
          v-else
          class="m-r-sm is-size-5"
        >
          {{ currentUser.firstname }} {{ currentUser.lastname }}

        </span> 
      </div>
      <div class="tile steps m-t-md">
        <div
          class="step-item"
          :class="`${isTranscriptionValidated ? 'is-completed is-success': ''}`"
        >
          <div class="step-marker">
            <transition name="fade">
              <span
                v-if="isTranscriptionValidated"
                class="icon"
              >
                <i class="fa fa-check" />
              </span>
            </transition>
          </div>
          <div class="step-details">
            Transcription 
          </div>
        </div>
        <div
          class="step-item"
          :class="`${isTranslationValidated ? 'is-completed is-success': ''}`"
        >
          <div class="step-marker">
            <transition name="fade">
              <span
                v-if="isTranslationValidated"
                class="icon"
              >
                <i class="fa fa-check" />
              </span>
            </transition>
          </div>
          <div class="step-details">
            Traduction 
          </div>
        </div>
        
        <div
          class="step-item"
          :class="`${isCommentariesValidated ? 'is-completed is-success': ''}`"
        >
          <div class="step-marker">
            <transition name="fade">
              <span
                v-if="isCommentariesValidated"
                class="icon"
              >
                <i class="fa fa-check" />
              </span>
            </transition>
          </div>
          <div class="step-details">
            Commentaires 
          </div>
        </div>

        <div
          class="step-item"
          :class="`${currentUserIsTeacher && isFacsimileValidated ? 'is-completed is-success': ''}`"
        >
          <div class="step-marker">
            <transition name="fade">
              <span
                v-if="currentUserIsTeacher && isFacsimileValidated"
                class="icon"
              >
                <i class="fa fa-check" />
              </span>
            </transition>
          </div>
          <div class="step-details">
            Facsimilé 
          </div>
        </div>
       
        <div
          class="step-item"
          :class="`${isSpeechPartsValidated ? 'is-completed is-success': ''}`"
        >
          <div class="step-marker">
            <transition name="fade">
              <span
                v-if="isSpeechPartsValidated"
                class="icon"
              >
                <i class="fa fa-check" />
              </span>
            </transition>
          </div>
          <div class="step-details">
            Parties du discours 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
    name: 'WorkflowSteps',
    components: {
        
    },
    props: {
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapState('user', ['currentUser']),
        ...mapState('workflow', ['selectedUserId']),
        ...mapState('document', ['document']),
        ...mapGetters('user', ['loggedIn', 'currentUserIsAdmin', 'currentUserIsTeacher', 'currentUserIsStudent']),
        ...mapGetters('document', ['documentOwner']),
        
        ...mapGetters('workflow', [
          'isTranscriptionValidated',
          'isTranslationValidated',
          'isCommentariesValidated',
          'isFacsimileValidated',
          'isSpeechPartsValidated'
          ]),

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
        transcriptionValidatedOrTeacher() {
          return this.isTranscriptionValidated || this.currentUserIsTeacher
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

<style lang="scss" scoped>

</style>