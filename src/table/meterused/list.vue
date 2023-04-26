<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '10px'}">
            <BreadcrumbItem>超额用水加价</BreadcrumbItem>
            <BreadcrumbItem>农户用户超水信息</BreadcrumbItem>
        </Breadcrumb>
		<METERUSED></METERUSED>
	</div>
</template>

<script type="text/javascript">
  import METERUSED from '@/table/meterused/meterused';
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      METERUSED,       
      }
    }
</script>
<style lang="less" scope>
@import "../common/warmcss.less";
</style>