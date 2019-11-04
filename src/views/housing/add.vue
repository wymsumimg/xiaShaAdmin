<template>
  <div class="message">
    <div class="message-item" flex="cross:center">
      <div class="message-item-left">
        行政划分
        <span>*</span>
      </div>
      <div class="message-item-right">
        <el-select v-model="value" placeholder="请选择" style="margin-right: 20px;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value" placeholder="请选择" style="margin-right: 20px;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value" placeholder="请选择" style="margin-right: 20px;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="message-item">
      <div class="message-item-left">
        小区名称
        <span>*</span>
      </div>
      <div class="message-item-right">
        <div class="message-item-input" flex="cross:center">
          <el-input v-model="dataMessage.companyName" placeholder="请输入" class="message-item-inputValue"></el-input>
        </div>
      </div>
    </div>
    <div class="message-item">
      <div class="message-item-left">
        小区楼幢
        <span>*</span>
      </div>
      <div class="message-item-right">
        <div class="message-item-input" flex="cross:center" v-if="false">
          <div class="message-item-add" flex="cross:center main:center" @click="showDialog(1,item.skuPrice,key)" btn>
            <i class="el-icon-plus"></i>添加小区楼幢
          </div>
        </div>
        <div class="add-item" v-show="true" style="margin-bottom: 50px; width: 640px;">
          <el-table :data="list" style="width: 100%;border-top: 1px solid #F0F0F0;">
            <el-table-column label="楼幢" align="center" prop="item">
              {{list.skuName}}
            </el-table-column>
            <el-table-column label="该幢负责人" align="center" prop="item">
            </el-table-column>
            <el-table-column label="联系电话" align="center" prop="item" style="color: #FF6E39; ">
            </el-table-column>
            <el-table-column label="操作" align="center" prop="item">
              <slot slot-scope="scope">
                <span @click="deleteTableData(item, scope.$index)" style="color: #3A84FF; padding-right: 18px;">编辑</span>

                <span @click="deleteTableData(item, scope.$index)" style="color: #8A8A8A;">重置</span>
              </slot>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="message-item ">
      <div class="message-item-left ">
        详细地址
        <span>*</span>
      </div>
      <div class="message-item-right ">
        <div class="message-item-input " flex="cross:center ">
          <el-input v-model="dataMessage.companyDesc " class="message-item-inputValue " placeholder="请输入
          " type='textarea' :rows="3 " :maxlength='200'></el-input>
        </div>
      </div>
    </div>
    <div class="message-item ">
      <div class="message-item-left ">小区负责人</div>
      <div class="message-item-right ">
        <div class="message-item-input " flex="cross:center ">
          <el-input v-model="dataMessage.companyDesc " class="message-item-inputValue " placeholder="请输入该小区负责业务员 " type='text'></el-input>
        </div>
      </div>
    </div>
    <div class="message-item ">
      <div class="message-item-left ">联系电话</div>
      <div class="message-item-right ">
        <div class="message-item-input " flex="cross:center ">
          <el-input v-model="dataMessage.companyDesc " class="message-item-inputValue " placeholder="请输入该业务员联系电话 " type='text'></el-input>
        </div>
      </div>
    </div>
    <div class="message-btn " btn flex="cross:center main:center " @click="saveInfo ">
      保存
    </div>
    <l-dialog :dialogVisible.sync='buildingDialog' title='添加小区楼幢' width='540px' :center="true ">
      <div class="brokerage ">
        <div class="brokerage-left ">提现门槛
          <span>*</span>
        </div>
        <div>
          <div>
            <input class="brokerage-input " type="number ">幢
          </div>
          <div style="color: #FF6E39 ">请输入大于0的整数，如1，2…</div>
        </div>
      </div>
      <div class="brokerage ">
        <div class="brokerage-left ">姓名</div>
        <div>
          <input class="brokerage-input2 " type="number ">
        </div>
      </div>
      <div class="brokerage " style="margin-bottom: 54px; ">
        <div class="brokerage-left ">联系电话</div>
        <div>
          <input class="brokerage-input2 " type="number ">
        </div>
      </div>
      <div flex="main:center ">
        <div class="orderDetail-dialog-btn " flex="main:center cross:center " style="width: 200px; margin: 0 16px 0 0; " btn @click='updateWithdraw'>确定</div>
        <div class="orderDetail-dialog-btn2 " flex="main:center cross:center " btn @click='updateWithdraw'>取消</div>
      </div>
    </l-dialog>
  </div>
</template>

<script type="text/babel">
export default {
  components: {
  },
  data() {
    return {
      spec: {
        width: 300,
        height: 300,
        size: '500K',
      },
      imgUrl: '',
      dataMessage: {},
      options: [],
      value: '',
      buildingDialog: false,
      list: [{}]
    };
  },
  created() {
    // this.info()
  },
  methods: {
    showDialog() { },
    deleteTableData() { },
    saveInfo() {
      let model = this.dataMessage
      model.companyLogo = this.imgUrl
      this.checkValue({
        companyLogo: [model.companyLogo, 'logo图片'],
        companyName: [model.companyName, '企业名称'],
        companyDesc: [model.companyDesc, '企业简介'],
      }, () => {
        this.$http.post(this.$apis.company.saveInfo, {
          ...model
        }).then(res => {
          if (res.code == '200') {
            this.$toast(res.msg)
            this.$router.go(-1)
          }
        })
      })

    },
    info() {
      this.$http.get(this.$apis.company.info).then(res => {
        if (res.code == '200') {
          this.dataMessage = res.data
          this.imgUrl = res.data.companyLogo
        }
      })
    },
  }
};
</script>
<style scoped lang="scss">
.message {
  &-btn {
    width: 360px;
    height: 52px;
    background: rgba(255, 110, 57, 1);
    border-radius: 10px;
    margin-left: 181px;
    margin-top: 115px;
    font-size: 18px;
    color: #ffffff;
  }
  &-title {
    font-size: 32px;
    color: #52575a;
    padding: 24px 0;
    margin-bottom: 50px;
  }
  &-item {
    display: flex;
    margin-bottom: 24px;
    &-left {
      width: 160px;
      text-align: right;
      font-size: 16px;
      color: #52575a;
      line-height: 40px;
      span {
        color: #ff6e39;
      }
    }
    &-right {
      margin-left: 21px;
      display: flex;
    }
    &-upload {
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
    &-inputValue {
      width: 640px;
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
  }
}
.brokerage {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  span {
    color: #ff6e39;
  }
  &-left {
    margin: 0 20px 0 60px;
    text-align: right;
    width: 80px;
  }
  &-input {
    width: 138px;
    height: 52px;
    border-radius: 10px;
    border: 1px solid rgba(225, 225, 225, 1);
    margin-right: 20px;
    padding: 0 20px;
  }
  &-input2 {
    width: 310px;
    height: 52px;
    border-radius: 10px;
    border: 1px solid rgba(225, 225, 225, 1);
    margin-right: 20px;
    padding: 0 20px;
  }
}
.orderDetail-dialog-btn {
  width: 360px;
  height: 52px;
  background: rgba(255, 110, 57, 1);
  border-radius: 10px;
  border: 1px solid rgba(227, 95, 37, 1);
  box-sizing: border-box;
  font-size: 18px;
  margin: 20px auto;
  color: #ffffff;
  text-align: center;
  line-height: 52px;
}
.orderDetail-dialog-btn2 {
  width: 200px;
  height: 52px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  border: 1px solid rgba(255, 110, 57, 1);
  color: rgba(255, 110, 57, 1);
  font-size: 18px;
  text-align: center;
  line-height: 52px;
}
</style>

