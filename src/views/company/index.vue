<template lang="html">
  <div class="company">
    <div class="company-title" flex='cross:center'>企业信息＞<span>{{$route.meta.title}}</span></div>
    <router-view @deleteData='deleteData'></router-view>
  </div>
</template>

<script type="text/babel">
export default {
  components: {},
  data() {
    return {
    };
  },
  methods: {
    deleteData(val) {
      this.$http.get(`${this.$apis.company.deleteInfo}?id=${val.data.id}&contentFlag=${val.type}`).then(res => {
        if (res.code == '200') {
          val.fun()
        }
        this.$toast(res.msg)
      })
    }

  }
};
</script>

<style lang="scss" scoped>
.company {
  &-title {
    font-size: 32px;
    color: #52575a;
    padding: 24px 0;
    margin-bottom: 50px;
    span {
      font-size: 26px;
      color: #666666;
    }
  }
}
</style>
<style>
.company .company-edit {
  font-size: 14px;
  color: #3a84ff;
  margin-right: 30px;
  cursor: pointer;
}
.company .company-delete {
  font-size: 14px;
  color: #000000;
  cursor: pointer;
}
</style>