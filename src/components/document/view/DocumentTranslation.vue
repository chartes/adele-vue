<template>
  <div>
    <div class="has-text-weight-medium subtitle m-b-xl">Traduction</div>
    <rich-text-editor v-if="content" :initial-content="content" :readonly="true" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import addToolTip from "@/modules/tooltip";
import RichTextEditor from "@/components/editors/RichTextEditor.vue";

export default {
  name: "DocumentTranslation",
  components: {
    RichTextEditor,
  },
  props: {
    readonlyData: { type: Object, default: null },
  },
  data() {
    return {
      content: null,
    };
  },
  computed: {
    ...mapState("document", ["loading", "translationView"]),
  },
  watch: {
    async translationView() {
      this.content = await this.getTranslationViewContent();
    },
  },
  mounted() {
    if (this.translationView) {
      // make tooltips
      Array.from(document.getElementsByTagName(`adele-note`)).forEach((el) => {
        const noteId = el.getAttribute("id");
        const paddedId = `${noteId}`.padStart(10, "0");

        addToolTip(el, this.translationView.notes[paddedId], null, {
          contentType: "note",
        });
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
  methods: {
    ...mapActions("translation", ["getTranslationViewContent"]),
  },
};
</script>

<style></style>
