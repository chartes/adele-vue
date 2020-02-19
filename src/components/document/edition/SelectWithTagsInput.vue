<template>
  <div class="m-sm">
    <div class="select">
      <select
        v-model="selected"
        @change="addItem($event)"
      >
        <option
          selected
          value="-1"
        >
          {{ defaultText }}
        </option>
        <option
          v-for="(val, key) in choices"
          :key="val"
          :value="key"
        >
          {{ key }}
        </option>
      </select>
    </div>
    <!-- tags -->
    <div class="field is-grouped is-grouped-multiline m-t-sm">
      <div
        v-for="key in selection"
        :key="key"
        class="control"
      >
        <div class="tags has-addons">
          <a class="tag is-link">{{ key }}</a>
          <a
            class="tag is-delete"
            @click="removeItem(key)"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<script>


export default {
    name: "SelectWithTagsInput",
    components: {

    },
    props: {
        defaultText: {type: String, default: "Ajouter"},
        choices: {type: Object, default: () => {}, required: true},
        initialSelection: {type: Array, default: () => []},
        onChange: {type: Function, required: true}
    },
    data(){
        return {
            selection: [],
            selected: -1
        }
    },
    computed: {
   
    },
    watch: {
        selection() {
            this.$props.onChange(this.selection)
        }
    },
    mounted() {
        //restore selection
        this.selection = this.$props.initialSelection
    },
    methods: {
        addItem(event) {
            const item = event.target.value
            if (this.selection.indexOf(item) === -1 && item !== this.defaultText) {
                this.selection.push(item)
            }
            this.selected = -1
        },
        removeItem(key) {
            this.selection.splice( this.selection.indexOf(key), 1 );
        }
    }
}
</script>