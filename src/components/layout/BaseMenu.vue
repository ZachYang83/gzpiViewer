<template>
  <div class="basemenu" id="basemenu">
    <a-menu
      :openKeys="openKeys"
      mode="inline"
      :inlineIndent="inlineIndent"
      theme="dark"
      class="vscroll"
      :inline-collapsed="collapsed"
      @openChange="onOpenChange"
    >
      <a-sub-menu v-for="item in menuList" :key="item.id">
        <div slot="title">
          <i :class="item.iconClass"></i>
          <span>{{ item.name }}</span>
        </div>
        <a-menu-item
          v-for="p in item.childrenList"
          :key="p.id"
          @click="openMainBox(p)"
        >
          <span :title="p.name">{{ p.name }}</span>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
    <i
      class="btm"
      @click="toggleCollapsed"
      :class="collapsed ? 'icon-unfold' : 'icon-fold'"
    ></i>
  </div>
</template>

<script>
export default {
  props: {
    menuList: { type: Array },
  },
  data() {
    return {
      inlineIndent:16,
      openKeys: [],
      collapsed: false,
      rootSubmenuKeys: [],
    };
  },
  components: {},
  methods: {
    onOpenChange(openKeys) {
      if (this.rootSubmenuKeys.length == 0) {
        this.getRootSubmenuKeys(this.menuList);
      }
      const latestOpenKey = openKeys.find(
        (key) => this.openKeys.indexOf(key) === -1
      );
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    getRootSubmenuKeys(val) {
      val.forEach((element) => {
        this.rootSubmenuKeys.push(element.id);
      });
    },
    openMainBox(o) {
      this.$emit("openMainBox", o);
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
      this.$store.state.collapsed = this.collapsed;
      if (
        this.collapsed &&
        this.$store.state.mainBoxState
      ) {
        document.getElementById("mainBox").style.left = "50px";
        document.getElementById("basemenu").style.width = "50px";
        document.getElementById("fastNav").style.left = "370px";
        this.openKeys = [];
      } else if (
        !this.collapsed &&
        this.$store.state.mainBoxState
      ) {
        document.getElementById("mainBox").style.left = "150px";
        document.getElementById("basemenu").style.width = "150px";
        document.getElementById("fastNav").style.left = "470px";
      }
      else if (
        this.collapsed &&
        !this.$store.state.mainBoxState
      ) {
        document.getElementById("mainBox").style.left = "50px";
        document.getElementById("basemenu").style.width = "50px";
        document.getElementById("fastNav").style.left = "50px";
        this.openKeys = [];
      }
      else if (
        !this.collapsed &&
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
.basemenu {
  position: absolute;
  top: 0;
  left: 0;
  width: 150px;
  height: 100%;
  max-width: 150px;
  background-color: #001225;
  z-index: 6;

  .vscroll {
    height: calc(100% - 40px);
    overflow-x: hidden;
    overflow-y: hidden;
    padding-top: 5px;
  }

  .icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-right: 8px;
    opacity: 0.65;
  }
  .icon-guihua {
    background: url("~assets/img/menu/citySafe.png") no-repeat;
    background-size: 100%;
  }
  .icon-shuju {
    background: url("~assets/img/menu/dataMan.png") no-repeat;
    background-size: 100%;
  }
  .icon-xianzhuang {
    background: url("~assets/img/menu/houseAna.png") no-repeat;
    background-size: 100%;
  }
  .icon-xiangmu {
    background: url("~assets/img/menu/terrianAna.png") no-repeat;
    background-size: 100%;
  }
  .btm {
    display: block;
    margin: 0 auto;
    width: 24px;
    height: 18px;
    cursor: pointer;
  }
  .icon-fold {
    background: url("~assets/img/menu/fold.png") no-repeat;
    background-size: 100%;
  }
  .icon-unfold {
    background: url("~assets/img/menu/unfold.png") no-repeat;
    background-size: 100%;
  }
}

.ant-menu-inline-collapsed {
  width: 50px;
}

:deep(.ant-menu-submenu-title){
  padding:0 16px !important;
}

:deep(.ant-menu-inline-collapsed
  > .ant-menu-submenu
  > .ant-menu-submenu-title){
  padding: 0 16px !important;
}

.ant-menu-inline-collapsed
  > .ant-menu-submenu
  > .ant-menu-submenu-title
  > div
  > span {
  display: inline-block;
  max-width: 0;
  opacity: 0;
}

.ant-menu-dark,
.ant-menu-dark .ant-menu-sub {
  background: #001225;
}
</style>