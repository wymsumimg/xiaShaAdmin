<template>
    <div class="container">
        <div flex="cross:center main:justify">
            <div class="detailTitle">
                一级分销人员详情
            </div>
            <div>
                <el-button>全部转移</el-button>
            </div>    
        </div>
        <div class="top" flex="cross:center">
            <div flex-box="0" class="infoDetail">
                <div class="headIcon">
                    <img src="" alt="">
                </div>
                <div class="name">苏小小</div>
                <div class="mobile">152 7698 5233</div>
                <div class="position">网络工程师</div>
                <div class="editBtn">编辑信息</div>
            </div>
            <div flex-box="1" class="topData">
                <ul class="dataList" flex="cross:center main:justify">
                    <li flex-box="1">
                        <div class="dataTit">成交订单数</div>
                        <div class="dataNum">2920</div>
                    </li>
                    <li flex-box="1">
                        <div class="dataTit">成交额</div>
                        <div class="dataNum">2920</div>
                    </li>
                    <li flex-box="1">
                        <div class="dataTit">二级人员总数</div>
                        <div class="dataNum">2920</div>
                    </li>
                    <li flex-box="1">
                        <div class="dataTit">所获佣金</div>
                        <div class="dataNum">2920</div>
                    </li>
                </ul>
                <div>
                    <div class="regionTxt">责任小区</div>
                    <div class="regionList">四季青小区；松和时代城小区；嘉绿景苑；帝豪家园；钱江时代广场小区；荷花苑；月雅城；骆家庄南苑；</div>
                </div>
            </div>
            <div flex-box="0">
                <div class="cardCode">
                    <img src="" alt="">
                </div>
                <div class="downloadTxt">下载名片码 ></div>
            </div>
        </div>
        <div class="one">
            <div>
                <div class="one-title">
                  <span btn @click='activeType = 1' :class="activeType == '1'? 'one-title-spanAct' : ''">二级人员列表</span>
                  <span btn @click='activeType = 2' :class="activeType == '2'? 'one-title-spanAct' : ''">客户列表</span>
                  <span btn @click='activeType = 3' :class="activeType == '3'? 'one-title-spanAct' : ''">订单列表</span>
                </div> 
            </div>
            <div>
                <div style="padding: 0 24px;box-sizing: border-box;margin-top: 24px;" v-show="activeType == '1'">
                    <el-table
                    :data="productList"
                    style="width: 100%;"
                    header-cell-class-name='rowClass'>
                        <el-table-column prop="sort" align="center" header-align="center" width='70' label="序号">
                            <slot slot-scope="scope">
                                {{getIndex(scope.$index, productSize, productNum)}}
                            </slot>
                        </el-table-column>
                        <el-table-column
                            prop="userName"
                            label="姓名"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="orderNum"
                            label="手机号">
                        </el-table-column>
                        <el-table-column
                            prop="orderNo"
                            label="加入时间"
                            align="center">
                            <slot slot-scope="scope">
                            {{ scope.row.sales | getMoney(2)}}
                            </slot>
                        </el-table-column>
                        <el-table-column
                            prop="amount"
                            label="成交订单数"
                            align="center">
                            <slot slot-scope="scope">
                            {{ scope.row.bringBrowse | getMoney(2)}}
                            </slot>
                        </el-table-column>
                        <el-table-column
                            prop="amount"
                            label="成交额"
                            align="center">
                            <slot slot-scope="scope">
                            {{ scope.row.bringBrowse | getMoney(2)}}
                            </slot>
                        </el-table-column>
                        <el-table-column
                                align="center"
                            prop="shareNum"
                            label="获得佣金">
                        </el-table-column>
                        <el-table-column
                            prop="amount"
                            label="操作"
                            align="center">
                            <slot slot-scope="scope">
                              <span class="actBtn" style="color:rgba(57,71,255,1);" @click="transPerson()">转移</span>
                              <span class="actBtn" style="color:rgba(255,110,57,1);" @click="deletePerson()">删除</span>
                            </slot>
                        </el-table-column>
                    </el-table>
                    <l-pagination flex='main:right' :dataList.sync='productList' :item='productJson' requestMethod='post' @update:page = 'getProductPage'></l-pagination>
                </div>
                <div style="padding: 0 24px;box-sizing: border-box;margin-top: 24px;" v-show="activeType == '2'">
                    <el-table
                    :data="memberList"
                    style="width: 100%;"
                    header-cell-class-name='rowClass'>
                        <el-table-column prop="sort" align="center" header-align="center" width='70' label="序号">
                            <slot slot-scope="scope">
                                {{getIndex(scope.$index, productSize, productNum)}}
                            </slot>
                        </el-table-column>
                        <el-table-column
                            prop="cardUserName"
                            label="姓名"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="shareUserName"
                            label="手机号">
                        </el-table-column>
                        <el-table-column
                            prop="userName"
                            label="小区地址"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="payTime"
                            label="成交订单数"
                            align="center">
                            <slot slot-scope="scope">
                            {{ scope.row.payTime | getTime}}
                            </slot>
                        </el-table-column>
                            <el-table-column
                                align="center"
                            prop="amount"
                            label="成交额">
                            <slot slot-scope="scope">
                            {{ scope.row.amount | getMoney(2)}}
                            </slot>
                        </el-table-column>
                        <el-table-column
                            prop="amount"
                            label="操作"
                            align="center">
                            <slot slot-scope="scope">
                              <span class="actBtn" style="color:rgba(57,71,255,1);">转移</span>
                              <span class="actBtn" style="color:rgba(255,110,57,1);" @click="toDetail()">详情</span>
                            </slot>
                        </el-table-column>
                    </el-table>
                    <l-pagination flex='main:right' :dataList.sync='memberList' :item='memberJson' requestMethod='post'></l-pagination>
                </div>
                <div style="padding: 0 24px;box-sizing: border-box;margin-top: 24px;" v-show="activeType == '3'">
                    <el-table
                    :data="memberList"
                    style="width: 100%;"
                    header-cell-class-name='rowClass'>
                        <el-table-column prop="sort" align="center" header-align="center" width='70' label="序号">
                            <slot slot-scope="scope">
                                {{getIndex(scope.$index, productSize, productNum)}}
                            </slot>
                        </el-table-column>
                        <el-table-column
                            prop="cardUserName"
                            label="订单号"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="shareUserName"
                            label="创建时间">
                        </el-table-column>
                        <el-table-column
                            prop="userName"
                            label="商品名称"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="payTime"
                            label="规格"
                            align="center">
                            <slot slot-scope="scope">
                            {{ scope.row.payTime | getTime}}
                            </slot>
                        </el-table-column>
                            <el-table-column
                                align="center"
                            prop="amount"
                            label="金额">
                            <slot slot-scope="scope">
                            {{ scope.row.amount | getMoney(2)}}
                            </slot>
                        </el-table-column>
                        <el-table-column
                            prop="amount"
                            label="成交人"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="amount"
                            label="本次获得佣金"
                            align="center">
                        </el-table-column>
                    </el-table>
                    <l-pagination flex='main:right' :dataList.sync='memberList' :item='memberJson' requestMethod='post'></l-pagination>
                </div>
            </div>
            <!-- 删除 -->
            <l-dialog :dialogVisible.sync='dialogVisible' title='温馨提示' width='550px' :center="true">
                <div style="font-size:16px;font-weight:400;color:rgba(102,102,102,1);text-align:center;">您确定要从删除二级人员王五吗？（删除后不可恢复）</div>
                <div flex="cross:center dir:top">
                    <div flex="main:right cross:center" style="padding: 20px 0;">
                        <div class="add-btn" btn flex="cross:center main:center" style="width: 100px;margin-top: 0;border-radius: 10px;" @click="saveDialog(1, true)">保存</div>
                        <div class="add-btn2" btn flex="cross:center main:center" style="width: 100px;margin-top: 0;border-radius: 10px;" @click="saveDialog(1)">取消</div>
                    </div>
                </div>
            </l-dialog>
            <!-- 全部转移 -->
            <l-dialog :dialogVisible.sync='dialogVisible2' title='全部转移' width='550px' :center="true">
                <div flex="cross:center main:center">
                    <div style="font-size:16px;font-family:PingFang-SC-Regular,PingFang-SC;font-weight:400;color:rgba(82,87,90,1);margin-right:35px;">转移至</div>
                    <div>
                        <el-select v-model="value" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
                <div flex="cross:center dir:top">
                    <div flex="main:right cross:center" style="padding: 20px 0;">
                        <div class="add-btn" btn flex="cross:center main:center" style="width: 100px;margin-top: 0;border-radius: 10px;" @click="saveDialog(2, true)">保存</div>
                        <div class="add-btn2" btn flex="cross:center main:center" style="width: 100px;margin-top: 0;border-radius: 10px;" @click="saveDialog(2)">取消</div>
                    </div>
                </div>
            </l-dialog>
            <!-- 转移二次确认 -->
            <l-dialog :dialogVisible.sync='dialogVisible2' title='温馨提示' width='550px' :center="true">
                <div style="font-size:16px;font-weight:400;color:rgba(102,102,102,1);text-align:center;">您确定要从删除二级人员王五吗？（删除后不可恢复）</div>
                <div flex="cross:center dir:top">
                    <div flex="main:right cross:center" style="padding: 20px 0;">
                        <div class="add-btn" btn flex="cross:center main:center" style="width: 100px;margin-top: 0;border-radius: 10px;" @click="saveDialog(4, true)">确定</div>
                        <div class="add-btn2" btn flex="cross:center main:center" style="width: 100px;margin-top: 0;border-radius: 10px;" @click="saveDialog(4)">取消</div>
                    </div>
                </div>
            </l-dialog>
        </div>   
    </div>
</template>

<script type="text/babel">
export default {
  components: {
  },
  data() {
    return {
        topData: {},
        productOption: 1,
        productOrderColumn: '',
        productOrderRule: '',
        memberOption: 1,
        productList: [],
        memberList: [],
        memberSize: 10,
        membertNum: 1,
        productSize: 10,
        productNum: 1,
        timeModel:2,
        totalObj:{objOne:{title:'销售总额'},objTwo:{title:'产品查看数'},objThree:{title:'一级人员卖出'},objFour:{title:'二级人员卖出'}},
        activeType: 1,
        dialogVisible:false,
        dialogVisible2:false,
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
    };
  },
  created() {
    this.getTop()
  },
  computed: {
    productJson() {
      return {
        model: {
          dateOption: this.productOption,
          orderColumn: this.productOrderColumn,
          orderRule: this.productOrderRule,
        },
        url: this.$apis.main.productRank,
      }
    },
    memberJson() {
      return {
        model: {
          dateOption: this.memberOption,
          orderColumn: this.memberOrderColumn,
          orderRule: this.memberOrderRule,
        },
        url: this.$apis.main.memberRank,
      }
    }
  },
  mounted(){
  },
  methods: {
    toAddRole(){
        this.$router.push('/distribution/addRole')
    },
    toDetail(){
        this.$router.push('/distribution/userDetail')
    },
    transPerson(){
        this.dialogVisible2=true
    },
    deletePerson(){
       this.dialogVisible=true 
    },
    saveDialog(num){
        if(num==1){
            this.dialogVisible=false
        }else if(num==2){
            this.dialogVisible2=false
        }
        
    },


    productSortChange(column) {
      this.productOrderColumn = column.prop
      this.productOrderRule = column.order == "descending" ? 'desc' : 'asc'
    },
    memberSortChange(column) {
      this.memberOrderColumn = column.prop
      this.memberOrderRule = column.order == "descending" ? 'desc' : 'asc'
    },
    getMemberPage(val) {
      this.productSize = val.pageSize
      this.productNum = val.pageNum
    },
    getProductPage(val) {
      this.memberSize = val.pageSize
      this.membertNum = val.pageNum
    },
    getIndex(index, size, num) {
      return index + 1 + (num - 1) * size
    },
    handleCurrentProduct(val) {
      this.$router.push({
        name: 'dataProduct',
        query: {
          dataItem: JSON.stringify(val),
          productId: val.id,
        }
      })
    },
    handleCurrentMember(val) {
      this.$router.push({
        name: 'dataMember',
        query: {
          userName: val.userName,
          userId: val.id,
        }
      })
    },
    getTop() {
      this.$http.get(this.$apis.main.getTop).then(res => {
        if (res.code == '200') {
          this.topData = res.data
        }
      })
    },
  }
};
</script>
<style>
.wrapper .el-table th > .cell {
  font-size: 16px !important;
  color: #94979b !important;
  font-weight: normal !important;
}
</style>
<style lang="scss" scoped>
.container {
  overflow: auto;
  height: 100%;
  padding: 0 !important;
  background: #f0f1f2 !important;
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
.actBtn{
    font-size:14px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    margin: 0 10px;
}
.detailTitle{
    font-size:32px;
    font-family:PingFang-SC-Regular,PingFang-SC;
    font-weight:400;
    color:rgba(82,87,90,1);
    margin-bottom: 30px;
}

.top {
    background: white;
    padding: 20px 35px 30px 35px;
    border-radius:10px;
    .infoDetail{
        text-align: center;
        margin-right: 30px;
        .headIcon{
            width: 80px;
            height: 80px;
            border: 1px solid #ccc;
            border-radius: 50%;
            margin: 0 auto;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .name{
            font-size:14px;
            font-family:PingFangSC-Semibold,PingFangSC;
            font-weight:600;
            color:rgba(0,0,0,0.45);
            margin-top: 10px;
        }
        .mobile{
            font-size:18px;
            font-family:HelveticaNeue;
            color:rgba(255,110,57,0.85);
            margin-top: 20px;
        }
        .position{
            font-size:16px;
            font-family:PingFangSC-Regular,PingFangSC;
            font-weight:400;
            color:rgba(70,70,70,0.85);
            margin-top: 30px;
        }
        .editBtn{
            padding: 5px 15px;
            font-size:14px;
            font-family:PingFang-SC-Regular,PingFang-SC;
            font-weight:400;
            color:rgba(255,110,57,1);
            border: 1px solid rgba(255,110,57,1);
            border-radius: 16px;
            margin-top: 20px;
        }
    }
    .topData{
        .dataList{
            margin-bottom: 30px;
            >li{
                padding: 10px 40px 40px;
                border-left: 2px solid #D9D9D9;
                &:nth-last-child(1) {
                    border-right: 2px solid #D9D9D9;
                }
                .dataTit{
                    text-align: center;
                }
                .dataNum{
                    text-align: center;
                }    
            }
            
        }
        .regionTxt{
            font-size:14px;
            font-family:PingFangSC-Regular,PingFangSC;
            font-weight:400;
            color:rgba(0,0,0,0.45);
        }
        .regionList{
            font-size:18px;
            font-family:PingFangSC-Regular,PingFangSC;
            font-weight:400;
            color:rgba(70,70,70,0.85);
            min-height: 100px;

        }
    }
    .cardCode{
        width: 200px;
        height: 200px;
        margin: 0 35px;
        border: 1px solid #ccc;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .downloadTxt{
        margin-top: 30px;
        font-size:20px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(58,132,255,1);
        text-align: center;
    }
}



.wrapper {
  border-radius: 20px;
  background: #fff;
  box-sizing: border-box;
  margin-top: 20px;
  padding: 20px;
}

.font {
  color: #52575a;
  font-size: 16px;
}
.detailFont{
  color: #485CFF;
}
.orFont {
  color: #ff6e39;
  font-size: 16px;
}

.imgWrapper {
  border-radius: 10px;
  background: red;
  @include imgBox(54px, 54px);
}

.pagination {
  padding: 20px 20px 0;
}

.wrapper-title {
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
}

.commonTitle-right {
  width: 240px;
  height: 30px;
  background: #ebedf1;
  border-radius: 30px;
  padding: 2px 5px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}

.commonTitle-item {
  width: 56px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  border-radius: 26px;
  font-size: 14px;
  color: #404065;
}

.commonTitle-itemAct {
  color: #ff6e39;
  background: #ffffff;
  box-shadow: 0px 0px 6px 0px rgba(77, 115, 201, 0.28);
}

.one {
    background:rgba(255,255,255,1);
    border-radius:10px;
    margin-top: 25px;
    padding: 20px 40px;
    .rankTitle{
      font-size:32px;
      font-family:PingFang-SC-Regular,PingFang-SC;
      font-weight:400;
      color:rgba(82,87,90,1);
    }
  &-title {
    height: 55px;
    width: 100%;
    border-bottom: 1px solid #e9e9e9;
    box-sizing: border-box;
    
    span {
      margin: 0 16px;
      display: inline-block;
      line-height: 51px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
    }
    &-spanAct {
      color: rgba(0, 0, 0, 0.85) !important;
      font-size: 18px !important;
      font-weight: bold;
      border-bottom: 4px solid #ff6e39;
    }
  }
}
</style>