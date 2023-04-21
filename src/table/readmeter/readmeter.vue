<template>
	<div>
		<Content class="searchcon">
            <Card style="width:730px;margin:0 auto;margin-top:20px;margin-bottom:10px;">
                <template #title>
                    <Icon type="ios-film-outline"></Icon>
                    抄表录入
                </template>
                        <div style="width:400px;float:left;display:inline;margin-top:18px;margin-bottom:14px;">
                        <el-form label-width="100px" :model="form" size="small" :rules="rules" ref="meterform">
                            <el-form-item label="所属渠道：" prop="canalcode">
                                <el-select v-model="form.canalcode" filterable placeholder="请选择(可搜索)" style="width:300px" @change="Queryfarm" :disabled="readsign">
                                    <el-option
                                    v-for="item in channelist"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="农户用户：" prop="farmcode">
                                <el-select v-model="form.farmcode" filterable placeholder="请选择(可搜索)" style="width:300px" :disabled="readsign">
                                    <el-option
                                    v-for="item in farmlist"
                                    :key="item.label"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="水表读数：" prop="waternum">
                                <el-input v-model="form.waternum" placeholder="请输入水表读数" prefix-icon="el-icon-s-help" style="width:300px;" @input="keyUp($event, 'amount')" :readonly="readsign"></el-input>
                            </el-form-item>
                            <!--
                            <el-form-item label="抄表日期：" prop="readtime">
                                <el-date-picker v-model="form.readtime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择时间" style="width:300px;"></el-date-picker>
                            </el-form-item>
                            -->
                        </el-form>
                        </div>
                        <div style="width:200px;float:right;display:inline;padding:25px;margin-top:38px;margin-bottom:14px;">
                        <Button  type="primary" size="large"  @click="onSave()" icon="md-done-all" style="width:100px;" :disabled="readsign">抄表</Button>
                        </div>
                        <Divider  />
                    <table  cellspacing="0" cellpadding="0" class="table_show"> 
                           <tr>
                              <td colspan="2" class="head" style="font-size:16px;width:240px;">水费：</td>
                              <td colspan="4" class="content" style="font-weight:bold;font-size:16px;width:240px;">{{info.waterrate}}</td>
                            </tr>                          
                            <tr>
                                <td class="head">用户名：</td>
                                <td class="content">{{info.farmname}}</td>                                
                                <td class="head">所属渠道：</td>
                                <td class="content">{{info.canalname}}</td>
                                <td class="head">承包面积：</td>
                                <td class="content">{{info.area}}</td>
                            </tr>   
                            <tr>
                                <td class="head">账单日期：</td>
                                <td class="content">{{info.readtime}}</td>                                                                                           
                                <td class="head">水表读数：</td>
                                <td class="content">{{info.waternum}}</td>                               
                                <td class="head">上期读数：</td>
                                <td class="content">{{info.lastnum}}</td>
                            </tr>
                            <tr>                                
                                <td class="head">水量：</td>
                                <td class="content">{{info.wateryield}}</td>
                                <td class="head">其中 基础水量：</td>
                                <td class="content">{{info.yieldbase}}</td>                                
                                <td class="head">一级水量：</td>
                                <td class="content">{{info.yieldfirst}}</td>
                            </tr>  
                            <tr> 
                                <td class="head">二级水量：</td>
                                <td class="content">{{info.yieldsecond}}</td>
                                <td class="head">三级水量：</td>
                                <td class="content">{{info.yieldthird}}</td>  
                                <td class="head">{{lastlabel}}：</td>
                                <td class="content">{{info.available}}</td>                             
                            </tr>                    
                    </table>
                    <div style="width:730px;margin:0 auto;">
                    <Button  type="primary"  @click="goAdd()" icon="md-fastforward" style="margin-left:300px;margin-top:26px;margin-bottom:12px;" >继续抄表</Button>
                    </div>
                    <div style="width:100%;color:red;">备注：每隔3个月进行一次抄表，1月、4月、7月、11月进行；将用户的水表读数录入系统；每年1月为年终抄表，水量归为前一年。
                     督促用户在下一次抄表之前，将本次欠缴水费补齐。
                    </div>
                 </Card>
        </Content>
    </div>
</template>
<script type="text/javascript">
import FilterMethods from "@/assets/commonJS/FilterMethods.js";
export default {
        data(){
            return{
                lastlabel:'水费可用余额',
                loading:false,
                readsign:false,
                form:{
                    canalcode:'',
                    farmcode:'',
                    waternum:'',
                    syssign:'',
                //    readtime:'',
                },
                channelist:[],
                farmlist:[],
                rules: {
                    farmcode: [{ required: true, message: "请选择农户用户",trigger: 'change'}],
                    waternum: [{ required: true, message: "水表读数不能为空",trigger: 'blur'}],
                },
                info:{
                    farmname:'',
                    canalname:'',
                    area:'',
                    waternum:'',
                    readtime:'',
                    lastnum:'',
                    wateryield:'',
                    yieldbase:'',
                    yieldfirst:'',
                    yieldsecond:'',
                    yieldthird:'',
                    waterrate:'',
                    available:'',
                },
            }
        },
        mixins: [FilterMethods],
        components: {
          
        },
        mounted(){
            this.form.syssign=this.Cook.get("usertype");
            this.$FilterData.Get_FarmInfo(this.$WarmTable,this.form.syssign,null,data => {
                        this.farmlist = data;
            });
            this.$FilterData.Get_CanalInfo(this.$WarmTable,this.form.syssign,data => {
                        this.channelist = data;
            });
        },
        methods:{
            keyUp(e, key) {
                if (!this.form[key]) {
                    return (this.form[key] = "");
                }
                // 每次抬键处理,对应金额渲染两位小数||数字
                let num = "";
                num = this.form[key].replace(/^[^\d]+$/g, "").split('.')[0];
                this.form[key] = `${num}`;
                },
            Queryfarm(codevalue){
                this.$FilterData.Get_FarmInfo(this.$WarmTable,this.form.syssign,codevalue,data => {
                        this.farmlist = data;
                        this.form.farmcode='';
                });
            },
            onSave(){
                this.$refs['meterform'].validate((valid) => {
                    if (valid) {  
                        this.loading=true; 
                        this.axios.post('/'+this.$WarmTable+'/waterprice/addWatermeter',this.form).then((res) => {
                            this.loading=false;
                                this.$emit("closewindows");
                                this.$message({
                                type: "success",
                                message: "抄表成功!"
                                });
                            var meterinfo=res.data.meterinfo;
                            var farminfo=res.data.farminfo;
                            this.info.waternum=meterinfo.waternum;
                            this.info.readtime=meterinfo.readtime.substring(0,10);
                            this.info.lastnum=meterinfo.lastnum;
                            this.info.wateryield=meterinfo.wateryield+'m³';
                            this.info.yieldbase=meterinfo.yieldbase+'m³';
                            this.info.yieldfirst=meterinfo.yieldfirst+'m³';
                            this.info.yieldsecond=meterinfo.yieldsecond+'m³';
                            this.info.yieldthird=meterinfo.yieldthird+'m³';
                            this.info.waterrate=parseFloat(meterinfo.waterrate).toFixed(2)+'元';
                            if(meterinfo.available<0){
                                this.lastlabel="已欠缴水费";
                                this.info.available=parseFloat(Math.abs(meterinfo.available)).toFixed(2)+'元';
                            }else{
                                this.lastlabel="水费可用余额";
                                this.info.available=parseFloat(meterinfo.available).toFixed(2)+'元';
                            }
                            this.info.farmname=farminfo.farmname;
                            this.info.area=farminfo.area+'亩';
                            this.info.canalname=farminfo.canalname;
                            this.readsign=true;
                         });
                    }
                });
            },
            goAdd(){
                this.info={};
                this.form.farmcode='';
                this.form.waternum='';
                this.readsign=false;
                this.lastlabel="水费可用余额";
            },
        }
}
</script>
<style lang="less" scoped>
.table_show {
margin: 0 auto;
margin-top:30px;
 width: 690px;
 border:1px solid #C7CCD6;
 border-collapse:collapse; 
 color: #515A6E;
 
.head{background-color: #EFF2F6;color:#4b5469;width: 120px;text-align: right;}
.content{width: 120px;text-align: center;}
 td{
    height: 42px;
    text-align: center;   
    border-top: none;
    border:1px solid #C7CCD6;
  }
}
</style>