<template>
	<div>
		<Content class="searchcon">
            <Row type="flex" :gutter="16" class="rowtocol" style="padding-top:10px;">                
                <COL>
                 <Input search enter-button suffix="ios-search" placeholder="请输入用户名" style="width:200px;margin-left:10px;margin-right: 15px;margin-top:-2px;" @on-search="search" v-model="form.searchmsg" />
                </COL>
                <COL>
                   <Select v-model="form.channel" @on-change="search" style="width:160px;margin-right: 15px;" clearable filterable placeholder="所属渠道(可搜索)">
                 <Option v-for="item in channellist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                 </Select>
                </COL>
                <COL>
                   <Select v-model="form.arrear" @on-change="search" style="width:100px;margin-right: 15px;" clearable placeholder="是否欠费">
                    <Option value="1" key="1">已欠费</Option>
                    <Option value="2" key="2">已缴费</Option>
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
                <COL>
                 <div :style="{width:subwidth+'px'}"></div>
                </COL>
                <COL>
                <div style="display: flex;flex-wrap:wrap;font-size:14px;margin-top:10px;">
                  <img src="@/assets/image/red.png" style="margin-right:5px;width:20px;height:20px;">
                  <span style="padding:1px;">已欠费</span>
                  <img src="@/assets/image/green.png" style="margin-left:10px;margin-right:5px;width:20px;height:20px;">
                  <span style="padding:1px;">已缴费</span>
                </div>
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
                    fixed="left"
                    label="序号"
                    prop="index"
                    align="center"
                    width="55">
                </el-table-column>
                <el-table-column align="center" label="提醒" width="55" fixed="left">
                  <template slot-scope="scope">
                            <img :src="scope.row.txsign==1?require('@/assets/image/red.png'):require('@/assets/image/green.png')" style="width: 28px;height: 28px;"/>
                        </template>
                </el-table-column>
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
                subwidth:window.innerWidth-845-200-24-195,
                loading:false,
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
                title: "水费(元)",
                key: "waterrate",
                width: 130,
                align: "center",     
                sortable: "custom", 
                fixed: "left",         
              },    
              {
                title: "读表时间",
                width: 160,
                key: "readtime",
                align: "center",
                sortable: "custom",
              },         
              {
                title: "水表读数",
                width: 120,
                key: "waternum",
                align: "center",
                sortable: "custom",
              }, 
              {
                title: "上期读数",
                width: 120,
                key: "lastnum",
                align: "center",
                sortable: "custom",
              },             
              {
                title: "水量(m³)",
                width: 130,
                key: "wateryield",
                align: "center",
                sortable: "custom",
              },
              {
                title: "基础水权(m³)",
                width: 130,
                key: "yieldbase",
                align: "center",
                sortable: "custom",
              },
              {
                title: "一级水量(m³)",
                width: 130,
                key: "yieldfirst",
                align: "center",
                sortable: "custom",
              },
              {
                title: "二级水量(m³)",
                width: 130,
                key: "yieldsecond",
                align: "center",
                sortable: "custom",
              },
              {
                title: "三级水量(m³)",
                width: 130,
                key: "yieldthird",
                align: "center",
                sortable: "custom",
              },
              {
                title: "可用余额(元)",
                width: 130,
                key: "available",
                align: "center",
                sortable: "custom",
              },
              {
                title: "缴费时间(m³)",
                width: 160,
                key: "paytime",
                align: "center",
                sortable: "custom",
              },
              {
                title: "联系人",
                width: 120,
                key: "contacts",
                align: "center",
                sortable: "custom",
              },
              {
                title: "联系电话",
                width: 120,
                key: "conphone",
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
                orderBy:'READTIME',       
                sequence:'desc',
                showsign:'', 
                arrear:0,
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
            var nowMonth=date.getMonth()+1;
            if(nowMonth<4){
                date.setMonth(0);
            }else if(nowMonth<7){
                date.setMonth(3);
            }else if(nowMonth<11){
                date.setMonth(6);
            }else{
                date.setMonth(10);
            }           
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
                paramobj.arrear=this.form.arrear;
                this.axios.get('/'+this.$WarmTable+'/waterprice/getmetershow',{params:paramobj}).then(res => {
                      this.loading=false; 
                      var datalist=res.data.rows;
                      this.data=datalist.map((val, index) => {
                      val.readtime=val.readtime.substring(0,16);
                      val.waterrate=parseFloat(val.waterrate).toFixed(2);
                      val.available=parseFloat(val.available).toFixed(2);
                      if(val.paytime!=null && val.paytime!=''){
                        val.paytime=val.paytime.substring(0,16);
                      }
                      if(val.available<0 && (val.paytime==null || val.paytime=='')){
                        val.txsign=1;
                      }else{
                        val.txsign=2;
                      }
                      return val;
                    }); 
                    this.list_input.total=res.data.total;                                
                  });
            },
        }
}
</script>