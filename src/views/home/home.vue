<template>
  <div class="container">
    <v-header/>
    <div class="bottom" flex>
      <div class="left" flex-box="0" v-if='!$route.meta.backTwo'>
        <v-side-bar />
      </div>
      <div :class="$route.meta.backTwo ? 'right2':'right'">
        <div class="back" flex="cross:center" v-if="$route.meta.backOne" @click="goBack" btn>
          <div class="backImg"></div>
          <div class="backFont">返回</div>
        </div>
        <div class="content" :class="{'content-focusOne':$route.meta.backOne}">
          <router-view/>
        </div>
        <div class="line"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import vHeader from '../../components/vHeader/vHeader'
import vSideBar from '../../components/vSideBar/vSideBar'
export default {
  components: {
    vHeader,
    vSideBar
  },
  data() {
    return {
    };
  },
  beforeDestroy() {

  },
  created() {
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
};
</script>
<style>
.el-table th {
  font-weight: normal;
}
</style>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
.bottom {
  position: absolute;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f0f1f2;
}
.left {
  padding-top: 2px;
  box-sizing: border-box;
  width: 220px;
  height: 100%;
}
.right {
  width: 0;
  height: 100%;
  flex: 1;
}
.right2 {
  width: 82%;
  margin: 0 9%;
  height: 100%;
}
.line {
  height: 15px;
}
.back {
  padding: 20px 25px;
}
.backImg {
  width: 8px;
  height: 14px;
  margin-right: 11px;
  background: url("./images/back.png") no-repeat center center/contain;
}
.backFont {
  color: #1b253a;
  font-size: 14px;
}
.content {
  padding: 20px 20px 0;
  box-sizing: border-box;
  height: calc(100% - 20px);
  overflow: auto;
  &-focusOne {
    height: calc(100% - 80px);
    padding-top: 0;
  }
}
.content > div {
  min-height: 100%;
  padding: 0 40px;
  padding-bottom: 10px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 5px 0px rgba(232, 232, 232, 0.53);
  border-radius: 10px;
}
</style>
