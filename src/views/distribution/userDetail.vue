<template>
    <div class="container">
        <div class="wrapper" flex>
            <div flex-box="0">
                <div class="preview-container">
                    <div class="title">用户详情</div>
                    <div class="user_detail">
                        <el-form class="demo-form-inline" label-width="80px" label-position='left'>
                            <el-form-item label="用户名">
                                <span class="spanStyle">{{form.userName}}</span>
                            </el-form-item>
                            <el-form-item label="手机号">
                                <span class="spanStyle">{{form.userName}}</span>
                            </el-form-item>
                            <el-form-item label="消费金额">
                                <span class="spanStyle money">{{form.consumeMoney/100}}元</span>
                            </el-form-item>
                            <el-form-item label="小区地址">
                                <span class="spanStyle">{{form.createTime}}</span>
                            </el-form-item>
                            <el-form-item label="成交订单">
                                <span class="spanStyle">{{form.createTime}}</span>
                            </el-form-item>
                            <el-form-item label="身份证号">
                                <span class="spanStyle">{{form.createTime}}</span>
                            </el-form-item>
                            <el-form-item label="身份正面">
                                <div style="width:180px;height:120px;">
                                    <img src="" alt="" style="width:100%;height:100%;object-fill:cover;">
                                </div>
                            </el-form-item>
                            <el-form-item label="身份反面">
                                <div style="width:180px;height:120px;">
                                    <img src="" alt="" style="width:100%;height:100%;object-fill:cover;">
                                </div>
                            </el-form-item>
                            <!-- <el-button type="primary" style="width:100%">保存</el-button> -->
                        </el-form>
                    </div>
                </div>    
            </div>
            <div flex-box="1">
                <div class="right">
                    <div class="title">
                        <div>用户动态</div>
                        <ul>
                            <li style="font-size:14px;font-family:PingFangSC-Semibold;font-weight:600;color:rgba(82,87,90,1);">{{form.userName}}</li>
                            <li>共访问{{form.visitNum}}次</li>
                            <li>消费{{form.consumeMoney/100}}元</li>
                        </ul> 
                    </div>
                    <ul class="recordList">
                        <li class="recordItem" v-for="item in productList.data">
                            <div class="visitTime">
                                访问时间：{{item.createTime}}
                            </div>
                            <div class="watchProduct" flex>
                                <span flex-box='0'>查看商品：</span> 
                                <ul flex-box="1" v-if="item.productBrowse">
                                    <li class="listOuter" v-for="(productItem,index) in item.productBrowse" :key="index">
                                        <div class="actTime">停留{{productItem.stopTime?productItem.stopTime:1}}秒</div>
                                        <div class="listProduct">
                                            <div class="img">
                                                <img :src="productItem.productImg || 'https://cdn.i31.com/oss/img/userPhoto/334569239c0447cab6ed36b1eeb76b7f.jpeg'" alt="">
                                            </div>
                                            <div class="desc">
                                                <div class="productTitle">{{productItem.productTitle}}</div>
                                                <span class="price">¥{{productItem.productPrice/100}}</span>
                                            </div>    
                                        </div>
                                        
                                    </li>
                                </ul>
                                <div flex-box="1" v-else>暂无记录</div>
                            </div>   
                            <div class="watchProduct" flex>
                                <span flex-box='0'>下单商品：</span> 
                                <ul flex-box="1" v-if="item.userOrderDynamic">
                                    <li class="listOuter" v-for="(orderItem,index) in item.userOrderDynamic" :key="index">
                                        <div class="actTime">{{orderItem.orderNo}}</div>
                                        <div class="listProduct">
                                            <div class="img">
                                                <img :src="orderItem.productImg || 'https://cdn.i31.com/oss/img/userPhoto/334569239c0447cab6ed36b1eeb76b7f.jpeg'" alt="">
                                            </div>
                                            <div class="desc">
                                                <div class="productTitle">{{orderItem.productTitle}}</div>
                                                <span class="price">¥{{orderItem.productPrice/100}}</span>
                                            </div>    
                                        </div>
                                        
                                    </li>
                                </ul>
                                <div flex-box="1" v-else>暂无记录</div>
                            </div>       
                        </li>
                    </ul>
                    <div class="notice-pagination">
                        <div flex="main:right">
                            <el-pagination  @current-change="changePage" :current-page.sync="currentPage" :page-size="pageSize" :background="background" layout="prev,pager,next,jumper" :total="productList.total"></el-pagination>
                        </div>
                    </div>
                </div>    
            </div>
            
        </div>
        <el-dialog title="变更积分" :visible.sync="showChangeLevel" width="540px" class="dialog" center>
            <div class="addPrice">
                <div class="nowGrade">目前积分：<span>{{form.userScore}}</span></div>
                <el-input placeholder="输入新积分" @blur="testNumber(userScore)" maxlength="7" v-model="userScore"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="updateTotalScore()" style="width:360px">保存</el-button>
            </span>
        </el-dialog>
        <el-dialog title="变更经验值" :visible.sync="showExperience" width="540px" class="dialog" center>
            <div class="addPrice">
                <div class="nowGrade">目前经验值：<span>{{form.experience}}</span></div>
                <el-input placeholder="输入新经验值" @blur="testNumber(experience)" maxlength="7" v-model="experience"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="updateExperience()" style="width:360px">保存</el-button>
            </span>
        </el-dialog>
        <!-- 发放优惠 -->
        <el-dialog title="发放优惠" :visible.sync="showTreatment" width="40%" center>
            <div class="addPrice">
                <el-form label-width="100px" :model="formPost" :rules="rules" ref="form">
                    <el-form-item label="优惠券金额" prop="amount">
                        <el-input placeholder="¥ 金额" @blur="testNumber(form.amount)" maxlength="7"  v-model="formPost.amount"></el-input>
                    </el-form-item>
                    <el-form-item label="使用限制" prop="fullAmount">
                        <el-input placeholder="¥ 订单大于多少金额可使用优惠券" @blur="testNumber(form.amount)" maxlength="7"  v-model="formPost.fullAmount"></el-input>
                    </el-form-item>
                    <el-form-item label="有效时间" prop="datePick">
                        <el-date-picker v-model="formPost.datePick" value-format="timestamp" type="daterange" @change="dateChange(2)" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" style="width:100%"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="优惠券数量" prop="provideAmount">
                        <el-input-number v-model="formPost.provideAmount" @change="handleChange" label="输入张数"></el-input-number>
                    </el-form-item>
                </el-form>
            </div>
            
            <span slot="footer" class="dialog-footer">
                <div style="padding:0 85px">
                   <el-button type="primary" @click="couponProvide()" style="width:100%;">保存</el-button> 
                </div>
                
            </span>
        </el-dialog>
    </div>
</template>
<script type="text/babel">

// import {getUserDetail,updateTotalScore,updateExperience,getDynamic,couponProvide} from '../../api/api'
export default{

    data(){
        return{
            form: {
            },
            productList:[],
            showChangeLevel:false,
            showExperience:false,
            experience:'',
            userScore:'',
            background:true,
            currentPage:1,
            pageSize:1,
            total:0,
            productBrowse:[],
            userOrderDynamic:[],
            formPost:{

            },
            showTreatment:false,
            rules:{
                amount: [
                    { required: true, message: '请输入金额', trigger: 'blur' }
                ],
                fullAmount: [
                    { required: true, message: '请输入使用限制', trigger: 'blur' }
                ],
                datePick: [
                    { required: true, message: '请输入有效时间', trigger: 'blur' }
                ],
                provideAmount: [
                    { required: true, message: '请输入优惠券数量', trigger: 'blur' }
                ],
            }
        }
    },
    mounted(){
        this.getUserDetail();
        this.getDynamic();
    },
    methods:{
        //获取详情
        getUserDetail() {
            let param = {
                userId:this.$route.query.id
            };
            getUserDetail(param).then(res => {
              let { code, data } = res;
              if (code == 200) {
                console.log(data)
                this.form=data
              }
            });
        },
        testNumber(value){
            if(isNaN(value)&&value){
              this.$message.error('请输入数字')
              return;
            }
        },
        testNumber(value){
            if(isNaN(value)&&value){
              this.$message.error('请输入数字')
              return;
            }
        },
        //发放优惠
        postSale(){
            this.showTreatment=true
        },
        dateChange(num){
            if(this.datePick){
                this.startDate=this.datePick[0]
                this.endDate = this.datePick[1]
                console.log(this.startDate)    
            }else{
                this.startDate=''
                this.endDate = ''
            }
            if(num==2){
                if(this.formPost.datePick){
                    this.formPost.startTime=this.formPost.datePick[0]
                    this.formPost.endTime = this.formPost.datePick[1]
                }    
            }
        },
        handleChange(){

        },
        //发券
        couponProvide(){
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    // if(this.form.provideAmount<=0){
                    //     this.$message.error('优惠券数量需大于0')
                    // }
                    let param = {
                        userId:this.$route.query.id,
                        ...this.formPost
                    };
                    couponProvide(param).then(res => {
                        let { code, data } = res;
                        if (code == 200) {
                            this.showTreatment = false;
                            this.$message.success('发放优惠成功')
                            this.$refs['form'].resetFields();
                        }
                    });        
                } else {
                  return false;
                }
            });
            
        },
        //修改积分
        updateTotalScore() {
            let param = {
                userId:this.$route.query.id,
                scoreNum:this.userScore
            };
            updateTotalScore(param).then(res => {
              let { code, data } = res;
              if (code == 200) {
                console.log(data)
                this.showChangeLevel = false
                this.$message.success('修改积分成功')
                this.scoreNum=''
                this.getUserDetail();
              }
            });
        },
        //修改经验值
        updateExperience() {
            let param = {
                userId:this.$route.query.id,
                number:this.experience
            };
            updateExperience(param).then(res => {
              let { code, data } = res;
              if (code == 200) {
                console.log(data)
                this.showExperience = false
                this.$message.success('修改经验值成功')
                this.experience=''
                this.getUserDetail();
              }
            });
        },
        jump(id){
            this.$router.push('/invitor?id='+id)
        },
        //用户动态
        getDynamic(){
            let param = {
                userId:this.$route.query.id,
                currentPage:this.currentPage,
                pageSize:this.pageSize
            };
            getDynamic(param).then(res => {
              let { code, data } = res;
              if (code == 200) {
                
                if(data){
                    this.productList=data
                }
                // this.userOrderDynamic=data.data[0].userOrderDynamic
                // this.productBrowse=data.data[1].productBrowse
              }
            });
        },
        // 分页器
        changePage(page) {
            // debugger
            this.currentPage = page;
            this.getDynamic();
        },
    }
}
</script>

<style scoped lang="scss">
.main{
  .addPrice{
      padding: 40px 85px;
  }  
}
.container{
    background: #f0f2f5;
    .title{
        font-size:32px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(82,87,90,1);
        margin-bottom: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .postSale{
            display:flex;
            align-items:center;
            padding: 10px 25px;
            color: #FF9A06;
            border: 1px solid #FF9A06;
            font-size:14px;
            background:rgba(255,166,58,0.03);
            border-radius:12px;
            cursor: pointer;
        }
        div{
            display: inline-block;
            
        }
        ul{
            margin-left: 50px;
            display: inline-block;
            font-size: 14px;
            li{
                display: inline-block;
                margin: 0 20px;
                font-size:14px;
                font-family:PingFang-SC-Regular;
                font-weight:400;
                color:rgba(148,151,155,1);
            }  
        } 
    }
    .wrapper{
        .preview-container{
            width: 370px;
            height: auto; // height: 927px;
            background: #fff;
            padding: 30px 40px;
            box-shadow:0px 0px 19px 0px rgba(179,190,219,0.42);
            border-radius:20px;
            .user_detail{

            }
            .spanStyle{
                font-family:PingFang-SC-Heavy;
                font-weight:800;
            }
            .ifSure{
                color:rgba(109,234,83,1);
            }
            .money{
                color:#FF5151
            }
        }
        .right {
            box-shadow:0px 0px 19px 0px rgba(179,190,219,0.42);
            border-radius:20px;
            align-self: stretch;
            margin-left: 20px;
            min-width: 405px;
            background: #fff;
            overflow: auto;
            padding: 32px 44px;
            .recordList{
                .recordItem{
                    font-size: 14px;
                    border-bottom: 1px solid rgb(187,187,187);
                    padding-top: 30px;
                    .visitTime{
                        margin-bottom: 30px;
                        font-size:14px;
                        font-family:PingFang-SC-Regular;
                        font-weight:400;
                        color:rgba(148,151,155,1);
                    }   
                    .watchProduct{
                        margin-bottom: 40px;
                        ul{
                            max-width: 960px;
                            .listOuter{
                                display: inline-block;
                                border-radius:4px;
                                margin:0 10px 10px 0;
                               .actTime{
                                   font-size:14px;
                                    font-family:PingFang-SC-Regular;
                                    font-weight:400;
                                    color:rgba(148,151,155,1);
                               }
                                .listProduct{
                                    height: 80px; 
                                    display: flex;
                                    // align-content: center;
                                    align-items: center;
                                    padding: 10px;
                                    border:1px solid rgba(241,241,241,1);
                                    border-radius:4px;
                                    // border-radius: 10px;
                                    // background: rgb(249,249,249);
                                    .img {
                                        width: 60px;
                                        height: 60px;
                                        border-radius: 4px;
                                        overflow: hidden;
                                        margin-right: 16px;
                                        flex-shrink: 0;
                                        img {
                                            width: 100%;
                                            height: 100%;
                                            object-fit: cover;
                                            
                                        }
                                    }
                                    .desc{
                                        font-size: 12px;
                                        .productTitle{
                                            max-width: 168px;
                                            display: -webkit-box;
                                            -webkit-box-orient: vertical;
                                            -webkit-line-clamp: 2;
                                            overflow: hidden;
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                            display: -webkit-box;
                                            -webkit-line-clamp: 2;
                                            -webkit-box-orient: vertical;
                                            // .ellipsis(2)
                                        }
                                        .price{
                                            color: rgb(255,0,0)
                                        }
                                    }
                                }    
                            }
                            
                        }
                    }
                }
            }
            
        }
    }
    .addPrice{
        padding: 50px 70px;
        .nowGrade{
            font-size: 28px;
            margin-bottom: 35px;
        }
    }
    .img{
        width: 80px;
        height: 80px;
        border-radius: 50px;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
</style>
