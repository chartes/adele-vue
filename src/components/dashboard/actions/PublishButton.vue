<template>
  <button
    class="action button is-outlined"
    :class="status ? 'is-primary' : ''"
    :disabled="currentUserIsStudent"
    @click="togglePublication"
  >
    <span v-if="status">
      Publié
    </span>
    <span v-else>
      Publier
    </span>
    <span
      v-show="status"
      class="icon"
    >
      <i class="fas fa-check" />
    </span>
  </button>
</template>

<script>

import {mapState, mapActions, mapGetters} from 'vuex'
import http from '@/modules/http-common.js';

export default {
    name: "PublishButton",
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
        async publish() {
            const response = await http.get(`documents/${this.docId}/publish`)
            const data = await response.data;
            this.status = data.data['is-published']
        },
        async unpublish() {
            const response = await http.get(`documents/${this.docId}/unpublish`)
            const data = await response.data;
            this.status = data.data['is-published']
        },
        togglePublication() {
            if (this.status) {
                this.unpublish()
            } else {
                this.publish()
            }
        }
    }
}
</script>

<style>
</style>