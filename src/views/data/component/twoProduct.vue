<template lang="html">
  <div class="two">
  	<div class="two-title">
  		<span>分享数据展示</span>
  	</div>
  	
  	<div ref='tree' class="two-echarts" >
  		
  	</div>
  </div>
</template>

<script type="text/babel">
import vis from 'vis';
import 'vis/dist/vis.min.css';
export default {
  comptwonts: {},
  data() {
    return {
    };
  },
  mounted() {
    this.productTree()
  },
  methods: {
    productTree() {
      this.$http.get(this.$apis.main.productTree, {
        params: {
          productId: this.$route.query.productId,
        }
      }).then(res => {
        this.getEcharts(res.data)
      })
    },
    getEcharts(data) {
      let nodes = data.data
      let edges = data.links
      nodes.map((obj, index, arr) => {
        obj['id'] = obj.userId
        obj['value'] = obj.browseNum + obj.shareNum
        obj['title'] = `<div style="padding:7px 13px;">贡献值：${obj.browseNum + obj.shareNum}<br /><span style="margin-right: 8px;width: 6px;height: 6px;background: #1890FF;border-radius: 6px;display: inline-block;"></span>查看数：${obj.browseNum}<br /><span style="width: 6px;height: 6px;background: #2FC25B;border-radius: 6px;display: inline-block;margin-right: 8px;"></span>分享数：${obj.shareNum}</div>`
        obj['image'] = obj['photo'] || 'https://cdn.i31.com/oss/img/weiguan/fail.png'
        if (obj.userId == '0') {
          obj['image'] = JSON.parse(this.$route.query.dataItem).productImg || 'https://cdn.i31.com/oss/img/weiguan/fail.png'

          delete obj['title']
        }
        delete obj['userId']
        delete obj['photo']
        return obj
      })

      let cdata = {
        nodes: nodes,
        edges: edges
      };
      // create a network
      let container = this.$refs.tree;
      let options = {
        autoResize: true,
        layout: {
          hierarchical: {
            direction: "UD",
            sortMethod: "directed"
          }
        },
        nodes: {
          shape: 'circularImage',
          chosen: {
            node: function (values, id, selected, hovering) {
              values.borderWidth = 8;
              values.borderColor = '#A5D5FF';
            },
            label: function (values, id, selected, hovering) {
              values.color = '#007AFF';
            }
          },
          font: {
            color: 'transparent',
            size: 18,
          },
          scaling: {
            min: 20,
            max: 30
          },
        },
        edges: {
          smooth: false, //是否显示方向箭头
        },

        interaction: {
          hover: true,
          selectable: false,
          dragNodes: false
        },
        physics: {
          stabilization: {
            enabled: false,
            fit: true,
            iterations: 1000,
          },
        },
      };
      let network = new vis.Network(container, cdata, options);

      network.once("afterDrawing", function () {
        network.fit({
          animation: {
            duration: 500,
            easingFunction: 'linear'
          }
        });
      });
    }
  }
};
</script>
<style>
</style>
<style lang="scss" scoped>
.two {
  &-echarts {
    height: 420px;
    width: 100%;
  }
  &-title {
    height: 55px;
    width: 100%;
    border-bottom: 1px solid #e9e9e9;
    box-sizing: border-box;
    span {
      margin: 0 30px;
      display: inline-block;
      line-height: 51px;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.85);
      font-weight: bold;
    }
  }
}
</style>
