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
                     <span style="padding:1px;">未超水</span>
                     <img src="@/assets/image/yellow.png" style="margin-left:10px;margin-right:5px;width:20px;height:20px;">
                     <span style="padding:1px;">一级超水</span>
                     <img src="@/assets/image/orange.png" style="margin-left:10px;margin-right:5px;width:20px;height:20px;">
                     <span style="padding:1px;">二级超水</span>
                     <img src="@/assets/image/red.png" style="margin-left:10px;margin-right:5px;width:20px;height:20px;">
                     <span style="padding:1px;">三级超水</span>
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
                <el-table-column align="center" label="预警" width="55" fixed="left">
                  <template slot-scope="scope">
                            <img :src="scope.row.yieldthird>0?require('@/assets/image/red.png'):scope.row.yieldsecond>0?require('@/assets/image/orange.png'):scope.row.yieldfirst>0?require('@/assets/image/yellow.png'):require('@/assets/image/blue.png')" style="width: 28px;height: 28px;vertical-align:middle;"/>
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
                title: "累计应收水费",
                key: "waterrate",
                width: 140,
                align: "center",
              },
              {
                title: "累计使用水量",
                key: "wateryield",
                width: 140,
                align: "center",
              },
              // {
              //   title: "累计基础水权",
              //   key: "yieldbase",
              //   width: 130,
              //   align: "center",
              // },
              {
                title: "累计总超水量",
                key: "totalover",
                width: 130,
                align: "center",
              },
              {
                title: "累计一级超水量",
                key: "yieldfirst",
                width: 130,
                align: "center",
              },
              {
                title: "累计二级超水量",
                key: "yieldsecond",
                width: 130,
                align: "center",
              },
              {
                title: "累计三级超水量",
                key: "yieldthird",
                width: 130,
                align: "center",
              },
              {
                title: "总承包面积",
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
                title: "应收水费(元)",
                width: 130,
                key: "waterrate",
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
              // {
              //   title: "基础水权(m³)",
              //   width: 130,
              //   key: "yieldbase",
              //   align: "center",
              //   sortable: "custom",
              //   fixed:"left",
              // },
              {
                title: "总超水量(m³)",
                width: 130,
                key: "totalover",
                align: "center",
                sortable: "custom",
                fixed:"left",
              },
              {
                title: "一级超水量(m³)",
                width: 145,
                key: "yieldfirst",
                align: "center",
                sortable: "custom",
              },
              {
                title: "二级超水量(m³)",
                width: 145,
                key: "yieldsecond",
                align: "center",
                sortable: "custom",
              },
              {
                title: "三级超水量(m³)",
                width: 145,
                key: "yieldthird",
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
                waterrate:'',
                wateryield:'',
                yieldbase:'',
                yieldfirst:'',
                yieldsecond:'',
                yieldthird:'',
                totalover:'',
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
                }else if(item.prop=="totalover"){
                  this.form.orderBy="(YIELDFIRST+YIELDSECOND+YIELDTHIRD)";
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
                this.axios.get('/'+this.$WarmTable+'/waterprice/gemeteramount',{params:paramobj}).then(res => {
                      this.loading=false; 
                      this.headloading=false;
                      this.data=res.data.rows;
                      this.list_input.total=res.data.total; 
                    if(sumsign){
                      if(res.data.metersum!=null){
                        this.suminfo=res.data.metersum;  
                        this.suminfo.area=res.data.areasum;                     
                      }else{
                        this.suminfo.waterrate=0;
                        this.suminfo.wateryield=0;
                        this.suminfo.yieldbase=0;
                        this.suminfo.yieldfirst=0;
                        this.suminfo.yieldsecond=0;
                        this.suminfo.yieldthird=0;
                        this.suminfo.area=0;
                      } 
                      this.suminfo.totalover=this.suminfo.yieldfirst+this.suminfo.yieldsecond+this.suminfo.yieldthird;
                      this.suminfo.waterrate+='元';
                      this.suminfo.wateryield+='m³';
                      this.suminfo.yieldbase+='m³';
                      this.suminfo.yieldfirst+='m³';
                      this.suminfo.yieldsecond+='m³';
                      this.suminfo.yieldthird+='m³';
                      this.suminfo.totalover+='m³';
                      this.suminfo.area+='亩';
                      this.headdata=[];
                      this.headdata.push(this.suminfo);  
                      }                                         
                  });
            },
        }
}
</script>