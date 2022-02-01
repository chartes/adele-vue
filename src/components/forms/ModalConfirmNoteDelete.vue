<template>
  <modal-confirm
    :title="'Supprimer la note ?'"
    :submit-text="'Supprimer'"
    :cancel="cancelAction"
    :submit="submitAction"
    class="has-text-danger"
  >
    <p>Vous êtes sur le point de supprimer toutes les occurences d'une note au sein d'un document.</p>
  </modal-confirm>
</template>

<script>

    import ModalConfirm from './ModalConfirm';

  export default {
    name: "ModalConfirmNoteDelete",
    components: {
      ModalConfirm
    },
    props: ['cancel', 'submit'],
    methods: {
      submitAction () {
        console.log("NotesListForm.submitAction", this.selected)
        this.$props.submit(this.selected);
      },
      cancelAction () {
        this.$props.cancel();
      }
    }
  }
</script>
