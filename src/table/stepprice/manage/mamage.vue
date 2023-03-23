<template>
	<div>
		<Content class="searchcon">
            <Row type="flex" :gutter="16" class="rowtocol"> 
                <COL style="margin-left:10px;">
                 定价年份：
                 <el-date-picker
                    class="wAh"
                    size="mini"
                    style="width:100px;margin-top:15px;"
                    v-model="stepyear"
                    type="year"
                    @change="timechange"
                    placeholder="选择年">
                 </el-date-picker>
                </COL>
                <Col> 
                    <Button type="primary" icon="md-add" :disabled="addsign" style="width: auto;margin-right:20px;" @click="addClick">新增</Button>
                    <Button type="primary" icon="ios-create" :disabled="editsign" style="width: auto;margin-right:20px;" @click="editClick">修改</Button>
                    <Button type="primary" icon="ios-trash" :disabled="delsign" style="width: auto;" @click="delClick">删除</Button>

                </Col>
            </Row>
            <Row class="fgline"></Row>
            <el-table
                :data="data"
                border
                :height="theight"
                v-loading="loading"
                style="width: 100%"
                >
                <el-table-column
                v-for="(item,index) in tablecolumns"
                :prop="item.key"
                :align="item.align"
                :label="item.title"
                :min-width="item.width"
                ></el-table-column>
            </el-table>
            <Row class="fgline"></Row>
            <div style="100%;">
                <Card style="width:640px;margin:0 auto;">
                    <template #title>
                        {{cardtitle}}
                    </template>
                    <table  cellspacing="0" cellpadding="0" class="table_show">
                         <caption>
                             定价年份：
                            <el-date-picker
                                  size="mini"
                                    style="width:100px;margin-bottom:10px;"
                                    v-model="edityear"
                                    value-format="yyyy"
                                    type="year"
                                    placeholder="选择年">
                            </el-date-picker>
                         </caption>
                        <thead>
                            <tr>
                                <th style="width:110px;">水价等级</th>
                                <th style="width:320px;">水量范围</th>
                                <th style="width:170px;">单价</th>
                            </tr>
                        </thead>
                            <tr>
                                <td>{{formdata[0].ptypenm}}</td>
                                <td><Input v-model="formdata[0].minmount" :value="formdata[0].minmount" readonly style="width:120px;"/>m³ - <Input v-model="formdata[0].maxamount" :value="formdata[0].maxamount" style="width:120px;" @on-keyup="keyUp($event, 'maxamount',0,true)" />m³</td>
                                <td><Input v-model="formdata[0].price" :value="formdata[0].price" style="width:120px;" @on-keyup="keyUp($event, 'price',0,true)"/>元/m³</td>
                            </tr>
                            <tr>
                                <td>{{formdata[1].ptypenm}}</td>
                                <td><Input v-model="formdata[1].minmount" :value="formdata[1].minmount" style="width:120px;" readonly/>m³ - <Input v-model="formdata[1].maxamount" :value="formdata[1].maxamount" @on-keyup="keyUp($event, 'maxamount',1,true)" style="width:120px;"/>m³</td>
                                <td><Input v-model="formdata[1].price" :value="formdata[1].price" style="width:120px;" @on-keyup="keyUp($event, 'price',0,true)"/>元/m³</td>
                            </tr>
                            <tr>
                                <td>{{formdata[2].ptypenm}}</td>
                                <td><Input v-model="formdata[2].minmount" :value="formdata[2].minmount" style="width:120px;" readonly/>m³ - <Input v-model="formdata[2].maxamount" :value="formdata[2].maxamount" readonly style="width:120px;"/>m³</td>
                                <td><Input v-model="formdata[2].price" :value="formdata[2].price" readonly style="width:120px;" @on-keyup="keyUp($event, 'price',0,true)"/>元/m³</td>
                            </tr>                        
                    </table>
                    <div style="width:600px;margin:0 auto;">
                    <Button  type="primary"  @click="onSave()" style="margin-left:250px;margin-top:20px;" >保存阶梯水价</Button>
                    </div>
                </Card>
            </div>
        </Content>
    </div>
</template>
<script type="text/javascript">
export default {
        data(){
            return{
                twidth:(window.innerWidth-640)/2,
                stepyear:'2023',
                edityear:"",
                addsign:false,
                editsign:false,
                delsign:false,
                cardtitle:"新增阶梯水价标准",
                // 表头设置
            tablecolumns: [
              {
                title: "序号",
                key: "index",
                width: 45,
                align: "center",
                fixed: "left"
              },
              {
                title: "水价等级",
                key: "ptypenm",
                width: 110,
                align: "center",
              },
              {
                title: "水量上限(m³)",
                key: "maxamount",
                width: 120,
                align: "center",
              },
              {
                title: "水量范围",
                key: "waterscope",
                width: 200,
                align: "center",
              },
              {
                title: "单价(元/m³)",
                width: 130,
                key: "price",
                align: "center",
                sortable: "custom",
              },
            ],                
                data:[{index:1,ptypenm:'一级水量',maxamount:'85.00',waterscope:'0.00m³ - 85.00m³',minmount:0.00,price:0.54},
                      {index:2,ptypenm:'二级水量',maxamount:'278.00',waterscope:'85.00m³ - 278.00m³',minmount:85.00,price:1.07},
                      {index:3,ptypenm:'三级水量',maxamount:'∞',waterscope:'超过278.00m³',minmount:278.00,price:2.54}],
                formdata:[
                    {ptypenm:'一级水量',maxamount:'',minmount:'0',price:'',pricetype:1},
                    {ptypenm:'二级水量',maxamount:'',minmount:'',price:'',pricetype:2},
                    {ptypenm:'三级水量',maxamount:'∞',minmount:'',price:'',pricetype:3}
                ],
                
            }
        },
        mixins: [],
        components: {
          
        },
        mounted(){

        },
        methods:{
            setmincount(i){
                this.formdata[i+1].minmount=this.formdata[i].maxamount;
            },
            //只能输入2位小数
            keyUp(e, key, i,money) {
                debugger;
                if (!this.formdata[i][key]) {
                    if(key=='maxamount'){
                    this.formdata[i+1]['minmount']="";
                   }
                    return (this.formdata[i][key] = "");
                }
                // 每次抬键处理,对应金额渲染两位小数||数字
                let num = "";
                if (money) {
                    num = this.formdata[i][key].match(/^\d*(\.?\d{0,2})/g)[0];
                } else {
                    num = this.formdata[i][key].replace(/^[^\d]+$/g, "").split('.')[0];
                }
                this.formdata[i][key] = `${num}`;
                if(key=='maxamount'){
                    this.formdata[i+1]['minmount']=`${num}`;
                }
                },
            timechange(date){
            this.Reload();
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
 width: 600px;
 border:1px solid #C7CCD6;
 border-collapse:collapse; 
 color: #515A6E;
 th{background-color: #EFF2F6;color:#4b5469;height: 32px;}
 td{height: 42px;}
 th, td {
    text-align: center;   
    border-top: none;
    border:1px solid #C7CCD6;
  }
tr:nth-child(even){     //偶数行
    background:#F7FAFD;
}
}
</style>