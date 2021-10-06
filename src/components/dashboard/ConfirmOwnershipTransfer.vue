<template>
  <form action="">
    <div class="modal-card">
      <header class="modal-card-head">
        <h1 class="card-title">
          <b>Document {{ row.id }}</b> <span style="margin: 10px">-</span> Changement de propriétaire
        </h1>
        <button
          type="button"
          class="delete"
          @click="$emit('close')"
        />
      </header>
      <section class="modal-card-body">
        <b-message type="is-danger">
          Cette action transférera tout le contenu de ce dossier du propriétaire actuel
          vers le nouveau propriétaire. Le propriétaire actuel risque donc de voir son travail se faire écraser.
        </b-message>

        <b-autocomplete
          v-model="row.username"
          placeholder="e.g. Anne"
          open-on-focus
          :data="filteredDataObj(row.username)"
          field="username"
          clearable
          @select="(option) => selected = option"
        />
      </section>
      <footer class="modal-card-foot">
        <b-button
          label="Valider"
          @click="validate"
        />
        <b-button
          label="Annuler"
          type="is-primary"
          @click="$emit('close')"
        />
      </footer>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ConfirmOwnershipTransfer",
  props: {
    row: { type: Object, required: true },
  },
  data() {
    return {
      teachersList: [],
      selected: null
    };
  },
  async created() {
    this.teachersList = await this.getTeachersList();
  },
  methods: {
    ...mapActions("user", ["getTeachersList"]),
    filteredDataObj(username) {
      return this.teachersList.filter((option) => {
        return (
          option.username.toString().toLowerCase().indexOf(username.toLowerCase()) >= 0
        );
      });
    },
    async transferOwnership(docId, user) {
      if (docId && user) {
        await this.$store.dispatch('document/transferOwnership', {docId, userId:user.id})
      }
    },
    async validate() {
      if (this.selected) {
        await this.transferOwnership(this.row.id, this.selected)
      }
      this.$emit('close')
    }
  },
};
</script>

<style lang="scss" scoped>
.modal-card {
  min-height: 560px;
}
.card-title {
  font-size: 24px;
  font-weight: 500;
  margin: 0;
}
.modal-card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
