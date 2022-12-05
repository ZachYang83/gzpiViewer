<template>
  <div class="mtree-box" ref="mtreeBox" @contextmenu.prevent>
    <div class="tree-box vscroll" id="treeOva">
      <a-tree
        v-if="treeData.length"
        class="draggable-tree"
        draggable
        v-model="checkedKeys"
        @expand="onExpand"
        @select="handleSelected"
        :treeData="treeData"
        :expandedKeys="expandedKeys"
        :autoExpandParent="autoExpandParent"
        @rightClick="openTreeContextMenu"
        checkable
        @check="onCheck"
      >
        <!-- <a-icon type="down" slot="switcherIcon" /> -->
        <a-icon type="caret-down" slot="switcherIcon" />
        <template slot="title" slot-scope="item">
          <!-- <span class="index">{{ item.index }}</span> -->
          <span
            :title="item.title"
            class="txt-ellipsis"
            :key="item.key"
            v-html="item.title"
          ></span>
          <a-icon
            v-if="!item.children"
            type="environment"
            class="environment"
            theme="twoTone"
            v-bind:class="{ active: item.checked }"
            @click.stop="onCheckLocation(item)"
          />
        </template>
      </a-tree>
    </div>
    <div
      class="rt-menu-box"
      ref="rtMenuBox"
      v-show="isRtMenuShow"
      @mouseleave="hideTreeContextMenu"
    >
      <ul v-show="rtMenuObj.hasChild">
        <li @click="isExpandSelect(true)">
          <span>全部展开</span>
        </li>
        <li @click="isExpandSelect(false)">
          <span>全部折叠</span>
        </li>
      </ul>
      <ul v-show="!rtMenuObj.hasChild">
        <li
          v-for="item in rtMenuObj.list"
          :key="item.key"
          @click="handleMemuEvent(item.key)"
        >
          <span v-show="item.state">{{ item.name }}</span>
        </li>
      </ul>
    </div>
    <a-popover
      :title="curSelectNode.title"
      trigger="click"
      v-model="opacityVisible"
      :getPopupContainer="
        (triggerNode) => {
          return triggerNode.parentNode;
        }
      "
    >
      <template slot="content">
        <a-slider
          :min="0"
          :max="1"
          :step="0.01"
          v-model="opacity"
          @change="changeOpacity"
        />
      </template>
      <span
        class="opacityPoa"
        ref="opacityPoa"
        style="position: absolute; backgroundcolor: #ff4081"
      ></span>
    </a-popover>
  </div>
</template>

<script>
import { layerData } from "./layerData";
import DomNode from "@/sdk/ui/domNode";
import {
  restructTreeData,
  getAllParentKey,
  getParentKey,
  getMenuKeys,
} from "./index.js";
export default {
  data() {
    return {
      //专题
      projectArr: [],
      //专题名
      projectName: "",
      //树
      treeData: [],
      //展开的key
      expandedKeys: [],
      //被选中的====
      checkedKeys: [],
      prevCheckedKeys: [],
      //树所有key
      treeAllKey: [],
      //是否自动展开父节点
      autoExpandParent: true,
      //右键菜单是否显示
      isRtMenuShow: false,
      //右键菜单
      rtMenuObj: {
        hasChild: false,
        list: [
          { index: "0", name: "透明度调整", key: "setOpacity", state: true },
          {
            index: "1",
            name: "缩放至图层",
            key: "zoomToLayerById",
            state: true,
          },
          { index: "2", name: "图层样式", key: "setLayerStyle", state: false },
          { index: "3", name: "版本切换", key: "setVersion", state: false },
          { index: "4", name: "清单", key: "getMdInfo", state: false },
          { index: "5", name: "图层信息", key: "getLayerInfo", state: false },
        ],
      },
      //右键当前选中的
      curSelectNode: {},
      //搜索
      keyWord: "",
      //放图层列表
      layerArr: [],
      opacityVisible: false,
      opacity: 1,
      versionVisible: false,
      panelVisible: false,
      //版本切换
      verArr: [],
    };
  },
  created() {
    // this.buildLayerTree();
  },
  mounted() {
    this.buildLayerTree();
    this.$nextTick(() => {
      let o = document.getElementById("treeOva");
      o.style.maxHeight = document.body.clientHeight - 400 + "px";
    });
  },
  methods: {
    buildLayerTree() {
      let _this = this;
      _this.treeData = restructTreeData(layerData, "", []).data;
      console.log(_this.treeData, "_this.treeData");
      _this.checkedKeys = restructTreeData(layerData, "", []).checkedData;
      _this.prevCheckedKeys = _this.checkedKeys.slice(0);
      _this.expandChecks();
    },
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    handleSelected() {},
    openTreeContextMenu(e) {
      this.curSelectNode = e.node.dataRef;
      this.setRMenuList([0, 1]);
      this.getMenuPosition(e);
    },
    setRMenuList(list) {
      let arr = this.rtMenuObj.list;
      for (let i = 0; i < arr.length; i++) {
        if (list.indexOf(i) > -1) {
          this.$set(arr[i], "state", true);
        } else {
          this.$set(arr[i], "state", false);
        }
      }
    },
    getMenuPosition(e) {
      const hl = gzpiMap.ui.domNode.getDomTopLeft(this.$refs.mtreeBox);
      this.isRtMenuShow = true;
      let event = e.event;
      this.$nextTick(() => {
        let h =
          document.documentElement.clientHeight || document.body.clientHeight;
        let l = event.clientX - hl.left > 240 ? 240 : event.clientX - hl.left;
        let t =
          h - event.clientY - hl.top < 200
            ? event.clientY - hl.top - this.$refs.rtMenuBox.offsetHeight
            : event.clientY - hl.top;
        this.$refs.rtMenuBox.style.left = l + "px";
        this.$refs.rtMenuBox.style.top = t + "px";

        if (this.curSelectNode.children) {
          this.rtMenuObj.hasChild = true;
        } else {
          this.rtMenuObj.hasChild = false;
        }
        //透明度显示位置
        this.$refs.opacityPoa.style.left = event.clientX - hl.left + "px";
        this.$refs.opacityPoa.style.top = event.clientY - hl.top + "px";

        //版本切换显示位置
        // this.$refs.versionPoa.style.left = event.clientX - hl.left + "px";
        // this.$refs.versionPoa.style.top = event.clientY - hl.top + "px";
      });
    },
    hideTreeContextMenu(e) {
      this.isRtMenuShow = false;
    },
    onCheck(checkedKeys, e) {
      if (e.checked) {
        var existItems = MAP.layerTree._gzpilayerIds;
        var items = [];
        for (var i = checkedKeys.length - 1; i > -1; i--) {
          if (existItems.indexOf(checkedKeys[i]) < 0) {
            items.push(checkedKeys[i]);
          }
        }
        MAP.layerTree.addMany(items, MAP.viewer);
      } else {
        var existItems = MAP.layerTree._gzpilayerIds;
        var items = [];
        for (var i = existItems.length - 1; i > -1; i--) {
          if (checkedKeys.indexOf(existItems[i]) < 0) {
            items.push(existItems[i]);
          }
        }
        MAP.layerTree.removeMany(items, MAP.viewer);
      }
      if (e.node.dataRef.children) {
        let num = e.node.dataRef.children.length;
        for (let i = 0; i < num; i++) {
          this.$set(e.node.dataRef.children[i], "checked", e.checked);
        }
      } else {
        this.$set(e.node.dataRef, "checked", e.checked);
      }
    },
    expandChecks() {
      let vm = this;
      vm.expandedKeys = [];
      vm.checkedKeys.forEach((element) => {
        const arr_temp = getAllParentKey(element, vm.treeData, []);
        vm.expandedKeys = [...vm.expandedKeys, ...arr_temp];
      });
      vm.expandedKeys = Array.from(new Set(vm.expandedKeys));
    },
    hideTreeContextMenu: function (e) {
      this.isRtMenuShow = false;
    },
    isExpandSelect(flag) {
      const arr1 = [this.curSelectNode];
      const b = getMenuKeys(arr1, []);
      if (flag) {
        for (let i in b) {
          if (this.expandedKeys.indexOf(b[i]) === -1) {
            this.expandedKeys.push(b[i]);
          }
        }
      } else {
        for (let i in b) {
          let index = this.expandedKeys.indexOf(b[i]);
          if (index > -1) {
            this.expandedKeys.splice(index, 1);
          }
        }
      }
    },
    handleMemuEvent(key) {
      this.isRtMenuShow = false;
      this[key]();
    },
    changeOpacity(opacity) {
      MAP.layerTree.setLayerOpacityById(this.curSelectNode.id, opacity);
      console.log("透明度");
    },
    onCheckLocation(node) {
      if (node.checked) {
        MAP.layerTree.zoomToLayerById(node.id);
      }
    },
    setOpacity() {
      this.opacityVisible = true;
      this.opacity = 1;
    },
  },
};
</script>

<style lang="scss" scoped src="./index.scss">
</style>