<template>
  <div class="workbench-page">
    <!--  功能区 -->
    <div>
      <template v-if="areaList.length > 0">
        <a-tabs
          size="small"
          hideAdd
          v-model="activeKey"
          @change="changeTab"
          type="editable-card"
          @edit="onEdit"
        >
          <a-tab-pane
            v-for="item in areaList"
            :tab="item.name"
            :key="item.funcInvokeUrl"
          ></a-tab-pane>
        </a-tabs>
        <div class="func-box">
          <router-view></router-view>
        </div>
      </template>
      <div v-else class="null">
        <a-empty description="暂无打开的功能 ~" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //当前列表key
      activeKey: "",
      //功能区列表
      areaList: [],
      size: "small",
    };
  },
  methods: {
    onShow(val) {
      if(!this.$store.state.mainBoxState ){
        this.$store.state.mainBoxState  = true;
      }
      this.activeKey = val.funcInvokeUrl;
      this.getAreaList(val);
      this.$router.push({ path: val.funcInvokeUrl });
    },
    getAreaList(val) {
      for (let i = 0; i < this.areaList.length; i++) {
        if (this.areaList[i].funcInvokeUrl === val.funcInvokeUrl) {
          return;
        }
      }
      this.areaList.push(val);
    },
    onEdit(targetKey, action) {
      this[action](targetKey);
    },
    changeTab(o) {
      this.$router.push({ path: o });
    },
    remove(targetKey) {
      let activeKey = this.activeKey;
      let lastIndex;
      this.areaList.forEach((pane, i) => {
        if (pane.funcInvokeUrl === targetKey) {
          lastIndex = i - 1;
        }
      });
      const panes = this.areaList.filter(
        (pane) => pane.funcInvokeUrl !== targetKey
      );
      if (panes.length && activeKey === targetKey) {
        if (lastIndex >= 0) {
          activeKey = panes[lastIndex].funcInvokeUrl;
        } else {
          activeKey = panes[0].funcInvokeUrl;
        }
      }
      this.areaList = panes;
      this.activeKey = activeKey;
      this.changeTab(activeKey);
    },
  },
};
</script>

<style lang="scss" scoped>
.workbench-page {
  height: 100%;
}
.null {
  padding-top: 50px;
  text-align: center;
}
.func-box {
  height: 100%;
}

</style>