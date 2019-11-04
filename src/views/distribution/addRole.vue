<template lang="html">
  <div class="add">
    <div class="add-title">添加一级人员</div>
    <div class="add-item">
  		<div class="add-item-left">
            姓名<span class="redColor">*</span>
        </div>
  		<div class="add-item-right">
  			<div class="add-item-input" flex="cross:center">
  				<el-input v-model="product.productName" placeholder='请输入姓名' class="add-item-inputValue" :maxlength='25'></el-input>
  			</div>
  		</div>
  	</div>
    <div class="add-item">
  		<div class="add-item-left">
            联系方式<span class="redColor">*</span> 
        </div>
  		<div class="add-item-right">
  			<div class="add-item-input" flex="cross:center">
  				<el-input v-model="product.productName" placeholder='请输入手机号' class="add-item-inputValue" :maxlength='25'></el-input>
  			</div>
  		</div>
  	</div>
    <div class="add-item">
  		<div class="add-item-left">
            身份证号<span class="redColor">*</span> 
        </div>
  		<div class="add-item-right">
  			<div class="add-item-input" flex="cross:center">
  				<el-input v-model="product.productName" placeholder='请输入身份证号' class="add-item-inputValue" :maxlength='25'></el-input>
  			</div>
  		</div>
  	</div>
    <div class="add-item" flex="cross:center">
  		<div class="add-item-left">
            身份证正面<span class="redColor">*</span>
        </div>
  		<div class="add-item-right">
            <l-upload  :imgUrl.sync='product.productImg' :spec='majorSpec'></l-upload>
  		</div>
  	</div>
  	<!-- <div class="add-item" flex="cross:center">
  	  <div class="add-item-left"></div>
      <div class="add-item-right" flex="cross:center" style="font-size: 12px; color: #C0C3CF;">上传主图图片尺寸大小750x480,,大小≤1M,个数≤3个；上传视频≤30M</div>
    </div> -->
    <div class="add-item" flex="cross:center">
      <div class="add-item-left">
         身份证反面<span class="redColor">*</span>
      </div>
      <div class="add-item-right">
        <l-upload  :imgUrl.sync='product.productImg' :spec='majorSpec'></l-upload>
      </div>
    </div>
    <!-- <div class="add-item" flex="cross:center">
      <div class="add-item-left"></div>
      <div class="add-item-right" flex="cross:center" style="font-size: 12px; color: #C0C3CF;">商品展示图1个，建议大小≤2M，建议尺寸500x500;</div>
    </div> -->
  	<div class="add-item">
  		<div class="add-item-left">
            职位
        </div>
  		<div class="add-item-right">
  			<div class="add-item-input" flex="cross:center">
  				<el-input v-model="product.productName" placeholder='请输入职位' class="add-item-inputValue" :maxlength='25'></el-input>
  			</div>
  		</div>
  	</div>
  	<div class="add-item">
      <div class="add-item-left">
        公司
      </div>
      <div class="add-item-right">
        <div class="add-item-input" flex="cross:center">
          <el-input @change="handleInput3" v-model="product.productPrice" placeholder='请输入公司' class="add-item-inputValue"></el-input>
        </div>
      </div>
    </div>
    <div class="add-item">
      <div class="add-item-left">
        微信号
      </div>
      <div class="add-item-right">
        <div class="add-item-input" flex="cross:center">
          <el-input @change="handleInput3" v-model="product.productPrice" placeholder='请输入微信号' class="add-item-inputValue"></el-input>
        </div>
      </div>
    </div>
    <div class="add-item">
      <div class="add-item-left">
        地址
      </div>
      <div class="add-item-right">
        <div class="add-item-input" flex="cross:center">
          <el-input @change="handleInput3" v-model="product.productPrice" placeholder='请输入地址' class="add-item-inputValue"></el-input>
        </div>
      </div>
    </div>
    
    <div class="add-item">
      <div class="add-item-left">
        责任小区
      </div>
      <div class="add-item-right">
        <div class="add-item-add" flex="cross:center main:center" btn @click="showDialog(2)" :style="{'margin': skus.length > 0 ? '0 auto' : '0'}">
          <i class="el-icon-plus"></i>添加小区
        </div>
      </div>
    </div>
    <div class="add-item">
      <div class="add-item-left"></div>
      <div class="add-item-right" flex="cross:center">
        <div class="add-btn" btn flex="cross:center main:center" @click="save(1)">保存</div>
      </div>
    </div>
  	<l-dialog :dialogVisible.sync='dialogVisible' title='添加责任小区' :width='dialog.width' :center="dialog.type!='3'">
      <div flex="cross:center dir:top">
        <el-table
        	ref='multipleTable'
          :data="assocList"
          @selection-change="handleSelectionChange"
          style="width: 100%;border-top: 1px solid #F0F0F0;">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
            <el-table-column prop="productName" label="小区名称" align="center"></el-table-column>
            <el-table-column prop="productName" label="小区地址" align="center"></el-table-column>
            <el-table-column prop="productName" label="楼栋数" align="center"></el-table-column>
        </el-table>
        <div flex="main:justify" style="width: 100%;">
           <div style="flex: 1;">
           	<l-pagination  :dataList.sync='assocList' :item='dataJson' requestMethod='post'></l-pagination>
           </div>
           <div flex="main:right cross:center" style="padding: 20px 0;">
            <div class="add-btn" btn flex="cross:center main:center" style="width: 100px;margin-top: 0;border-radius: 10px;" @click="saveDialog(3, true)">保存</div>
            <div class="add-btn2" btn flex="cross:center main:center" style="width: 100px;margin-top: 0;border-radius: 10px;" @click="saveDialog(3)">取消</div>
          </div>
        </div>
      </div>
  	</l-dialog>
  	<l-upload  :imgUrl.sync='editorImg' ref='editorUpload' style='display: none;'></l-upload>
  </div>
</template>

<script type="text/babel">
import { quillEditor } from "vue-quill-editor";

export default {
  watch: {
    editorImg(val) {
      let quill = this.$refs.myQuillEditor.quill;
      let length = quill.getSelection().index;
      // 插入图片，res为服务器返回的图片链接地址
      quill.insertEmbed(length, "image", val);
      // 调整光标到最后
      quill.setSelection(length + 1);
    },
    resources1: {
      handler(newVal) {
        //        if(newVal.length > 0 && this.resources1[this.resources1.length-1].resource != '') {
        //          this.resources1.push({
        //            type: 3,
        //            resource: ''
        //          })
        //        }
      },
      immediate: true,
      deep: true
    },
    resources2: {
      handler(newVal) {
        if (
          newVal.length > 0 &&
          this.resources2[this.resources2.length - 1].resource != "" &&
          this.resources2.length < 3
        ) {
          this.resources2.push({
            type: 1,
            resource: ""
          });
        }
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      editorImg: "",
      btnTrue: true,
      //主图配置
      majorSpec: {
        width: 500,
        height: 500,
        size: 2048
      },
      //主图配置
      bannerSpec: {
        width: 500,
        height: 500,
        size: 2
      },
      content: null,
      editorOption: {
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike", "image"],
              ["blockquote", "code-block"]
            ],
            handlers: {
              image: value => {
                if (value) {
                  this.editorImgUpload();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      },
      dialogVisible: false,
      dialog: {
        title: "添加商品类型",
        width: "698px",
        type: 4
      },
      assocProducts: [], //关联商品 (商品集合)
      assocList: [],
      assocData: [],
      product: {
        productType: 1
      }, //商品
      resources1: [
        {
          type: 3,
          resource: ""
        }
      ], //商品视频集合
      resources2: [
        {
          type: 1,
          resource: ""
        }
      ], //商品展示图集合
      regionPrices: [], //地区价格集合
      PricesList: [],
      PriceData: {},
      priceProportion: "",
      skus: [], //规格集合
      skuData: {},
      index: -1
    };
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
    dataJson() {
      return {
        url: this.$apis.product.list
      };
    }
  },
  mounted() {
    if (this.id) {
      this.info(this.id);
    }
    this.shopList();
  },
  methods: {
    deleteTableData(item, index) {
      this.$set(item, index, item.regionPrices.splice(index, 1));
    },
    editorImgUpload() {
      this.$refs.editorUpload.imgClick();
    },
    handleInput(e) {
      if (e.match(/^\d*(\.?\d{1,2})/g)) {
        let val = e.match(/^\d*(\.?\d{1,2})/g)[0] || null;
        this.priceProportion = val
      } else {
        this.priceProportion = ""
      }
    },
    handleInput2(e) {
      if (e.match(/^\d*(\.?\d{1,2})/g)) {
        let val = e.match(/^\d*(\.?\d{1,2})/g)[0] || null;
        this.$set(this.skuData, "skuPrice", val);
      } else {
        this.$set(this.skuData, "skuPrice", null);
      }
    },
    handleInput3(e) {
      if (e.match(/^\d*(\.?\d{1,2})/g)) {
        let val = e.match(/^\d*(\.?\d{1,2})/g)[0] || null;
        this.$set(this.product, "productPrice", val);
      } else {
        this.$set(this.product, "productPrice", null);
      }
    },
    handleInput4(e) {
      if (e.match(/^\d*(\.?\d{1,2})/g)) {
        let val = e.match(/^\d*(\.?\d{1,2})/g)[0] || null;
        this.$set(this.product, "topProportion", val);
      } else {
        this.$set(this.product, "topProportion", null);
      }
    },
    handleInput5(e) {
      if (e.match(/^\d*(\.?\d{1,2})/g)) {
        let val = e.match(/^\d*(\.?\d{1,2})/g)[0] || null;
        this.$set(this.product, "secondProportion", val);
      } else {
        this.$set(this.product, "secondProportion", null);
      }
    },
    async upperOrLower() {
      const id = await this.save(2);
      if (!id) {
        this.$toast("上架失败");
      }
      let model = {
        productId: id
      };
      model.state = 1;
      this.$http
        .get(this.$apis.product.upperOrLower, {
          params: {
            ...model
          }
        })
        .then(res => {
          if (res.code == "200") {
            this.$router.go(-1);
          }
          this.$toast(res.msg);
        });
    },
    async save(status) {
      if (!this.btnTrue) {
        return;
      }
      this.btnTrue = false;
      let resources = this.resources1.concat(this.resources2);
      resources.push({
        type: 2,
        resource: this.content
      });
      resources = resources.filter(item => {
        return item.resource != "";
      });
      let product = JSON.parse(JSON.stringify(this.product));
      product.productPrice = (product.productPrice || 0) * 100;
      let skus = JSON.parse(JSON.stringify(this.skus));
      for (let i in skus) {
        skus[i].skuPrice = (skus[i].skuPrice || 0) * 100;
        if (skus[i].regionPrices) {
          for (let j in skus[i].regionPrices) {
            skus[i].regionPrices[j].price = (skus[i].regionPrices[j].price || 0) * 100;
          }
        }
      }
      let resourcesT = resources.some(item => {
        return item.type == "1";
      });
      // 提交验证
      if (this.verification(resourcesT, product, skus)) {
        this.btnTrue = true
        return
      }

      let res = await this.$http.post(this.$apis.product.save, {
        product: product,
        resources: resources,
        regionPrices: this.regionPrices,
        skus: skus,
        assocProducts: this.assocProducts,
        resourcesT: resourcesT
      })
      if (res.code == 500) {
        this.btnTrue = true;
        this.$toast(res.msg);
        return
      }
      if (status == "1") {
        this.$router.go(-1);
        this.$toast(res.msg);
      }
      this.btnTrue = true;
      this.info(res.data, resources);

      return res.data;
    },
    verification(resourcesT, product, skus) {
      if (!resourcesT) {
        this.$toast('请上传主图')
        return true
      }
      if (!product.productImg) {
        this.$toast('请上传商品展示图')
        return true
      }
      if (!product.productName) {
        this.$toast('请填写商品名称')
        return true
      }
      if (!product.productPrice) {
        this.$toast('请填写商品价格')
        return true
      }
      if (skus.length == 0) {
        this.$toast('请添加规格')
        return true
      }
      if (product.topProportion == "" || product.topProportion == undefined
        || product.secondProportion == "" || product.secondProportion == undefined) {
        this.$toast('请添加分销规则')
        return true
      }
    },
    handleSelectionChange(val) {
      this.assocData = val;
    },
    showDialog(type, skuPrice, key) {
      if (type == "1") {
        // if (this.product.productPrice == undefined) {
        //   this.$toast("请先添加商品价格");
        //   return;
        // }
        this.dialogVisible = true;
        this.index = key;
        this.dialog = {
          title: "添加地区价格",
          width: "594px",
          type: 1,
          skuPrice: skuPrice
        };
      }
      if (type == "2") {
        // if (this.product.productPrice == undefined) {
        //   this.$toast("请先添加商品价格");
        //   return;
        // }
        this.dialogVisible = true;
        this.dialog = {
          title: "添加商品规格",
          width: "564",
          type: 2
        };
      }
      if (type == "3") {
        this.dialogVisible = true;
        this.dialog = {
          title: "选择关联商品",
          width: "698",
          type: 3
        };
      }
    },
    saveDialog(type, stuts) {
      if (type == "1") {
        this.checkValue(
          {
            price: [this.priceProportion, "小区折扣后价格"],
            regionId: [this.PriceData.id, "小区"]
          },
          res => {
            if (this.skus[this.index]["regionPrices"] == undefined) {
              this.skus[this.index]["regionPrices"] = [];
            }
            for (let item of this.skus[this.index]["regionPrices"]) {
              if (this.PriceData.regionName == item.regionName) {
                this.$toast('该小区已有地区价格')
                return
              }
            }
            this.skus[this.index]["regionPrices"].push({
              price: this.priceProportion, // 小区价格
              regionId: this.PriceData.id, // 小区id
              regionName: this.PriceData.regionName, // 小区名称
              address: this.PriceData.address, // 小区地址
              regionPrices: this.PriceData
            });
            this.priceProportion = 0;
            this.PriceData = {};
            this.dialogVisible = false;
          }
        );
      }
      if (type == "2") {
        this.checkValue(
          {
            skuPrice: [this.skuData.skuPrice, "价格"],
            skuName: [this.skuData.skuName, "规格名称"]
          },
          res => {
            this.skus.push({
              ...this.skuData
            });
            this.skuData = {};
            this.dialogVisible = stuts;
          }
        );
      }
      if (type == "3") {
        if (stuts) {
          let list = JSON.parse(JSON.stringify(this.assocProducts));
          this.assocProducts = this.unique(list.concat(this.assocData), "id");
        }
        this.$refs.multipleTable.clearSelection();
        this.dialogVisible = false;
      }
    },
    shopList() {
      this.$http
        .get(this.$apis.shop.list, {
          params: {
            pageNum: 1,
            pageSize: 100
          }
        })
        .then(res => {
          this.PricesList = res.data.data;
        });
    },
    onEditorChange(val) { },
    info(id, resources) {
      this.$http
        .get(`${this.$apis.product.detail}?productId=${id}`)
        .then(res => {
          if (res.code == "200") {
            this.assocProducts = res.data.assocProducts || [];
            this.product = res.data.product || {};
            this.$set(
              this.product,
              "productPrice",
              parseFloat(this.product.productPrice / 100)
            );
            this.regionPrices = res.data.regionPrices || [];
            this.skus = res.data.skus || [];
            for (let i in this.skus) {
              this.skus[i].skuPrice = parseFloat(this.skus[i].skuPrice / 100);
              if (this.skus[i].regionPrices) {
                for (let j in this.skus[i].regionPrices) {
                  this.skus[i].regionPrices[j].price = parseFloat(this.skus[i].regionPrices[j].price / 100);
                }
              }
            }
            // this.skus = this.skus.map(item => {
            //   item.skuPrice = parseFloat(item.skuPrice / 100);
            //   item.regionPrices = item.regionPrices.map(i => {
            //     i.price = parseFloat(i.price / 100);
            //     return i
            //   })
            //   return item;
            // });

            let list = res.data.resources || [];
            this.resources1 = list.filter(item => {
              return item.type == "3";
            });
            if (this.resources1.length == 0) {
              this.resources1.push({
                type: 3,
                resource: ""
              });
            }
            this.resources2 = list.filter(item => {
              if (item.type == "2") {
                this.content = item.resource;
              }
              return item.type == "1";
            });
            if (this.resources2.length < 3) {
              this.resources2.push({
                type: 1,
                resource: ""
              });
            }
            //富文本编辑器神坑处理
            this.$nextTick(function () {
              if (resources != undefined) {
                if (resources[1].resource == "" || resources[1].resource == null) {
                  return
                } else {
                  this.$refs.myQuillEditor.quill.enable(true);
                  this.$refs.myQuillEditor.quill.blur();
                }
              }
            });
          }
        });
    }
  }
};
</script>
<style scoped lang="scss">
.add .ql-editor {
  min-height: 190px;
  max-height: 500px;
}
.dialog-item {
  margin-bottom: 40px;
  span {
    display: inline-block;
    width: 110px;
    color: #52575a;
    font-size: 16px;
    margin-right: 20px;
  }
  p {
    display: inline-block;
    width: 355px;
    color: #52575a;
    font-size: 16px;
  }
}
.add {
  &-btn {
    width: 100px;
    height: 40px;
    background: rgba(255, 110, 57, 1);
    border-radius: 12px;
    font-size: 14px;
    color: #ffffff;
    margin-top: 90px;
  }
  &-btn2 {
    width: 100px;
    height: 40px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 12px;
    border: 1px solid rgba(227, 95, 37, 1);
    font-size: 14px;
    color: #ff6e39;
    box-sizing: border-box;
    margin-left: 16px;
    margin-top: 90px;
  }
  &-title {
    font-size: 32px;
    color: #52575a;
    padding: 24px 0;
    margin-bottom: 50px;
  }
  &-item {
    margin-bottom: 15px;
    display: flex;
    &-assoc {
      height: 50px;
      max-width: 660px;
      border-radius: 8px;
      border: 1px solid rgba(225, 225, 225, 1);
      margin-bottom: 15px;
      img {
        width: 40px;
        height: 40px;
        object-fit: cover;
        margin: 5px;
        display: block;
      }
      p {
        font-size: 12px;
        padding: 0 10px;
        flex: 1;
        color: #52575a;
        border-right: 1px solid #e1e1e1;
        display: block;
        @include ellipsis(2);
      }
      i {
        font-size: 14px;
        padding: 0 5px;
      }
    }
    &-addCost {
      height: 40px;
      border-radius: 5px;
      border: 1px solid rgba(225, 225, 225, 1);
      margin-bottom: 15px;
    }
    &-addPrice {
      height: 40px;
      border-radius: 5px;
      border: 1px solid rgba(225, 225, 225, 1);
      margin-bottom: 15px;
      span {
        min-width: 360px;
        font-size: 16px;
        padding: 0 15px;
        line-height: 38px;
        border-right: 1px solid #e1e1e1;
        display: block;
      }
      p {
        min-width: 360px;
        font-size: 16px;
        padding: 0 10px;
        flex: 1;
        text-align: center;
        line-height: 38px;
        border-right: 1px solid #e1e1e1;
        display: block;
      }
      i {
        font-size: 14px;
        padding: 0 5px;
      }
    }
    &-rightD {
      margin-bottom: 24px;
      p {
        font-size: 16px;
        color: #52575a;
        margin-right: 20px;
      }
    }
    &-add {
      width: 120px;
      height: 40px;
      background: rgba(255, 255, 255, 1);
      border-radius: 4px;
      border: 1px solid rgba(255, 110, 57, 1);
      color: #e35f25;
      font-size: 14px;
      i {
        margin-right: 5px;
        font-size: 14px;
      }
    }
    &-inputName {
      font-size: 16px;
      color: #52575a;
      margin-right: 20px;
    }
    &-inputValue {
      width: 360px;
    }
  }
  &-item-left {
    width: 160px;
    text-align: right;
    font-size: 16px;
    color: #52575a;
    line-height: 40px;
  }
  &-item-rightImg {
    width: 22px;
    height: 22px;
    position: absolute;
    right: 10px;
    top: -10px;
  }
  &-item-right {
    margin-left: 21px;
  }
  &-item-upload {
    background: #e1e1e1;
    width: 80px;
    height: 80px;
    flex-direction: column;

    img {
      width: 12px;
      height: 12px;
      margin-bottom: 8px;
    }
    p {
      font-size: 12px;
      color: #c0c3cf;
    }
  }
  span.redColor {
    color: red;
  }
}
</style>

