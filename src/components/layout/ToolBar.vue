<template>
  <div>
    <div class="tool-bar">
      <div class="rt-box">
        <a-popover
          trigger="click"
          placement="bottomRight"
          :getPopupContainer="
            (triggerNode) => {
              return triggerNode.parentNode;
            }
          "
        >
          <template slot="content">
            <base-layer></base-layer>
          </template>
          <div class="icon-box"><i class="icon-baselayer"></i> 底图</div>
        </a-popover>
        <a-popover
          trigger="click"
          placement="bottomRight"
          :getPopupContainer="
            (triggerNode) => {
              return triggerNode.parentNode;
            }
          "
        >
          <template slot="content">
            <layer-tree></layer-tree>
          </template>
          <div class="icon-box"><i class="icon-layer"></i> 图层</div>
        </a-popover>
      </div>
    </div>
  </div>
</template>

<script>
import LayerTree from "@/components/common/layerTree/index.vue";
import BaseLayer from "@/components/common/baseLayer/index.vue";
export default {
  components: {
    LayerTree,
    BaseLayer,
  },
  methods: {
    changeWidget() {},
    visibleChange() {},
  },
};
</script>

<style lang="scss" scoped>
.tool-bar {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 3;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  color: rgba(255, 255, 255, 0.6);
  padding: 0 15px;
  height: 36px;
  line-height: 36px;
}
.rt-box {
  position: absolute;
  top: 0;
  right: 20px;
  height: 100%;
}
.icon-box {
  display: inline-block;
  cursor: pointer;
  vertical-align: text-bottom;
  margin-left: 20px;
}
.icon-box i {
  opacity: 0.8;
}
.icon-box:hover {
  color: #fff;
}
.icon-box:hover i {
  opacity: 1;
}
.icon-baselayer {
  display: inline-block;
  width: 18px;
  height: 18px;
  background: url("~assets/img/tool/sys-baselayer.png") no-repeat;
  background-size: 100%;
  vertical-align: -4px;
}
.icon-layer {
  display: inline-block;
  width: 18px;
  height: 18px;
  background: url("~assets/img/tool/sys-layer.png") no-repeat;
  background-size: 100%;
  vertical-align: -4px;
}

:deep(.ant-popover-inner-content) {
  padding: 5px !important;
}
</style>