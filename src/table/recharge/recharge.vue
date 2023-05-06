<template>
	<div>
		<Content class="searchcon">
            <Card style="width:730px;margin:0 auto;margin-top:20px;margin-bottom:10px;">
                <template #title>
                    <Icon type="ios-film-outline"></Icon>
                    水费充值
                </template>
                        <div style="width:400px;float:left;display:inline;margin-top:18px;margin-bottom:14px;">
                        <el-form label-width="100px" :model="form" size="small" :rules="rules" ref="chargeform" v-loading="loading">
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
                            <el-form-item label="购买金额：" prop="amount">
                                <el-input v-model="form.amount" placeholder="请输入购买金额" prefix-icon="el-icon-money" style="width:300px;" @input="keyUp($event, 'amount')" :readonly="readsign"></el-input>
                            </el-form-item>
                            <!--
                            <el-form-item label="充值日期：" prop="createtime">
                                <el-date-picker v-model="form.createtime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择时间" style="width:300px;"></el-date-picker>
                            </el-form-item>
                            -->
                        </el-form>
                        </div>
                        <div style="width:200px;float:right;display:inline;padding:25px;margin-top:38px;margin-bottom:14px;">
                        <Button  type="primary" size="large"  @click="onSave()" icon="logo-yen" style="width:100px;" :disabled="readsign">充值</Button>
                        </div>
                        <Divider  />
                    <table  cellspacing="0" cellpadding="0" class="table_show">                           
                            <tr>
                                <td class="head">用户名：</td>
                                <td class="content">{{info.farmname}}</td>                                
                                <td class="head">所属渠道：</td>
                                <td class="content">{{info.canalname}}</td>
                                <td class="head">承包面积：</td>
                                <td class="content">{{info.area}}</td>
                            </tr>   
                            <tr>
                                <td class="head">购买日期：</td>
                                <td class="content">{{info.createtime}}</td>                               
                                <td class="head">购买金额：</td>
                                <td class="content">{{info.amount}}</td>                               
                                <td class="head">购买水量：</td>
                                <td class="content">{{info.buywater}}</td>
                            </tr>
                            <tr>
                                <td class="head">其中 基础水权：</td>
                                <td class="content">{{info.buybase}}</td>
                                <td class="head">一级水量：</td>
                                <td class="content">{{info.buyfirst}}</td>
                                <td class="head">二级水量：</td>
                                <td class="content">{{info.buysecond}}</td>
                                
                            </tr>  
                            <tr>
                                <td class="head">三级水量：</td>
                                <td class="content">{{info.buythird}}</td>
                                <td class="head">{{lastlabel}}：</td>
                                <td class="content">{{info.lastsurplus}}</td>
                                <td class="head">总存余水量：</td>
                                <td class="content">{{info.remainwater}}</td>
                            </tr>                    
                    </table>
                    <div style="width:730px;margin:0 auto;padding-top:26px;padding-bottom:12px;">
                    <Button  type="primary"  @click="goAdd()" icon="md-fastforward" style="margin-left:225px;":disabled="!readsign">继续充值</Button>
                    <Button  type="primary"  @click="reCeipt()" icon="logo-bitcoin" style="margin-left:50px;" :disabled="!readsign">水费收据</Button>
                    </div>
                    <div style="width:100%;color:red;">备注：用户购买水量时，不要一次购买超两级或以上的水量；每年第一次购买水量，不要超量购买！抄表之前，不要连续充值！
                    </div>
                 </Card>
        </Content>
        <el-dialog
          :visible="detailVisible"
          :width="dialogwidth"
          @close="closeUDialog()"
          append-to-body center
        >
        <SHOUJU v-if="detailitem.itemshow" :info="detailitem" @closewindows="detailVisible=false;"></SHOUJU>
        </el-dialog>
    </div>   
</template>
<script type="text/javascript">
import FilterMethods from "@/assets/commonJS/FilterMethods.js";
import SHOUJU from "@/table/recharge/shouju.vue";
export default {
        data(){
            return{
                lastlabel:'上期结余水量',
                loading:false,
                readsign:false,
                detailVisible:false,//是否显示弹框
                detailitem:{itemshow:false},//弹框对象
                dialogwidth:(770/window.innerWidth*100)+"%",
                form:{
                    canalcode:'',
                    farmcode:'',
                    amount:'',
                    syssign:'',
                  //  createtime:'',
                },
                channelist:[],
                farmlist:[],
                rules: {
                    farmcode: [{ required: true, message: "请选择农户用户",trigger: 'change'}],
                    amount: [{ required: true, message: "购买金额不能为空",trigger: 'blur'}],
                },
                info:{
                    farmname:'',
                    canalname:'',
                    area:'',
                    amount:'',
                    createtime:'',
                    buywater:'',
                    buybase:'',
                    buyfirst:'',
                    buysecond:'',
                    buythird:'',
                    lastsurplus:'',
                    remainwater:'',
                },
            }
        },
        mixins: [FilterMethods],
        components: {
          SHOUJU
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
                this.$refs['chargeform'].validate((valid) => {
                    if (valid) {  
                        this.loading=true; 
                        this.readsign=true;
                        this.axios.post('/'+this.$WarmTable+'/waterprice/addRecharge',this.form).then((res) => {
                            this.loading=false;
                                this.$emit("closewindows");
                                this.$message({
                                type: "success",
                                message: "充值成功!"
                                });
                            var rechargeinfo=res.data.rechargeinfo;
                            var farminfo=res.data.farminfo;
                            this.info.amount=rechargeinfo.amount+'元';
                            this.info.createtime=rechargeinfo.createtime.substring(0,10);
                            this.info.buywater=rechargeinfo.buywater+'m³';
                            this.info.buybase=rechargeinfo.basewater+'m³';
                            this.info.buyfirst=rechargeinfo.buyfirst+'m³';
                            this.info.buysecond=rechargeinfo.buysecond+'m³';
                            this.info.buythird=rechargeinfo.buythird+'m³';
                            if(rechargeinfo.lastsurplus<0){
                                this.lastlabel="上期欠缴水量";
                                this.info.lastsurplus=Math.abs(rechargeinfo.lastsurplus)+'m³';
                            }else{
                                this.lastlabel="上期结余水量";
                                this.info.lastsurplus=rechargeinfo.lastsurplus+'m³';
                            }
                            this.info.remainwater=rechargeinfo.remainwater+'m³';
                            this.info.farmname=farminfo.farmname;
                            this.info.area=farminfo.area+'亩';
                            this.info.canalname=farminfo.canalname;                            
                         });
                    }
                });
            },
            goAdd(){
                this.info={};
                this.form.farmcode='';
                this.form.amount='';
                this.readsign=false;
                this.lastlabel="上期结余水量";
            },
            reCeipt(){               
                this.detailitem=this.info;
                this.detailitem.lastlabel=this.lastlabel;
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