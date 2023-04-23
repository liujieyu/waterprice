<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '10px'}">
            <BreadcrumbItem>智慧水价</BreadcrumbItem>
            <BreadcrumbItem>充值记录查询</BreadcrumbItem>
        </Breadcrumb>
		<RECHARGESHOW></RECHARGESHOW>
	</div>
</template>

<script type="text/javascript">
  import RECHARGESHOW from '@/table/showcharge/show.vue';
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      RECHARGESHOW,       
      }
    }
</script>
<style lang="less" scope>
@import "../common/warmcss.less";
</style>