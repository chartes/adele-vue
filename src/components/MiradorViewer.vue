<template>
  <div
    v-show="viewer"
    id="vue-mirador-container"
  />
</template>

<script>
import { mapActions, mapState } from "vuex";
import Mirador from "mirador";
import axios from "axios";
import annotationPlugins from 'mirador-annotations';
import LocalStorageAdapter from 'mirador-annotations/lib/LocalStorageAdapter';

export default {
  name: "MiradorViewer",
  components: {},
  props: {
    manifestUrl: { type: String, required: true },
    canvasIndex: { type: Number, default: 0 }
  },
  data() {
    return {
      viewer: null
    };
  },
  computed: {},
  watch: {},
  created() {},
  async mounted() {
    const manifests = {};
    let url = this.manifestUrl
    // instantiate the viewer with a single manifest & window for simplicity
    try {
      this.viewer = Mirador.viewer({
        id: "vue-mirador-container",
        manifests: manifests,
        windows: [
          {
            loadedManifest: url,
            canvasIndex: this.canvasIndex
          }
        ],
        window: {
          allowClose: false,
          allowMaximize: false,
          defaultSideBarPanel: "info",
          sideBarOpenByDefault: false,
          hideWindowTitle: true,
          maximizedByDefault: true
        },
        workspace: {
          showZoomControls: true,
          type: "mosaic", // Which workspace type to load by default. Other possible values are "elastic"
        },
        workspaceControlPanel: {
          enabled: false
        },
        annotation: {
          adapter: (canvasId) => new LocalStorageAdapter(`localStorage://?canvasId=${canvasId}`),
        },
      },
        [...annotationPlugins]
      );
    } catch (e) {
      console.warn("Mirrador viewer: ", e);
    }
  },
  methods: {}
};
</script>

<style>
#vue-mirador-container {
  min-height: 80vh;
  min-width: 30%;
  position: relative;
}
.mosaic-root {
  top: 0 !important;
  bottom: 0 !important;
  right: 0 !important;
  left: 0 !important;
}
.mosaic-tile {
  margin: 0 !important;
}
.Connect\(WithPlugins\(WindowTopBar\)\)-windowTopBarStyle-16.Connect\(WithPlugins\(WindowTopBar\)\)-focused-15 {
  border-top: none !important;
}
</style>
