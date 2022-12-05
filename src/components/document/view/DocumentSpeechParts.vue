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
import RichTextEditor from "@/components/editors/RichTextEditor.vue";

export default {
  name: "DocumentSpeechParts",
  components: {
    RichTextEditor,
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
    ...mapState("speechPartsContent", ["speechPartsContentLoading"]),
  },
  watch: {
    speechPartsContentLoading() {
      if (!this.speechPartsContentLoading) {
        document.querySelectorAll("adele-speechpart").forEach((el) => {
          el.classList.add("inactive");
          //console.log("EL", el, el.classList);
        });
      }
    },
    async speechPartsView() {
      this.content = await this.getSpeechpartsViewContent();
    },
    hoverId() {
      /* when you hover the top section items, the speech parts are highligthed accordingly to their type */
      const allParts = Array.from(document.querySelectorAll("adele-speechpart"));
      allParts.forEach((p) => {
        if (this.hoverId) {
          if (p.getAttribute("type_id") === this.hoverId.toString()) {
            p.classList.remove("inactive");
          }
        } else {
          if (!this.showAll) {
            p.classList.add("inactive");
          }
        }
      });
    },
    showAll() {
      this.leaveHovering();
    },
  },
  async created() {
    this.content = await this.getSpeechpartsViewContent();
    /* find the speech part types to display in the top section */
    const fakeDOM = new DOMParser().parseFromString(this.content, "text/html");
    const allParts = Array.from(fakeDOM.getElementsByTagName("adele-speechpart"));
    const usedTypesIds = new Set(
      allParts.map((part) => parseInt(part.getAttribute("type_id")))
    );
    this.spTypes = Array.from(usedTypesIds).map(this.getSpeechpartTypeById);
  },
  mounted() {},

  methods: {
    ...mapActions("speechPartsContent", ["getSpeechpartsViewContent"]),
    leaveHovering() {
      const allParts = document.querySelectorAll("adele-speechpart");
      this.hoverId = null;
      allParts.forEach((p) => {
        if (this.showAll) {
          p.classList.remove("inactive");
        } else {
          if (!this.showAll) {
            p.classList.add("inactive");
          }
        }
      });
    },
  },
};
</script>

<style></style>
