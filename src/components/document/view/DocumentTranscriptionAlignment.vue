<template>
  <div>
    <div
      v-if="!!readonlyData"
      class="content"
    >
      <table>
        <tbody>
          <tr
            v-for="(seg, index) in readonlyData.content"
            :key="index"
          >
            <td v-html="seg[0]" />
            <td v-html="seg[1]" />
          </tr> 
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>

import { mapState } from 'vuex';

export default {
    name: "DocumentTranscriptionAlignment",
    components: {
        
    },
    props: {
        readonlyData: {type: Object, default: null}
    },
    computed: {
        ...mapState('document', ['loading']),
    },
    created() {
      
    },
    methods: {
 
    }
}
</script>

<style>

</style>