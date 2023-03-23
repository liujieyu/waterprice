<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '10px'}">
            <BreadcrumbItem>智慧水价</BreadcrumbItem>
            <BreadcrumbItem>水费充值</BreadcrumbItem>
        </Breadcrumb>
		<RECHARGE></RECHARGE>
	</div>
</template>

<script type="text/javascript">
  import RECHARGE from '@/table/recharge/recharge.vue';
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      RECHARGE,       
      }
    }
</script>
<style lang="less" scope>
@import "../common/warmcss.less";
</style>