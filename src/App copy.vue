<script src="main.js"></script>
<template>
  <div id="app">
    <!-- 顶部导航 -->
    <div
      class="topNav"
      style="position: absolute; width: 100%; left:0; top: 0; z-index: 1; opacity: 1;background:#409EFF;height:60px;"
    >
      <img :src="require('@/assets/image/water.png')" style="width: 60px;height: 60px;float:left;"/>
      <div style="font-size: 24px; color: #fff;font-weight: 200;line-height:60px;float:left;margin-left:20px;">智慧水价信息管理平台</div>
      <div style="line-height: 60px;color: #fff;padding-right: 10px;float: right;cursor: pointer;font-size: 14px;" @click="close()">
        <Icon type="md-exit" size="26"/>
        退出系统
      </div>
    </div>
    <!-- 表格 -->
    <div>
       
      <Table></Table>
     <!--
    <div style="width:200px;float:left;display:inline;height:100%;background-color:#363E4F;">
    <el-scrollbar style="height:100%">
      <Menu active-name="1-3-1" :open-names="['1','1-3']" theme="dark" width="200">
        <Submenu name="1">
            <template slot="title">
                <Icon type="ios-albums" />
                信息服务
            </template>
                <MenuItem name="1-1" to="tablexxfw-yqxx">雨情信息</MenuItem>
                <MenuItem name="1-2" to="tablexxfw-zfxx">闸阀信息</MenuItem>
                <Submenu name="1-3">
                  <template slot="title">
                   <Icon type="ios-options" />
                    水情
                  </template>
                  <MenuItem name="1-3-1" to="/tablexxfw-sqxx-qdsq">渠道水情</MenuItem>
                  <MenuItem name="1-3-2" to="/table-sqxx-sksq">水库水情</MenuItem>
                  <MenuItem name="1-3-3" to="/table-sqxx-hdsq">河道水情</MenuItem>
                </Submenu>
                <MenuItem name="1-4" to="/tablexxfw-yxgk">运行工况</MenuItem>
        </Submenu>
        <Submenu name="2">
            <template slot="title">
                <Icon type="ios-filing" />
                信息维护
            </template>
            <MenuItem name="2-1" to="/stepprice-manage">阶梯水价维护</MenuItem>
            <MenuItem name="2-2" to="/tablezfkz-zfls">开度历史</MenuItem>
        </Submenu>
            <Submenu name="3">
                <template slot="title">
                  <Icon type="ios-paper" />
                  值班管理
                </template>
                <MenuItem name="3-1" to="/warm-dutyplan">值班安排</MenuItem>
                <MenuItem name="3-2" to="/plan-manage">值班安排维护</MenuItem>
                <MenuItem name="3-3" to="/duty-addrlist">值班通讯录</MenuItem>
                <MenuItem name="3-4" to="/duty-infomanage">值班通讯录维护</MenuItem>
                <MenuItem name="3-5" to="/warm-export">水雨情报表导出</MenuItem>
            </Submenu>
        <Submenu name="4">
            <template slot="title">
                <Icon type="ios-cog" />
                预警管理
            </template>
            <Submenu name="4-1">
              <template slot="title">
                <Icon type="ios-menu" />
                预警查询
              </template>
                <MenuItem name="4-1-1" to="/warm-siteinfo">站点预警查询</MenuItem>
                <MenuItem name="4-1-2" to="/warm-boxsended">预警短信查询</MenuItem>
            </Submenu>
            <Submenu name="4-2">
              <template slot="title">
                <Icon type="md-log-in" />
                短信查询
              </template>
                <MenuItem name="4-2-1" to="/warm-boxreceived">接收短信查询</MenuItem>
                <MenuItem name="4-2-2" to="/warm-boxsending">发送短信查询</MenuItem>
            </Submenu>
        </Submenu>
    </Menu>
    </el-scrollbar>
    </div>
    <div :style="{'overflow':'hidden','float':'right','width':twidth+'px','height':'100%','background':'#F7F7FF'}">        
      <el-scrollbar style="height:100%">      
     <router-view></router-view>    
      </el-scrollbar> 
    </div>
      -->
    </div>
  </div>
</template>


    <script>
import("./assets/shp.min.js");
// 引入Vue
import Vue from "vue";

// 引入页面
import Table from "./page/Table";

export default {
  data() {
    return {
      theight:window.innerHeight-40,
      twidth:window.innerWidth-220,
    };
  },
  mixins: [],
  components: {
    // page
    Table, // 表格
  },
  methods: {
    close(){
      window.location.href = 'http://218.75.144.44:7001/static/main/#/';
    },
  },
  computed: {},
  mounted() {
    Vue.prototype.$App = this;
  }
};
</script>

