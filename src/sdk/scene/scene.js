class Scene {
    constructor(viewer) {
        this._viewer = viewer;
        this._layerTree = null;
    }

    initialize(viewer, layerData) {
        this._viewer = viewer;
        this._layerTree = MAP.layerTree;
        this._layerTree.loadInitializeLayers(viewer, layerData);
    }
}

export default Scene;