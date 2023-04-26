<template>
	<div>
		<Content class="searchcon">
            <Row type="flex" :gutter="16" class="rowtocol" style="padding-top:10px;">                
                <COL>
                 <Input search enter-button suffix="ios-search" placeholder="请输入用户名" style="width:200px;margin-right: 15px;margin-left:10px;margin-top:-2px;" @on-search="search" v-model="form.searchmsg" />
                </COL>
                <COL>
                   <Select v-model="form.channel" @on-change="search" style="width:160px;margin-right: 15px;" clearable filterable placeholder="所属渠道(可搜索)">
                 <Option v-for="item in channellist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                 </Select>
                </COL>   
                <COL>
                 <el-date-picker
                      v-model="form.date"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      @change="search"
                      unlink-panels
                      type="daterange"
                      size="small"
                      format="yyyy-MM-dd"
                      style="margin-right:15px;"
                    ></el-date-picker>
                </COL>            
            </Row>
            <Row  class="fgline"></Row>
            <el-table
                :data="data"
                border
                :height="theight"
                v-loading="loading"
                @sort-change="sort_change"
                style="width: 100%"
                >
                <el-table-column
                v-for="(item,index) in tablecolumns"
                :prop="item.key"
                :align="item.align"
                :label="item.title"
                :fixed="item.fixed"
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
                theight:window.innerHeight-240,
                loading:false,
                // 表头设置
            tablecolumns: [
            {
                title: "序号",
                key: "index",
                width: 55,
                align: "center",
                fixed: "left",
              }, 
              {
                title: "用户名",
                key: "farmname",
                width: 130,
                align: "center",
                sortable: "custom",
                fixed: "left",
              }, 
              {
                title: "购买金额(元)",
                key: "amount",
                width: 130,
                align: "center",     
                sortable: "custom", 
                fixed: "left",         
              },   
              {
                title: "购买时间",
                width: 160,
                key: "createtime",
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
                title: "上期结余(m³)",
                width: 130,
                key: "lastsurplus",
                align: "center",
                sortable: "custom",
              },
              {
                title: "存余水量(m³)",
                width: 130,
                key: "remainwater",
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
                width: 130,
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
                date:[],
                orderBy:'CREATETIME',       
                sequence:'desc',
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
          const end = new Date();
          const start = zeroPointOfTheDay();

          var timeSlot = [start, end];

          this.form.date=timeSlot;
          this.form.hourcon=end;

          function zeroPointOfTheDay() {
            var date = new Date();
            date.setMonth(0);
            date.setDate(1);
            return date;
          }
          this.$FilterData.Get_CanalInfo(this.$WarmTable,this.form.showsign,data => {
                    this.channellist = data;
          });
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
            Reload(){
                this.loading=true;
                var paramobj=new Object();
                if(this.form.searchmsg!=null && this.form.searchmsg!=''){
                  paramobj.stnm=this.form.searchmsg;
                }
                if(this.form.channel!=null && this.form.channel!=''){
                  paramobj.canalcode=this.form.channel;
                }
                if(this.form.date!=null && this.form.date.length>0){
                  var daterange=this.$FilterData.elDatePicker_Filter(this.form.date,'dayTable').split(",");
                  paramobj.begintime=daterange[1]+" 00:00:00";
                  paramobj.endtime=daterange[2]+" 23:59:59";
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
                this.axios.get('/'+this.$WarmTable+'/waterprice/getrechargeshow',{params:paramobj}).then(res => {
                      this.loading=false; 
                      var datalist=res.data.rows;
                      this.data=datalist.map((val, index) => {
                      val.createtime=val.createtime.substring(0,16);
                      return val;
                    }); 
                    this.list_input.total=res.data.total;                                
                  });
            },
        }
}
</script>