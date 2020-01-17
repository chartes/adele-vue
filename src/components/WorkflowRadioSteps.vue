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

      <div class="m-l-sm m-t-sm is-size-7 ">
        <div class="">
          <input
            class="is-checkradio has-no-border is-success"
            type="checkbox"
            name="notice"
            checked="checked"
          >
          <label for="notice">Notice</label>
        </div>
        <div class="">
          <input
            class="is-checkradio has-no-border is-success"
            type="checkbox"
            name="notice"
            checked="checked"
          >
          <label for="notice">Transcription</label>
        </div>

        <div>
          <span style="height: 96px; width: 2px; border-right: 0px solid lightgrey; margin-right: 4px; margin-left: 8px; position: relative; float:left" />
          <span>
            <div class="">
              <input
                class="is-checkradio has-no-border "
                type="checkbox"
                name="notice"
              >
              <label for="notice">Traduction</label>
            </div>
            <div class="">
              <input
                class="is-checkradio has-no-border is-success"
                type="checkbox"
                name="notice"
                checked="checked"
              >
              <label for="notice">Commentaires</label>
            </div>
            <div class="">
              <input
                class="is-checkradio has-no-border "
                type="checkbox"
                name="notice"
                disabled
              >
              <label for="notice">Facsimilé</label>
            </div>
            <div class="">
              <input
                class="is-checkradio has-no-border"
                type="checkbox"
                name="notice"
                disabled
              >
              <label for="notice">Parties du discours</label>
            </div>
          </span>
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