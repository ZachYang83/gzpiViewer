<template>
  <div class="base-page">
    <div class="header">
      <base-header></base-header>
    </div>
    <div class="main">
      <base-menu :menuList="menuList" @openMainBox="openMainBox"></base-menu>
      <base-map></base-map>
      <div
        class="main-box"
        id="mainBox"
        v-bind:class="{ active: $store.state.mainBoxState }"
      >
        <workbench ref="workbench"></workbench>
      </div>
      <div
        class="fastNav"
        id="fastNav"
        v-bind:class="{ active: $store.state.mainBoxState }"
        @click="foldClick"
      >
        <a-icon
          type="right"
          class="collapsedIcon"
          :rotate="$store.state.mainBoxState ? 180 : 0"
        ></a-icon>
      </div>
    </div>
  </div>
</template>

<script>
import BaseHeader from "@/components/layout/BaseHeader.vue";
import BaseMenu from "@/components/layout/BaseMenu.vue";
import BaseMap from "@/components/layout/map/BaseMap.vue";
import workbench from "@/components/layout/Bench.vue";
import { menuList } from "@/api/menu";

export default {
  data() {
    return {
      menuList: menuList,
      isFold: false,
    };
  },
  components: {
    BaseHeader,
    BaseMenu,
    BaseMap,
    workbench,
  },
  mounted() {
    this.addRouters(this.menuList);
  },
  methods: {
    openMainBox(val) {
      if (!this.$store.state.mainBoxState) {
        this.$nextTick(() => {
          this.$store.state.mainBoxState = true;
          document.getElementById("fastNav").style.left =
            parseInt(document.getElementById("fastNav").style.left) +
            320 +
            "px";
        });
      }
      this.$refs.workbench.onShow(val);
    },
    addRouters(arr) {
      let _this = this;
      for (let i = 0; i < arr.length; i++) {
        let config = arr[i].childrenList;
        if (config) {
          for (let j = 0; j < config.length; j++) {
            let comp = {
              path: config[j].funcInvokeUrl,
              name: config[j].name,
              component: () =>
                import("@/widgets/" + config[j].funcInvokeUrl + "/index.vue"),
              meta: {
                keepAlive: true,
              },
            };
            _this.$router.options.routes[0].children.push(comp);
          }
        }
      }
      _this.$router.addRoutes(_this.$router.options.routes);
    },
    foldClick() {
      this.$store.state.mainBoxState = !this.$store.state.mainBoxState;
      if (this.$store.state.collapsed && this.$store.state.mainBoxState) {
        document.getElementById("mainBox").style.left = "50px";
        document.getElementById("basemenu").style.width = "50px";
        document.getElementById("fastNav").style.left = "370px";
        this.openKeys = [];
      } else if (
        !this.$store.state.collapsed &&
        this.$store.state.mainBoxState
      ) {
        document.getElementById("mainBox").style.left = "150px";
        document.getElementById("basemenu").style.width = "150px";
        document.getElementById("fastNav").style.left = "470px";
      } else if (
        this.$store.state.collapsed &&
        !this.$store.state.mainBoxState
      ) {
        document.getElementById("mainBox").style.left = "50px";
        document.getElementById("basemenu").style.width = "50px";
        document.getElementById("fastNav").style.left = "50px";
        this.openKeys = [];
      } else if (
        !this.$store.state.collapsed &&
        !this.$store.state.mainBoxState
      ) {
        document.getElementById("mainBox").style.left = "150px";
        document.getElementById("basemenu").style.width = "150px";
        document.getElementById("fastNav").style.left = "150px";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.base-page {
  position: relative;
  height: 100%;
  width: 100%;

  .header {
    width: 100%;
    height: 70px;
    min-height: 70px;
  }

  .main {
    position: relative;
    height: calc(100% - 70px);

    .main-box {
      position: absolute;
      top: 0;
      left: 150px;
      z-index: 5;
      background: rgba(255, 255, 255, 0.8);
      width: 0px;
      height: 100%;
      transition: width 0.25s;
      overflow: hidden;
    }
    .main-box.active {
      width: 320px;
    }
  }
}

.fastNav {
  display: flex;
  width: 14px;
  height: 50px;
  padding: 15px 0px;
  border-radius: 0 10px 10px 0;
  border: 2px solid #ddd;
  border-left: none;
  z-index: 999;
  background: #001225;
  position: absolute;
  left: 150px;
  top: 50%;
  transition: left 0.25s;
  transform: translate(-0%, -50%);
  cursor: pointer;
  justify-content: center;
  align-items: center;
  .collapsedIcon {
    color: aqua;
  }
}

.fastNav.active {
  left: 470px;
}
</style>