<template>
  <div class="pagination" v-if="total>size">
    <el-pagination background layout="prev, pager, next" :page-size="size" :total="total" @current-change="changePage"></el-pagination>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  padding: 20px 0;
}
</style>
<script>
export default {
  watch: {
    item() {
      this.getList()
    }
  },
  props: {
    requestMethod: {
      type: String,
      default: 'get',
    },
    size: {
      type: Number,
      default: 10,
    },
    item: {
      type: Object,
      default: () => { },
    }
  },
  data() {
    return {
      isShow: false,
      page: 1,
      total: 0,
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.$store.dispatch('setShow', true)
      if (this.requestMethod == 'post') {
        this.$http.post(this.item.url, {
          ...this.item.model,
          pageSize: this.size,
          pageNum: this.page
        }).then(res => {
          if (res.code == '200') {
            this.total = res.data.total
            this.$emit('update:dataList', res.data.data)
            this.$emit('update:total', res.data.total)
            this.$emit('update:page', { pageSize: this.size, pageNum: this.page })
          }
          this.$store.dispatch('setShow', false)
        })
      } else {
        this.$http.get(this.item.url, {
          params: {
            ...this.item.model,
            pageSize: this.size,
            pageNum: this.page
          }
        }).then(res => {
          if (res.code == '200') {
            this.total = res.data.total
            this.$emit('update:dataList', res.data.data)
            this.$emit('update:total', res.data.total)
            this.$emit('update:page', { pageSize: this.size, pageNum: this.page })
          }
          this.$store.dispatch('setShow', false)
        })
      }
    },
    changePage(val) {
      this.page = val
      this.getList()
    }
  },
}
</script>

