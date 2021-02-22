<template>
  <div
    v-show="viewerContainer"
    id="vue-mirador-container"
  />
</template>

<script>
import { mapActions, mapState } from "vuex";
import Mirador from "mirador";
import axios from "axios";
import annotationPlugins from 'mirador-annotations';
import LocalStorageAdapter from 'mirador-annotations/lib/LocalStorageAdapter';
import MyPlugin from './mirador-plugin';
import AdeleStorageAdapter from './mirador-plugin/adapter';

export default {
  name: "MiradorViewer",
  components: {},
  props: {
    manifestUrl: { type: String, required: true },
    manifestOriginUrl: { type: String, required: true },
    canvasIndex: { type: Number, default: 0 },
    documentId: { type: Number, default: 0 },
    annotationMode: { type: Boolean, default: false},
    showAnnotations: { type: Boolean, default: true},
    configuration: {type: Object, default: () => {return {}}}
  },
  data() {
    return {
      viewerContainer: null,
      resetTimeout: null
    }
  },
  computed: {
    fullConfig() {
      const manifests = {};
      let url = this.manifestUrl
      return {
          id: "vue-mirador-container",
          manifests: manifests,
          windows: [
            {
              id: 1,
              loadedManifest: url,
              canvasIndex: this.canvasIndex,
            }
          ],
          window: {
            allowClose: false,
            allowMaximize: false,
            defaultSideBarPanel: "annotations",
            sideBarOpenByDefault: false,
            hideWindowTitle: true,
            maximizedByDefault: true,
            highlightAllAnnotations: false,
            panels: { // Configure which panels are visible in WindowSideBarButtons
              info: true,
              attribution: true,
              canvas: false,
              annotations: true,
              search: false,
              layers: false,
            },
          },
          workspace: {
            showZoomControls: true,
            type: "mosaic", // Which workspace type to load by default. Other possible values are "elastic"
            height: 5000, // height of the elastic mode's virtual canvas
            viewportPosition: { // center coordinates for the elastic mode workspace
              x: 0,
              y: 0,
            },
            width: 5000, // width of the elastic mode's virtual canvas
          },
          workspaceControlPanel: {
            enabled: false
          },
          annotation: {
            adapter: (canvasId) => new AdeleStorageAdapter(this.manifestOriginUrl, this.documentId),
          },
          ...this.configuration
        }
    }
  },
  watch: {
    viewerContainer() {
      if (this.viewerContainer && !this.viewer) {
        // instantiate the viewer with a single manifest & window for simplicity
        const v = Mirador.viewer(this.fullConfig, [...annotationPlugins, MyPlugin])
        try {
          //this.viewer = Mirador.viewer(this.fullConfig,[...annotationPlugins]);
          var action = Mirador.actions.minimizeWindow('1')
          // Now we can dispatch it.
          v.store.dispatch(action);
        } catch (e) {
          console.warn("Mirrador viewer: ", e);
        }
        this.viewer = v;

        this.resetTimeout = setTimeout(() => {
            const reset = document.querySelector(`button[title='Reset zoom']`);
        if (reset) {
          console.log("RESET ZOOM");
          reset.click();
        } else {
          console.log("NO RESET ZOOM")
        }
        }, 2000)


    }
    }
  },
  mounted() {
      this.viewerContainer = document.getElementById('vue-mirador-container');
  },
  beforeDestroy() {
    clearTimeout(this.resetTimeout)
  }
}
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
.Connect\(WithPlugins\(WindowTopBar\)\)-windowTopBarStyle-16.Connect\(WithPlugins\(WindowTopBar\)\)-focused-15, .mirador16.mirador15 {
  border-top: 1px solid lightgray !important;
}
</style>
