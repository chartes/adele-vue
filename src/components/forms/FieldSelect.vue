<template>
  <div class="field">
    <p class="control">
      <label class="label">{{ label }}</label>
      <span
        class="select"
        :class="isLoading"
      >
        <select
          v-model="val"
          v-if="hasOptions"
          @change="onChange(val)"
        >
          <option
            v-for="(opt, index) in options"
            :key="opt.id"
            :value="opt.id"
            :selected="optionSelected(opt.id, index)"
            v-html="opt.label"
          />
        </select>
      </span>
    </p>
  </div>
</template>

<script>
  export default {
    name: "FieldSelect",
    props: {
      options: {
        type: Array
      },
      label: {
        type: String
      },
      selected: {
        type: Number
      },
      onChange: {
        type: Function,
        required: true
      }
    },
    data() {
      return {
        val: this.$props.selected || this.$props.options[0].id
      }
    },
    computed: {
      hasOptions () {
        return this.options && this.options.length > 0;
      },
      isLoading () {
        return !(this.options && this.options.length > 0) ? 'is-loading': false;
      },
    },
    watch: {
      selected () {
        this.val = this.$props.selected
      }
    },
    mounted(){
      this.onChange(this.val);
    },
    methods: {
      optionSelected (optId) {
        return optId === this.selected;
      }
    }
  }
</script>