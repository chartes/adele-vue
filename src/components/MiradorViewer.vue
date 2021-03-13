<template>
  <div
    v-show="viewerContainer"
    id="vue-mirador-container"
  />
</template>

<script>
import Mirador from "mirador";
import annotationPlugins from 'mirador-annotations';
import MyPlugin from './mirador-plugin';
import AdeleStorageAdapter from './mirador-plugin/adapter';

export default {
  name: "MiradorViewer",
  components: {},
  props: {
    editable: {type: Boolean, default: false},
    manifestUrl: { type: String, required: true },
    manifestOriginUrl: { type: String, required: true },
    canvasIndex: { type: Number, default: 0 },
    documentId: { type: Number, default: 0 },
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
      let config = {
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
            adapter: (canvasId) => new AdeleStorageAdapter(this.editable, this.manifestOriginUrl, this.documentId, canvasId),
          },
          ...this.configuration
        }

        config["theme"] = {
            palette: {
              type: 'light',
              primary: {
                main: '#1967d2', // Controls the color of the Add button and current window indicator
              },
              secondary: {
                main: '#1967d2', // Controls the color of Selects and FormControls
              },
              shades: { // Shades that can be used to offset color areas of the Workspace / Window
                dark: '#eeeeee',
                main: '#ffffff',
                light: '#f5f5f5',
              },
              error: {
                main: '#b00020',
              },
              notification: { // Color used in MUI Badge dots
                main: '#ffa224'
              },
              hitCounter: {
                default: '#bdbdbd',
              },
              highlights: {
                primary: '#ffff00',
                secondary: '#00BFFF',
              },
              section_divider: 'rgba(0, 0, 0, 0.25)',
              annotations: {
                hidden: { globalAlpha: 0 },
                default: { strokeStyle: '#00BFFF', globalAlpha: this.editable ? 1 : 0 },
                hovered: { strokeStyle: '#EF3322', globalAlpha:  this.editable ? 1 : 0  },
                selected: { strokeStyle: '#ffff00', globalAlpha:  this.editable ? 1 : 0 },
              },
              search: {
                default: { fillStyle: '#00BFFF', globalAlpha: 0.3 },
                hovered: { fillStyle: '#00FFFF', globalAlpha: 0.3 },
                selected: { fillStyle: '#ffff00', globalAlpha: 0.3 },
              }
          }
        }

        return config
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
          reset.click();
        } 
        }, 2000)


    }
    }
  },
  mounted() {
    this.viewerContainer = document.getElementById('vue-mirador-container');
  },
  beforeDestroy() {
    if (this.resetTimeout)
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
.SizeMe\(Connect\(WithPlugins\(CompanionWindow\)\)\)-content-39 {
  padding-left: 10px;
}
.Connect\(WithPlugins\(WindowTopBar\)\)-windowTopBarStyle-16.Connect\(WithPlugins\(WindowTopBar\)\)-focused-15, .mirador16.mirador15 {
  border-top: 1px solid lightgray !important;
}
</style>
