<template>
  <div class="sideBarContainer">
    <div class="list">
      <div class="item" flex="cross:center" :key="item.path" v-for="(item,index) in list" @click="changeList(item)">
        <img class="icon" flex-box="0" :src="$route.path==item.path?item.iconFocus:item.icon">
        <div class="font" flex-box="1" :class="{'font-focus':$route.path==item.path}">{{item.name}}</div>
        <div class="line" flex-box="0" v-if="$route.path==item.path"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import sideBarList from '../../common/js/views/sideBarList'
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.list = sideBarList
    // this.getMenuList()
  },
  methods: {
    changeList(item) {
      this.$router.replace({ path: item.path })
    },
    getMenuList() {
      this.$http.get(`${this.$apis.user.getMenu}`, {
        params: {}
      }).then(res => {
        if (res.code == '200') {
          let arr = [];
          for (let i = 0; i < sideBarList.length; i++) {
            for (let n = 0; n < res.data.length; n++) {
              if (sideBarList[i].name == res.data[n].menuName) {
                arr.push(sideBarList[i])
              }
            }
          }
          this.list = arr;
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.sideBarContainer {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #fff;
}
.item {
  height: 56px;
  box-sizing: border-box;
  padding: 0 0 0 40px;
  cursor: pointer;
}
.icon {
  width: 22px;
  height: 22px;
  margin-right: 17px;
}
.font {
  @include ellipsis(1);
  width: 0;
  color: #8e93a2;
  font-size: 16px;
  &-focus {
    color: #ff6e39;
  }
}
.line {
  width: 5px;
  background: #ff6e39;
  height: 13px;
  border-radius: 13px;
}
</style>
