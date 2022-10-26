<template>
  <div>
    <div class="content transcription-alignement">
      <table>
        <thead>
          <tr>
            <th v-if="transcriptionSegments.length > 0">Transcription</th>
            <th v-if="translationSegments.length > 0">Traduction</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(segment, idx) in segments" :key="idx">
            <td v-if="transcriptionSegments.length > 0">
              <rich-text-editor
                :initial-content="segment.transcription"
                :readonly="true"
              />
            </td>
            <td v-if="translationSegments.length > 0">
              <rich-text-editor :initial-content="segment.translation" :readonly="true" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//import addToolTip from '@/modules/tooltip';
import RichTextEditor from "@/components/editors/RichTextEditor.vue";

export default {
  name: "DocumentTranscriptionAlignment",
  components: {
    RichTextEditor,
  },
  props: {},
  computed: {
    ...mapState("document", ["loading", "transcriptionView", "translationView"]),
    transcriptionSegments() {
      return this.transcriptionView
        ? this.transcriptionView.content.split("<segment/>")
        : [];
    },
    translationSegments() {
      return this.translationView ? this.translationView.content.split("<segment/>") : [];
    },
    segments() {
      if (
        this.transcriptionSegments.length === 0 &&
        this.translationSegments.length === 0
      ) {
        return [];
      }
      let _segs = [];
      this.transcriptionSegments.forEach((tr, idx) => {
        let tl =
          idx < this.translationSegments.length ? this.translationSegments[idx] : null;
        _segs.push({
          transcription: tr,
          translation: tl,
        });
      });
      console.log("segs", _segs);
      return _segs;
    },
  },
  mounted() {
    /*
      if (this.transcriptionAlignmentView) {
          // make tooltips
          this.transcriptionAlignmentView.notes.forEach(note => {
            const noteId = note.id;
            if (note.content) {
              const paddedId = `${note.id}`.padStart(10, '0')
              Array.from(document.querySelectorAll(`[data-note-id='${paddedId}']`)).forEach(el => {
                addToolTip(el, note.content, null, {contentType: 'note'});
              })
            }
          })

          // persnames && placenames
          Array.from(document.querySelectorAll(`persname, placename`)).forEach(el => {
            addToolTip(el, el.attributes.ref.value, null, {contentType: el.localName, position: el.localName == 'persname' ? 'is-left' : 'is-bottom'});
          })
      }
      */
  },
  methods: {},
};
</script>

<style scoped>
table {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
}
</style>
