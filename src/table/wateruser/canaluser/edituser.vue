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
      <el-form-item label="用户编号：" prop="stcd">
          <el-input v-model="form.stcd" placeholder="请输入" style="width:160px"></el-input>
      </el-form-item>
      <el-form-item label="用户名：" prop="stnm">
          <el-input v-model="form.stnm" placeholder="请输入" style="width:160px"></el-input>
      </el-form-item>
      <el-form-item label="所属渠道：" prop="canalcode" >
          <el-select ref="selectLabel" v-model="form.canalcode" filterable placeholder="请选择(可搜索)" style="width:160px" @change="getLabel">
            <el-option
            v-for="item in channelist"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="灌溉面积：" prop="area" >
        <el-input v-model="form.area" placeholder="请输入" style="width:148px" oninput="value=value.replace(/[^\d]/g,'')"></el-input>亩
      </el-form-item>
      <el-form-item label="排序：" prop="px" >
        <el-input v-model="form.px" placeholder="请输入" style="width:160px" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
      </el-form-item>
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
        stcd:"",
        stnm:"",
        canalcode: "",
        canalname:"",
        area: "",
        syssign:"",
      },
      routerurl:'',
      channelist:[],
      rules: {
        stcd: [{ required: true, message: "用户编号不为空",trigger: 'blur'}],
        stnm: [{ required: true, message: "用户名不为空",trigger: 'blur'}],
        canalcode: [{ required: true, message: "请选择所属渠道",trigger: 'change'}],
        area: [{ required: true, message: "灌溉面积不为空",trigger: 'blur'}],
        px: [{ required: true, message: "排序不为空",trigger: 'blur'}],  
      },
    };
  },
  mounted() {
    var upcanalcode=this.Cook.get("channelcode");
    this.$FilterData.Get_CanalInfoByAll(this.$WarmTable,upcanalcode,data => {
             this.channelist = data;
     });
    this.form.syssign=this.Cook.get("usertype"); 
    if(this.info.editsign=="add"){
        this.routerurl='/'+this.$WarmTable+'/waterprice/addcanaluser';
    }else{
        this.routerurl='/'+this.$WarmTable+'/waterprice/updatecanaluser';
        this.axios.get('/'+this.$WarmTable+'/waterprice/canaluserbyid',{params:{id:this.info.id}}).then((res)=>{
          this.form=res.data;
        });
    }
  },
   methods: {
    onSubmit(){
      this.$refs['userform'].validate((valid) => {
          if (valid) { 
            if(this.info.editsign=="add" || (this.info.editsign=="update" && this.info.stcd!=this.form.stcd)){
              this.axios.get('/'+this.$WarmTable+'/waterprice/checkcanalcode',{params:{stcd:this.form.stcd}}).then((res)=>{
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
                      message: "保存支渠用户信息成功!"
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
                      message: "保存支渠用户信息成功!"
                    });
                  });
            }
           }
      });
    },
    onCannel(){
      this.$emit("closewindows");
    },
    getLabel(){
        this.$nextTick(()=>{
            console.log(this.$refs.selectLabel.selectedLabel);
            this.form.canalname=this.$refs.selectLabel.selectedLabel;
        })
    },
   },
     computed: {},

  watch: {}
};
</script>