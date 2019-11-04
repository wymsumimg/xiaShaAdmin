<template>
  <div class="tips">
    {{`上传图片≤${spec.size}，建议尺寸${spec.width}X${spec.height}`}}
  </div>
</template>

<style lang="scss">
  .tips{
    font-size:12px;
    color:rgba(192,195,207,1);
    position: absolute;
    bottom: -25px;
    white-space: nowrap;
  }
</style>
<script>
export default {
  watch: {
  },
  props: {
    spec: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return { 
    }
  },
  methods: {
  },
}
</script>

