<template>
  <div class="m-b-xl">
    <span>
      <router-link
        v-if="$route.name.indexOf('edition') === -1"
        :to="{name: 'document-edition', params:{docId: document.id}}"
      >
        <div class="button">
          Modifier
        </div>
      </router-link> 
      <router-link
        v-else
        :to="{name: 'document-view', params:{docId: document.id}}"
      >
        <div class="button">
          Consulter
        </div>
      </router-link>
    </span>
    <span class="m-l-lg">
      <div class="heading title">
        {{ document.title }}
      </div>
      <div class="subtitle">
        {{ document.subtitle }}
      </div>
    </span>
  </div>
</template>

<script>

import { mapState, mapGetters } from 'vuex';

export default {
    name: "DocumentTitleBar",
    props: {
        document: {type: Object, default: null}
    },
    computed: {
        ...mapGetters('user', ['loggedIn'])
    }
}
</script>