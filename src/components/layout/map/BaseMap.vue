<template>
  <div class="basemap">
    <div id="mapContain">
      <tool-bar></tool-bar>
    </div>
  </div>
</template>

<script>
import Map from "@arcgis/core/Map";
import SceneView from "@arcgis/core/views/SceneView";
import esriConfig from "@arcgis/core/config";
import Graphic from "@arcgis/core/Graphic";
// console.log(Map, SceneView, "SceneView");

import * as gzpiMap from "@/sdk/index.js";
import ToolBar from "@/components/layout/ToolBar.vue";
import LayerTree from "@/sdk/layer/layerTree";
import MapInit from "./map";

window.gzpiMap = gzpiMap;
export default {
  components: {
    ToolBar,
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      esriConfig.apiKey =
        "AAPK14533e6b4e9a4564b1f30946c9991b8aCxy7_OSnphML6Hn9v9m26duYzM9cNUEHxbcyKZKeMPZY3XgfSf79G_sGdsidVv3I";
      const map = new Map({
        basemap: "hybrid", //Basemap layer service
        // ground: "world-elevation", //Elevation service
      });

      const view = new SceneView({
        container: "mapContain",
        map: map,
        camera: {
          position: [113.499, 23.15, 27000],
          tilt: 0,
          heading: 0,
        },
      });
      MAP.maper = map;
      MAP.viewer = view;
      MAP.viewer.ui.remove("attribution");
      this.initLayer();

      const graphic = new Graphic({
        symbol: {
          type: "point-3d",
          symbolLayers: [
            {
              type: "object",
              width: 8000, //模型宽度
              height: 3000, //模型高度
              resource: {
                href: "./my.gltf",
              },
              heading: 88, //朝向
            },
          ],
        },
      });
      MAP.viewer.graphics.add(graphic);

    },
    initLayer() {
      let _t = this;
      if (!window.MAP.layerTree) {
        window.MAP.layerTree = new LayerTree();
      }
      MapInit.creatMap();
    },
  },
};
</script>

<style lang="scss" scoped>
.basemap {
  position: relative;
  display: flex;
  height: 100%;

  #mapContain {
    position: relative;
    height: 100%;
    flex: 1;
  }
}
</style>