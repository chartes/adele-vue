<template>
  <modal-confirm
    :title="'Supprimer la partie du discours ?'"
    :submit-text="'Oui je veux la supprimer'"
    :cancel="cancelAction"
    :submit="submitAction"
  >
    <article class="message is-danger">
      <div class="message-header">
        <p>Danger</p>
      </div>
      <div class="message-body">
        <p>Vous êtes sur le point de supprimer une partie du discours.</p>
        <p><strong>Cette action ne peut pas être annulée.</strong></p>
      </div>
    </article>
  </modal-confirm>
</template>

<script>

    import ModalConfirm from './ModalConfirm';

  export default {
    name: "ModalConfirmSpeechpartDelete",
    components: {
      ModalConfirm
    },
    props: ['cancel', 'submit'],
    methods: {
      submitAction () {
        this.$props.submit(this.selected);
      },
      cancelAction () {
        this.$props.cancel();
      }
    }
  }
</script>
