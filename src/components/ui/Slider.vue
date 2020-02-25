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
        options : {type: Object, default: () => {}}
    },
    data() {
        return {

        }
    },
    computed: {

    },
    mounted() {
        const slider = document.getElementById(this.$props.id)
        console.log(slider)
        nouislider.create(slider, {
            start: [20, 80],
            connect: true,
            range: {
                'min': 0,
                'max': 100
            }
        })
    },
    methods: {

    }
}
</script>