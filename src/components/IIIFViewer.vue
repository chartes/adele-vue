<template>
  <div>
    <l-map
      ref="myMap"
      style="height: 640px"
    >
      <l-tile-layer :url="url" />
    </l-map>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import {LMap, LTileLayer, LMarker } from 'vue2-leaflet';


export default {
    name: "IIIFViewer",
    components: {
        LMap,
        LTileLayer,
        //LMarker
    },
    data() {
      return {
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      }
    },
    computed: {
        
    },
    mounted () {
      this.$nextTick(() => {
        //this.$refs.myMap.mapObject.ANY_LEAFLET_MAP_METHOD();
      })
    },
    created() {
     
    }
}
</script>