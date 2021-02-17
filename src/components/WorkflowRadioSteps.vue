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
          <span v-if="currentUser.id !== documentOwner.id || !currentUserIsTeacher">Dirigé par</span>
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

      <div class="columns m-l-sm m-t-xxs">
        <div class="column">
          <div class="is-size-6 subtitle">
            <div
              class="workflow-step-radio"
              @mouseover="stepDoc = 'notice'"
              @mouseleave="stepDoc = $route.params.section"
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
              @mouseleave="stepDoc = $route.params.section"
            >
              <validation-radio-icon
                :is-validated="isTranscriptionValidated && selectedUserHasTranscription"
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
                  @mouseleave="stepDoc = $route.params.section"
                >
                  <validation-radio-icon
                    :is-validated="isTranslationValidated && selectedUserHasTranslation"
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
                  @mouseleave="stepDoc = $route.params.section"
                >
                  <validation-radio-icon
                    :is-validated="isCommentariesValidated && selectedUserHasCommentaries"
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
                  @mouseleave="stepDoc = $route.params.section"
                >
                  <validation-radio-icon
                    :is-validated="isFacsimileValidated && selectedUserHasFacsimile"
                    :is-content-empty="!selectedUserHasFacsimile"
                  />
                  <span
                    :class="stepDoc === 'facsimile' ? 'selected-step' : ''"
                  >Facsimilé
                  </span></div>
                <div
                  class="workflow-step-radio"
                  @mouseover="stepDoc = 'speech-parts'"
                  @mouseleave="stepDoc = $route.params.section"
                >
                  <validation-radio-icon
                    :is-validated="isSpeechPartsValidated && selectedUserHasSpeechParts"
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
    props: {
      section: {type: String, default: null}
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
        ...mapState('workflow', ['selectedUserId']),
        ...mapState('document', ['document']),
        ...mapGetters('user', ['loggedIn', 'currentUserIsAdmin', 'currentUserIsTeacher', 'currentUserIsStudent']),
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
        },
        $route (to, from){
          this.stepDoc = this.$route.params.section
        }
    },
    created() {
        this.workflowUserId = this.currentUser.id
    },
    mounted() {
       
    },
    methods: {
 
    }
}
</script>

<style lang="scss" scoped>
</style>