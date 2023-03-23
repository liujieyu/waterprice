<template>
	<div>
		<Content class="searchcon">
            <Row type="flex" :gutter="16" class="rowtocol" style="padding-top:10px;"> 
                <COL>
                 <Input search enter-button suffix="ios-search" placeholder="请输入用户名" style="width:200px;margin-right: 15px;margin-left:10px;margin-top:-2px;" @on-search="search" v-model="form.searchmsg" />
                </COL>
                <COL>
                  <Select v-model="form.usertype" @on-change="search" style="width:100px;margin-right: 15px;" clearable placeholder="用户类型">
                 <Option v-for="item in typelist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                 </Select>
                </COL>
                <COL>
                  <Select v-model="form.xzqh" @on-change="search" style="width:100px;margin-right: 15px;" clearable placeholder="所属乡镇">
                 <Option v-for="item in xzqhlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
                <COL>
                 <div :style="{width:subwidth+'px'}"></div>
                </COL>
                 <COL style="font-size:14px;padding-top:8px;float:right;">
                存余临界水量：15m³
                </COL>              
            </Row>
            <Row class="fgline"></Row>
            <el-table
                :data="data"
                border
                :height="theight"
                v-loading="loading"
                style="width: 100%"
                >
                <el-table-column align="center" label="预警" width="55">
                  <template slot-scope="scope">
                            <img :src="scope.row.remainwater>=15?require('@/assets/image/green.png'):require('@/assets/image/red.png')" style="width: 28px;height: 28px;"/>
                        </template>
                </el-table-column>
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
                theight:window.innerHeight-240,
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
                title: "所属乡镇",
                width: 120,
                key: "xzqh",
                align: "center",
                sortable: "custom",
              }, 
              {
                title: "本次购买日期",
                width: 120,
                key: "buydate",
                align: "center",
                sortable: "custom",
              },                   
              {
                title: "本次购买水量(m³)",
                width: 140,
                key: "purchase",
                align: "center",
                sortable: "custom",
              },              
              {
                title: "上次结余水量(m³)",
                width: 140,
                key: "lastwater",
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
            data:[{index:1,cardnum:'154356722',username:'跃进水协会',usertype:'水协会',channel:'跃进干渠',purchase:1243,lastwater:12.21,usedwater:665.78,remainwater:589.43,buydate:'2023-03-11',xzqh:'中河口镇'},
                  {index:2,cardnum:'154612447',username:'五溪水协会',usertype:'水协会',channel:'五溪干渠',purchase:2157,lastwater:35.89,usedwater:2182.12,remainwater:10.77,buydate:'2022-12-01',xzqh:'石门桥镇'}],
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