<template>
  <div class="">
    <div
      :key="transcriptionLoading"
      class="has-text-weight-medium subtitle m-b-xl"
    >
      Commentaires
    </div>
    <div
      v-for="com in commentaryTypes"
      :key="com.id"
    >
      <div v-show="com.label === selectedCommentaryLabel">
        <commentaries-action-bar
          :type="com.id"
          :label="com.label"
        />
      </div>
    </div>
    <!-- commentary types tabs -->
    <div class="commentaries-tabs tabs is-small is-toggle">
      <ul>
        <li
          v-for="comType in commentaryTypes"
          :key="comType.id"
          :class="`${comType.label === selectedCommentaryLabel ? 'is-active' : ''}`"
          :data-com-type="comType.id"
        >
          <a @click="() => selectItem(comType.label)">
            {{ comType.label }}
          </a>
        </li>
      </ul>
    </div>
    <!-- editor -->
    <div style="min-height: 100%">
      <div
        v-for="com in commentaryTypes"
        :key="com.label"
      >
        <div v-show="com.label === selectedCommentaryLabel">
          <rich-text-editor
            v-if="hasCommentaryTypes(com.label)"
            :key="commentariesLoading"
            :initial-content="getCommentaryContent(com.label)"
            change-action="commentaries/changed"
          />
          <message
            v-else
            class="is-info"
          >
            Aucun commentaire de ce type 
          </message>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import { mapState, mapGetters, mapActions } from 'vuex';

import RichTextEditor from '../../editors/RichTextEditor.vue'
import CommentariesActionBar from './actionbars/CommentariesActionBar.vue'
import Message from '../../Message'

export default {
    name: "DocumentEditionCommentaries",
    components: {
        RichTextEditor,
        CommentariesActionBar,
        Message,
    },
    props: {
        
    },
    data() {
      return {
        imageVisibility: false,
      }
    },
    computed: {
        ...mapState('document', ['document', 'transcriptionLoading']),
        ...mapState('commentaries', ['commentaryTypes', 'selectedCommentaryLabel', 'commentariesLoading']),
        ...mapGetters('commentaries', ['getCommentary', 'hasCommentaryTypes']),
    },
    async created() {
      this.imageVisibility = false
      await this.fetchTypes()
      await this.fetchTranscriptionView()
    },
    methods: {
      ...mapActions('document', ['fetchTranscriptionView']),
      ...mapActions('commentaries', ['fetchTypes']),
      async selectItem(typeLabel) {
        await this.$store.dispatch('commentaries/selectCommentaryTab', typeLabel)
      },
      getCommentaryContent(label) {
        const com = this.getCommentary(label);
        return com ? com.content : ''
      },
      toggleImageVisibility() {
        this.imageVisibility = !this.imageVisibility
      }
    }
}
</script>

<style>

</style>
