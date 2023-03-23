<template>
	<div>
		<Content class="searchcon">
            <Row type="flex" :gutter="16" class="rowtocol" style="padding-top:10px;"> 
                <COL>
                 <Input search enter-button suffix="ios-search" placeholder="请输入用户名或卡号" style="width:200px;margin-right: 15px;margin-left:10px;margin-top:-2px;" @on-search="search" v-model="form.searchmsg" />
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
                    <Button type="primary" icon="md-add" :disabled="addsign" style="width: auto;margin-right:20px;" @click="addClick">办卡</Button>
                    <Button type="primary" icon="ios-trash" :disabled="delsign" style="width: auto;" @click="delClick">删除</Button>
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
                <el-table-column
                    type="selection"
                    width="45">
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
                 <el-table-column fixed="right" align="center" prop="oper" label="操作" width="210">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="primary" size="mini" icon="el-icon-edit">修改</el-button>
                            <el-button @click="offClick(scope.row)" type="primary"  size="mini" icon="el-icon-remove">注销</el-button>
                        </template>
                 </el-table-column>
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
        <el-dialog
          :title="userdetail"
          :visible="detailVisible"
          :width="dialogwidth"
          @close="closeUDialog()"
          append-to-body center
        >
        <USEREDIT v-if="detailitem.itemshow" :info="detailitem" @closewindows="detailVisible=false;Reload()"></USEREDIT>
        </el-dialog>
    </div>
</template>
<script type="text/javascript">
import USEREDIT from "@/table/wateruser/mange/edituser.vue";
export default {
        data(){
            return{
                loading:false,
                theight:window.innerHeight-240,
                userdetail:'',//断面特征弹框标题
                detailVisible:false,//是否显示弹框
                detailitem:{itemshow:false},//弹框对象
                dialogwidth:(520/window.innerWidth*100)+"%",
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
                title: "卡号",
                width: 100,
                key: "cardnum",
                align: "center",
                sortable: "custom",
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
                title: "办卡人",
                width: 100,
                key: "man",
                align: "center",
                sortable: "custom",
              },
              {
                title: "手机号码",
                width: 120,
                key: "phone",
                align: "center",
                sortable: "custom",
              },
              {
                title: "办卡日期",
                width: 120,
                key: "cardtime",
                align: "center",
                sortable: "custom",
              },
            ],                
            data:[{index:1,cardnum:'1543',username:'跃进水协会',usertype:'水协会',channel:'跃进干渠',xzqh:'中河口镇',man:'赵晓红',phone:'18973332212',cardtime:'2022-10-19'},
                  {index:2,cardnum:'1546',username:'五溪水协会',usertype:'水协会',channel:'五溪干渠',xzqh:'石门桥镇',man:'李大海',phone:'13273336542',cardtime:'2022-12-07'}],
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
            addClick(){
              this.userdetail="新增办卡信息";
              this.detailitem.editsign="add";
              this.detailitem.itemshow=true;
              this.detailVisible=true;
            },
            closeUDialog(){
              this.detailVisible=false;
              this.detailitem.itemshow=false;
            },
        }
}
</script>