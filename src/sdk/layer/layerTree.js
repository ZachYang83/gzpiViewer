import layerLoader from "./layerLoader"

class LayerTree {
    constructor() {
        this._viewer = null;
        this._layerTreeData = {};
        this._gzpilayers = [];
        this._gzpilayerIds = [];
        this._onLayerShowHandlers = [];
    }

    loadInitializeLayers(viewer, data) {
        this._viewer = viewer;
        //图层树外部传入数据
        if (data) {
            let self = this;
            for (var i = 0; i < data[0].children.length; i++) {
                self._loadLayerFromServer(viewer, data[0].children[i]);
            }
        }
    }

    _loadLayerFromServer(viewer, item) {
        if (item.layers.length > 0) {
            for (let j = 0; j < item.layers.length; j++) {
                this._layerTreeData[item.layers[j].id] = item.layers[j];
            }
        }

        for (var i = 0; i < item.children.length; i++) {
            this._loadLayerFromServer(viewer, item.children[i]);
        }

        // 默认显示的
        for (var i = 0; i < item.layers.length; i++) {
            if (item.layers[i].state.checked) {
                this.addLayer(item.layers[i], viewer);
            }
        }
    }

    addMany(ids, viewer) {
        viewer = viewer || VIEW;
        for (let id of ids) {
            if (this._checkCancelDispose(id))
                continue;
            if (this._layerTreeData[id]) {
                //如果不存在就添加。 
                this.addLayer(this._layerTreeData[id], viewer);
            }
        }
    }

    addLayer(ly, viewer) {
        for (let i = 0; i < layerLoader.length; i++) {
            const c = ly.url.split("/");
            const serverType = c[c.length - 1];
            if (layerLoader[i].supportTypes.indexOf(serverType) != -1) {
                this._gzpilayerIds.push(ly.id)
                this._gzpilayers.push(ly)
                layerLoader[2].add(viewer, ly, this);
                return;
            }
        }
    }

    _isLayerIdExists(id) {
        return this._gzpilayerIds.indexOf(id) >= 0;
    }

    _checkCancelDispose(ly) {
        var id = ly.id ? ly.id : ly;
        for (let i = 0; i < this._gzpilayers.length; i++) {
            if (this._gzpilayers[i].id == id && this._gzpilayerIds.indexOf(id) < 0) {
                // this._gzpilayers[i].cancelDispose();
                this._gzpilayerIds.push(id);
                // this.triggleLayerShowHandler(id, true); //显示事件 eg:图例
                return true;
            }
        }
        return false;
    }

    /**
    * 去掉勾选 移除
    * @function removeMany
    * @memberof layerTree
    * @param {array} ids 数组id
    */
    removeMany(ids,viewer) {
        for (let id of ids) {
            this.removeLayerById(id);
        }
    }

    /**
     * 全部删除
     * @function removeAll
     * @memberof layerTree
     */
    removeAll() {
        let _layerTreeData = this._layerTreeData;
        var allIds = [];
        for (var item in _layerTreeData) {
            allIds.push(item);
        }
        this.removeMany(allIds);
    }

    /**********************图层id的控制******************************* */

    /**
     * 根据id找到图层并移除
     * @function removeLayerById
     * @memberof layerTree
     * @param {string} id 图层id 
     */
    removeLayerById(id, time = 30000,viewer) {
        // var layer = this.getLayerById(id);
        var layer = this._viewer.map.findLayerById(id);
        if (layer) {
            this.removeLayer(layer, time);
            this._viewer.map.remove(layer);
            return true;
        }
        return false;
    }
    /**
     * 根据图层来删除
     * 需要获取到已加载的图层
     * @function removeLayer
     * @memberof layerTree
     * @param {object} layer （已加载的）图层
     * @param {object} viewer 场景
     */
    removeLayer(layer, time) {
        let _this = this;
        _this._removeLayerId(layer.id);
        // this.triggleLayerShowHandler(layer, false);

        // layer.dispose(time).then(function () {
        //     _this._removeLayerRef(layer)
        // });
    }

    /**
     * 移除图层id
     * @function _removeLayerId
     * @memberof layerTree
     * @param {string} id 
     * @private
     */
    _removeLayerId(id) {
        for (var i = this._gzpilayerIds.length - 1; i > -1; i--) {
            if (this._gzpilayerIds[i] == id) {
                this._gzpilayerIds.splice(i, 1);
                this._gzpilayers.splice(i, 1);
            }
        }
    }

    /**
     * 根据id来获得对象
     * @function getLayerById
     * @memberof layerTree
     * @param {string} id  图层id
     */
    getLayerById(id) {
        for (let i = 0; i < this._gzpilayers.length; i++) {
            if (this._gzpilayers[i].id == id) {
                return this._gzpilayers[i];
            }
        }
        return null;
    }
    /**
     * 根据图层名称来获得图层
     * @function getLayerByText
     * @memberof layerTree
     * @param {string} text 图层名称
     */
    getLayerByText(text) {
        for (var name in this._layerTreeData) {
            if (this._layerTreeData[name].nameCn == text) {
                return this._layerTreeData[name];
            }
        }
        return null;
    }

    zoomToLayerById(id){
        var selLayer = this._viewer.map.findLayerById(id);
        this._viewer.goTo([selLayer.fullExtent.center.longitude,selLayer.fullExtent.center.latitude]);
    }

    setLayerOpacityById(id, opacity) {
        console.log(id,'uid');
        var selLayer = this._viewer.map.findLayerById(id);
        console.log(selLayer,'selLayer');
        if (selLayer) {
            selLayer.opacity = opacity
            return true;
        }
        return false;
    }
}

export default LayerTree;