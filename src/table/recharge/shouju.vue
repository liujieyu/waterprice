<template>
      <div>
				<div id="printCons" class="print-div" style="width:720px;border:2px #999 solid;margin:0 auto;">
                      <h1 class="black" style="margin-top:20px;margin-bottom:20px;width:100%;text-align:center;color:#000;font-size:28px;">水费购买(专用)收据</h1>
                     <div style="width:100%;color:#000;text-align:center;margin-bottom:15px;font-size:15px;">
                        <span>用户名称：{{form.farmname}}</span>
                        
                        <span style="margin-left:250px;">{{form.year}} 年 {{form.month}} 月 {{form.day}} 日</span>
                    </div>
                    <table  cellspacing="0" cellpadding="0" class="table_shouju">                            
                            <tr>                             
                                <td class="head">购买金额：</td>
                                <td class="content" colspan="3">{{form.amountform}}</td>                               
                                <td class="head">购买水量：</td>
                                <td class="content">{{form.buywater}}</td>
                            </tr>
                            <tr>
                                <td class="head">基础水权：</td>
                                <td class="content">{{form.buybase}}</td>
                                <td class="head">一级水量：</td>
                                <td class="content">{{form.buyfirst}}</td>
                                <td class="head">二级水量：</td>
                                <td class="content">{{form.buysecond}}</td>
                                
                            </tr>  
                            <tr>
                                <td class="head">三级水量：</td>
                                <td class="content">{{form.buythird}}</td>
                                <td class="head">{{form.lastlabel}}：</td>
                                <td class="content">{{form.lastsurplus}}</td>
                                <td class="head">总存余水量：</td>
                                <td class="content">{{form.remainwater}}</td>
                            </tr>                    
                    </table>
                    <div style="width:700px;color:#000;margin-top:20px;margin-bottom:30px;text-align:right;padding-right:20px;font-size:15px;">收款人：{{form.payee}}</div>
                </div>
              <div style="width:700px;margin:0 auto;">
                  <Button  type="primary"  @click="HandlePrinter()" icon="ios-print" style="margin-left:300px;margin-top:26px;margin-bottom:12px;" >打印收据</Button>
              </div>
        </div>
</template>
<script>
import print from 'print-js';
export default {
  props: {
    info: {},
  },

  data() {
    return {
      moneyArray:['零','壹','贰','叁','肆','伍','陆','柒','捌','玖','拾','佰','仟'],
      form:{

      },
    };
  },
  mounted() { 
     this.form=this.info;
     var amounttext=this.form.amount;
     var lasttext='(¥'+amounttext+')';
     var amount=parseInt(amounttext.replace('元',''));
     var amountform="人民币";
     var qw=parseInt(amount/1000);
     var bw=parseInt((amount-qw*1000)/100);
     var sw=parseInt((amount-qw*1000-bw*100)/10);
     var gw=parseInt(amount-qw*1000-bw*100-sw*10);
     if(qw>0){
      amountform+=this.moneyArray[qw]+this.moneyArray[12];
     }
     if(bw>0){
      amountform+=this.moneyArray[bw]+this.moneyArray[11];
     }else if(qw>0 &&(sw>0 || gw>0)){
      amountform+=this.moneyArray[0];
     }
     if(sw>0){
      amountform+=this.moneyArray[sw]+this.moneyArray[10];
     }else if(bw>0 && gw>0){
      amountform+=this.moneyArray[0];
     }
     if(gw>0){
      amountform+=this.moneyArray[gw];
     }
     amountform+='元整'+lasttext;
     this.form.amountform=amountform;
     var datearray=this.form.createtime.split("-");
     this.form.year=datearray[0];
     this.form.month=datearray[1];
     this.form.day=datearray[2];
     this.form.payee=this.Cook.get("title");
  },
   methods: {
        HandlePrinter() {
        printJS({
                    printable: 'printCons',
                    type: 'html',
                    style: '@page {margin:0 10mm};', 
                    targetStyles: ['*'],
                    ignoreElements:['no-print','bc','gb'],                    
                });
        },
   },
     computed: {},

  watch: {}
};
</script>
<style lang="less" scoped>
.table_shouju {
margin: 0 auto;
 width: 690px;
 border:1px solid #666;
 border-collapse:collapse; 
 color: #000;
 font-size:16px;
 
.head{color:#000;width: 110px;text-align: right;}
.content{width: 110px;text-align: center;}
 td{
    height: 42px;
    text-align: center;   
    border-top: none;
    border:1px solid #666;
  }
}
</style>