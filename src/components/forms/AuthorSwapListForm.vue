<template>

    <modal-form
            :title="'Auteur des travaux à afficher'"
            :cancel="cancelAction"
            :submit="submitAction"
            :valid="!!selected"
    >
        <div class="authors-list-form">
            <a class="authors-list-item list-item"
               :key="'me'"
               @click="selectItem(currentUser)"
               :class="{ selected: currentUser.id == id }"
            >Vous-même ({{ currentUser.username }})</a>
            <hr/>
            <p class="list-subsection-title">{{document.whitelist.label}}</p>
            <a class="authors-list-item list-item"
               v-for="user in document.whitelist.users"
               :key="user.id"
               @click="selectItem(user)"
               :class="{ selected: user.id == id }"
            >{{ user.first_name }} {{ user.last_name }}</a>
        </div>
    </modal-form>



</template>

<script>

  import { mapState } from 'vuex'
  import ModalForm from './ModalForm';

  export default {
    name: "author-swap-list-form",
    props: ['title', 'selectedAuthor', 'cancel', 'submit'],
    components: {
      ModalForm
    },
    data() {
      return {
        selected: null,
        id: false
      }
    },
    mounted () {
      this.selected = this.selectedAuthor;
      this.id = this.selected.id;
    },
    methods: {
      selectItem (user) {
        this.selected = user;
        this.id = user.id;
        console.log("Select user", this.id, this.selected)
      },
      submitAction () {
        this.$props.submit(this.selected);
      },
      cancelAction () {
        this.$props.cancel();
      }
    },
    computed: {
      ...mapState('user', ['author', 'currentUser']),
      ...mapState('document', ['document'])
    }
  }
</script>
