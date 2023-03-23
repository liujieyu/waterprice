<template>
	<div>
		<Content class="searchcon">
            <Row type="flex" :gutter="16" class="rowtocol"> 
                <COL>
                 定价年份：
                 <el-date-picker
                    class="wAh"
                    size="mini"
                    style="width:100px;margin-top:15px;"
                    v-model="stepyear"
                    type="year"
                    @change="timechange"
                    placeholder="选择年">
                 </el-date-picker>
                </COL>
                <COL>
                <Button type="primary" style="width: auto;margin-left: 20px;margin-top:12px;" @click="exportData">导出</Button>
                </COL>
            </Row>
            <Row class="fgline"></Row>
            <el-table
                :data="data"
                border
                :height="theight"
                v-loading="loading"
                style="width: 100%"
                >
                <el-table-column
                v-for="(item,index) in tablecolumns"
                :prop="item.key"
                :align="item.align"
                :label="item.title"
                :min-width="item.width"
                ></el-table-column>
            </el-table>

        </Content>
    </div>
</template>
<script type="text/javascript">
export default {
        data(){
            return{
                theight:window.innerHeight-230,
                stepyear:'2023',
                cardtitle:"新增阶梯水价标准",
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
                title: "水价等级",
                key: "ptypenm",
                width: 110,
                align: "center",
              },
              {
                title: "水量上限(m³)",
                key: "maxamount",
                width: 120,
                align: "center",
              },
              {
                title: "水量范围",
                key: "waterscope",
                width: 200,
                align: "center",
              },
              {
                title: "单价(元/m³)",
                width: 130,
                key: "price",
                align: "center",
                sortable: "custom",
              },
            ],                
                data:[{index:1,ptypenm:'一级水量',maxamount:'85.00',waterscope:'0.00m³ - 85.00m³',minmount:0.00,price:0.54},
                      {index:2,ptypenm:'二级水量',maxamount:'278.00',waterscope:'85.00m³ - 278.00m³',minmount:85.00,price:1.07},
                      {index:3,ptypenm:'三级水量',maxamount:'∞',waterscope:'超过278.00m³',minmount:278.00,price:2.54}],
                
            }
        },
        mixins: [],
        components: {
          
        },
        mounted(){

        },
        methods:{
            timechange(date){
            this.Reload();
            },
            Reload(){
                
            },
        }
}
</script>