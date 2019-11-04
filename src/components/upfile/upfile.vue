<template>
  <label class="upfile-container" :style="styleObj" ref="container">
    <Progress v-if="ifShowPercent" v-show="percent>0&&percent<100" :percent="percent"></Progress>
    <input type="file" :multiple="ifMultiple" @change="upFile($event.target)" :accept="acceptStr" ref='upload'>
    <slot>
      <div class="upfile-img"></div>
      <p class="upfile-font" flex="main:center cross:center" v-text="font"></p>
    </slot>
  </label>
</template>
<script type="text/babel" src="./upfile.js"></script>
<style lang="less" scoped src="./upfile.scss"></style>
