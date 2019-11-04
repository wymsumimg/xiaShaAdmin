<template lang="html">
  <div class="company">
    <div class="company-title">企业信息编辑页</div>
    <div flex='main:justify' class="company-body">
      <router-link tag="div" :to="{name:'companyMessage'}" class="company-item" btn flex='cross:center dir:top'>
        <img src="./images/img1.png" />
        <span>基本信息</span>
        <p>编辑</p>
      </router-link>
      <router-link tag="div" :to="{name:'companyHistory'}" class="company-item" btn flex='cross:center dir:top'>
        <img src="./images/img2.png" />
        <span>发展历程</span>
        <p>编辑</p>
      </router-link>
      <router-link tag="div" :to="{name:'companyHonor'}" class="company-item" btn flex='cross:center dir:top'>
        <img src="./images/img3.png" />
        <span>企业荣誉</span>
        <p>编辑</p>
      </router-link>
      <router-link tag="div" :to="{name:'companyDynamic'}" class="company-item" btn flex='cross:center dir:top'>
        <img src="./images/img4.png" />
        <span>企业动态</span>
        <p>编辑</p>
      </router-link>
      <router-link tag="div" :to="{name:'companyContact'}" class="company-item" btn flex='cross:center dir:top'>
        <img src="./images/img5.png" />
        <span>联系我们</span>
        <p>编辑</p>
      </router-link>
      <div class="company-item" flex='cross:center dir:top' style="border: 0;">
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  export default { 
    components:{ }, 
    data() { 
      return { 
      }; 
    },
    beforeDestroy(){
      
    },
    methods: {
      handleClick() {
        
      }
      
    }
  };
</script>

<style lang="scss" scoped>
  .company{
    &-item{
      width: 26%;
      border-radius:10px;
      border:1px solid rgba(234,234,234,1);
      overflow: hidden;
      margin-bottom: 50px;
      img{
        width: 17%;
        display: block;
        margin: 23px 0 17px 0;
      }
      span{
        font-size:26px;
        color:rgba(82,87,90,1);
      }
      p{
        font-size: 18px;
        color: #52575A;
        width: 100%;
        margin-top: 9px;
        line-height: 46px;
        text-align: center;
        height:46px;
        background:rgba(234,234,234,0.65);
      }
    }
    &-body{
      flex-wrap: wrap;
      margin-top: 35px;
    }
    &-title{
      font-size: 32px;
      color: #52575A;
      padding: 24px 0;
    }
  }

</style>