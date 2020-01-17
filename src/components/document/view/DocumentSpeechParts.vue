<template>
  <div>
    <div>
      <nav class="navbar inner-navbar">
        <span
          v-for="(spType, index) in spTypes"
          :key="spType.id"
          @mouseover="hoverId = spType.id"
          @mouseleave="hoverId = null"
        >
          <span
            class="navbar-item"
          >
            {{ spType.label }} 
          </span>
          <hr
            v-if="index+1 < spTypes.length"
            class="navbar-divider"
          >
        </span>
      </nav>
    </div>
    <div
      v-if="!!readonlyData"
      class="content"
      v-html="readonlyData.content"
    />
  </div>
</template>


<script>

import { mapState, mapGetters } from 'vuex';

export default {
    name: "DocumentSpeechParts",
    components: {
        
    },
    props: {
        readonlyData: {type: Object, default: null}
    },
    data() {
      return {
        spTypes: [],
        hoverId: null
      }
    },
    computed: {
      ...mapState('document', ['loading', ]),
      ...mapState('speechpartTypes', ['speechpartTypes', ]),
      ...mapGetters('speechpartTypes', ['getSpeechpartTypeById', ]),
    },
    watch: {
      hoverId() {
        /* when you hover the top section items, the speech parts are highligthed accordingly to their type */
        const allParts = document.querySelectorAll('.speech-part');
        allParts.forEach(p => {
          if (this.hoverId) {
            const typeClass = `type-${this.hoverId.toString().padStart(2, '0')}`;
            if (p.classList.contains(typeClass)) {
              p.classList.add("active");
            }
          } else {
            p.classList.remove("active");
          }
        });
      }
    },
    mounted() {

      /* find the speech part types to display in the top section */
      const allParts = document.querySelectorAll('.speech-part');
      if (allParts) {
        this.spTypes = [];
        allParts.forEach(p => {
          const spType = [...p.classList].find(c => c.startsWith('type-'));
          if (spType) {
            const spTypeId = spType.replace('type-', '');
            const sp = this.getSpeechpartTypeById(parseInt(spTypeId));
            this.spTypes.push(sp)
          }
        });
      }
    },
    methods: {
      hightlight(id) {
        console.log("highlight", id)
      }
    }
}
</script>

<style>

</style>