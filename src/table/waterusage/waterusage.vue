<template>
	<div>
		<Content class="searchcon">
            <Row type="flex" :gutter="16" class="rowtocol" style="padding-top:10px;"> 
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
            <Row>
                <Col style='font-size: 14px;margin-top:10px;' class="borsLine">
                累计收缴金额：{{suminfo.amount}}元&nbsp;&nbsp;&nbsp;&nbsp;累计购买水量：{{suminfo.buywater}}m³&nbsp;&nbsp;&nbsp;&nbsp;其中&nbsp;&nbsp;基础水量：{{suminfo.basewater}}m³&nbsp;&nbsp;一级水量：{{suminfo.buyfirst}}m³&nbsp;&nbsp;二级水量：{{suminfo.buysecond}}m³&nbsp;&nbsp;三级水量：{{suminfo.buythird}}m³
                </Col>
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
                theight:window.innerHeight-265,
                pickerOptions: {
                    disabledDate(v) {
                    return v.getTime() < new Date(2021,0,1,0,0,0);
                    }
                },
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
                title: "基础水量(m³)",
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
              debugger;
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
                this.axios.get('/'+this.$WarmTable+'/waterprice/getrechargetj',{params:paramobj}).then(res => {
                      this.loading=false; 
                      this.data=res.data.rows;
                      this.list_input.total=res.data.total; 
                      if(res.data.rechargesum!=null){
                        this.suminfo=res.data.rechargesum;
                      }else{
                        this.suminfo.amount=0;
                        this.suminfo.buywater=0;
                        this.suminfo.basewater=0;
                        this.suminfo.buyfirst=0;
                        this.suminfo.buysecond=0;
                        this.suminfo.buythird=0;
                      }                                            
                  });
            },
        }
}
</script>