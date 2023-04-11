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
                 <el-table-column label="一级超额用水" align="center">
                    <el-table-column
                    prop="onestandard"
                    label="范围"
                    align="center"
                    min-width="130">
                    </el-table-column>
                    <el-table-column
                    prop="oneprice"
                    label="水价"
                    align="center"
                    min-width="90">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="二级超额用水" align="center">
                    <el-table-column
                    prop="twostandard"
                    label="范围"
                    align="center"
                    min-width="130">
                    </el-table-column>
                    <el-table-column
                    prop="towprice"
                    label="水价"
                    align="center"
                    min-width="90">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="三级超额用水" align="center">
                    <el-table-column
                    prop="thrstandard"
                    label="范围"
                    align="center"
                    min-width="130">
                    </el-table-column>
                    <el-table-column
                    prop="thrprice"
                    label="水价"
                    align="center"
                    min-width="90">
                    </el-table-column>
                </el-table-column>
            </el-table>
            <Divider style="margin-top:12px;"/>
            <Row type="flex" :gutter="16" class="rowtocol" style="margin-bottom:12px;"> 
                <COL>
                 <Input search enter-button suffix="ios-search" placeholder="请输入用户名" style="width:230px;margin-right: 15px;margin-left:10px;margin-top:-2px;" @on-search="search" v-model="form.searchmsg" />
                </COL>
                <COL>
                   <Select v-model="form.channel" @on-change="search" style="width:120px;margin-right: 15px;" clearable placeholder="所属渠道">
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
            <div style="margin:10px 10px 0px 10px;overflow: hidden">
                <div style="float: right;">
                <Page 
                    :total="list_input.total" 
                    :current="list_input.current" show-sizer 
                    :page-size="list_input.pagesize" :page-size-opts="list_input.pagesizeopts"
                    @on-change="CurrentChange"
                    @on-page-size-change="PagesizeChange"
                    size="small"
                    show-total
                    show-elevator>
                </Page>
                </div>
            </div>
        </Content>
    </div>
</template>
<script type="text/javascript">
import FilterMethods from "@/assets/commonJS/FilterMethods.js";
export default {
        data(){
            return{
                theight:window.innerHeight-330,
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
                title: "单位",
                key: "unit",
                width: 90,
                align: "center",
              },
              {
                title: "基础水权",
                key: "basewater",
                width: 120,
                align: "center",
              },
              {
                title: "基础水价",
                key: "baseprice",
                width: 120,
                align: "center",
              },
                ],
                // 表头设置
            tablecolumns: [
              {
                title: "用户名",
                key: "farmname",
                width: 130,
                align: "center",
                sortable: "custom",
                fixed: "left",
              },
              {
                title: "承包面积(亩)",
                key: "area",
                width: 130,
                align: "center",
                sortable: "custom",
                fixed: "left",
              },
              {
                title: "基础水权(m³)",
                key: "basewater",
                width: 130,
                align: "center",               
              },
              {
                title: "一级超水范围",
                width: 160,
                key: "onewater",
                align: "center",
              },
              {
                title: "二级超水范围",
                width: 160,
                key: "twowater",
                align: "center",
              },
              {
                title: "三级超水范围",
                width: 170,
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
            list_input:{
                total:65,
                pagesize:20,
                pagesizeopts:[10,20,50,75,100,200],
                current:1,
            },
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
            PagesizeChange(pagesize){
              this.list_input.pagesize=pagesize;
              this.list_input.current=1;
              this.Reload();
            },
            CurrentChange(index){
                this.list_input.current=index;
                this.Reload();
            }, 
            indexMethod(index){
              return index+1+this.list_input.pagesize*(this.list_input.current-1);
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
                this.list_input.current=1;          
                this.Reload();
            },
            search(){
              this.Reload();
            },
            Headload(){
              this.headloading=true;
              this.axios.get('/'+this.$WarmTable+'/waterprice/getfarmabovestand').then(res => {
                    this.headloading=false; 
                    var datalist=res.data;
                    this.headdata=datalist.map((val, index) => {
                      val.priceyr=val.priceyr+"年";
                      val.unit="亩";
                      val.basewater=val.basewater+"m³";
                      val.baseprice=val.baseprice+"元/m³";
                      val.onestandard=val.onelolim+"m³ - "+val.oneuplim+"m³";
                      val.oneprice=val.oneprice+"元/m³";
                      val.twostandard=val.twololim+"m³ - "+val.twouplim+"m³";
                      val.towprice=val.towprice+"元/m³";
                      val.thrstandard=val.thrlolim+"m³ - "+val.thruplim+"m³";
                      val.thrprice=val.thrprice+"元/m³";
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
                var _currentPage = this.list_input.current;
                var _pageSizes = this.list_input.pagesize;
                var _bgincount=(_currentPage - 1) * _pageSizes+1;
                var _endcount=_currentPage * _pageSizes;
                paramobj.begincount=_bgincount;
                paramobj.endcount=_endcount;
                paramobj.orderBy=this.form.orderBy;
                paramobj.sequence=this.form.sequence;
                paramobj.showsign=this.form.showsign;
                this.axios.get('/'+this.$WarmTable+'/waterprice/getfarmabovewater',{params:paramobj}).then(res => {
                      this.loading=false; 
                      var datalist=res.data.rows;
                      this.data=datalist.map((val, index) => {
                      val.onewater=val.onewater.replace(" -","m³ -")+"m³";
                      val.twowater=val.twowater.replace(" -","m³ -")+"m³";
                      val.thrwater=val.thrwater.replace(" -","m³ -")+"m³";
                      return val;
                    }); 
                    this.list_input.total=res.data.total;                                
                  });
            },
        }
}
</script>