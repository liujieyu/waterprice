<template>
	<div>
		<Content class="searchcon" style="padding-left:36px;">
            <Row :gutter="24" style="display: flex;">
            <COL span="12">
            <Row type="flex" :gutter="16" class="rowtocol" style="padding-top:10px;"> 
                <COL>
                 <Input search enter-button suffix="ios-search" placeholder="请输入登录名" style="width:200px;margin-right: 15px;margin-left:10px;margin-top:-2px;" @on-search="search" v-model="form.searchmsg" />
                </COL>
                <COL> 
                    <Button type="primary" icon="md-add"  style="width: auto;margin-right:20px;" @click="addClick">新增</Button>
                    <Button type="primary" icon="ios-trash" style="width: auto;" @click="delClick">删除</Button>
                </COL>
            </Row>
            <Row class="fgline"></Row>
            <el-table
                :data="data"
                ref="logintable"
                border
                style="width: 100%;cursor:pointer;"
                :height="theight"
                v-loading="loading"
                empty-text="暂无站点数据"
                @selection-change="handleSelectionChange"
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
                :width="item.width"
                :fixed="item.fixed"
                ></el-table-column>
                <el-table-column fixed="right" align="center" prop="oper" label="操作" width="120">
                        <template slot-scope="scope">                           
                            <el-button @click="handleClick(scope.row)" type="primary" size="mini" icon="el-icon-edit">修改</el-button>                       
                        </template>
                 </el-table-column>
            </el-table>
            </COL>
            <COL span="2" style="padding-left:5px;">
              <Divider type="vertical" style="height:100%;"/>
            </COL>
            <COL span="10" style="padding-left:14px;">
                <Card style="width:600px;margin:0 auto;margin-top:10px;margin-left:10px;">
                    <template #title>
                        {{editinfo.title}}
                    </template>
                    <el-form
                        :v-loading="formloading"
                        :inline="false"
                        ref="userform"
                        :model="editform"
                        :rules="rules"
                        size="small"
                        label-width="120px"
                        style="display: flex;flex-wrap: wrap;"
                    >

                    </el-form>
                </Card>
            </COL>
        </Row>
     </Content>
    </div>
</template>
<script type="text/javascript">
export default {
        data(){
            return{
                loading:false,
                formloading:false,
                theight:window.innerHeight-200,
                multipleSelection: [], 
                // 表头设置
            tablecolumns: [  
              {
                title: "登录账号",
                key: "loginname",
                width: 120,
                align: "center",
                fixed: "left",
              },          
              {
                title: "创建时间",
                key: "createtime",
                width: 130,
                align: "center",
                fixed: "left",
              },        
            ],                
            data:[],
            form:{
                searchmsg:'',
                showsign:'', 
            },   
            editform:{

            },
            editinfo:{
                title:'',
                editsign:'',
            },
            rules:{
                
            },
            }
        },
        mixins: [],
        components: {
        },
        mounted(){
          this.form.showsign=this.Cook.get("usertype");
          this.Reload();
        },
        methods:{
            search(){
            this.Reload();
            },
            Reload(){
               this.loading=true;
                var paramobj=new Object();
                if(this.form.searchmsg!=null && this.form.searchmsg!=''){
                  paramobj.loginname=this.form.searchmsg;
                }
                paramobj.showsign=this.form.showsign;
                this.axios.get('/'+this.$WarmTable+'/waterprice/authorityinfo',{params:paramobj}).then(res => {
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
                  message: '请选择要删除的登录用户信息',
                  type: 'warning'
                });
              }else{
                var userids="";
                for(var i=0;i<this.multipleSelection.length;i++){
                  userids+=this.multipleSelection[i].id;
                  if(i<this.multipleSelection.length-1){
                    userids+=",";
                  }
                }
                this.$confirm('确定删除这'+this.multipleSelection.length+'条登录用户信息?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.axios.get('/'+this.$WarmTable+'/waterprice/delauthority',{params:{ids:userids}}).then((res)=>{
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
              this.editinfo.title="新增登录用户信息";
              this.editinfo.editsign="add";
            },
            handleClick(item){
              this.editinfo.title="修改登录用户信息";
              this.editinfo.editsign="update";
            },
        }
}
</script>