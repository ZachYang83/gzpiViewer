<template>
  <div class="baseLayer" ref="baseLayer">
    <div class="baseLayer-box">
      <div
        v-for="item in baseLayerArr"
        :key="item.name"
        @click="changeBaseLayer(item)"
      >
        <img :src="item.iconUrl" alt="item.name" />
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import config from "./config";
let viewer = null;
export default {
  data() {
    return {
      baseLayerArr: config.baseLayerArr,
    };
  },
  mounted() {
    viewer = MAP.viewer;
  },
  methods: {
    changeBaseLayer(item) {
      console.log(item.name)
      switch(item.name){
        case '影像图':
          viewer.map.basemap = 'hybrid';
          break;
        case '地形图':
          viewer.map.basemap = 'topo';
          break; 
        case '暗灰':
          viewer.map.basemap = 'dark-gray';
          break; 
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.baseLayer {
  position: relative;
  height: 100%;
  box-sizing: border-box;
  max-width: 60px;
}

.baseLayer-box > div {
  margin-bottom: 15px;
  padding: 5px;

  &:hover {
    cursor: pointer;
    background-color: #c5e1a5;
    color: rgb(53, 104, 151);
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.baseLayer-box img {
  width: 50px;
  height: 50px;
  border-radius: 2px;
}

.baseLayer-box p {
  font-size: 12px;
  line-height: 1.2;
  margin-top: 5px;
  text-align: center;
}
</style>