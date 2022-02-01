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

        
        <b-field label="Sélectionner mon propre compte">
          <b-checkbox v-model="myself">
            {{ currentUser.username }}
          </b-checkbox>
        </b-field>
        
        <b-field label="Chercher un autre professeur">
          <b-autocomplete
            v-model="username"
            placeholder="O.Guyotjeannin"
            open-on-focus
            :data="filteredDataObj(username)"
            field="username"
            clearable
            max-height="100px"
            @select="(option) => selected = option"
          />
        </b-field>
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
import { mapActions, mapState } from "vuex";

export default {
  name: "ConfirmOwnershipTransfer",
  props: {
    row: { type: Object, required: true },
  },
  data() {
    return {
      teachersList: [],
      selected: null,
      username: null,
      myself: true
    };
  },
  computed: {
    ...mapState('user', ['currentUser'])
  },
  watch: {
    selected() {
      if (this.selected) {
        this.myself = false;
      }
    },
    myself() {
      if (this.myself) {
        // pass
      } else {
        this.username = null
      }
    } 
  },
  async created() {
    this.teachersList = await this.getTeachersList();
  },
  methods: {
    ...mapActions("user", ["getTeachersList"]),
    filteredDataObj(username) {
      if (username === null) {
        return this.teachersList
      }
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
      if (this.selected || this.myself) {
        const newUser = this.myself ? this.currentUser : this.selected
        await this.transferOwnership(this.row.id, newUser)
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
