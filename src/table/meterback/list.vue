<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '10px'}">
            <BreadcrumbItem>节约用水回购</BreadcrumbItem>
            <BreadcrumbItem>农户用户节水信息</BreadcrumbItem>
        </Breadcrumb>
		<METERBACK></METERBACK>
	</div>
</template>

<script type="text/javascript">
  import METERBACK from '@/table/meterback/meterback.vue';
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      METERBACK,       
      }
    }
</script>
<style lang="less" scope>
@import "../common/warmcss.less";
</style>