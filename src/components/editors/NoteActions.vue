<template>
  <div class="note-actions">
    <div class="field">
      <p class="control">
        <a
          class="button is-new"
          @click="newAction"
        >
          <span class="icon is-small">
            <i class="fas fa-plus" />
          </span>
          <span>Nouvelle note</span>
        </a>
      </p>
    </div>
    <div class="field">
      <p class="control">
        <a
          class="button is-info"
          @click="updateLinkAction"
        >
          <span class="icon is-small">
            <i class="fas fa-link" />
          </span>
          <span>Note existante</span>
        </a>
      </p>
    </div>
    <div
      v-show="selectedNoteId"
      class="field"
    >
      <p class="control">
        <a
          class="button is-link"
          @click="unlinkAction"
        >
          <span class="icon is-small">
            <i class="fas fa-unlink" />
          </span>
          <span>Supprimer le lien vers la note</span>
        </a>
      </p>
    </div>
    <div
      v-show="selectedNoteId"
      class="field"
    >
      <p class="control">
        <a
          class="button is-warning"
          @click="editAction"
        >
          <span class="icon is-small">
            <i class="fas fa-edit" />
          </span>
          <span>Éditer la note</span>
        </a>
      </p>
    </div>
    <hr v-show="selectedNoteId">
    <div
      v-show="selectedNoteId"
      class="field"
    >
      <p class="control">
        <a
          class="button is-danger"
          @click="deleteAction"
        >
          <span class="icon is-small">
            <i class="fas fa-trash" />
          </span>
          <span>Supprimer la note</span>
        </a>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NoteActions",
    props: {
      selectedNoteId: {
        type: Number,
        required: false,
        default: null
      },
      edit: {
        type: Function,
        required: true
      },
      newNote: {
        type: Function,
        required: true
      },
      delete: {
        type: Function,
        required: true
      },
      updateLink: {
        type: Function,
        required: true
      },
      unlink: {
        type: Function,
        required: true
      }
    },
    methods: {
      newAction () {
        this.$props.newNote();
      },
      deleteAction () {
        this.$props.delete();
      },
      editAction () {
        this.$props.edit();
      },
      unlinkAction () {
        this.$props.unlink();
      },
      updateLinkAction () {
        this.$props.updateLink();
      }
    }
  }
</script>
