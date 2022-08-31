<template>
  <div class="field field-multiselect">
    <label
      class="label"
      v-html="label"
    />
    <div class="field selected-list  is-grouped is-grouped-multiline">
      <div
        v-for="item in items"
        :key="item[optionIdField]"
        class="control"
      >
        <div class="tags has-addons selected-item">
          <span class="tag">{{ item[optionLabelField] }}</span>
          <a
            class="tag is-delete"
            @click.prevent="deleteItem(item[optionIdField])"
          />
        </div>
      </div>
    </div>
    <div
      v-if="optionsList.length > ids.length"
      class="multiselect-actions"
    >
      <a
        class="icon is-large add-item"
        href="#"
        @click.prevent="displayList"
      >
        <span class="fa-stack ">
          <i class="fas fa-circle fa-stack-2x" />
          <i class="fas fa-plus fa-stack-1x " />
        </span>
      </a>
      <ul
        v-if="listVisible"
        v-click-outside="hideList"
        class="box"
      >
        <li
          v-for="option in optionsNotSelected"
          :key="option[optionIdField]"
        >
          <a
            href="#"
            class="unselected-item"
            @click.prevent="addItem(option)"
            v-html="option[optionLabelField]"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

  import ClickOutside from 'vue-click-outside';

  export default {
    name: "FieldMultiselect",
    directives: {
      ClickOutside
    },
    props: {
      label: {
        type: String
      },
      selectedItems: {
        type: Array,
      },
      optionLabelField: {
        type: String, default: 'label'
      },
      optionIdField: {
        type: String, default: 'id'
      },
      optionsList: {
        type: Array
      },
      onChange: {
        type: Function, required: true
      }
    },
    data () {
      return { listVisible: false, items: [], ids: []}
    },
    computed: {

      optionsNotSelected () {
        if (!this.optionsList) return [];
        return this.optionsList.filter(op => !this.ids.includes(op[this.optionIdField]));
      }
    },
    watch: {
      selectedItems () {
        this.updateAllItems();
      }
    },
    mounted () {
      this.updateAllItems();
    },
    methods: {
      addItem (item) {
        this.items.push(item);
        this.ids.push(item[this.optionIdField]);
        this.hideList();
        this.onChange(this.items);
      },
      deleteItem (itemId) {
        this.items = this.items.filter (it => it[this.optionIdField] !== itemId);
        this.ids = this.items.map (it => it[this.optionIdField]);
        this.onChange(this.items);
      },
      updateAllItems () {
        if (!this.selectedItems) return;
        this.items = this.selectedItems.map (it => ({...it}));
        this.ids = this.items.map (it => it[this.optionIdField]);
      },
      displayList () {
        this.listVisible = true;
      },
      hideList () {
        this.listVisible = false;
      }
    }
  }
</script>

<style scoped>

</style>