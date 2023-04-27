<template>
	<div>
		<Content class="searchcon">
            <el-table
                :data="headdata"
                border
                v-loading="headloading"
                style="width: 100%;margin-top:8px;margin-bottom:8px;"
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
            <Row type="flex" :gutter="16" class="rowtocol" style="padding-bottom:12px;"> 
                <COL>
                 <el-date-picker
                    class="wAh"
                    size="small"
                    style="width:120px;margin-left:10px;margin-right: 15px;"
                    :clearable="false"
                    v-model="form.wateryear"
                    type="year"
                    @change="search"
                    :picker-options="pickerOptions"
                    placeholder="选择年">
                 </el-date-picker>
                </COL>
                <COL>
                 <Input search enter-button suffix="ios-search" placeholder="请输入用户名" style="width:200px;margin-right: 15px;margin-top:-2px;" @on-search="search" v-model="form.searchmsg" />
                </COL>
                <COL>
                   <Select v-model="form.channel" @on-change="search" style="width:160px;margin-right: 15px;" clearable placeholder="所属渠道">
                 <Option v-for="item in channellist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                 </Select>
                </COL>          
            </Row>
            <el-table
                :data="data"
                border
                :height="theight"
                v-loading="loading"
                style="width: 100%"
                @sort-change="sort_change"
                >
                <el-table-column
                v-for="(item,index) in tablecolumns"
                :prop="item.key"
                :align="item.align"
                :label="item.title"
                :min-width="item.width"
                :fixed="item.fixed"
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
                loading:false,
                theight:window.innerHeight-305,
                pickerOptions: {
                    disabledDate(v) {
                    return v.getTime() < new Date(2021,0,1,0,0,0);
                    }
                },
            headcolumns:[
              {
                title: "累计收缴金额",
                key: "amount",
                width: 140,
                align: "center",
              },
              {
                title: "累计购买水量",
                key: "buywater",
                width: 140,
                align: "center",
              },
              {
                title: "累计基础水权",
                key: "basewater",
                width: 130,
                align: "center",
              },
              {
                title: "累计一级水量",
                key: "buyfirst",
                width: 130,
                align: "center",
              },
              {
                title: "累计二级水量",
                key: "buysecond",
                width: 130,
                align: "center",
              },
              {
                title: "累计三级水量",
                key: "buythird",
                width: 130,
                align: "center",
              },
              {
                title: "累计承包面积",
                key: "area",
                width: 130,
                align: "center",
              },
            ],
                // 表头设置
            tablecolumns: [
              {
                title: "序号",
                key: "index",
                width: 55,
                align: "center",
                fixed: "left"
              },
              {
                title: "用户名",
                key: "farmname",
                width: 130,
                align: "center",
                sortable: "custom",
              },                 
              {
                title: "购买金额(元)",
                width: 130,
                key: "amount",
                align: "center",
                sortable: "custom",
              },                 
              {
                title: "购买水量(m³)",
                width: 130,
                key: "buywater",
                align: "center",
                sortable: "custom",
              },
              {
                title: "基础水权(m³)",
                width: 130,
                key: "basewater",
                align: "center",
                sortable: "custom",
              },
              {
                title: "一级水量(m³)",
                width: 130,
                key: "buyfirst",
                align: "center",
                sortable: "custom",
              },
              {
                title: "二级水量(m³)",
                width: 130,
                key: "buysecond",
                align: "center",
                sortable: "custom",
              },
              {
                title: "三级水量(m³)",
                width: 130,
                key: "buythird",
                align: "center",
                sortable: "custom",
              },   
              {
                title: "承包面积(亩)",
                key: "area",
                width: 130,
                align: "center",
                sortable: "custom",
              },
              {
                title: "所属渠道",
                key: "canalname",
                width: 130,
                align: "center",
                sortable: "custom",
              },           
            ],                
            data:[],
            headdata:[],  
            list_input:{
                total:65,
                pagesize:20,
                pagesizeopts:[10,20,50,75,100,200],
                current:1,
            },
            form:{
                searchmsg:'',
                channel:'',
                date:[],
                orderBy:'PX',       
                sequence:'asc',
                showsign:'', 
                wateryear:'',
            },   
            suminfo:{
                amount:'',
                buywater:'',
                basewater:'',
                buyfirst:'',
                buysecond:'',
                buythird:'',
            },
            channellist:[],
            }
        },
        mixins: [FilterMethods],
        components: {
        },
        mounted(){
          this.form.showsign=this.Cook.get("usertype");
          const nowdate=new Date();
          this.form.wateryear=nowdate;
          this.$FilterData.Get_CanalInfo(this.$WarmTable,this.form.showsign,data => {
                    this.channellist = data;
          });
          this.Reload(true);
        },
        methods:{
          PagesizeChange(pagesize){
              this.list_input.pagesize=pagesize;
              this.list_input.current=1;
              this.Reload(false);
            },
            CurrentChange(index){
                this.list_input.current=index;
                this.Reload(false);
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
                this.Reload(false);
            },
            search(){
            this.Reload(true);
            },
            Reload(sumsign){
                 this.loading=true;
                var paramobj=new Object();
                if(this.form.searchmsg!=null && this.form.searchmsg!=''){
                  paramobj.stnm=this.form.searchmsg;
                }
                if(this.form.channel!=null && this.form.channel!=''){
                  paramobj.canalcode=this.form.channel;
                }
                if(this.form.wateryear!=null && this.form.wateryear!=''){
                  paramobj.year=this.form.wateryear.getFullYear();
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
                paramobj.issum=sumsign;
                this.axios.get('/'+this.$WarmTable+'/waterprice/getrechargetj',{params:paramobj}).then(res => {
                      this.loading=false; 
                      this.data=res.data.rows;
                      this.list_input.total=res.data.total; 
                      if(sumsign){
                        if(res.data.rechargesum!=null){
                          this.suminfo=res.data.rechargesum;
                          this.suminfo.area=res.data.areasum;
                        }else{
                          this.suminfo.amount=0;
                          this.suminfo.buywater=0;
                          this.suminfo.basewater=0;
                          this.suminfo.buyfirst=0;
                          this.suminfo.buysecond=0;
                          this.suminfo.buythird=0;
                          this.suminfo.area=0;
                        }
                        this.suminfo.amount+='元';
                          this.suminfo.buywater+='m³';
                          this.suminfo.basewater+='m³';
                          this.suminfo.buyfirst+='m³';
                          this.suminfo.buysecond+='m³';
                          this.suminfo.buythird+='m³';  
                          this.suminfo.area+='亩'; 
                        this.headdata=[];
                        this.headdata.push(this.suminfo); 
                      }                                     
                  });
            },
        }
}
</script>