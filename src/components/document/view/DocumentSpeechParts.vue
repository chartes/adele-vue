<template>
  <div>
    <div class="has-text-weight-medium subtitle m-b-xl">Parties du discours</div>
    <div>
      <nav class="navbar inner-navbar" style="display: inline-block; margin-bottom: 20px">
        <span>
          <button
            class="button is-white show-all-speechparts"
            @click="showAll = !showAll"
          >
            {{ !showAll ? "Tout montrer" : "Effacer" }}
          </button>
        </span>
        <span
          v-for="(spType, key) in spTypes"
          :key="`${key} ${spType.id}`"
          :class="`speech-part-item type-${spType.id.toString().padStart(2, '0')} nav `"
          @mouseover="hoverId = spType.id"
          @mouseleave="leaveHovering"
        >
          <b-tooltip type="is-light" position="is-top" class="tooltip" multilined>
            <span class="navbar-item m-xs">{{ spType.label }}</span>
            <template v-slot:content>
              <div class="tt-content" v-html="spType.definition" />
            </template>
          </b-tooltip>
        </span>
      </nav>
    </div>
    <rich-text-editor
      v-if="content"
      class="content speech-parts"
      :initial-content="content"
      :readonly="true"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import addToolTip from "@/modules/tooltip";
import RichTextEditor from "@/components/editors/RichTextEditor.vue";

export default {
  name: "DocumentSpeechParts",
  components: {
    RichTextEditor,
  },
  props: {
    readonlyData: { type: Object, default: null },
  },
  data() {
    return {
      spTypes: [],
      hoverId: null,
      showAll: false,
      content: null,
    };
  },
  computed: {
    ...mapState("document", ["loading", "speechPartsView"]),
    ...mapState("speechpartTypes", ["speechpartTypes"]),
    ...mapGetters("speechpartTypes", ["getSpeechpartTypeById"]),
  },
  watch: {
    async speechPartsView() {
      this.content = await this.getSpeechpartsViewContent();
    },
    showAll() {
      this.leaveHovering();
    },
    data() {
      return {
        spTypes: [],
        hoverId: null,
        showAll: false,
      };
    },
    computed: {
      ...mapState("document", ["loading", "speechPartsView"]),
      ...mapState("speechpartTypes", ["speechpartTypes"]),
      ...mapGetters("speechpartTypes", ["getSpeechpartTypeById"]),
      content() {
        return this.readonlyData ? this.readonlyData.content : null;
      },
    },
    watch: {
      showAll() {
        this.leaveHovering();
      },
      hoverId() {
        /* when you hover the top section items, the speech parts are highligthed accordingly to their type */
        const allParts = Array.from(document.querySelectorAll("adele-speechpart"));
        allParts.forEach((p) => {
          if (this.hoverId) {
            if (p.getAttribute("type_id") === this.hoverId.toString()) {
              p.classList.add("active");
            }
          } else {
            if (!this.showAll) {
              p.classList.remove("active");
            }
          }
        });
      },
    },
    mounted() {
      if (this.content) {
        /* find the speech part types to display in the top section */
        const fakeDOM = new DOMParser().parseFromString(this.content, "text/html");
        const allParts = Array.from(fakeDOM.getElementsByTagName("adele-speechpart"));
        const usedTypesIds = new Set(
          allParts.map((part) => parseInt(part.getAttribute("type_id")))
        );
        this.spTypes = Array.from(usedTypesIds).map(this.getSpeechpartTypeById);

        // make tooltips
        Array.from(document.getElementsByTagName("adele-speechpart")).forEach(
          (speechPartElement) => {
            const speechPart = {
              type_id: parseInt(speechPartElement.getAttribute("type_id")),
              note: speechPartElement.getAttribute("note"),
            };
            addToolTip(
              speechPartElement,
              speechPart.note,
              this.getSpeechpartTypeById(speechPart.type_id).label,
              { contentType: "speech-part" }
            );
          }
        );

        // persnames && placenames
        Array.from(document.querySelectorAll(`persname, placename`)).forEach((el) => {
          addToolTip(el, el.attributes.ref.value, null, {
            contentType: el.localName,
            position: el.localName === "persname" ? "is-left" : "is-bottom",
          });
        });
      }
    },
    methods: {
      ...mapActions("speechparts", ["getSpeechpartsViewContent"]),
      leaveHovering() {
        const allParts = document.querySelectorAll("adele-speechpart");
        this.hoverId = null;
        allParts.forEach((p) => {
          if (this.showAll) {
            p.classList.add("active");
          } else {
            if (!this.showAll) {
              p.classList.remove("active");
            }
          }
        });
      },
    },
    async created() {
      this.content = await this.getSpeechpartsViewContent();
    },
    mounted() {
      if (this.content) {
        /* find the speech part types to display in the top section */
        const fakeDOM = new DOMParser().parseFromString(this.content, "text/html");
        const allParts = fakeDOM.querySelectorAll(".speech-part");
        if (allParts) {
          this.spTypes = [];
          allParts.forEach((p) => {
            const spType = [...p.classList].find((c) => c.startsWith("type-"));
            if (spType) {
              const spTypeId = spType.replace("type-", "");
              const sp = this.getSpeechpartTypeById(parseInt(spTypeId));
              this.spTypes.push(sp);
            }
          });
        }

        // make tooltips
        Object.keys(this.speechPartsView.notes).forEach((noteId) => {
          console.log("NOTES", noteId);
          Array.from(document.querySelectorAll(`[data-note-id='${noteId}']`)).forEach(
            (el) => {
              const spType = [...el.classList].find((c) => c.startsWith("type-"));
              let spt;
              if (spType) {
                const spTypeId = spType.replace("type-", "");
                spt = this.getSpeechpartTypeById(parseInt(spTypeId));
              }

              addToolTip(el, this.speechPartsView.notes[noteId], spt.label, {
                contentType: "speech-part",
              });
            }
          );
        });

        // persnames && placenames
        Array.from(document.querySelectorAll(`persname, placename`)).forEach((el) => {
          addToolTip(el, el.attributes.ref.value, null, {
            contentType: el.localName,
            position: el.localName === "persname" ? "is-left" : "is-bottom",
          });
        });
      }
    },
  },
};
</script>

<style>
.b-tooltip {
  display: inline;
}
.b-tooltip .tooltip-trigger {
  display: inline;
}
</style>
