<template>
  <div class="m-b-md m-t-md">
    <div class="tile is-ancestor  is-vertical">
      <div class="tile is-parent is-uppercase">
        <span class="has-text-info is-size-6">
          Avancement du dossier
        </span> 
        <span class="m-l-sm m-r-sm  is-size-6">
          |
        </span>
        <span class="m-r-sm is-size-6">
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

      <div class="columns m-l-sm m-t-sm">
        <div class="column">
          <div class="is-size-6 subtitle">
            <div
              class="workflow-step-radio"
              @mouseover="stepDoc = 'notice'"
              @mouseleave="stepDoc = $route.params.section"
            >
              <span class="icon step-dot validated"><i class="fa fa-check is-size-7" /></span>
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
              <span class="icon step-dot validated"><i class="fa fa-check is-size-7" /></span>
              <span
                :class="stepDoc === 'transcription' ? 'selected-step' : ''"
              >Transcription
              </span>
            </div>
            <div>
              <span class="sub-step-divider" />
              <span>
                <div
                  class="workflow-step-radio"
                  @mouseover="stepDoc = 'translation'"
                  @mouseleave="stepDoc = $route.params.section"
                >
                  <span class="icon step-dot unvalidated" />
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
                  <span class="icon step-dot validated"><i class="fa fa-check is-size-7" /></span>
                  <span
                    :class="stepDoc === 'commentaries' ? 'selected-step' : ''"
                  >Commentaires
                  </span>
                </div>
                <div
                  class="workflow-step-radio"
                  @mouseover="stepDoc = 'facsimile'"
                  @mouseleave="stepDoc = $route.params.section"
                >
                  <span class="icon step-dot "><i class="fa fa-check is-size-7" /></span>
                  <span
                    :class="stepDoc === 'facsimile' ? 'selected-step' : ''"
                  >Facsimilé
                  </span></div>
                <div
                  class="workflow-step-radio"
                  @mouseover="stepDoc = 'speech-parts'"
                  @mouseleave="stepDoc = $route.params.section"
                >
                  <span class="icon step-dot "><i class="fa fa-check is-size-7" /></span>
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
export default {
    name: 'WorkflowRadioSteps',
    components: {
        
    },
    props: {
      section: {type: String, default: null}
    },
    data() {
        return {
          stepDoc: null,
          descriptions: {
            notice: 'description de la notice',
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

.workflow-step-radio {
  &:hover {
    cursor: pointer;
  }
}

.selected-step {
  text-decoration: underline;
}

.sub-step-divider {
  height: 96px;
  width: 1px;
  border-right: 1px solid lightgrey;
  margin-right: 12px;
  margin-left: 8px;
  position: relative;
  float: left;
}

.step-dot {
  height: 16px;
  width: 16px;
  
  background-color: #bbb;
  border-radius: 50%;
  margin-right: 0.75em;
  margin-bottom: 10px;

  color: white;
  vertical-align: text-top;

  &.unvalidated {
     background-color:hsl(48, 100%, 67%);
  }
  &.validated {
     background-color:hsl(141, 53%, 53%);
  }
}
</style>