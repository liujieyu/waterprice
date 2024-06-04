import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
// 我是真滴帅
export default new Router({
  routes: [
    {path: '/loginyuejin', component: () => import('./views/LoginYuejin.vue')},
    {path: '/loginwuxi', component: () => import('./views/LoginWuxi.vue')},
    {path: '/loginsunjiachong', component: () => import('./views/LoginSunjiachong.vue')},
    {path: '/home', component: () => import('./Home.vue'),children:[
    //执行水价标准维护
    { path: '/stepprice-manage',component: () => import('./table/stepprice/manage/list.vue') },
    //支渠用户超额水价标准查询
    { path: '/stepprice-showcanal',component: () => import('./table/stepprice/showcanal/list.vue') },
    //支渠用户回购水价标准查询
    { path: '/stepprice-backcanal',component: () => import('./table/stepprice/backcanal/list.vue') },
    //农户用户超额水价标准查询
    { path: '/stepprice-showfarm',component: () => import('./table/stepprice/showfarm/list.vue') },
    //农户用户回购水价标准查询
    { path: '/stepprice-backfarm',component: () => import('./table/stepprice/backfarm/list.vue') },
    //农户用户信息维护
    { path: '/userinfo-manage',component: () => import('./table/wateruser/mange/list.vue') },
    //支渠用户信息维护
    { path: '/canaluser-manage',component: () => import('./table/wateruser/canaluser/list.vue') },
    //支渠用户超水信息
    { path: '/canal-overwater',component: () => import('./table/canalwatertj/usewater/list.vue') },
    //支渠用户节水信息
    { path: '/canal-backwater',component: () => import('./table/canalwatertj/backwater/list.vue') },
    //权限管理
    { path: '/loginuser-manage',component: () => import('./table/authority/list.vue') },
    //用户信息查询
    { path: '/userinfo-show',component: () => import('./table/wateruser/show/list.vue') },
    //水费充值
    { path: '/water-recharge',component: () => import('./table/recharge/list.vue') },
    //抄表录入
    { path: '/water-meter',component: () => import('./table/readmeter/list.vue') },
    //充值记录查询
    { path: '/recharge-query',component: () => import('./table/showcharge/list.vue') },
    //收费通知查询
    { path: '/meter-notice',component: () => import('./table/showmeter/list.vue') },
    //实时用水信息
    { path: '/water-realinfo',component: () => import('./table/realwater/list.vue') },
    //水费使用信息
    { path: '/water-usageinfo',component: () => import('./table/waterusage/list.vue') },
    //实时水情监控
    { path: '/water-realanalysis',component: () => import('./table/channelwater/realwater/list.vue') },
    //小时水量监测
    { path: '/water-houranalysis',component: () => import('./table/channelwater/hourwater/list.vue') },
    //日水量监测
    { path: '/water-dayanalysis',component: () => import('./table/channelwater/daywater/list.vue') },
    //月水量监测
    { path: '/water-monthanalysis',component: () => import('./table/channelwater/monthwater/list.vue') },
    //水费收缴信息
    { path: '/recharge-statis',component: () => import('./table/waterusage/list.vue') },
    //农户用户超水信息
    { path: '/meter-statis',component: () => import('./table/meterused/list.vue') },
    //农户用户节水信息
    { path: '/meter-backinfo',component: () => import('./table/meterback/list.vue') },
  ],},    
  ] 
})
