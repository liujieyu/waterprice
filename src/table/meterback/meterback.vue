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
                <COL>
                    <div :style="{width:subwidth+'px'}"></div>
                   </COL>
                   <COL>
                   <div style="display: flex;flex-wrap:wrap;font-size:14px;margin-top:10px;">
                    <img src="@/assets/image/blue.png" style="margin-right:5px;width:20px;height:20px;">
                    <span style="padding:1px;">未节水</span>
                    <img src="@/assets/image/greenone.png" style="margin-left:10px;margin-right:5px;width:20px;height:20px;">
                    <span style="padding:1px;">一级节水</span>
                    <img src="@/assets/image/greentwo.png" style="margin-left:10px;margin-right:5px;width:20px;height:20px;">
                    <span style="padding:1px;">二级节水</span>
                    <img src="@/assets/image/green.png" style="margin-left:10px;margin-right:5px;width:20px;height:20px;">
                    <span style="padding:1px;">三级节水</span>
                   </div>
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
                    fixed="left"
                    label="序号"
                    prop="index"
                    align="center"
                    width="55">
                </el-table-column>
                <el-table-column align="center" label="奖励" width="55" fixed="left">
                  <template slot-scope="scope">
                        <img :src="scope.row.thridwater>0?require('@/assets/image/green.png'):scope.row.twowater>0?require('@/assets/image/greentwo.png'):scope.row.onewater>0?require('@/assets/image/greenone.png'):require('@/assets/image/blue.png')" style="width: 28px;height: 28px;vertical-align:middle;"/>
                  </template>
                </el-table-column>
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
                headloading:false,
                theight:window.innerHeight-305,
                subwidth:window.innerWidth-616-200-24-290,
                pickerOptions: {
                    disabledDate(v) {
                    return v.getTime() < new Date(2021,0,1,0,0,0);
                    }
                },
            headcolumns:[
              {
                title: "累计回购金额",
                key: "backamount",
                width: 140,
                align: "center",
              },
              {
                title: "累计使用水量",
                key: "wateryield",
                width: 140,
                align: "center",
              },
            //   {
            //     title: "累计基础水权",
            //     key: "realbase",
            //     width: 130,
            //     align: "center",
            //   },
              {
                title: "累计总节水量",
                key: "totalwater",
                width: 130,
                align: "center",
              },
              {
                title: "累计一级节水量",
                key: "onewater",
                width: 130,
                align: "center",
              },
              {
                title: "累计二级节水量",
                key: "twowater",
                width: 130,
                align: "center",
              },
              {
                title: "累计三级节水量",
                key: "thridwater",
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
                title: "用户名",
                key: "farmname",
                width: 130,
                align: "center",
                sortable: "custom",
                fixed:"left",
              },                 
              {
                title: "回购金额(元)",
                width: 130,
                key: "backamount",
                align: "center",
                sortable: "custom",
                fixed:"left",
              },                 
              {
                title: "使用水量(m³)",
                width: 130,
                key: "wateryield",
                align: "center",
                sortable: "custom",
                fixed:"left",
              },
            //   {
            //     title: "基础水权(m³)",
            //     width: 130,
            //     key: "realbase",
            //     align: "center",
            //     sortable: "custom",
            //     fixed:"left",
            //   },
              {
                title: "总节水量(m³)",
                width: 130,
                key: "totalwater",
                align: "center",
                sortable: "custom",
                fixed:"left",
              },
              {
                title: "一级节水量(m³)",
                width: 145,
                key: "onewater",
                align: "center",
                sortable: "custom",
              },
              {
                title: "二级节水量(m³)",
                width: 145,
                key: "twowater",
                align: "center",
                sortable: "custom",
              },
              {
                title: "三级节水量(m³)",
                width: 145,
                key: "thridwater",
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
            headdata:[],               
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
                 this.headloading=true;
                var paramobj=new Object();
                if(this.form.searchmsg!=null && this.form.searchmsg!=''){
                  paramobj.stnm=this.form.searchmsg;
                }
                if(this.form.channel!=null && this.form.channel!=''){
                  paramobj.canalcode=this.form.channel;
                }
                if(this.form.wateryear!=null && this.form.wateryear!=''){
                  paramobj.year=this.form.wateryear.getFullYear();
                  paramobj.nextyear=paramobj.year+1;
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
                this.axios.get('/'+this.$WarmTable+'/waterprice/gemeterback',{params:paramobj}).then(res => {
                      this.loading=false; 
                      this.headloading=false;
                      var datalist=res.data.rows;
                      this.data=datalist.map((val, index) => {
                        val.backamount=parseFloat(val.backamount).toFixed(2);
                        return val;
                        }); 
                      this.list_input.total=res.data.total; 
                    if(sumsign){
                      if(res.data.backsum!=null && res.data.backsum.backamount!=null){
                        this.suminfo=res.data.backsum;                       
                      }else{
                        this.suminfo.backamount=0;
                        this.suminfo.wateryield=0;
                        this.suminfo.realbase=0;
                        this.suminfo.totalwater=0;
                        this.suminfo.onewater=0;
                        this.suminfo.twowater=0;
                        this.suminfo.thridwater=0;
                        this.suminfo.area=0;
                      } 
                      this.suminfo.backamount=parseFloat(this.suminfo.backamount).toFixed(2)+'元';
                      this.suminfo.wateryield+='m³';
                      this.suminfo.realbase+='m³';
                      this.suminfo.totalwater+='m³';
                      this.suminfo.onewater+='m³';
                      this.suminfo.twowater+='m³';
                      this.suminfo.thridwater+='m³';
                      this.suminfo.area+='亩';
                      this.headdata=[];
                      this.headdata.push(this.suminfo);  
                      }                                         
                  });
            },
        }
}
</script>