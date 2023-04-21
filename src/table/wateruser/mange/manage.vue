<template>
	<div>
		<Content class="searchcon">
            <Row type="flex" :gutter="16" class="rowtocol" style="padding-top:10px;"> 
                <COL>
                 <Input search enter-button suffix="ios-search" placeholder="请输入用户名或编号" style="width:200px;margin-right: 15px;margin-left:10px;margin-top:-2px;" @on-search="search" v-model="form.searchmsg" />
                </COL>
                <COL>
                   <Select v-model="form.channel" @on-change="search" style="width:160px;margin-right: 15px;" clearable filterable placeholder="所属渠道(可搜索)">
                 <Option v-for="item in channellist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                 </Select>
                </COL>
                <COL>
                  创建时间：
                   <el-date-picker
                      v-model="form.carddate"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      @change="search"
                      unlink-panels
                      type="daterange"
                      size="small"
                      format="yyyy-MM-dd"
                      style="margin-right:15px;"
                    ></el-date-picker>
                </COL>
                <COL> 
                    <Button type="primary" icon="md-add"  style="width: auto;margin-right:20px;" @click="addClick">新增</Button>
                    <Button type="primary" icon="ios-trash" style="width: auto;" @click="delClick">删除</Button>
                </COL>
            </Row>
            <Row  class="fgline"></Row>
            <el-table
                :data="data"
                border
                :height="theight"
                v-loading="loading"
                @selection-change="handleSelectionChange"
                @sort-change="sort_change"
                style="width: 100%"
                >
                <el-table-column
                    type="selection"
                    width="45">
                </el-table-column>
                <el-table-column
                    fixed
                    label="序号"
                    type="index"
                    align="center"
                    width="55"
                    :index="indexMethod" :key="Math.random()">
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
                <el-table-column align="center" label="是否注销" :width="90">
                <template slot-scope="scope">
                    <span>{{ scope.row.ablesign==1?'正常使用':'已注销'}}</span>
                </template>
                </el-table-column>
                 <el-table-column fixed="right" align="center" prop="oper" label="操作" width="180">
                        <template slot-scope="scope">                           
                            <el-button v-show="scope.row.ablesign==1" @click="handleClick(scope.row)" type="primary" size="mini" icon="el-icon-edit">修改</el-button>   
                            <el-button v-show="scope.row.ablesign==1" @click="offClick(scope.row)" type="primary" size="mini" icon="el-icon-circle-close">注销</el-button>                      
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
import FilterMethods from "@/assets/commonJS/FilterMethods.js";
import USEREDIT from "@/table/wateruser/mange/edituser.vue";
export default {
        data(){
            return{
                loading:false,
                theight:window.innerHeight-240,
                userdetail:'',//断面特征弹框标题
                detailVisible:false,//是否显示弹框
                detailitem:{itemshow:false},//弹框对象
                dialogwidth:(640/window.innerWidth*100)+"%",
                multipleSelection: [], 
                // 表头设置
            tablecolumns: [  
              {
                title: "用户编号",
                key: "farmcode",
                width: 110,
                align: "center",
                sortable: "custom",
                fixed: "left",
              },          
              {
                title: "用户名",
                key: "farmname",
                width: 130,
                align: "center",
                sortable: "custom",
                fixed: "left",
              },
              {
                title: "所属渠道",
                key: "canalcode",
                width: 120,
                align: "center",
                sortable: "custom",
              },
              {
                title: "承包面积(亩)",
                width: 125,
                key: "area",
                align: "center",
                sortable: "custom",
              },
              {
                title: "创建时间",
                width: 140,
                key: "carddate",
                align: "center",
                sortable: "custom",
              },
              {
                title: "联系人",
                width: 100,
                key: "contacts",
                align: "center",
                sortable: "custom",
              },
              {
                title: "联系方式",
                width: 120,
                key: "conphone",
                align: "center",
                sortable: "custom",
              },
              {
                title: "身份证号",
                width: 160,
                key: "cardid",
                align: "center",
                sortable: "custom",
              },           
            ],                
            data:[],
            list_input:{
                total:65,
                pagesize:20,
                pagesizeopts:[10,20,50,75,100,200],
                current:1,
            },
            form:{
                searchmsg:'',
                channel:'',
                carddate:[],
                orderBy:'PX',
                sequence:'asc',
                showsign:'', 
            },   
            channellist:[],
            }
        },
        mixins: [FilterMethods],
        components: {
           USEREDIT
        },
        mounted(){
          this.form.showsign=this.Cook.get("usertype");
          this.$FilterData.Get_CanalInfo(this.$WarmTable,this.form.showsign,data => {
                    this.channellist = data;
          });
          this.Reload();
        },
        methods:{
            search(){
            this.Reload();
            },
            sort_change(item){
              if(item.order==null){
                    return;
                }
                if(item.order=="ascending"){
                    this.form.sequence="asc";
                }else{
                    this.form.sequence="desc";
                }
                if(item.prop=="canalcode"){
                  item.prop="PX";
                }
                this.form.orderby=item.prop.toUpperCase();
                this.list_input.current=1;
                this.Reload();
            },
            PagesizeChange(pagesize){
              this.list_input.pagesize=pagesize;
              this.list_input.current=1;
              this.Reload();
            },
            CurrentChange(index){
                this.list_input.current=index;
                this.Reload();
            }, 
            Reload(){
               this.loading=true;
                var paramobj=new Object();
                if(this.form.searchmsg!=null && this.form.searchmsg!=''){
                  paramobj.stnm=this.form.searchmsg;
                }
                if(this.form.channel!=null && this.form.channel!=''){
                  paramobj.canalcode=this.form.channel;
                }
                if(this.form.carddate!=null && this.form.carddate.length>0){
                  var daterange=this.$FilterData.elDatePicker_Filter(this.form.carddate,'dayTable').split(",");
                  paramobj.begintime=daterange[1]+" 00:00:00";
                  paramobj.endtime=daterange[2]+" 23:59:59";
                }
                var _currentPage = this.list_input.current;
                var _pageSizes = this.list_input.pagesize;
                var _bgincount=(_currentPage - 1) * _pageSizes+1;
                var _endcount=_currentPage * _pageSizes;
                paramobj.begincount=_bgincount;
                paramobj.endcount=_endcount;
                paramobj.orderBy=this.form.orderBy;
                paramobj.sequence=this.form.sequence;
                paramobj.showsign=this.form.showsign;
                this.axios.get('/'+this.$WarmTable+'/waterprice/farmuserpage',{params:paramobj}).then(res => {
                    this.loading=false;    
                    this.data = res.data.rows;
                    this.list_input.total=res.data.total;                                       
                });
            },
            indexMethod(index){
              return index+1+this.list_input.pagesize*(this.list_input.current-1);
            },
            //选中功能
            handleSelectionChange(val){
                this.multipleSelection=val;
            },
            delClick(){
              if(this.multipleSelection==null || this.multipleSelection.length==0){
                this.$message({
                  message: '请选择要删除的农户用户信息',
                  type: 'warning'
                });
              }else{
                var farmids="";
                for(var i=0;i<this.multipleSelection.length;i++){
                  farmids+=this.multipleSelection[i].id;
                  if(i<this.multipleSelection.length-1){
                    farmids+=",";
                  }
                }
                this.$confirm('确定删除这'+this.multipleSelection.length+'条农户用户信息?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.axios.get('/'+this.$WarmTable+'/waterprice/delfarmuser',{params:{ids:farmids}}).then((res)=>{
                    this.$message({
                      type: 'success',
                      message: '删除成功!'
                    });
                    this.Reload();
                  });                 
                }).catch(() => {         
                });
              }
            },
            addClick(){
              this.userdetail="新增农户用户信息";
              this.detailitem.editsign="add";
              this.detailitem.itemshow=true;
              this.detailitem.channellist=this.channellist;
              this.detailVisible=true;
            },
            handleClick(item){
              this.userdetail="修改农户用户信息";
              this.detailitem.editsign="update";
              this.detailitem.itemshow=true;
              this.detailitem.id=item.id;
              this.detailitem.farmcode=item.farmcode;
              this.detailitem.channellist=this.channellist;
              this.detailVisible=true;
            },
            offClick(item){
              this.$confirm('确定注销农户用户'+item.farmname+'?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.axios.post('/'+this.$WarmTable+'/waterprice/updatefarmuser',{id:item.id,ablesign:0}).then((res)=>{
                     this.$message({
                        type: 'success',
                        message: '农户用户'+item.farmname+'注销成功!'
                      });
                     this.Reload();
                  });
                }).catch(() => {         
                });              
            },
            closeUDialog(){
              this.detailVisible=false;
              this.detailitem.itemshow=false;
            },
        }
}
</script>