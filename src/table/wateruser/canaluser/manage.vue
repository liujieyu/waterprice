<template>
	<div>
		<Content class="searchcon">
            <Row type="flex" :gutter="16" class="rowtocol" style="padding-top:10px;"> 
                <COL>
                 <Input search enter-button suffix="ios-search" placeholder="请输入用户编号或者名称" style="width:230px;margin-right: 15px;margin-left:10px;margin-top:-2px;" @on-search="search" v-model="form.searchmsg" />
                </COL>
                <COL>
                   <Select v-model="form.channel" @on-change="search" style="width:160px;margin-right: 15px;" clearable filterable placeholder="所属渠道(可搜索)">
                 <Option v-for="item in channellist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                 </Select>
                </COL>
                <COL> 
                    <Button type="primary" icon="md-add"  style="width: auto;margin-right:20px;" @click="addClick">新增</Button>
                    <Button type="primary" icon="ios-trash" style="width: auto;" @click="delClick">删除</Button>
                </COL>
            </Row>
            <Row class="fgline"></Row>
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
                 <el-table-column fixed="right" align="center" prop="oper" label="操作" width="120">
                        <template slot-scope="scope">                           
                            <el-button @click="handleClick(scope.row)" type="primary" size="mini" icon="el-icon-edit">修改</el-button>                       
                        </template>
                 </el-table-column>
            </el-table>
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
import USEREDIT from "@/table/wateruser/canaluser/edituser.vue";
export default {
        data(){
            return{
                loading:false,
                theight:window.innerHeight-200,
                userdetail:'',//断面特征弹框标题
                detailVisible:false,//是否显示弹框
                detailitem:{itemshow:false},//弹框对象
                dialogwidth:(600/window.innerWidth*100)+"%",
                multipleSelection: [], 
                // 表头设置
            tablecolumns: [  
              {
                title: "用户编号",
                key: "stcd",
                width: 110,
                align: "center",
                sortable: "custom",
                fixed: "left",
              },          
              {
                title: "用户名",
                key: "stnm",
                width: 130,
                align: "center",
                sortable: "custom",
                fixed: "left",
              },
              {
                title: "所属渠道",
                key: "canalname",
                width: 120,
                align: "center",
                sortable: "custom",
              },
              {
                title: "灌溉面积(亩)",
                width: 125,
                key: "area",
                align: "center",
                sortable: "custom",
              },
              {
                title: "排序",
                width: 100,
                key: "px",
                align: "center",
                sortable: "custom",
              },         
            ],                
            data:[],
            form:{
                searchmsg:'',
                channel:'',
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
                this.form.orderby=item.prop.toUpperCase();
                this.list_input.current=1;
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
                paramobj.orderBy=this.form.orderBy;
                paramobj.sequence=this.form.sequence;
                paramobj.showsign=this.form.showsign;
                this.axios.get('/'+this.$WarmTable+'/waterprice/getwatersite',{params:paramobj}).then(res => {
                    this.loading=false;    
                    this.data = res.data;                                   
                });
            },
            indexMethod(index){
              return index+1;
            },
            //选中功能
            handleSelectionChange(val){
                this.multipleSelection=val;
            },
            delClick(){
              if(this.multipleSelection==null || this.multipleSelection.length==0){
                this.$message({
                  message: '请选择要删除的支渠用户信息',
                  type: 'warning'
                });
              }else{
                var canalids="";
                for(var i=0;i<this.multipleSelection.length;i++){
                  canalids+=this.multipleSelection[i].id;
                  if(i<this.multipleSelection.length-1){
                    canalids+=",";
                  }
                }
                this.$confirm('确定删除这'+this.multipleSelection.length+'条支渠用户信息?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.axios.get('/'+this.$WarmTable+'/waterprice/delcanaluser',{params:{ids:canalids}}).then((res)=>{
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
              this.userdetail="新增支渠用户信息";
              this.detailitem.editsign="add";
              this.detailitem.itemshow=true;
              this.detailitem.channellist=this.channellist;
              this.detailVisible=true;
            },
            handleClick(item){
              this.userdetail="修改支渠用户信息";
              this.detailitem.editsign="update";
              this.detailitem.itemshow=true;
              this.detailitem.id=item.id;
              this.detailitem.stcd=item.stcd;
              this.detailitem.channellist=this.channellist;
              this.detailVisible=true;
            },
            closeUDialog(){
              this.detailVisible=false;
              this.detailitem.itemshow=false;
            },
        }
}
</script>