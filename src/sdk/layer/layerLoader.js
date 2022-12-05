import MapImageLayer from "@arcgis/core/layers/MapImageLayer";

class LayerLoaderBase {
    constructor() {
        this.supportTypes = "";
    }
    add(viewer, ly, _this) {
        console.error("未实现add方法")
    }
}

class MapServerLoader extends LayerLoaderBase {
    constructor() {
        super();
        this.supportTypes = "MapServer";
    }
    add(viewer, ly, _this) {
        if (!_this._isLayerIdExists(ly.id)) {
            return;
        }
        var layer = new MapImageLayer({ url: ly.url, id: ly.id });
        viewer.map.add(layer)
    }
}

class FeatureServerLoader extends LayerLoaderBase {
    constructor() {
        super();
        this.supportTypes = "FeatureServer";
    }
    add(viewer, ly, _this) {
        if (!_this._isLayerIdExists(ly.id)) {
            return;
        }
        var FeatureLayer = MAP.loader.FeatureLayer;
        var layer = new FeatureLayer({ url: ly.url, id: ly.id });
        viewer.map.add(layer)
    }
}

class MapImageLayerLoader extends LayerLoaderBase {
    constructor() {
        super();
        this.supportTypes = "MapImageLayer";
    }
    add(viewer, ly, _this) {
        if (!_this._isLayerIdExists(ly.id)) {
            return;
        }
        var layer = new MapImageLayer({ url: ly.url, id: ly.id });
        viewer.map.add(layer)
    }
}

export default [
    new MapServerLoader(),
    new FeatureServerLoader(),
    new MapImageLayerLoader(),
]