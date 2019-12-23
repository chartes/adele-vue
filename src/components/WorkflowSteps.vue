<template>
  <div class="m-b-xl m-t-xl">
    <div class="tile is-ancestor  is-vertical">
      <div class="tile is-parent is-uppercase">
        <span class="has-text-info is-size-6">
          Avancement du dossier
        </span> 
        <span class="m-l-sm m-r-sm  is-size-6">
          |
        </span>
        <span class="m-r-sm  is-size-6">
          Édité par
        </span> 
        <!-- Select workflow user -->
        <div
          v-if="currentUserIsTeacher"
          class="control has-icons-left"
        >
          <div class="select is-small">
            <select v-model="workflowUserId">
              <option
                v-for="user in whitelistUsers"
                :key="user.id"
                :value="user.id"
                :class="`${user.id === currentUser.id ? 'has-text-weight-bold' : ''}`"
              >
                {{ user.username }}
              </option>
            </select>
            <span class="icon is-small is-left">
              <i class="fas fa-user" />
            </span>
          </div>
        </div>
        <span
          v-else
          class="m-r-sm is-size-6"
        >
          {{ documentOwner.first_name }}  {{ documentOwner.last_name }}
        </span> 
      </div>
      <div class="tile steps m-t-md is-size-7">
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
          <div
            class="step-details"
            :class="`${isTranscriptionValidated ? 'has-text-success' : ''}`"
          >
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
          <div
            class="step-details"
            :class="`${isTranslationValidated ? 'has-text-success' : ''}`"
          >
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
          <div
            class="step-details"
            :class="`${isCommentariesValidated ? 'has-text-success' : ''}`"
          >
            Commentaires 
          </div>
        </div>

        <div
          v-if="currentUserIsTeacher"
          class="step-item"
          :class="`${isFacsimileValidated ? 'is-completed is-success': ''}`"
        >
          <div class="step-marker">
            <transition name="fade">
              <span
                v-if="isFacsimileValidated"
                class="icon"
              >
                <i class="fa fa-check" />
              </span>
            </transition>
          </div>
          <div
            class="step-details"
            :class="`${isSpeechPartsValidated ? 'has-text-success' : ''}`"
          >
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
          <div
            class="step-details"
            :class="`${isSpeechPartsValidated ? 'has-text-success' : ''}`"
          >
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
      section: {type: String, default: null}
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
        selectedUserId() {
          if (this.selectedUserId !== this.currentUser.id && this.$props.section === 'facsimile') {
            this.$router.replace({name: 'document-edition', params: {section: 'notice'}})
          }
        }
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