<template>
	<div>
		<Content class="searchcon" style="padding-left:36px;">
            <Row type="flex" :gutter="16" class="rowtocol" style="padding-top:10px;"> 
                <COL>
                 <Input search enter-button suffix="ios-search" placeholder="请输入登录名" style="width:200px;margin-right: 20px;margin-top:-2px;" @on-search="search" v-model="form.searchmsg" />
                </COL>
                <COL> 
                    <Button type="primary" icon="md-add"  style="width: auto;margin-right:20px;" @click="addClick">新增</Button>
                    <Button type="primary" icon="ios-trash" style="width: auto;" @click="delClick">删除</Button>
                </COL>
            </Row>
            <Row class="fgline"></Row>
            <Row :gutter="24" style="display: flex;">
            <COL span="12">           
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
                <el-table-column fixed="right" align="center" prop="oper" label="操作" width="240">
                        <template slot-scope="scope">                           
                            <el-button @click="handleClick(scope.row)" type="primary" size="mini" icon="el-icon-edit">修改账号</el-button>    
                            <el-button @click="resetClick(scope.row)" type="primary" size="mini" icon="el-icon-share">重置密码</el-button>                    
                        </template>
                 </el-table-column>
            </el-table>
            </COL>
            <COL span="2" style="padding-left:24px;">
              <Divider type="vertical" style="height:100%;"/>
            </COL>
            <COL span="10" style="padding-left:14px;">
                <Card style="width:350px;margin:0 auto;margin-top:10px;margin-left:10px;">
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
                        label-width="100px"
                        style="display: flex;flex-wrap: wrap;"
                    >
                    <el-form-item v-if="editinfo.editsign=='update' || editinfo.editsign=='add'" label="登录账号：" prop="loginname">
                        <el-input v-model="editform.loginname" placeholder="请输入" style="width:200px"></el-input>
                    </el-form-item>
                    <el-form-item v-if="editinfo.editsign=='reset'" label="旧密码：" prop="lastpass">
                        <el-input v-model="editform.lastpass" placeholder="请输入" style="width:200px" show-password></el-input>
                    </el-form-item>
                    <el-form-item v-if="editinfo.editsign=='reset' || editinfo.editsign=='add'" :label="editinfo.label" prop="loginpass">
                        <el-input v-model="editform.loginpass" placeholder="请输入" style="width:200px" show-password></el-input>
                    </el-form-item>
                    <el-form-item v-if="editinfo.editsign=='reset' || editinfo.editsign=='add'" label="确认密码：" prop="confimpass">
                        <el-input v-model="editform.confimpass" placeholder="请输入" style="width:200px" show-password></el-input>
                    </el-form-item>
                    <el-form-item v-if="editinfo.editsign=='update' || editinfo.editsign=='add'" label="创建时间：" prop="createtime">
                        <el-date-picker v-model="editform.createtime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择时间" style="width:200px;"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" style="margin-left:30px;" :disabled="saveable" size="small">保存</el-button>
                    </el-form-item>  
                    </el-form>
                </Card>
            </COL>
        </Row>
     </Content>
    </div>
</template>
<script type="text/javascript">
const validatePass = (rule, value, callback) => {
   var regex = new RegExp("(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,16}");
   if (value === "") {
      callback(new Error("请输⼊密码"));
   } else if (value.length < 8 || value.length > 16) {
     callback(new Error("请输⼊8~16位密码"));
   } else if (!regex.test(value)) {
     callback(new Error("必须包含字母、数字和特殊字符"));
   } else {
     callback();
   }
};
export default {
        data(){
            return{
                loading:false,
                formloading:false,
                theight:window.innerHeight-200,
                multipleSelection: [], 
                routerurl:'',
                saveable:false,
                // 表头设置
            tablecolumns: [  
              {
                title: "登录账号",
                key: "loginname",
                width: 130,
                align: "center",
                fixed: "left",
              },          
              {
                title: "创建时间",
                key: "createtime",
                width: 160,
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
              id:null,
              loginname:null,
              loginpass:null,
              createtime:null,
              confimpass:null,
              lastpass:null,
              syssign:'',
            },
            editinfo:{
                title:'',
                editsign:'',
                label:'',
                showpass:'',              
                loginname:'',
                saveinfo:'',
            },
            rules: {
              loginname: [{ required: true, message: "登录账号不为空",trigger: 'blur'}],
              loginpass: [{ required: true, message: "登录密码不为空",trigger: 'blur'},
                          { required: true, validator: validatePass , trigger: "blur" },],
              confimpass: [{ required: true, message: "确认密码不为空",trigger: 'blur'}],
              lastpass: [{ required: true, message: "旧密码不为空",trigger: 'blur'}],
              createtime: [{ required: true, message: "请选择创建时间",trigger: 'change'}],
            },
            }
        },
        mixins: [],
        components: {
        },
        mounted(){
          this.form.showsign=this.Cook.get("usertype");         
          this.addClick();
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
                    var datalist = res.data;  
                    this.data=datalist.map((val, index) => {
                      val.createtime=val.createtime.substring(0,19);
                      return val;
                    });                                 
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
              this.editinfo.editsign='add';
              this.editinfo.label="登录密码：";
              this.editform.syssign=this.form.showsign;
              this.editform.createtime=this.getTodayDate();
              this.editform.id=null;
              this.editform.loginpass=null;
              this.editform.confimpass=null;
              this.editinfo.showpass=null;
              this.editform.lastpass=null;
              this.editinfo.loginname=null;            
              this.editform.loginname=null;
              this.routerurl='/'+this.$WarmTable+'/waterprice/addauthority';
              this.editinfo.saveinfo="新增登录用户信息成功!";
            },
            handleClick(item){
              this.editinfo.title="修改"+item.loginname+"的登录账号";
              this.editinfo.editsign='update'; 
              this.editform.syssign=this.form.showsign;
              this.editinfo.loginname=item.loginname;            
              this.editform.loginname=item.loginname;
              this.editform.createtime=item.createtime;
              this.editform.id=item.id;
              this.editform.loginpass=null;
              this.editform.confimpass=null;
              this.editinfo.showpass=null;
              this.editform.lastpass=null;             
              this.routerurl='/'+this.$WarmTable+'/waterprice/updateauthority';
              this.editinfo.saveinfo="修改登录账号成功!";
            },
            resetClick(item){
              this.editinfo.title="重置账号"+item.loginname+"的密码";
              this.editinfo.editsign='reset';
              this.editinfo.label="新密码：";
              this.editform.syssign=this.form.showsign;
              this.editinfo.showpass=item.loginpass;
              this.editform.id=item.id;
              this.editform.loginpass=null;
              this.editform.confimpass=null;
              this.editform.lastpass=null;
              this.editform.createtime=null;
              this.editinfo.loginname=null;            
              this.editform.loginname=null;
              this.routerurl='/'+this.$WarmTable+'/waterprice/updateauthority';
              this.editinfo.saveinfo="重置密码成功!";
            },
            onSubmit(){
              this.$refs['userform'].validate((valid) => {
                  if (valid) { 
                    if(this.editinfo.editsign=="add"){
                      if(this.editform.confimpass!=this.editform.loginpass){
                        this.$message({
                          message: '确认密码和登录密码不一致',
                          type: 'warning'
                        });
                        return;
                      }
                      }else if(this.editinfo.editsign=="reset"){
                        if(this.editinfo.showpass!=this.editform.lastpass){
                          this.$message({
                          message: '旧密码错误',
                          type: 'warning'
                        });
                        return;
                        }
                        if(this.editform.confimpass!=this.editform.loginpass){
                        this.$message({
                          message: '确认密码和新密码不一致',
                          type: 'warning'
                        });
                        return;
                      }
                    }                
                    if(this.editinfo.editsign=="add" || (this.editinfo.editsign=="update" && this.editinfo.loginname!=this.editform.loginname)){
                      this.axios.get('/'+this.$WarmTable+'/waterprice/checkloginname',{params:{loginname:this.editform.loginname,showsign:this.editform.syssign}}).then((res)=>{
                        var status=res.data.checksign;
                        if(status=="yes"){
                          this.$message.error(res.data.warning);
                        }else{
                          this.formloading=true;
                          this.saveable=true;
                          this.loading=true;
                          this.axios.post(this.routerurl,this.editform).then((res) => {                            
                            this.$message({
                              type: "success",
                              message: this.editinfo.saveinfo
                            });
                            let timer = setTimeout(() => {
                              this.loading=false;
                              this.saveable=false;
                              this.formloading=false;
                               this.Reload();
                                this.addClick();
                                clearTimeout(timer);
                              }, 1500);
                          });
                        }
                      });
                    }else{
                      this.loading=true;
                      this.formloading=true;
                      this.saveable=true;
                      this.axios.post(this.routerurl,this.editform).then((res) => {                         
                            this.$message({
                              type: "success",
                              message: this.editinfo.saveinfo
                            });
                            let timer = setTimeout(() => {
                              this.loading=false;
                              this.saveable=false;
                              this.formloading=false;
                               this.Reload();
                                this.addClick();
                                clearTimeout(timer);
                              }, 1500);
                          });
                    }
                  }
              });
            },
            //获取今日日期时间
            getTodayDate(){
              var date = new Date();
                  var Month = date.getMonth()+1;
                  var Hours = date.getHours();
                  var Minutes = date.getMinutes();
                  var Seconds = date.getSeconds();
                  if (Hours<10) {
                    Hours = `0${Hours}`
                  }
                  if (Minutes<10) {
                    Minutes = `0${Minutes}`
                  }
                  if (Seconds<10) {
                    Seconds = `0${Seconds}`
                  }
                  if (Month<10) {
                    Month = `0${Month}`
                  }
                return `${date.getFullYear()}-${Month}-${date.getDate()} ${Hours}:${Minutes}:${Seconds}`;
            },
        }
}
</script>