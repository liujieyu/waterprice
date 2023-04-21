<template>
	<div>
		<Content class="searchcon">
            <el-table
                :data="headdata"
                border
                v-loading="headloading"
                style="width: 100%;margin-top:8px;"
                >
                <el-table-column
                v-for="(item,index) in headcolumns"
                :prop="item.key"
                :align="item.align"
                :label="item.title"
                :min-width="item.width"
                ></el-table-column>
            </el-table>
            <Divider style="margin-top:12px;"/>
            <Row type="flex" :gutter="16" class="rowtocol" style="margin-bottom:12px;"> 
                <COL>
                 <Input search enter-button suffix="ios-search" placeholder="请输入用户名" style="width:230px;margin-right: 15px;margin-left:10px;margin-top:-2px;" @on-search="search" v-model="form.searchmsg" />
                </COL>
                <COL>
                   <Select v-model="form.channel" @on-change="search" style="width:160px;margin-right: 15px;" filterable clearable placeholder="所属渠道(可搜索)">
                 <Option v-for="item in channellist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                 </Select>
                </COL>
            </Row>
            <el-table
                :data="data"
                border
                :height="theight"
                v-loading="loading"
                @sort-change="sort_change"
                style="width: 100%"
                >
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
                :min-width="item.width"
                :sortable="item.sortable"
                ></el-table-column>
            </el-table>

        </Content>
    </div>
</template>
<script type="text/javascript">
import FilterMethods from "@/assets/commonJS/FilterMethods.js";
export default {
        data(){
            return{
                theight:window.innerHeight-270,
                headloading:false,
                loading:false,
                headdata:[],
                headcolumns:[
              {
                title: "定价年份",
                key: "priceyr",
                width: 110,
                align: "center",
              },
              {
                title: "渠系利用率",
                key: "canalrate",
                width: 120,
                align: "center",
              },
              {
                title: "单位",
                key: "unit",
                width: 90,
                align: "center",
              },
              {
                title: "毛供水量",
                key: "basewater",
                width: 120,
                align: "center",
              },
              {
                title: "一级节水范围",
                key: "onestandard",
                width: 170,
                align: "center",
              },
              {
                title: "二级节水范围",
                key: "twostandard",
                width: 170,
                align: "center",
              },
              {
                title: "三级节水范围",
                key: "thrstandard",
                width: 170,
                align: "center",
              },
                ],
                // 表头设置
            tablecolumns: [
              {
                title: "用户名",
                key: "stnm",
                width: 120,
                align: "center",
                sortable: "custom",
                fixed: "left",
              },
              {
                title: "灌溉面积(亩)",
                key: "area",
                width: 130,
                align: "center",
                sortable: "custom",
                fixed: "left",
              },
              {
                title: "毛供水量(m³)",
                key: "basewater",
                width: 130,
                align: "center",               
              },
              {
                title: "一级节水范围",
                width: 170,
                key: "onewater",
                align: "center",
              },
              {
                title: "二级节水范围",
                width: 170,
                key: "twowater",
                align: "center",
              },
              {
                title: "三级节水范围",
                width: 180,
                key: "thrwater",
                align: "center",
              },
              {
                title: "所属渠道",
                width: 120,
                key: "canalname",
                align: "center",
                sortable: "custom",
              },
            ],                
            data:[],
            form:{
                searchmsg:'',
                channel:'',
                orderBy:'PX',
                sequence:'asc',
                showsign:'', 
            }, 
            channellist:[],              
            }
        },
        mixins: [FilterMethods],
        components: {
          
        },
        mounted(){
          this.form.showsign=this.Cook.get("usertype");
          this.$FilterData.Get_CanalInfo(this.$WarmTable,this.form.showsign,data => {
                    this.channellist = data;
          });
          this.Headload();
          this.Reload();
        },
        methods:{
            indexMethod(index){
              return index+1;
            },
            sort_change(item){
              if(item.order==null){
                    return;
                }
                if(item.order=="ascending"){
                    this.form.sequence="asc";
                }else{
                    this.form.sequence="desc";
                }
                if(item.prop=="canalname"){
                  this.form.orderBy="PX";
                }else{
                  this.form.orderBy=item.prop.toUpperCase();
                }             
                this.Reload();
            },
            search(){
              this.Reload();
            },
            Headload(){
              this.headloading=true;
              this.axios.get('/'+this.$WarmTable+'/waterprice/getcanalbackstand').then(res => {
                    this.headloading=false; 
                    var datalist=res.data;
                    this.headdata=datalist.map((val, index) => {
                      val.priceyr=val.priceyr+"年";
                      val.unit="亩";
                      val.basewater=val.basewater+"m³";
                      val.onestandard=val.saveonelo+"m³ - "+val.saveoneup+"m³";
                      val.twostandard=val.savetwolo+"m³ - "+val.savetwoup+"m³";
                      val.thrstandard=val.savethrlo+"m³ - "+val.savethrup+"m³";
                      return val;
                    });                                
                });
            },
            Reload(){
                this.loading=true;
                var paramobj=new Object();
                if(this.form.searchmsg!=null && this.form.searchmsg!=''){
                  paramobj.stnm=this.form.searchmsg;
                }
                if(this.form.channel!=null && this.form.channel!=''){
                  paramobj.canalcode=this.form.channel;
                }
                paramobj.orderBy=this.form.orderBy;
                paramobj.sequence=this.form.sequence;
                paramobj.showsign=this.form.showsign;
                this.axios.get('/'+this.$WarmTable+'/waterprice/getcanalbackwater',{params:paramobj}).then(res => {
                      this.loading=false; 
                      var datalist=res.data;
                      this.data=datalist.map((val, index) => {
                      val.onewater=val.onewater.replace(" -","m³ -")+"m³";
                      val.twowater=val.twowater.replace(" -","m³ -")+"m³";
                      val.thrwater=val.thrwater.replace(" -","m³ -")+"m³";
                      return val;
                    });                                 
                  });
            },
        }
}
</script>