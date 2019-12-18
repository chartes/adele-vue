<template>
  <div>
    <div class="tabs is-toggle is-fullwidth">
      <ul>
        <li
          v-for="(com, index) in readonlyData"
          :key="index"
          :class="`${index === activeIdx ? 'is-active' : ''}`"
        >
          <a @click="() => selectItem(index)">
            <span>{{ com.type.label }}</span>
          </a>
        </li>
      </ul>
    </div>
    <div>
      <div
        v-for="(com, index) in readonlyData"
        :key="index"
      >
        <div v-show="index === activeIdx">
          {{ com.content }}
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import { mapState } from 'vuex';

export default {
    name: "DocumentCommentaries",
    components: {
        
    },
    props: {
        readonlyData: {type: Array, default: null}
    },
    data() {
      return {
        activeIdx: 0  
      }
    },
    computed: {
        ...mapState('document', ['loading']),
    },
    created() {
      
    },
    methods: {
      selectItem(index) {
        this.activeIdx = index
      }
    }
}
</script>

<style>

</style>