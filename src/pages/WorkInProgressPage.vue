<template>
  <div>
    <div>
      <code
        class="original"
        style="display: block"
      >
        {{ html }}
      </code>
      <div
        class="original"
        v-html="html"
      />
      <!-- -->
      <div
        id="cloned"
        class="selection"
      />
      <code
        id="cloned-code"
        class="original"
        style="display: block"
      />
    </div>
    <text-cutter-editor />
  </div>
</template>

<script>

import TextCutterEditor from '@/components/editors/TextCutterEditor.vue'

export default {
  components: {
    TextCutterEditor
  },
    data() {
        return {
            html: '<p>This is a mad, <b>MmaaaAAaaaaAddD</b> world !</p>'
        }
    },
    mounted() {
      /*
        document.onselectionchange = () => {
            const selection = document.getSelection()
            let cloned = document.querySelector('#cloned')
            let clonedCode = document.querySelector('#cloned-code')

            cloned.innerHTML = ''
            clonedCode.innerHTML = ''

            if (selection.type === "Range") {
                console.log(selection)

                // Clone DOM nodes from ranges (we support multiselect here)
                for (let i = 0; i < selection.rangeCount; i++) {
                    cloned.append(selection.getRangeAt(i).cloneContents());
                }

                clonedCode.textContent = cloned.innerHTML
            }
        };
        */

        //const initTextCutterEvent = new CustomEvent('initTextCutter', { 'initialContent': '<p>This is a <b>bold</b> move</p>' });
        //document.dispatchEvent(initTextCutterEvent)
    }
}
</script>

<style scoped>
.original {
    border: 1px solid black;
    padding: 12px;
    margin: 8px;
}
.selection {
    border: 1px dotted green;
    padding: 12px;
    margin: 8px;
}
</style>