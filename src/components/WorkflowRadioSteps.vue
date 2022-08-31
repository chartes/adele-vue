<template>
  <div class="m-b-md m-t-sm">
    <div class="tile is-ancestor  is-vertical">
      <div class="tile is-parent is-uppercase">
        <span class="has-text-info is-size-6">
          Avancement du dossier
        </span> 
        <span class="m-l-sm m-r-sm  is-size-6">
          |
        </span>
        <span class="m-r-sm is-size-6">
          <span v-if="currentUser.id !== documentOwner.id">Dirigé par</span>
          <span v-else>Édité par</span>
        </span> 
        <!-- Select workflow user -->
        <div
          v-if="currentUserIsTeacher"
          class="control has-icons-left"
        >
          <div class="select is-small">
            <select v-model="workflowUserId">
              <option
                v-for="user in selectableUsers"
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

      <div class="columns m-l-sm m-t-xxs">
        <div class="column">
          <div class="is-size-6 subtitle">
            <div
              class="workflow-step-radio"
              @mouseover="stepDoc = 'notice'"
              @mouseleave="stepDoc = currentSection"
            >
              <validation-radio-icon
                :is-validated="true"
                :is-content-empty="false"
              />
              <span
                :class="stepDoc === 'notice' ? 'selected-step' : ''"
              >Notice
              </span>
            </div>
            <div
              class="workflow-step-radio"
              @mouseover="stepDoc = 'transcription'"
              @mouseleave="stepDoc = currentSection"
            >
              <validation-radio-icon
                :is-validated="isTranscriptionValidated"
                :is-content-empty="!selectedUserHasTranscription"
              />
              <span
                :class="stepDoc === 'transcription' ? 'selected-step' : ''"
              >Transcription
              </span>
            </div>
            <div class="sub-step-divider">
              <span>
                <div
                  class="workflow-step-radio"
                  @mouseover="stepDoc = 'translation'"
                  @mouseleave="stepDoc = currentSection"
                >
                  <validation-radio-icon
                    :is-validated="isTranslationValidated"
                    :is-content-empty="!selectedUserHasTranslation"
                  />
                  <span
                    :class="stepDoc === 'translation' ? 'selected-step' : ''"
                  >Traduction
                  </span>
                </div>
                <div
                  class="workflow-step-radio"
                  @mouseover="stepDoc = 'commentaries'"
                  @mouseleave="stepDoc = currentSection"
                >
                  <validation-radio-icon
                    :is-validated="isCommentariesValidated"
                    :is-content-empty="!selectedUserHasCommentaries"
                  />
                  <span
                    :class="stepDoc === 'commentaries' ? 'selected-step' : ''"
                  >Commentaires
                  </span>
                </div>
                <div
                  v-if="currentUserIsTeacher"
                  class="workflow-step-radio"
                  @mouseover="stepDoc = 'facsimile'"
                  @mouseleave="stepDoc = currentSection"
                >
                  <validation-radio-icon
                    :is-validated="isFacsimileValidated"
                    :is-content-empty="!selectedUserHasFacsimile"
                  />
                  <span
                    :class="stepDoc === 'facsimile' ? 'selected-step' : ''"
                  >Facsimilé
                  </span></div>
                <div
                  class="workflow-step-radio"
                  @mouseover="stepDoc = 'speech-parts'"
                  @mouseleave="stepDoc = currentSection"
                >
                  <validation-radio-icon
                    :is-validated="isSpeechPartsValidated"
                    :is-content-empty="!selectedUserHasSpeechParts"
                  />
                  <span
                    :class="stepDoc === 'speech-parts' ? 'selected-step' : ''"
                  >Parties du discours
                  </span></div>
              </span>
            </div>
          </div>
        </div>
        <div class="column is-two-thirds">
          <p class="step-description">
            {{ descriptions[stepDoc] }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ValidationRadioIcon from '@/components/ui/ValidationRadioIcon.vue'
export default {
    name: 'WorkflowRadioSteps',
    components: {
        ValidationRadioIcon
    },
    data() {
        return {
          stepDoc: null,
          descriptions: {
            notice: 'description de l\'étape notice',
            transcription: 'description de l\'étape transcription',
            translation: 'description de l\'étape traduction',
            facsimile: 'description de l\'étape facsimilé',
            commentaries: 'description de l\'étape transcription',
            'speech-parts': 'description de l\'étape parties du discours',
          }
        }
    },
    computed: {
        ...mapState('user', ['currentUser']),
        ...mapState('workflow', ['selectedUserId', "currentSection"]),
        ...mapState('document', ['document']),
        ...mapGetters('user', ['isAuthenticated', 'currentUserIsAdmin', 'currentUserIsTeacher', 'currentUserIsStudent']),
        ...mapGetters('document', ['documentOwner']),
        
        ...mapGetters('workflow', [
          'isTranscriptionValidated', 'selectedUserHasTranscription',
          'isTranslationValidated', 'selectedUserHasTranslation',
          'isCommentariesValidated', 'selectedUserHasCommentaries',
          'isFacsimileValidated', 'selectedUserHasFacsimile',
          'isSpeechPartsValidated', 'selectedUserHasSpeechParts'
          ]),

        workflowUserId: {
            set(id) {
                this.$store.dispatch("workflow/changeSelectedUser", {userId: id})
            },
            get() {
               return this.selectedUserId ? this.selectedUserId : this.document.user.id
            }
        },
        selectableUsers() {
            let userList = this.document.whitelist.users;

            if (userList.findIndex(u => u.id === this.document.user.id) === -1) {
              userList.push(this.document.user)
            }

            if (userList.findIndex(u => u.id === this.currentUser.id) === -1) {
              userList.push(this.currentUser)
            }

            return userList.sort((a, b) => a.username.localeCompare(b.username))
        },
        transcriptionValidatedOrTeacher() {
          return this.isTranscriptionValidated || this.currentUserIsTeacher
        }
    },
    watch: {
        selectedUserId() {
          if (this.selectedUserId !== this.currentUser.id && this.currentSection === 'facsimile') {
            this.$router.replace({name: 'document-edition', params: {section: 'notice'}})
          }
        }, 
        currentSection() {
          this.stepDoc = this.currentSection
        }
    },
    created() {
        if (this.selectableUsers.findIndex(u => u.id === this.currentUser.id) > -1) {
          this.workflowUserId = this.currentUser.id
        } else {
          this.workflowUserId = this.document.user.id
        }
    },
    mounted() {
       this.stepDoc = this.currentSection
    },
    methods: {
 
    }
}
</script>

<style lang="scss" scoped>
</style>