<template>
	<div>
		<Content class="searchcon">
            <el-form
                :v-loading="loading"
                :inline="true"
                ref="priceform"
                :model="form"
                :rules="rules"
                size="small"
                label-width="120px"
                style="display: flex;flex-wrap: wrap;"
            >
            <Row type="flex" :gutter="16" class="rowtocol"> 
                <COL style="padding-top:11px;">
                <el-form-item label="水价标准年份：" prop="priceyr">               
                 <el-date-picker
                    style="width:120px;"
                    v-model="datecon"
                    :clearable="false"
                    type="year"
                    @change="timechange"
                    placeholder="选择年">
                 </el-date-picker>
                </el-form-item>
                </COL>
                <Col>  
                    <Button v-show="addsign" type="primary" icon="md-add" :disabled="addabled" style="width: auto;margin-right:20px;" @click="addClick">新增</Button>
                    <Button v-show="editsign" type="primary" icon="ios-create" :disabled="editabled" style="width: auto;margin-right:20px;" @click="editClick">修改</Button>
                    <Button v-show="delsign" type="primary" icon="ios-trash" style="width: auto;" @click="delClick">删除</Button>
                </Col>
            </Row>
            <Divider style="margin-top:8px;margin-bottom:20px;"/> 
            <Row type="flex" :gutter="16" justify="center"> 
            <COL>
            <el-form-item label="基础水权：" prop="basewater"> 
                <el-input v-model="form.basewater" placeholder="请输入" :readonly="readsigns[0]" style="width:150px" @input="keyUp($event, 'basewater',false)"></el-input>m³/亩
            </el-form-item>
            </COL>
            <COL>
            <el-form-item label="基础水价：" prop="baseprice"> 
                <el-input v-model="form.baseprice" placeholder="请输入" :readonly="readsigns[1]" style="width:150px" @input="keyUp($event, 'baseprice',true)"></el-input>元/m³
            </el-form-item>
            </COL>
            <COL>
            <el-form-item label="渠系利用率：" prop="canalrate"> 
                <el-input v-model="form.canalrate" placeholder="请输入" :readonly="readsigns[2]" style="width:150px" @input="keyUp($event, 'canalrate',true)"></el-input>
            </el-form-item>
            </COL>
            </Row>
            <Row style="padding-top:20px;"></Row>
            <Row type="flex" :gutter="16" justify="center"> 
            <COL>
                <Card style="width:600px;margin:0 auto;margin-top:10px;margin-left:10px;">
                    <template #title>
                        超额用水加价
                    </template>
                    <table  cellspacing="0" cellpadding="0" class="table_show">
                        <thead>
                            <tr>
                                <th style="width:110px;">超水等级</th>
                                <th style="width:290px;">超水量范围</th>
                                <th style="width:160px;">加价单价</th>
                            </tr>
                        </thead>
                            <tr>
                                <td>一级超水：</td>
                                <td class="itemtd">
                                    <el-form-item prop="onelolim"> 
                                        <el-input v-model="form.onelolim" placeholder="请输入" style="width:110px" readonly ></el-input>m³ -  
                                    </el-form-item>
                                    <el-form-item prop="oneuplim"> 
                                        <el-input v-model="form.oneuplim" :readonly="readsigns[3]" placeholder="请输入" style="width:110px" @input="keyUp($event, 'oneuplim',false)"></el-input>m³
                                    </el-form-item>                                  
                                </td>
                                <td class="itemtd">
                                    <el-form-item prop="oneprice"> 
                                        <el-input v-model="form.oneprice" :readonly="readsigns[4]" placeholder="请输入" style="width:110px" @input="keyUp($event, 'oneprice',true)"></el-input>元/m³
                                    </el-form-item>                                   
                                </td>
                            </tr>
                            <tr>
                                <td>二级超水：</td>
                                <td class="itemtd">
                                    <el-form-item prop="twololim"> 
                                        <el-input v-model="form.twololim" placeholder="请输入" style="width:110px" readonly ></el-input>m³ - 
                                    </el-form-item>
                                    <el-form-item prop="twouplim"> 
                                        <el-input v-model="form.twouplim" :readonly="readsigns[5]" placeholder="请输入" style="width:110px" @input="keyUp($event, 'twouplim',false)"></el-input>m³
                                    </el-form-item>
                                    
                                <td class="itemtd">
                                    <el-form-item prop="towprice"> 
                                        <el-input v-model="form.towprice" :readonly="readsigns[6]" placeholder="请输入" style="width:110px" @input="keyUp($event, 'towprice',true)"></el-input>元/m³
                                    </el-form-item>                                  
                                </td>
                            </tr>
                            <tr>
                                <td>三级超水：</td>
                                <td class="itemtd">
                                    <el-form-item prop="thrlolim"> 
                                        <el-input v-model="form.thrlolim" placeholder="请输入" style="width:110px" readonly ></el-input>m³ - 
                                    </el-form-item>
                                    <el-form-item prop="thruplim"> 
                                        <el-input v-model="form.thruplim" :readonly="readsigns[7]" placeholder="请输入" style="width:110px" @input="keyUp($event, 'thruplim',false)"></el-input>m³
                                    </el-form-item>                                   
                                </td>
                                <td class="itemtd"> 
                                    <el-form-item prop="thrprice"> 
                                        <el-input v-model="form.thrprice" :readonly="readsigns[8]" placeholder="请输入" style="width:110px" @input="keyUp($event, 'thrprice',true)"></el-input>元/m³
                                    </el-form-item>                          
                                </td>
                            </tr>                        
                    </table>
                 </Card>
              </COL>
              <COL>
                <Card style="width:600px;margin:0 auto;margin-top:10px;margin-left:24px;">
                    <template #title>
                        节约用水回购
                    </template>
                    <table  cellspacing="0" cellpadding="0" class="table_show">
                        <thead>
                            <tr>
                                <th style="width:110px;">节水等级</th>
                                <th style="width:290px;">节水量范围</th>
                                <th style="width:160px;">回购单价</th>
                            </tr>
                        </thead>
                            <tr>
                                <td>一级节水：</td>
                                <td class="itemtd">
                                    <el-form-item prop="saveonelo"> 
                                        <el-input v-model="form.saveonelo" placeholder="请输入" style="width:110px" readonly ></el-input>m³ -  
                                    </el-form-item>                                 
                                    <el-form-item prop="saveoneup"> 
                                        <el-input v-model="form.saveoneup" :readonly="readsigns[9]" placeholder="请输入" style="width:110px" @input="keyUp($event, 'saveoneup',false)" ></el-input>m³
                                    </el-form-item>
                                </td>
                                <td class="itemtd">
                                    <el-form-item prop="saveonepr"> 
                                        <el-input v-model="form.saveonepr" :readonly="readsigns[10]" placeholder="请输入" style="width:110px" @input="keyUp($event, 'saveonepr',true)" ></el-input>元/m³
                                    </el-form-item>                                   
                                </td>
                            </tr>
                            <tr>
                                <td>二级节水：</td>
                                <td class="itemtd">
                                    <el-form-item prop="savetwolo"> 
                                        <el-input v-model="form.savetwolo" placeholder="请输入" style="width:110px;" readonly ></el-input>m³ -  
                                    </el-form-item>
                                    <el-form-item prop="savetwoup"> 
                                        <el-input v-model="form.savetwoup" :readonly="readsigns[11]" placeholder="请输入" style="width:110px;" @input="keyUp($event, 'savetwoup',false)"></el-input>m³
                                    </el-form-item>
                                <td class="itemtd">
                                    <el-form-item prop="savetwopr"> 
                                        <el-input v-model="form.savetwopr" :readonly="readsigns[12]" placeholder="请输入" style="width:110px" @input="keyUp($event, 'savetwopr',true)"></el-input>元/m³
                                    </el-form-item>                                  
                                </td>
                            </tr>
                            <tr>
                                <td>三级节水：</td>
                                <td class="itemtd">
                                    <el-form-item prop="savethrlo"> 
                                        <el-input v-model="form.savethrlo" placeholder="请输入" style="width:110px" readonly ></el-input>m³ - 
                                    </el-form-item>                                   
                                    <el-form-item prop="savethrup"> 
                                        <el-input v-model="form.savethrup" :readonly="readsigns[13]" placeholder="请输入" style="width:110px" @input="keyUp($event, 'savethrup',false)"></el-input>m³
                                    </el-form-item>                                   
                                </td>
                                <td class="itemtd">
                                    <el-form-item prop="savethrpr"> 
                                        <el-input v-model="form.savethrpr" :readonly="readsigns[14]" placeholder="请输入" style="width:110px" @input="keyUp($event, 'savethrpr',true)"></el-input>元/m³
                                    </el-form-item>                                  
                                </td>
                            </tr>                        
                    </table>
                 </Card>
              </COL>
            </Row>
            <Row class="fgline" :style="{'width':cwidth+'px'}"></Row>
            <Row type="flex" :gutter="16"> 
                <COL>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" :disabled="readsigns[15]" icon="el-icon-s-management"  style="margin-left:550px;">保存执行水价标准</el-button>
                </el-form-item>
                </COL>
            </Row>  
          </el-form>
        </Content>
    </div>
</template>
<script type="text/javascript">
export default {
        data(){
            return{
                twidth:(window.innerWidth-640)/2,
                cwidth:window.innerWidth,
                edityear:"",
                datecon:'',
                loading:false,
                addsign:true,
                editsign:true,
                delsign:true,
                addabled:false,
                editabled:false,
                cardtitle:"新增阶梯水价标准",
                readsigns:[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
                form:{
                    id:'',
                    priceyr:2021,
                    basewater:'',
                    baseprice:'',
                    oneuplim:'',
                    onelolim:0,
                    oneprice:'',
                    twouplim:'',
                    twololim:'',
                    towprice:'',
                    thruplim:'',
                    thrlolim:'',
                    thrprice:'',
                    saveoneup:'',
                    saveonelo:'0',
                    saveonepr:'',
                    savetwoup:'',
                    savetwolo:'',
                    savetwopr:'',
                    savethrup:'',
                    savethrlo:'',
                    savethrpr:'',
                    canalrate:'',

                },                
                rules: {
                    priceyr: [{ required: true, message: "请选择水价标准年份",trigger: 'change'}],
                    basewater: [{ required: true, message: "基础水权不为空",trigger: 'blur'}],
                    baseprice: [{ required: true, message: "基础水价不为空",trigger: 'blur'}],
                    canalrate: [{ required: true, message: "渠系利用率不为空",trigger: 'blur'}],
                    oneuplim: [{ required: true, message: "上限不为空",trigger: 'blur'}],
                    onelolim: [{ required: true, message: "下限不为空",trigger: 'blur'}],  
                    oneprice: [{ required: true, message: "单价不为空",trigger: 'blur'}], 
                    twouplim: [{ required: true, message: "上限不为空",trigger: 'blur'}],
                    twololim: [{ required: true, message: "下限不为空",trigger: 'blur'}],  
                    towprice: [{ required: true, message: "单价不为空",trigger: 'blur'}],
                    thruplim: [{ required: true, message: "上限不为空",trigger: 'blur'}],
                    thrlolim: [{ required: true, message: "下限不为空",trigger: 'blur'}],  
                    thrprice: [{ required: true, message: "单价不为空",trigger: 'blur'}],
                    saveoneup: [{ required: true, message: "上限不为空",trigger: 'blur'}],
                    saveonelo: [{ required: true, message: "下限不为空",trigger: 'blur'}],  
                    saveonepr: [{ required: true, message: "单价不为空",trigger: 'blur'}], 
                    savetwoup: [{ required: true, message: "上限不为空",trigger: 'blur'}],
                    savetwolo: [{ required: true, message: "下限不为空",trigger: 'blur'}],  
                    savetwopr: [{ required: true, message: "单价不为空",trigger: 'blur'}],
                    savethrup: [{ required: true, message: "上限不为空",trigger: 'blur'}],
                    savethrlo: [{ required: true, message: "下限不为空",trigger: 'blur'}],  
                    savethrpr: [{ required: true, message: "单价不为空",trigger: 'blur'}],
                },
            }
        },
        mixins: [],
        components: {
          
        },
        mounted(){
            this.NowReload();
        },
        methods:{
            //只能输入2位小数
            keyUp(e, key,money) {
                if (!this.form[key]) {
                    if(key=='oneuplim'){
                    this.form['twololim']="";
                   }
                   if(key=='twouplim'){
                    this.form['thrlolim']="";
                   }
                   if(key=='saveoneup'){
                    this.form['savetwolo']="";
                   }
                   if(key=='savetwoup'){
                    this.form['savethrlo']="";
                   }
                    return (this.form[key] = "");
                }
                // 每次抬键处理,对应金额渲染两位小数||数字
                let num = "";
                if (money) {
                    num = this.form[key].match(/^\d*(\.?\d{0,3})/g)[0];
                } else {
                    num = this.form[key].replace(/^[^\d]+$/g, "").split('.')[0];
                }
                let nextnum=parseInt(num)+1;
                this.form[key] = `${num}`;
                if(key=='oneuplim'){
                    this.form['twololim']=`${nextnum}`;
                }
                if(key=='twouplim'){
                    this.form['thrlolim']=`${nextnum}`;
                }
                if(key=='saveoneup'){
                    this.form['savetwolo']=`${nextnum}`;
                }
                if(key=='savetwoup'){
                    this.form['savethrlo']=`${nextnum}`;
                }
                },
            timechange(date){
                this.form.priceyr=date.getFullYear();
                this.Reload();
            },
            NowReload(){              
                this.loading=true;
                this.axios.get('/'+this.$WarmTable+'/waterprice/nowwaterprice',{params:{}}).then((res)=>{
                    this.loading = false;
                    if(res.data.id!=null){
                        this.form = res.data;
                        var nowdate=new Date();
                        nowdate.setFullYear(this.form.priceyr);
                        this.datecon=nowdate;
                    }else{
                        this.datecon=new Date();
                    }                 
                    if(this.form.id==null || this.form.id==''){
                        this.editsign=false;
                        this.delsign=false;
                        this.addsign=true;
                    }else{
                        this.addsign=false;
                        this.editsign=true;
                        this.delsign=true;
                    }
                });
            },
            Reload(){
                this.loading=true;
                var selectdate=this.form.priceyr;
                this.axios.get('/'+this.$WarmTable+'/waterprice/waterpriceinfo',{params:{year:this.form.priceyr}}).then((res)=>{
                    this.loading = false;
                    this.form = res.data;
                    this.form.priceyr=selectdate;
                    this.form.onelolim=0;
                    this.form.saveonelo=0;              
                    this.SetView(true);
                    if(this.form.id==null || this.form.id==''){
                        this.editsign=false;
                        this.delsign=false;
                        this.addsign=true;
                        this.addabled=false;
                    }else{
                        this.addsign=false;
                        this.editsign=true;
                        this.delsign=true;
                        this.editabled=false;
                    }
                });
            },
            addClick(){
                this.addabled=true;
                this.SetView(false);
            },
            editClick(){
                this.editabled=true;
                this.SetView(false);
            },
            delClick(){
                this.$confirm('确定删除'+this.form.priceyr+'年执行水价标准信息?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.axios.get('/'+this.$WarmTable+'/waterprice/delwaterprice',{params:{id:this.form.id}}).then((res)=>{
                                if(res.data=="ok"){
                                    this.$message({
                                    type: "success",
                                    message: "删除执行水价标准成功!"
                                    });
                                    this.Reload();
                                }                   
                            });                 
                }).catch(() => {         
                });                
            },
            onSubmit(){
            this.$refs['priceform'].validate((valid) => {
                if (valid) { 
                    //新增
                    if(this.addsign){
                        this.axios.post('/'+this.$WarmTable+'/waterprice/addwaterprice',this.form).then((res)=>{
                                if(res.data>0){
                                    this.$message({
                                    type: "success",
                                    message: "新增执行水价标准成功!"
                                    });
                                    this.Reload();
                                }                   
                            });
                    }//修改
                    else{
                        this.axios.post('/'+this.$WarmTable+'/waterprice/updatewaterprice',this.form).then((res)=>{
                                if(res.data=="ok"){
                                    this.$message({
                                    type: "success",
                                    message: "修改执行水价标准成功!"
                                    });
                                    this.Reload();
                                }                   
                            });
                    }
                 }
            });
            },
            SetView(sign){
                for(var i=0;i<this.readsigns.length;i++){
                    this.readsigns[i]=sign;
                }
            },
        }
}
</script>
<style lang="less" scoped>
.table_show {
margin: 0 auto;
 width: 560px;
 border:1px solid #C7CCD6;
 border-collapse:collapse; 
 color: #515A6E;
 th{background-color: #EFF2F6;color:#4b5469;height: 40px;}
 td{height: 32px;}
 th, td {
    text-align: center;   
    border-top: none;
    border:1px solid #C7CCD6;
  }
tr:nth-child(even){     //偶数行
    background:#F7FAFD;
}
.itemtd{
    padding-top:8px;
}
}
</style>