<template>
  <div>
    <div>
      <nav class="navbar inner-navbar m-b-md">
        <span
          v-for="(spType) in spTypes"
          :key="spType.id"
          @mouseover="hoverId = spType.id"
          @mouseleave="hoverId = null"
        >
          <span
            class="navbar-item speech-part m-xs"
          >
            {{ spType.label }}
          </span>

        </span>
      </nav>
    </div>
    <div
      v-if="content"
      class="content speech-parts"
      v-html="content"
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
        hoverId: null,
      }
    },
    computed: {
      ...mapState('document', ['loading', ]),
      ...mapState('speechpartTypes', ['speechpartTypes', ]),
      ...mapGetters('speechpartTypes', ['getSpeechpartTypeById', ]),
      content() {
        return this.readonlyData ? this.readonlyData.content : null
      }
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
        if (this.content) {
          /* find the speech part types to display in the top section */
          const fakeDOM = new DOMParser().parseFromString(this.content,  'text/html')
          const allParts = fakeDOM.querySelectorAll('.speech-part')
          if (allParts) {
            this.spTypes = [];
            allParts.forEach(p => {
              const spType = [...p.classList].find(c => c.startsWith('type-'));
              if (spType) {
                const spTypeId = spType.replace('type-', '');
                const sp = this.getSpeechpartTypeById(parseInt(spTypeId));
                this.spTypes.push(sp)
              }
            })
          }
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