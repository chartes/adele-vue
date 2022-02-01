<template>
  <div class="in-editor-actions">
    <div class="field">
      <p class="control">
        <a
          class="button is-primary"
          @click="editAction"
        >
          <span class="icon is-small">
            <i class="fas fa-edit" />
          </span>
          <span v-text="editText" />
        </a>
      </p>
    </div>
    <div class="field">
      <p class="control">
        <a
          class="button is-danger"
          @click="deleteAction"
        >
          <span class="icon is-small">
            <i class="fas fa-eraser" />
          </span>
          <span v-text="deleteText">Supprimer</span>
        </a>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "InEditorActions",
    props: {
      edit : {
        type: Function,
        required: true
      },
      delete : {
        type: Function,
        required: true
      },
      editText : {
        type: String,
        default: 'Éditer'
      },
      deleteText : {
        type: String,
        default: 'Supprimer'
      }
    },
    methods: {
      deleteAction () {
        this.$props.delete();
      },
      editAction () {
        this.$props.edit();
      }
    }
  }
</script>