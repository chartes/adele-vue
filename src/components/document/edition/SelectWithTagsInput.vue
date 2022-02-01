<template>
  <div class="m-sm">
    <div class="field">
      <div class="control is-small">
        <div class="">
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
              v-for="val in filteredChoices"
              :key="getKeyByValue(choices, val)"
              :value="getKeyByValue(choices, val)"
            >
              {{ val }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <!-- tags -->
    <div class="field filter-tag-list is-grouped is-grouped-multiline m-t-sm">
      <div
        v-for="(val, key) in selection"
        :key="key"
        class="control"
      >
        <div class="tags">
          <a
            class="tag"
            @click="removeItem(key)"
          >{{ val }}</a>
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
        selection: {type: Object, default: () => {}},
        onChange: {type: Function, required: true}
    },
    data(){
        return {
            selected: -1
        }
    },
    computed: {
        filteredChoices() {
            let f = []
            for (let c in this.choices) {
                if (!this.selection[c]) {
                    f.push(this.choices[c])
                }
            }
            return Object.values(f).sort()
        }
    },
    mounted() {

    },
    methods: {
        getKeyByValue(object, value) {
            return Object.keys(object).find(key => object[key] === value);
        },
        addItem(event) {
            const key = event.target.value
            if (this.choices[key]) {
                let newItem = {}
                newItem[key] = this.choices[key]
                this.$props.onChange({...this.selection, ...newItem})
            }
            this.selected = -1
        },
        removeItem(key) {
            let tmpSelection = {...this.selection}
            delete tmpSelection[key]
            this.$props.onChange(tmpSelection)
        }
    }
}
</script>