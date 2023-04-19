<template>
<el-form
        :v-loading="loading"
        :inline="true"
        ref="userform"
        :model="form"
        :rules="rules"
        size="mini"
        label-width="100px"
        style="display: flex;flex-wrap: wrap;"
      >
<el-tabs value="usertab">
    <el-tab-pane label="农户用户基本信息" name="usertab">
      <el-form-item label="用户编号：" prop="farmcode">
          <el-input v-model="form.farmcode" placeholder="请输入" style="width:180px"></el-input>
      </el-form-item>
      <el-form-item label="用户名：" prop="farmname">
          <el-input v-model="form.farmname" placeholder="请输入" style="width:180px"></el-input>
      </el-form-item>
      <el-form-item label="所属渠道：" prop="canalcode" >
          <el-select v-model="form.canalcode" filterable placeholder="请选择" style="width:180px">
            <el-option
            v-for="item in channelist"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="承包面积：" prop="area" >
        <el-input v-model="form.area" placeholder="请输入" style="width:168px" oninput="value=value.replace(/[^\d]/g,'')"></el-input>亩
      </el-form-item>
    </el-tab-pane>
  </el-tabs>
  <div style="width:100%;height:0px;"></div>
<el-tabs value="cardtab">
    <el-tab-pane label="联系信息" name="cardtab">
      <el-form-item label="联系人：" prop="contacts">
          <el-input v-model="form.contacts" placeholder="请输入" style="width:180px"></el-input>
      </el-form-item>
      <el-form-item label="联系方式：" prop="conphone">
          <el-input v-model="form.conphone" placeholder="请输入" style="width:180px" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
      </el-form-item>
      <el-form-item label="身份证号：" prop="cardid">
          <el-input v-model="form.cardid" placeholder="请输入" style="width:180px"></el-input>
      </el-form-item>
      <el-form-item label="创建时间：" prop="carddate">
          <el-date-picker v-model="form.carddate" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择时间" style="width:180px;"></el-date-picker>
      </el-form-item>
    </el-tab-pane>
</el-tabs> 
<el-form-item>
    <el-button type="primary" @click="onSubmit" style="margin-right:20px;margin-left:210px;" size="small">保存</el-button>
    <el-button type="info" @click="onCannel" size="small">取消</el-button>
</el-form-item>      
</el-form>
</template>
<script>
export default {
  props: {
    info: {},
  },

  data() {
    return {
      loading:false,
      form: {
        id:"",
        farmcode:"",
        farmname:"",
        canalcode: "",
        area: "",
        contacts: "",
        conphone: "",
        cardid:"",
        carddate: "",
        syssign:"",
        ablesign:"",
      },
      routerurl:'',
      channelist:[],
      rules: {
        farmcode: [{ required: true, message: "用户编号不为空",trigger: 'blur'}],
        farmname: [{ required: true, message: "用户名不为空",trigger: 'blur'}],
        canalcode: [{ required: true, message: "请选择所属渠道",trigger: 'change'}],
        area: [{ required: true, message: "承包面积不为空",trigger: 'blur'}],
        contacts: [{ required: true, message: "联系人不为空",trigger: 'blur'}], 
        conphone: [{ required: true, message: "联系方式不为空",trigger: 'blur'}], 
        carddate: [{ required: true, message: "请选择办卡时间",trigger: 'change'}],
      },
    };
  },
  mounted() { 
    this.form.syssign=this.Cook.get("usertype");
    this.form.ablesign=1;
    this.channelist=this.info.channellist;   
    this.form.carddate=this.getTodayDate();
    if(this.info.editsign=="add"){
        this.routerurl='/'+this.$WarmTable+'/waterprice/addfarmuser';
    }else{
        this.routerurl='/'+this.$WarmTable+'/waterprice/updatefarmuser';
        this.axios.get('/'+this.$WarmTable+'/waterprice/farmuserbyid',{params:{id:this.info.id}}).then((res)=>{
          this.form=res.data;
        });
    }
  },
   methods: {
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
    onSubmit(){
      this.$refs['userform'].validate((valid) => {
          if (valid) { 
            if(this.info.editsign=="add" || (this.info.editsign=="update" && this.info.farmcode!=this.form.farmcode)){
              this.axios.get('/'+this.$WarmTable+'/waterprice/checkfarmcode',{params:{farmcode:this.form.farmcode}}).then((res)=>{
                var status=res.data.checksign;
                if(status=="yes"){
                  this.$message.error(res.data.warning);
                }else{
                  this.loading=true;
                  this.axios.post(this.routerurl,this.form).then((res) => {
                    this.loading=false;
                    this.$emit("closewindows");
                    this.$message({
                      type: "success",
                      message: "保存农户用户信息成功!"
                    });
                  });
                }
              });
            }else{
              this.loading=true;
              this.axios.post(this.routerurl,this.form).then((res) => {
                   this.loading=false;
                    this.$emit("closewindows");
                    this.$message({
                      type: "success",
                      message: "保存农户用户信息成功!"
                    });
                  });
            }
           }
      });
    },
    onCannel(){
      this.$emit("closewindows");
    },
   },
     computed: {},

  watch: {}
};
</script>