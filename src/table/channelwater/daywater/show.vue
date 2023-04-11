<template>
	<div>
		<Content class="searchcon" style="padding-left:36px;">
            <Row :gutter="24" style="display: flex;">
            <COL span="11">
            <Row type="flex" :gutter="16" class="rowtocol" style="padding-top:9px;"> 
                <COL>
                  <el-date-picker
                    v-model="form.daycon"
                    @change="search"
                    size="small"
                    type="date"
                    placeholder="选择时间"
                    format="yyyy-MM-dd"
                  >                   
                  </el-date-picker>
                </COL>
                <COL>
                 <Input search enter-button suffix="ios-search" placeholder="请输入站点名称" style="width:200px;margin-right: 15px;margin-left:10px;margin-top:-1px;" @on-search="search" v-model="form.searchmsg" />
                </COL>
            </Row>
            <Row class="fgline"></Row>
            <el-table
                :data="data"
                ref="daytable"
                border
                highlight-current-row
                @current-change="handleCurrentChange"
                style="width: 100%;cursor:pointer;"
                :height="theight"
                v-loading="loading"
                empty-text="暂无站点数据"
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
                :show-overflow-tooltip="true"
                ></el-table-column>
            </el-table>
            </COL>
            <COL span="2" style="padding-left:5px;">
              <Divider type="vertical" style="height:100%;"/>
            </COL>
            <COL span="11" style="padding-left:14px;">
            <Row type="flex" :gutter="16" class="rowtocol" style="padding-top:10px;font-size:16px;padding-bottom:12px;font-weight:bold;">
                <Icon type="md-analytics" size="20"/>
                &nbsp;&nbsp;&nbsp;&nbsp;{{currentRow.stnm}}日水量分析
            </Row>
              <Row type="flex" :gutter="16" class="rowtocol"> 
                <COL>
                 <el-date-picker
                      v-model="table.date"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      @change="handleDatePickerChange"
                      :picker-options="table.datePickerOptions"
                      unlink-panels
                      type="daterange"
                      size="mini"
                      style="min-width: 360px;margin-bottom:12px;"
                    ></el-date-picker>
                </COL>
                <COL>
                  <div style="font-size:15px;margin-left:50px;margin-top:4px;">累计水量：{{echarts.DWQ}}m³</div>
                </COL>
            </Row>
             <!-- 选项卡 -->
            <Tabs type="card">
              <!-- 水情图 -->
              <TabPane label="日水量图">
              <div id="achart" 
              v-show="table.Rows_filter.length > 0"
              :style="{'width': chartwith+'px','height':(table.height+40)+'px'}"></div>
              <div id="nochart"
              v-show="table.Rows_filter.length == 0"
              style="width: 100%; height: 450px;margin: auto;display: flex;alignItems: center;justifyContent: center;"
              ></div>
              </TabPane>
              <!-- 过程数据-->
              <TabPane label="过程数据">
                <div>
                <Table
                    :columns="table.tablecolumns"
                    :data="table.Rows_filter"
                    :loading="table.loading"
                    width="580"
                    border
                    size="small"
                    :height="table.height"
                    @on-sort-change="sort_change"
                  ></Table>
                  <div class="divider"></div>
                  <!-- 分页器 -->
                  <el-pagination
                    background
                    :page-size="table.pageSize"
                    layout="sizes, total, prev, pager, next, jumper "
                    :page-sizes="[20, 50, 100, 200]"
                    :total="table.total"
                    :pager-count="5"
                    :current-page="table.currentPage"
                    @current-change="pageCurrentChange"
                    @size-change="pageSizeChange"
                    class="pageController"
                    small
                  ></el-pagination>
                  <div class="divider"></div>
                </div>
              </TabPane>
            </Tabs>
            </COL>
        </Row>
     </Content>
    </div>
</template>
<script type="text/javascript">
import FilterMethods from "@/assets/commonJS/FilterMethods.js";
export default {
        data(){
            return{
                loading:false,
                theight:window.innerHeight-190,
                cheight:window.innerHeight-232-120,
                chartwith:window.innerWidth<1426?580:(window.innerWidth-200-36-640),
                currentRow:{stcd:'',stnm:'',z:0,q:0},               
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
                title: "站点名称",
                key: "stnm",
                width: 130,
                align: "center",
                fixed: "left",
              },
              {
                title: "日期",
                key: "tm",
                width: 120,
                align: "center",
              },   
              {
                title: "平均水深(m)",
                key: "daz",
                width: 110,
                align: "center",
              },
              {
                title: "平均流量(m³/s)",
                width: 120,
                key: "daq",
                align: "center",
              },  
              {
                title: "日水量(m³)",
                width: 110,
                key: "dwq",
                align: "center",
              },                 
            ],                
            data:[],           
            table:{
                loading:false,
                //过程数据
                tablecolumns:[
                {
                    title: "序号",
                    key: "index",
                    width: 65,
                    align: "center",
                },
                {
                    title: "日期",
                    key: "tm",
                    width: 130,
                    align: "center",
                    sortable: "custom"
                },
                {
                    title: "平均水深(m)",
                    width: 120,
                    key: "daz",
                    align: "center",
                },
                {                   
                    title: "平均流量(m³/s)",
                    width: 125,
                    key: "daq",
                    align: "center",
                },
                {                   
                    title: "日水量(m³)",
                    width: 120,
                    key: "dwq",
                    align: "center",
                }
                ],
                datePickerOptions:{
                  shortcuts: [
                  {
                    text: "最近10天",
                    onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 10);
                      picker.$emit("pick", [start, end]);
                    }
                  },
                  {
                    text: "最近15天",
                    onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 15);
                      picker.$emit("pick", [start, end]);
                    }
                  },
                  {
                    text: "最近30天",
                    onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                      picker.$emit("pick", [start, end]);
                    }
                  },
                  {
                    text: "最近60天",
                    onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 60);
                      picker.$emit("pick", [start, end]);
                    }
                  },
                  {
                    text: "最近90天",
                    onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                      picker.$emit("pick", [start, end]);
                    }
                  }
                ]
                },
                Rows_filter:[],
                height:window.innerHeight-300,
                pageSize:20,
                total:'',
                currentPage:1,
                date:null,
            },
            echarts:{
                TM:[],
                Q:[],
                Z:[],
                DWQ:'0.000',
            },
            form:{
                daycon:'',
                searchmsg:'', 
                orderBy:'tm',
                sequence:'desc',
                showsign:'',              
            },   
            }
        },
        // 引入过滤方法到此组件
        mixins: [FilterMethods],
        components: {
        },
        mounted(){
          this.form.showsign=this.Cook.get("usertype");
          const end = new Date();
          const start=new Date(end.getTime()-15*24*60*60*1000);
          var timeSlot = [start, end];

          this.table.date=timeSlot;
          this.form.daycon=end;
          this.Reload(true);
        },
        methods:{
            search(){
              
              var end=new Date(this.form.daycon.getTime());
              var start=new Date(this.form.daycon.getTime()-15*24*60*60*1000);
              var timeSlot=[start, end];
              this.table.date=timeSlot;
              this.Reload(true);
            },
            Reload(sign){
                var datetime=this.$FilterData.elDatePicker_Filter(this.form.daycon,'dayTable');
                this.loading=true;
                this.axios.get('/'+this.$WarmTable+'/waterprice/daycanalwater',{params:{dt:datetime,stnm:this.form.searchmsg,showsign:this.form.showsign}}).then((res)=>{
                    this.loading = false;
                    this.data = res.data;
                    for(var i=0;i<this.data.length;i++){
                      var row=this.data[i];
                      if(row.daz!=null){
                        row.daz=row.daz.toFixed(2);
                      }
                      if(row.daq!=null){
                        row.daq=row.daq.toFixed(3);
                      }
                      if(row.dwq!=null){
                        row.dwq=row.dwq.toFixed(3);
                      }
                    }
                    if(sign){
                      this.$refs.daytable.setCurrentRow(this.data[0]);
                    }
                });
            },
            HisReload(){
                this.table.loading=true;
                var _currentPage = this.table.currentPage;
                var _pageSizes = this.table.pageSize;
                var _bgincount=(_currentPage - 1) * _pageSizes+1;
                var _endcount=_currentPage * _pageSizes;
                var timecon=this.$FilterData.elDatePicker_Filter(this.table.date,'dayTable').split(',');
                this.axios.get('/'+this.$WarmTable+'/waterprice/hisdaywater',{params:{begintime:timecon[1],endtime:timecon[2],begincount:_bgincount,endcount:_endcount,stcd:this.currentRow.stcd,orderBy:this.form.orderby,sequence:this.form.sequence}}).then((res)=>{
                    this.table.loading = false;
                    this.table.Rows_filter = res.data.rows;
                    for(var i=0;i<this.table.Rows_filter.length;i++){
                      var row=this.table.Rows_filter[i];
                      if(row.daz!=null){
                        row.daz=row.daz.toFixed(2);
                      }
                      if(row.daq!=null){
                        row.daq=row.daq.toFixed(3);
                      }
                      if(row.dwq!=null){
                        row.dwq=row.dwq.toFixed(3);
                      }
                    }
                    this.table.total = res.data.total;
                });
                this.axios.get('/'+this.$WarmTable+'/waterprice/hisdaychart',{params:{begintime:timecon[1],endtime:timecon[2],stcd:this.currentRow.stcd}}).then((res)=>{
                    this.table.loading = false;
                    var chartdata = res.data;
                    this.createChart(chartdata);
                    
                });
            },
            HisReloadSort(){
                this.table.loading=true;
                var _currentPage = this.table.currentPage;
                var _pageSizes = this.table.pageSize;
                var _bgincount=(_currentPage - 1) * _pageSizes+1;
                var _endcount=_currentPage * _pageSizes;
                var timecon=this.$FilterData.elDatePicker_Filter(this.table.date,'dayTable').split(',');
                this.axios.get('/'+this.$WarmTable+'/waterprice/hisdaywater',{params:{begintime:timecon[1],endtime:timecon[2],begincount:_bgincount,endcount:_endcount,stcd:this.currentRow.stcd,orderBy:this.form.orderby,sequence:this.form.sequence}}).then((res)=>{
                    this.table.loading = false;
                    this.table.Rows_filter = res.data.rows;
                    for(var i=0;i<this.table.Rows_filter.length;i++){
                      var row=this.table.Rows_filter[i];
                      if(row.daz!=null){
                        row.daz=row.daz.toFixed(2);
                      }
                      if(row.daq!=null){
                        row.daq=row.daq.toFixed(3);
                      }
                      if(row.dwq!=null){
                        row.dwq=row.dwq.toFixed(3);
                      }
                    }
                    this.table.total = res.data.total;
                });
            },  
            pageSizeChange(pagesize){
              this.table.pageSize=pagesize;
              this.table.currentPage=1;
              this.HisReloadSort();
            },   
            pageCurrentChange(index){
                this.table.currentPage=index;
                this.HisReloadSort();
            },      
            handleCurrentChange(val){
              this.currentRow=val;
              this.HisReload();
            },
            handleDatePickerChange(){
              this.HisReload();
            },
            sort_change(item){
                this.form.orderBy=item.key.toUpperCase();
                this.form.sequence=item.order;
                this.table.currentPage=1;
                this.HisReloadSort();
            },
            createChart(chartdata){
              var ele = document.getElementById("achart");
              var now=new Date();
              if (chartdata.length > 0) {
                var echartData = this.$FilterData.transform_QDSQ_data_into_ehart_data(chartdata,"dayTable");
                //累计水量赋值
                this.echarts.DWQ=echartData.y3.total.toFixed(3);
                var mintime=echartData.x.list[0],maxtime=echartData.x.list[echartData.x.list.length-1];               
                if(mintime.slice(0,4)==maxtime.slice(0,4) && maxtime.slice(0,4)==now.getFullYear()){
                  for(var i=0;i<echartData.x.list.length;i++){
                      var time=echartData.x.list[i].substr(5);
                      echartData.x.list[i]=time;
                    }
                }
                var mychart= this.$echarts.init(ele);
                mychart.resize();
                mychart.setOption({
                  title: {
                    text: echartData.chartName
                  },
                  tooltip: {
                    trigger: "axis"
                  },
                  legend: {
                    data: [echartData.y1.name, echartData.y3.name,echartData.y2.name],
                    y: "bottom"
                  },
                  toolbox: {
                    show: true,
                    feature: {
                      mark: { show: true },
                      magicType: { show: true, type: ["line", "bar"] },
                      restore: { show: true },
                      saveAsImage: { show: true }
                    },
                    right:'7%'
                  },
                   grid: {
                        left: 1,
                        right: '10%',
                        height:this.cheight,
                        //bottom:20,
                        containLabel: true
                    },
                  calculable: true,
                  animation: true,
                  xAxis: [
                    {
                      type: "category",
                      // boundaryGap: false,
                      data: echartData.x.list,
                    }
                  ],
                  yAxis: [
                    {
                      name: `${echartData.y1.name} m³/s`,
                      type: "value",
                      position: 'left',
                      axisLabel: {
                        formatter: "{value} "
                      },
                      //scale: true,
                      // max: echartData.y1.max,
                      // min: echartData.y1.min
                    },
                    {
                      name: `${echartData.y3.name} m³`,
                      type: "value",
                      position: 'right',		              
                      axisLabel: {
                        formatter: "{value} "
                      },
                      //scale: true,
                      // max: echartData.y1.max,
                      // min: echartData.y1.min
                    },
                    {
                      name: `${echartData.y2.name}m`,
                      type: "value",
                      position: 'right',
                      offset: 50, // y轴位置的偏移量
                      axisLabel: {
                        formatter: "{value} "
                      },
                      //scale: true,
                      // max: echartData.y2.max,
                      // min: echartData.y2.min
                    },
                  ],
                  series: [
                    {
                      name: echartData.y1.name,
                      type: "line",
                      data: echartData.y1.list,
                      showSymbol: false,
                      smooth: true,
                      itemStyle : {  
                          normal : {  
                              color:'#6C84CE'  
                          }  
                      },
                    },
                     {
                      name: echartData.y3.name,
                      type: "bar",
                      barMaxWidth: '50',
                      data: echartData.y3.list,
                       yAxisIndex: 1,
                      showSymbol: false,
                      smooth: true,
                      itemStyle : {  
                          normal : {  
                              color:'#83E1EA'  
                          }  
                      },
                    },
                    {
                      name: echartData.y2.name,
                      type: "line",
                      data: echartData.y2.list,
                      yAxisIndex: 2,
                      showSymbol: false,
                      smooth: true,
                      itemStyle : {  
                          normal : {  
                              color:'#91CC75'  
                          }  
                      }, 
                    },
                  ]
                });
              }else{
                //累计水量赋值
                this.echarts.DWQ='0.000';
                document.getElementById("nochart").innerHTML = "暂无日水量数据";
              }
            },
        }
}
</script>