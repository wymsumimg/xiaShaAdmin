const _import = require('./_import_' + process.env.NODE_ENV);
const Login = _import('login/login');
const Home = _import('home/home');
const Data = _import('data/data');
const OneLevelDetail = _import('data/oneLevelDetail');
const SecondLevelDetail = _import('data/secondLevelDetail');
const ProSaleDetail = _import('data/proSaleDetail');
const Distribution = _import('distribution/distribution');
const AddRole = _import('distribution/addRole');
const OneSaleDetail = _import('distribution/oneSaleDetail');
const UserDetail = _import('distribution/userDetail');
const PendingOrder = _import('pendingOrder/pendingOrder');
const AcceptOrder = _import('acceptOrder/acceptOrder');
const Card = _import('card/card');
const Product = _import('product/product');
const Shop = _import('shop/shop');
const Housing = _import('housing/housing');
const Order = _import('order/order');
const Company = _import('company/company');
const Member = _import('member/member');
const Fixed = _import('fixed/fixed');
const Money = _import('money/money');
const Account = _import('account/list');
const Informa = _import('informa/informa');

const routes = [{
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      // 数据概况
      {
        path: '/data',
        name: 'data',
        component: Data,
      },
      {
        path: '/data/oneLevelDetail',
        name: 'oneLevelDetail',
        component:OneLevelDetail,
        meta: {
          backOne: true,
        }
      },
      {
        path: '/data/secondLevelDetail',
        name: 'secondLevelDetail',
        component:SecondLevelDetail,
        meta: {
          backOne: true,
        }
      },
      {
        path: '/data/proSaleDetail',
        name: 'proSaleDetail',
        component:ProSaleDetail,
        meta: {
          backOne: true,
        }
      },
      {
        path: '/data/productDetail',
        name: 'dataProduct',
        component: _import('data/productDetail'),
        meta: {
          backOne: true,
          backTwo: true,
        }
      },
      {
        path: '/data/memberDetail',
        name: 'dataMember',
        component: _import('data/memberDetail'),
        meta: {
          backOne: true,
          backTwo: true,
        }
      },
      {
        path: '/data/staffDetail',
        name: 'dataStaff',
        component: _import('data/staffDetail'),
        meta: {
          backOne: true,
          backTwo: true,
        }
      },
      // 分销管理
      {
        path: '/distribution',
        name: 'distribution',
        component: Distribution,
      },
      {
        path: '/distribution/addRole',
        name: 'addRole',
        component:AddRole,
        meta: {
          backOne: true,
        }
      },
      {
        path: '/distribution/oneSaleDetail',
        name: 'oneSaleDetail',
        component:OneSaleDetail,
        meta: {
          backOne: true,
          backTwo: true,
        }
      },
      {
        path: '/distribution/userDetail',
        name: 'userDetail',
        component:UserDetail,
        meta: {
          backOne: true,
          backTwo: true,
        }
      },
      // 待审核订单
      {
        path: '/pendingOrder',
        name: 'pendingOrder',
        component: PendingOrder,
      },
      {
        path: '/pendingOrder/detail',
        name: 'pendingOrderDetail',
        component: _import('pendingOrder/detail'),
        meta: {
          backOne: true,
          backTwo: true,
        }
      },
      // 待受理订单
      {
        path: '/acceptOrder',
        name: 'acceptOrder',
        component: AcceptOrder,
      },
      {
        path: '/acceptOrder/detail',
        name: 'acceptOrderDetail',
        component: _import('acceptOrder/detail'),
        meta: {
          backOne: true,
          backTwo: true,
        }
      },
      //订单管理
      {
        path: '/order',
        name: 'order',
        component: Order
      },
      {
        path: '/order/detail',
        name: 'orderDetail',
        component: _import('order/detail'),
        meta: {
          backOne: true,
          backTwo: true,
        }
      },
      //商品管理
      {
        path: '/product',
        name: 'product',
        component: Product
      },
      {
        path: '/product/add',
        name: 'addProduct',
        component: _import('product/add'),
        meta: {
          backOne: true,
          backTwo: true,
        }
      },
      //商城配置
      {
        path: '/shop',
        name: 'shop',
        component: Shop
      },

      // 小区配置
      {
        path: '/housing',
        name: 'housing',
        component: Housing
      },
      {
        path: '/housing/index',
        name: 'housingIndex',
        component: _import('housing/index'),
        children: [{
          path: '/housing/add',
          name: 'addHousing',
          component: _import('housing/add'),
          meta: {
            title: '添加小区',
            editTitle: '小区编辑',
            backOne: true,
            backTwo: true,
          }
        }]
      },
      // {
      //   path: '/housing/add',
      //   name: 'addHousing',
      //   component: _import('housing/add'),
      //   meta: {
      //     addTitle: '添加小区',
      //     editTitle: '小区编辑',
      //     backOne: true,
      //     backTwo: true,
      //   }
      // },
      {
        path: '/housing/data',
        name: 'housingData',
        component: _import('housing/data'),
        meta: {
          backOne: true,
          backTwo: true,
        }
      },
      //企业信息
      {
        path: '/company',
        name: 'company',
        component: Company
      },
      {
        path: '/company/index',
        name: 'companyIndex',
        component: _import('company/index'),
        children: [{
          path: '/company/message',
          name: 'companyMessage',
          component: _import('company/message'),
          meta: {
            title: '基本信息编辑',
            backOne: true,
            backTwo: true,
          }
        }, {
          path: '/company/history',
          name: 'companyHistory',
          component: _import('company/history'),
          meta: {
            title: '发展历程列表',
            backOne: true,
            backTwo: true,
          }
        }, {
          path: '/company/historyDetail',
          name: 'companyHistoryDetail',
          component: _import('company/historyDetail'),
          meta: {
            title: '发展历程编辑',
            backOne: true,
            backTwo: true,
          }
        }, {
          path: '/company/honor',
          name: 'companyHonor',
          component: _import('company/honor'),
          meta: {
            title: '企业荣誉列表',
            backOne: true,
            backTwo: true,
          }
        }, {
          path: '/company/honorDetail',
          name: 'companyHonorDetail',
          component: _import('company/honorDetail'),
          meta: {
            title: '企业荣誉编辑',
            backOne: true,
            backTwo: true,
          }
        }, {
          path: '/company/dynamic',
          name: 'companyDynamic',
          component: _import('company/dynamic'),
          meta: {
            title: '企业动态列表',
            backOne: true,
            backTwo: true,
          }
        }, {
          path: '/company/dynamicDetail',
          name: 'companyDynamicDetail',
          component: _import('company/dynamicDetail'),
          meta: {
            title: '企业动态编辑',
            backOne: true,
            backTwo: true,
          }
        }, {
          path: '/company/contact',
          name: 'companyContact',
          component: _import('company/contact'),
          meta: {
            title: '联系我们编辑',
            backOne: true,
            backTwo: true,
          }
        }, ],
      },

      //企业成员
      {
        path: '/member',
        name: 'member',
        component: Member,

      },
      {
        path: '/member/detail',
        name: 'memberDetail',
        component: _import('member/detail'),
        meta: {
          backOne: true,
          backTwo: true,
        }
      },
      {
        path: '/member/data',
        name: 'memberData',
        component: _import('member/data'),
        meta: {
          backOne: true,
          backTwo: true,
        }
      },
      // 佣金管理
      {
        path: '/money',
        name: 'money',
        component: Money
      },
      {
        path: '/money/detail',
        name: 'moneyDetail',
        component: _import('money/detail'),
        meta: {
          backOne: true,
          backTwo: true,
        }
      },
      // 账号设置
      {
        path: '/account',
        name: 'account',
        component: Account
      },
      {
        path: '/account/detail',
        name: 'accountDetail',
        component: _import('account/detail'),
        meta: {
          backOne: true,
          backTwo: true,
        }
      },
      // 全局信息
      {
        path: '/informa',
        name: 'informa',
        component: Informa
      },
      // 宽带报修(暂弃)
      {
        path: '/fixed',
        name: 'fixed',
        component: Fixed
      },
      // {
      //   path: '/fixed/detail',
      //   name: 'fixedDetail',
      //   component: _import('fixed/detail'),
      //   meta: {
      //     backOne: true,
      //     backTwo: true,
      //   }
      // },
      // 用户管理(暂弃)
      {
        path: '/card',
        name: 'card',
        component: Card
      },
      {
        path: '/newCard',
        name: 'newCard',
        component: _import('card/newCard'),
        meta: {
          backOne: true
        }
      },
      {
        path: '/card/detail',
        name: 'cardDetail',
        component: _import('card/detail'),
        meta: {
          backOne: true,
          backTwo: true,
        }
      },
    ]
  }
];

export default routes