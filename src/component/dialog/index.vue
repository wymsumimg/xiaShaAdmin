<template>
  <div class="dialog">
    <el-dialog
      custom-class='dialogTitle'
      :title="title"
      :center="center"
      :visible.sync="dialogVisible"
      :width="width"
      :before-close="handleClose">
      <slot></slot>
    </el-dialog>
  </div>
</template>

<style lang="scss">
  .dialogTitle{
    border-radius: 20px;
  }
</style>
<script>
export default {
  watch: {
  },
  props: {
    center: {
      type: Boolean,
      default: true,
    },
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '提示',
    },
    width: {
      type: String,
      default: '30%',
    },
  },
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    handleClose(val) {
      this.$emit('update:dialogVisible', false)
    }
  },
}
</script>

