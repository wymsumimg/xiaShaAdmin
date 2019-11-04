import Vue from 'vue'

const prefix = process.env.NODE_ENV == 'development' ? 'https://test.i31.com/weiGuan' : 'https://aicard.i31.com/weiGuan'
const apis = {
  common: {
    imgUpload: `${prefix}/crm/imgUpload/upload`, // 图片上传
    getToken: `${prefix}/crm/imgUpload/token`, // 获取视频token
  },
  main: {
    getTop: `${prefix}/crm/main/top`, // 获取顶部统计数据
    productRank: `${prefix}/crm/main/productRank`, // 商品排行
    memberRank: `${prefix}/crm/main/memberRank`, // 成员排行
    userTop: `${prefix}/crm/main/userTop`, // 员工-头部统计数
    userReport: `${prefix}/crm/main/userReport`, // 员工报表数据
    productTop: `${prefix}/crm/main/productTop`, // 产品头部数据
    productSalesReport: `${prefix}/crm/main/productSalesReport`, // 产品-员工销售数据报表
    productDistributionReport: `${prefix}/crm/main/productDistributionReport`, // 产品分销数据报表
    productTree: `${prefix}/crm/main/productTree`, // 产品树
  },
  user: {
    login: `${prefix}/crm/login`, // 登录
    logout: `${prefix}/crm/logout`, // 登出
    info: `${prefix}/crm/admin/get/info`, // 获取登录用户信息
    getMenu: `${prefix}/crm/get/function`, // 获取登录用户菜单
  },
  order: {
    count: `${prefix}/crm/order/find/count`, // 查询订单顶部统计数据接口
    list: `${prefix}/crm/order/find/list`, // 查询订单列表接口
    export: `${prefix}/crm/order/export/order`, // 导出数据接口
    detail: `${prefix}/crm/order/find/detail`, // 查询订单列表接口
    sendGoods: `${prefix}/crm/order/send/goods`, // 发货接口
    accept: `${prefix}/crm/order/serve/accept`, // 派单
    receiverInfo: `${prefix}/crm/order/update/receiver/info`, // 修改订单
  },
  company: {
    deleteInfo: `${prefix}/crm/company/delete/info`, // 删除公司信息内容，包括：历史历程、企业动态、企业荣誉
    info: `${prefix}/crm/company/get/info`, // 查询公司基本信息接口
    saveInfo: `${prefix}/crm/company/save/info`, // 保存|更新企业基本信息接口
    getHistory: `${prefix}/crm/company/get/history`, // 查询公司历史历程接口列表
    detail: `${prefix}/crm/company/get/history/detail`, // 查询公司历史历程详情信息接口
    saveHistory: `${prefix}/crm/company/save/history/info`, // 保存|更新历史历程信息接口
    getHonor: `${prefix}/crm/company/get/honor`, // 企业荣誉列表查询
    honorDetail: `${prefix}/crm/company/get/honor/detail`, // 查询公司荣誉详情接口
    saveHonor: `${prefix}/crm/company/save/honor/info`, // 保存|更新公司荣誉信息
    getDynamic: `${prefix}/crm/company/get/dynamic`, // 查询公司动态列表信息
    dynamicDetail: `${prefix}/crm/company/get/dynamic/detail`, // 查询公司动态详情信息
    saveDynamic: `${prefix}/crm/company/save/dynamic/info`, // 保存|更新企业动态接口
  },
  money: {
    top: `${prefix}/crm/brokerage/top`, // 获取头部数据
    pageWithdrawByGroup: `${prefix}/crm/brokerage/pageWithdrawByGroup`, // 分组获取用户最新一笔提现记录
    updateWithdraw: `${prefix}/crm/brokerage/updateWithdraw`, // 同意与拒绝提现
    pageUserWithdraw: `${prefix}/crm/brokerage/pageUserWithdraw`, // 获取个人佣金提现记录
    detail: `${prefix}/crm/brokerage/detail`, // 提现详情
  },
  member: {
    list: `${prefix}/crm/user/list`, // 获取用户列表请求接口
    userDelete: `${prefix}/crm/user/delete`, // 删除用户信息接口
    update: `${prefix}/crm/user/save/update`, // 保存|更新用户信息
    detail: `${prefix}/crm/user/detail`, // 用户详情请求接口
    excelExport: `${prefix}/crm/user/excelExport`, // 用户Excel导出接口
    dynamic: `${prefix}/crm/user/dynamic`, // 用户动态 
  },
  fixed: {
    info: `${prefix}/crm/broadBand/get/info`, // 报修业务报修列表请求接口
    details: `${prefix}/crm/broadBand/get/details`, // 报修业务报修列表请求接口
    excelExport: `${prefix}/crm/broadBand/excelExport`, // 报修业务Excel导出接口
    statistics: `${prefix}/crm/broadBand/server/statistics`, // 报修业务Excel导出接口
  },
  shop: {
    banner: `${prefix}/crm/config/find/banner`, // 查询banner数据接口
    setBanner: `${prefix}/crm/config/set/banner`, // 设置banner接口
    list: `${prefix}/crm/region/find/list`, // 查询小区列表数据接口
    region: `${prefix}/crm/region/add/region`, //新增小区接口
    delRegion: `${prefix}/crm/region/del/region`, //删除小区接口
    update: `${prefix}/crm/region/update/region`, //删除小区接口
  },
  product: {
    list: `${prefix}/crm/product/pageByQuery`, //条件分页查询
    upperOrLower: `${prefix}/crm/product/upperOrLower`, //上下架
    updateHot: `${prefix}/crm/product/updateHot`, //修改热销
    updateRecomm: `${prefix}/crm/product/updateRecomm`, //修改推荐
    deleteProduct: `${prefix}/crm/product/delete`, //删除商品
    detail: `${prefix}/crm/product/detail`, //获取商品详情
    save: `${prefix}/crm/product/save`, //保存商品详情
  },
  account: {
    list: `${prefix}/crm/admin/get/user/list`,
    getPermissions: `${prefix}/crm/get/all/function`,
    update: `${prefix}/crm/admin/save/or/update`, //添加更改用户信息
    getDetail: `${prefix}/crm/admin/get/user/detail`,
    delAccount: `${prefix}/crm/admin/delete/user`, //删除用户
  }
}
Vue.prototype.$apis = apis