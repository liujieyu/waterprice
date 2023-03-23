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
    <el-tab-pane label="用户基本信息" name="usertab">
      <el-form-item label="用户名：" prop="username">
          <el-input v-model="form.username" placeholder="请输入" style="width:120px"></el-input>
      </el-form-item>
      <el-form-item label="用户类型：" prop="usertype">
        <el-select v-model="form.usertype" filterable placeholder="请选择" style="width:120px">
            <el-option
            v-for="item in typelist"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属渠道：" prop="channel" >
          <el-select v-model="form.channel" filterable placeholder="请选择" style="width:120px">
            <el-option
            v-for="item in channelist"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="所属乡镇：" prop="addvcd" >
        <el-select v-model="form.addvcd" filterable placeholder="请选择" style="width:120px">
            <el-option
            v-for="item in adresslist"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
          </el-select>
      </el-form-item>
    </el-tab-pane>
  </el-tabs>
  <div style="width:100%;height:0px;"></div>
<el-tabs value="cardtab">
    <el-tab-pane label="办卡信息" name="cardtab">
      <el-form-item label="卡号：" prop="cardnum">
          <el-input v-model="form.cardnum" placeholder="请输入" style="width:120px"></el-input>
      </el-form-item>
      <el-form-item label="办卡人：" prop="man">
          <el-input v-model="form.man" placeholder="请输入" style="width:120px"></el-input>
      </el-form-item>
      <el-form-item label="手机号码：" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入" style="width:120px" @input="value=value.replace(/^\.+|[^\d.]/g,'')"></el-input>
      </el-form-item>
      <el-form-item label="办卡日期：" prop="carddate">
          <el-date-picker v-model="form.carddate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width:120px;"></el-date-picker>
      </el-form-item>
    </el-tab-pane>
</el-tabs> 
<el-form-item>
    <el-button type="primary" @click="onSubmit" style="margin-right:20px;margin-left:160px;" size="small">保存</el-button>
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
        username:"",
        usertype:"",
        channel: "",
        addvcd: "",
        cardnum: "",
        man: "",
        phone: "",
        carddate: "",
      },
      routerurl:'',
      channelist:[],
      adresslist:[],
      typelist:[],
      rules: {
        username: [{ required: true, message: "用户名不能为空",trigger: 'blur'},{ min: 1, max: 10, message: '长度在1到10个字符', trigger: 'blur'}],
        usertype: [{ required: true, message: "请选择用户类型",trigger: 'change'}],
        channel: [{ required: true, message: "请选择所属渠道",trigger: 'change'}],
        addvcd: [{ required: true, message: "请选择乡镇",trigger: 'change'}],
        cardnum: [{ required: true, message: "卡号不能为空",trigger: 'blur'}],  
        man: [{ required: true, message: "办卡人不能为空",trigger: 'blur'}], 
        phone: [{ required: true, message: "手机号码不能为空",trigger: 'blur',}],
        carddate: [{ required: true, message: "请选择办卡日期",trigger: 'change'}],
      },
    };
  },
  mounted() { 

  },
   methods: {
    onSubmit(){
      this.$refs['userform'].validate((valid) => {
          if (valid) {  }
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