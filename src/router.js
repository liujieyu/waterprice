import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
// 我是真滴帅
export default new Router({
  routes: [
    {path: '/loginyuejin', component: () => import('./views/LoginYuejin.vue')},
    {path: '/loginwuxi', component: () => import('./views/LoginWuxi.vue')},
    {path: '/home', component: () => import('./Home.vue'),children:[
    //阶梯水价标准维护
    { path: '/stepprice-manage',component: () => import('./table/stepprice/manage/list.vue') },
    //阶梯水价查询
    { path: '/stepprice-show',component: () => import('./table/stepprice/show/list.vue') },
    //用户信息维护
    { path: '/userinfo-manage',component: () => import('./table/wateruser/mange/list.vue') },
    //用户信息查询
    { path: '/userinfo-show',component: () => import('./table/wateruser/show/list.vue') },
    //水费充值
    { path: '/water-recharge',component: () => import('./table/recharge/list.vue') },
    //实时用水信息
    { path: '/water-realinfo',component: () => import('./table/realwater/list.vue') },
    //水费使用信息
    { path: '/water-usageinfo',component: () => import('./table/waterusage/list.vue') },
    //实时水情监控
    { path: '/water-realanalysis',component: () => import('./table/channelwater/realwater/list.vue') },
    //小时水量监测
    { path: '/water-houranalysis',component: () => import('./table/channelwater/hourwater/list.vue') },
  ],},    
  ] 
})
