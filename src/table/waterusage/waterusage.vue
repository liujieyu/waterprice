<template>
	<div>
		<Content class="searchcon">
            <Row type="flex" :gutter="16" class="rowtocol" style="padding-top:10px;"> 
                <COL>
                 <el-date-picker
                    class="wAh"
                    size="mini"
                    style="width:100px;"
                    v-model="wateryear"
                    type="year"
                    @change="timechange"
                    placeholder="选择年">
                 </el-date-picker>
                </COL>
                <COL>
                 <Input search enter-button suffix="ios-search" placeholder="请输入用户名" style="width:200px;margin-right: 15px;margin-left:10px;margin-top:-2px;" @on-search="search" v-model="form.searchmsg" />
                </COL>
                <COL>
                  <Select v-model="form.usertype" @on-change="search" style="width:100px;margin-right: 15px;" clearable placeholder="用户类型">
                 <Option v-for="item in typelist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                 </Select>
                </COL>
                <COL>
                   <Select v-model="form.channel" @on-change="search" style="width:100px;margin-right: 15px;" clearable placeholder="所属渠道">
                 <Option v-for="item in channellist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                 </Select>
                </COL>
                <COL>
                <Button type="primary" style="width:auto;" @click="exportData">导出</Button>
                </COL>            
            </Row>
            <Row>
                <Col style='font-size: 14px;margin-top:10px;' class="borsLine">
                累计购买金额：456340元&nbsp;&nbsp;&nbsp;&nbsp;累计购买水量：89675m³ 其中：一级水量：62675m³ 二级水量：23000m³ 三级水量：0m³&nbsp;&nbsp;&nbsp;&nbsp;累计已用水量：81354m³  其中：一级水量：62675m³ 二级水量：18679m³ 三级水量：0m³
                </Col>
            </Row>
            <el-table
                :data="data"
                border
                :height="theight"
                v-loading="loading"
                style="width: 100%"
                >
                <el-table-column
                v-for="(item,index) in tablecolumns"
                :prop="item.key"
                :align="item.align"
                :label="item.title"
                :min-width="item.width"
                :fixed="item.fixed"
                :sortable="item.sortable"
                ></el-table-column>
            </el-table>
            <div style="margin:10px 10px 0px 10px;overflow: hidden">
                <div style="float: right;">
                <Page 
                    :total="list_input.total" 
                    :current="list_input.current" show-sizer 
                    :page-size="list_input.pagesize" :page-size-opts="list_input.pagesizeopts"
                    @on-change="CurrentChange"
                    @on-page-size-change="PagesizeChange"
                    size="small"
                    show-total
                    show-elevator>
                </Page>
                </div>
            </div>
        </Content>
    </div>
</template>
<script type="text/javascript">
import USEREDIT from "@/table/wateruser/mange/edituser.vue";
export default {
        data(){
            return{
                subwidth:window.innerWidth-616-200-24-160,
                loading:false,
                theight:window.innerHeight-270,
                wateryear:'2023',
                // 表头设置
            tablecolumns: [
              {
                title: "序号",
                key: "index",
                width: 45,
                align: "center",
                fixed: "left"
              },
              {
                title: "用户名",
                key: "username",
                width: 100,
                align: "center",
                sortable: "custom",
              },
              {
                title: "用户类型",
                key: "usertype",
                width: 100,
                align: "center",
                sortable: "custom",
              },   
              {
                title: "所属渠道",
                key: "channel",
                width: 120,
                align: "center",
                sortable: "custom",
              },
              {
                title: "购买日期",
                width: 110,
                key: "buydate",
                align: "center",
                sortable: "custom",
              },  
              {
                title: "购买金额(元)",
                width: 120,
                key: "amount",
                align: "center",
                sortable: "custom",
              },                 
              {
                title: "购买水量(m³)",
                width: 140,
                key: "purchase",
                align: "center",
                sortable: "custom",
              },   
              {
                title: "余额(元)",
                width: 100,
                key: "remainsum",
                align: "center",
                sortable: "custom",
              },
              {
                title: "用完时间",
                width: 100,
                key: "useup",
                align: "center",
                sortable: "custom",
              },           
              {
                title: "已用水量(m³)",
                width: 120,
                key: "usedwater",
                align: "center",
                sortable: "custom",
              },
              {
                title: "存余水量(m³)",
                width: 120,
                key: "remainwater",
                align: "center",
                sortable: "custom",
              },             
            ],                
            data:[{index:1,cardnum:'154356722',username:'跃进水协会',usertype:'水协会',channel:'跃进干渠',purchase:1243,lastwater:12.21,usedwater:665.78,remainwater:589.43,buydate:'2023-03-11',amount:3000,remainsum:1568.75,useup:'--'},
                  {index:2,cardnum:'154612447',username:'五溪水协会',usertype:'水协会',channel:'五溪干渠',purchase:2157,lastwater:35.89,usedwater:2182.12,remainwater:10.77,buydate:'2022-12-01',amount:1600,remainsum:146.21,useup:'--'}],
            list_input:{
                total:65,
                pagesize:20,
                pagesizeopts:[10,20,50,75,100,200],
                current:1,
            },
            form:{
                searchmsg:'',
                usertype:'',
                xzqh:'',
                channel:'',
                wateryeild:'',
            },   
            typelist:[],
            xzqhlist:[],
            channellist:[],
            }
        },
        mixins: [],
        components: {
           USEREDIT
        },
        mounted(){

        },
        methods:{
            timechange(date){
            this.Reload();
            },
            Reload(){
                
            },
        }
}
</script>