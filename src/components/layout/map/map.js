import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import { layerData } from "@/components/common/layerTree/layerData";
import Scene from "@/sdk/scene/scene"

let MapInit = {
    gzpiScene: new Scene(),
    creatMap:  function () {
        // var layer2 = new MapImageLayer({url:"https://112.74.166.19:6443/arcgis/rest/services/kexuecheng/hp_konggui/MapServer", id:"layerid" });
        // MAP.viewer.map.add(layer2)
        MapInit.gzpiScene.initialize(MAP.viewer, layerData);
    }
};

export default MapInit;