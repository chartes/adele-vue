<template>
  <div>
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
      info: {type: String, required: true}
    },
    data() {
      return {
        currentZoom: 0,
        maxZoom: 3,
        mapOptions: {
         
        }
      }
    },
    computed: {
        
    },
    mounted () {
      this.$nextTick(() => {
        const map = this.$refs.myMap.mapObject
        const baseLayer = tileLayerIiif(this.$props.info)
        baseLayer.addTo(this.$refs.myMap.mapObject)
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