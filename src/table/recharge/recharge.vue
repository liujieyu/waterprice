<template>
	<div>
		<Content class="searchcon">
            <Card style="width:730px;margin:0 auto;margin-top:20px;margin-bottom:10px;">
                <template #title>
                    <Icon type="ios-film-outline"></Icon>
                    水费充值
                </template>
                        <div style="width:400px;float:left;display:inline;margin-top:18px;margin-bottom:14px;">
                        <el-form label-width="90px" :model="form" size="small" :rules="rules" ref="chargeform">
                            <el-form-item label="卡号：" prop="cardnum">
                                <el-input v-model="form.cardnum" placeholder="请输入卡号" prefix-icon="el-icon-postcard" style="width:300px;"></el-input>
                            </el-form-item>
                            <el-form-item label="金额：" prop="amount">
                                <el-input v-model="form.amount" placeholder="请输入金额" prefix-icon="el-icon-c-scale-to-original" style="width:300px;" @input="value=value.replace(/[^1-9]{0,1}(\d*(?:\.\d{0,2})?).*$/g, '$1')"></el-input>
                            </el-form-item>
                        </el-form>
                        </div>
                        <div style="width:200px;float:right;display:inline;padding:25px;margin-top:18px;margin-bottom:14px;">
                        <Button  type="primary" size="large"  @click="onCharge()" icon="logo-yen" style="width:100px;">充值</Button>
                        </div>
                        <Divider  />
                    <table  cellspacing="0" cellpadding="0" class="table_show">                           
                            <tr>
                                <td class="head">用户名：</td>
                                <td class="content">五溪水协会</td>                                
                                <td class="head">所属渠道：</td>
                                <td class="content">五溪干渠</td>
                                <td class="head">所属乡镇：</td>
                                <td class="content">石门桥镇</td>
                            </tr>   
                            <tr>
                                <td class="head">充值日期：</td>
                                <td class="content">2023-03-17</td>
                                <td class="head">卡号：</td>
                                <td class="content">10984345102</td>
                                <td class="head">充值金额：</td>
                                <td class="content">1876.00元</td>
                            </tr>
                            <tr>
                                <td class="head">购买水量：</td>
                                <td class="content">5460.00m³</td>
                                <td class="head">上次结余水量：</td>
                                <td class="content">12.45m³</td>
                                <td class="head">存余水量：</td>
                                <td class="content">5472.45m³</td>
                            </tr>                   
                    </table>
                    <div style="width:730px;margin:0 auto;">
                    <Button  type="primary"  @click="onSave()" icon="ios-print" style="margin-left:305px;margin-top:26px;margin-bottom:12px;" >打印发票</Button>
                    </div>
                 </Card>
        </Content>
    </div>
</template>
<script type="text/javascript">
export default {
        data(){
            return{
                form:{
                    cardnum:'',
                    amount:'',
                },
                rules: {
                    cardnum: [{ required: true, message: "卡号不能为空",trigger: 'blur'},{ min: 4, max: 10, message: '长度在4到10个字符', trigger: 'blur'}],
                    amount: [{ required: true, message: "金额不能为空",trigger: 'blur'}],
                },
            }
        },
        mixins: [],
        components: {
          
        },
        mounted(){

        },
        methods:{
            onSave(){
                this.$refs['chargeform'].validate((valid) => {
                    if (valid) {  }
                });
            },
            Reload(){
                if(this.data.length==0){
                    this.editsign=true;
                    this.delsign=true;
                }
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
 
.head{background-color: #EFF2F6;color:#4b5469;width: 110px;text-align: right;}
.content{width: 120px;text-align: center;}
 td{
    height: 42px;
    text-align: center;   
    border-top: none;
    border:1px solid #C7CCD6;
  }
}
</style>