<template>
	<div>
		<Content class="searchcon">
            <Row type="flex" :gutter="16" class="rowtocol" style="padding-top:10px;"> 
                <COL>
                <el-date-picker
                    style="width:120px;margin-right: 15px;"
                    v-model="datecon"
                    :clearable="false"
                    type="year"
                    size="small"
                    @change="timechange"
                    :picker-options="pickerOptions"
                    placeholder="选择年">
                 </el-date-picker>
                </COL>
                <COL>
                 <Input search enter-button suffix="ios-search" placeholder="请输入用户名" style="width:200px;margin-right: 15px;margin-left:10px;margin-top:-2px;" @on-search="search" v-model="form.searchmsg" />
                </COL>
                <COL>
                   <Select v-model="form.channel" @on-change="search" style="width:160px;margin-right: 15px;" clearable filterable placeholder="所属渠道(可搜索)">
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
            <Row class="fgline"></Row>
            <el-table
                :data="data"
                border
                :height="theight"
                v-loading="loading"
                @sort-change="sort_change"
                show-summary
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
                <el-table-column align="center" label="奖励" width="55">
                  <template slot-scope="scope">
                            <img :src="scope.row.thrwater>0?require('@/assets/image/green.png'):scope.row.twowater>0?require('@/assets/image/greentwo.png'):scope.row.onewater>0?require('@/assets/image/greenone.png'):require('@/assets/image/blue.png')" style="width: 28px;height: 28px;vertical-align:middle;"/>
                        </template>
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
                theight:window.innerHeight-200,
                subwidth:window.innerWidth-616-200-24-290,
                loading:false,
                datecon:'',
                pickerOptions: {
                    disabledDate(v) {
                    return v.getTime() < new Date(2021,0,1,0,0,0);
                    }
                },
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
                title: "总供水量(m³)",
                key: "totalwater",
                width: 130,
                align: "center",  
                sortable: "custom",             
              },
              {
                title: "总节水量(m³)",
                key: "totalback",
                width: 130,
                align: "center",  
                sortable: true,           
              },
              {
                title: "一级节水量(m³)",
                width: 140,
                key: "onewater",
                align: "center",
                sortable: true, 
              },
              {
                title: "二级节水量(m³)",
                width: 140,
                key: "twowater",
                align: "center",
                sortable: true, 
              },
              {
                title: "三级节水量(m³)",
                width: 140,
                key: "thrwater",
                align: "center",
                sortable: true, 
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
                priceyr:'',
                showsign:'', 
            }, 
            channellist:[],              
            }
        },
        mixins: [FilterMethods],
        components: {
          
        },
        mounted(){
          this.datecon=new Date();
          this.form.priceyr=this.datecon.getFullYear();
          this.form.showsign=this.Cook.get("usertype");
          this.$FilterData.Get_CanalInfo(this.$WarmTable,this.form.showsign,data => {
                    this.channellist = data;
          });
          this.Reload();
        },
        methods:{
            timechange(date){
                this.form.priceyr=date.getFullYear();
                this.Reload();
            },
            indexMethod(index){
              return index+1;
            },
            sort_change(item){
              if(item.order==null || item.prop=="totalback" || item.prop=="onewater" || item.prop=="twowater" || item.prop=="thrwater"){
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
            Reload(){
                this.loading=true;
                var paramobj=new Object();
                paramobj.year=this.form.priceyr;
                if(this.form.searchmsg!=null && this.form.searchmsg!=''){
                  paramobj.stnm=this.form.searchmsg;
                }
                if(this.form.channel!=null && this.form.channel!=''){
                  paramobj.canalcode=this.form.channel;
                }
                paramobj.orderBy=this.form.orderBy;
                paramobj.sequence=this.form.sequence;
                paramobj.showsign=this.form.showsign;
                this.axios.get('/'+this.$WarmTable+'/waterprice/canalbackshow',{params:paramobj}).then(res => {
                      this.loading=false; 
                      this.data=res.data;                                
                });
            },
        }
}
</script>