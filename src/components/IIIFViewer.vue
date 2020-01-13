<template>
  <div v-if="!!info">
    <l-map
      ref="myMap"
      style="height: 640px"
      :zoom="currentZoom"
      :max-zoom="maxZoom"
      :options="mapOptions"
      @update:zoom="zoomUpdate"
    />
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import {LMap, LMarker } from 'vue2-leaflet'
import tileLayerIiif from '../modules/leaflet-iiif'

export default {
    name: "IIIFViewer",
    components: {
        LMap
    },
    props: {
      info: {type: String, required: false, default: null}
    },
    data() {
      return {
        currentZoom: 0,
        maxZoom: 3,
        mapOptions: {
          zoomSnap: 0.15
        }
      }
    },
    computed: {
        
    },
    mounted () {
      this.$nextTick(() => {
        if (this.$props.info) {
          const map = this.$refs.myMap.mapObject
          const baseLayer = tileLayerIiif(this.$props.info)
          baseLayer.addTo(this.$refs.myMap.mapObject)
        }
      })
    },
    created() {
     
    },
    methods: {
      zoomUpdate(zoom) {
        this.currentZoom = zoom;
      }
    }
}
</script>