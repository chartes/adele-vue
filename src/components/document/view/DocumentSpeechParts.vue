<template>
  <div>
    <div>
      <nav class="navbar inner-navbar">
        <span>
          <button
            class="button is-white show-all-speechparts"
            @click="showAll = !showAll"
          >
            {{ !showAll ? "Tout montrer" : "Effacer" }}
          </button>
        </span>
        <span
          v-for="(spType) in spTypes"
          :key="spType.id"
          :class="`speech-part-item type-${spType.id.toString().padStart(2, '0')} nav `"
          @mouseover="hoverId = spType.id"
          @mouseleave="leaveHovering"
        >
          <b-tooltip 
            type="is-light"
            position="is-top"
            class="tooltip"
            multilined
          >
            <span
              class="navbar-item  m-xs "
            >
              {{ spType.label }}
            </span>
            <template v-slot:content>
              <div
                class="tt-content"
                v-html="spType.definition"
              />
            </template>
          </b-tooltip>
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
import Vue from 'vue';
import ToolTip from '../../ui/ToolTip';

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
        showAll: false
      }
    },
    computed: {
      ...mapState('document', ['loading', 'speechPartsView']),
      ...mapState('speechpartTypes', ['speechpartTypes', ]),
      ...mapGetters('speechpartTypes', ['getSpeechpartTypeById', ]),
      content() {
        return this.readonlyData ? this.readonlyData.content : null
      }
    },
    watch: {
      showAll() {
        this.leaveHovering()
      },
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
            if (!this.showAll) {
              p.classList.remove("active");
            }
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

          // make tooltips
          let toolTipClass =  Vue.extend(ToolTip)
          Object.keys(this.speechPartsView.notes).forEach(noteId => {
            console.log('NOTES', noteId)
            let spEl = document.querySelector(`[data-note-id='${noteId}']`)
            const spType = [...spEl.classList].find(c => c.startsWith('type-'));
            let spt
            if (spType) {
              const spTypeId = spType.replace('type-', '');
              spt = this.getSpeechpartTypeById(parseInt(spTypeId));
            }

            let noteContent = this.speechPartsView.notes[noteId]
            let t = new toolTipClass({propsData: {
              element: spEl.outerHTML ,
              content: `
                <span>
                  <span class="tt-title">${spt.label || ""}</span>
                  <span class="tt-content">${noteContent || ""}</span>
                </span>
              `
            }})
            t.$mount(spEl)
          })

        } 
    },
    methods: {
      leaveHovering() {
        const allParts = document.querySelectorAll('.speech-part');
        this.hoverId = null;
        allParts.forEach(p => {
          if (this.showAll) {
            p.classList.add("active");
          } else {
            p.classList.remove("active");
          }
        });
      }
    }
}
</script>

<style>

</style>