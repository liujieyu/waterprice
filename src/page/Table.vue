<template>
  <div>
    <Layout :style="{height: '100vh',}">
      <div :class="['leftSide',{'leftSide_on':Menu.show_Controller}]">
        <!-- 开关按钮 -->
        <div class="switch" @click="Menu_toggle">
          <i class="el-icon-d-arrow-left" v-if="!Menu.show_Controller"></i>
          <i class="el-icon-d-arrow-right" v-if="Menu.show_Controller"></i>
        </div>
        <Sider hide-trigger style="background-color: '#fff !important';padding: '80px 0 0 0'; overflow: 'scroll;';color:'#333 !important'">
          <!-- 菜单 -->
          <Menu active-name="1-1" :open-names="['1','1-1']" theme="dark" width="200">
              <Submenu name="1">
                  <template slot="title">
                      <Icon type="ios-albums" />
                      智慧水价
                  </template>
                      <MenuItem name="1-1" to="/stepprice-show">阶梯水价查询</MenuItem>
                      <MenuItem name="1-2" to="/userinfo-show">用户信息查询</MenuItem>
                      <MenuItem name="1-3" to="/water-recharge">水费充值</MenuItem>
                      <MenuItem name="1-4" to="/water-realinfo">实时用水信息</MenuItem>
                      <MenuItem name="1-5" to="/water-usageinfo">水费使用统计</MenuItem>
              </Submenu>
              <Submenu name="2">
                      <template slot="title">
                        <Icon type="ios-paper" />
                        支渠水量分析
                      </template>
                      <MenuItem name="2-1" to="/water-realanalysis">实时水情监测</MenuItem>
                      <MenuItem name="2-2" to="/water-houranalysis">小时水量监测</MenuItem>
                      <MenuItem name="2-3" to="/water-dayanalysis">日水量监测</MenuItem>
                      <MenuItem name="2-4" to="/water-monthanalysis">月水量监测</MenuItem>
                  </Submenu>
              <Submenu name="3">
                  <template slot="title">
                      <Icon type="ios-filing" />
                      信息维护
                  </template>
                  <MenuItem name="3-1" to="/stepprice-manage">执行水价标准维护</MenuItem>
                  <MenuItem name="3-2" to="/userinfo-manage">用户信息维护</MenuItem>
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
        </Sider>
      </div>
      <Layout :style="{padding: '60px 0 0 0'}">
        <router-view></router-view>
      </Layout>
    </Layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Menu: { show_Controller: true },
    };
  },
  mounted() { 
    this.$router.push({path: '/stepprice-show'}); 
    this.Menu_toggle();
  },
  methods: {
      Menu_toggle() {
          this.Menu.show_Controller = !this.Menu.show_Controller;
      },    
  },
};
</script>

<style scoped lang="less">
  .ivu-layout{
    /*padding: 70px 20px 10px;*/
    /*overflow-y: hidden;*/
    /*overflow: scroll;*/
  }
  .ivu-layout-sider{
    overflow: scroll;
    padding-top:60px;
  }
.ivu-layout-sider::-webkit-scrollbar {
  display: none;
}
.ivu-layout-sider{
    height: 100%;
    background-color: #1d1d1d; 
    color: #333;
}
.leftSide {
  z-index: 0;
  transition: 0.5s;  
  position: relative;
  // 开关按钮
  .switch {
    position: absolute;
    right: -20px;
    top: calc(50% - 50px);
    /* font-size: 10px; */
    width: 20px;
    height: 50px;
    cursor: pointer;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    background: white;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border: #7eb7f0 2px solid;
    border-left: 0;
    &:hover {
      filter: brightness(1.1);
    }
    i {
      font-size: 15px;
    }
  }
}
.leftSide_on {
    margin-left: -200px;
}
</style>
<style>
    .el-submenu__title:focus, .el-submenu__title:hover{
    outline: 0 !important;
    text-shadow:#000 3px 4px 5px;
    background: none !important;
    }
</style>