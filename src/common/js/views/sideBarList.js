import data from '../../../components/vSideBar/images/data.png'
import data1 from '../../../components/vSideBar/images/data1.png'
import card from '../../../components/vSideBar/images/card.png'
import card1 from '../../../components/vSideBar/images/card1.png'
import product from '../../../components/vSideBar/images/product.png'
import product1 from '../../../components/vSideBar/images/product1.png'
import shop from '../../../components/vSideBar/images/shop.png'
import shop1 from '../../../components/vSideBar/images/shop1.png'
import order from '../../../components/vSideBar/images/order.png'
import order1 from '../../../components/vSideBar/images/order1.png'
import company from '../../../components/vSideBar/images/company.png'
import company1 from '../../../components/vSideBar/images/company1.png'
import member from '../../../components/vSideBar/images/member.png'
import member1 from '../../../components/vSideBar/images/member1.png'
import fixed from '../../../components/vSideBar/images/fixed.png'
import fixed1 from '../../../components/vSideBar/images/fixed1.png'
import money from '../../../components/vSideBar/images/money.png'
import money1 from '../../../components/vSideBar/images/money1.png'
const list = [{
    name: '数据概况',
    icon: data,
    iconFocus: data1,
    path: '/data'
  },
  {
    name: '分销管理',
    icon: card,
    iconFocus: card1,
    path: '/distribution'
  },
  {
    name: '待审核订单',
    icon: card,
    iconFocus: card1,
    path: '/pendingOrder'
  },
  {
    name: '待受理订单',
    icon: card,
    iconFocus: card1,
    path: '/acceptOrder'
  },
  {
    name: '订单管理',
    icon: order,
    iconFocus: order1,
    path: '/order'
  },
  {
    name: '商品管理',
    icon: product,
    iconFocus: product1,
    path: '/product'
  },
  {
    name: '商城配置',
    icon: shop,
    iconFocus: shop1,
    path: '/shop'
  },
  {
    name: '小区配置',
    icon: shop,
    iconFocus: shop1,
    path: '/housing'
  },
  {
    name: '企业信息',
    icon: company,
    iconFocus: company1,
    path: '/company'
  },
  {
    name: '企业成员',
    icon: member,
    iconFocus: member1,
    path: '/member'
  },
  {
    name: '佣金管理',
    icon: money,
    iconFocus: money1,
    path: '/money'
  },
  {
    name: '账号设置',
    icon: money,
    iconFocus: money1,
    path: '/account'
  },
  {
    name: '全局信息',
    icon: money,
    iconFocus: money1,
    path: '/informa'
  },
  {
    name: '宽带报修(暂弃)',
    icon: fixed,
    iconFocus: fixed1,
    path: '/fixed'
  },
  {
    name: '用户管理(暂弃)',
    icon: card,
    iconFocus: card1,
    path: '/card'
  }

];

export default list;