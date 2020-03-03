<template>
  <div
    :id="id"
  />
</template>

<script>
import nouislider from 'nouislider'
import 'nouislider/distribute/nouislider.min.css'

export default {
    name: 'Slider',
    components: {

    },
    props: {
        id: {type: String, required: true},
        options : {type: Object, default: () => {}},
        update: {type: Function, default: (values, handle, unencoded, tap, positions) => {}}
    },
    data() {
        return {

        }
    },
    computed: {

    },
    mounted() {
        const slider = document.getElementById(this.$props.id)
        nouislider.create(slider, {
            connect: true,
            ...this.options
        })
        slider.noUiSlider.on('update.one', this.$props.update);
    },
    methods: {

    }
}
</script>