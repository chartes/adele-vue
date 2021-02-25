<template>
  <button
    class="action button is-outlined"
    :class="status ? 'is-primary' : ''"
    :disabled="currentUserIsStudent"
    @click="togglePublication"
  >
    <span v-if="status">
      Fermé
    </span>
    <span v-else>
      Ouvert
    </span>
    <span
      v-show="status"
      class="icon"
    >
      <i class="fas fa-lock" />
    </span>
  </button>
</template>

<script>

import {mapState, mapActions, mapGetters} from 'vuex'
import http from '@/modules/http-common.js';

export default {
    name: "CloseButton",
    components: {
      
    },
    props: {
        'docId' : {type: Number, required: true},
        'initialStatus': {type: Boolean, required: true}
    },
    data() {
        return {
            status: null
        }
    },
    computed: {
           ...mapGetters("user", [
            "currentUserIsAdmin",
            "currentUserIsTeacher",
            "currentUserIsStudent",
          ]),
      },
    mounted() {
        this.status = this.initialStatus
    },
    methods: {
        async open() {
            const response = await http.get(`documents/${this.docId}/open`)
            const data = await response.data;
            this.status = data.data['is-closed']
        },
        async close() {
            const response = await http.post(`documents/${this.docId}/close`, {data: {'closing_date' : '01/01/2021'}})
            const data = await response.data;
            this.status = data.data['is-closed']
        },
        togglePublication() {
            if (this.status) {
                this.open()
            } else {
                this.close()
            }
        }
    }
}
</script>

<style>
</style>