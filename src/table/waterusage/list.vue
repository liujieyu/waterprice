<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '10px'}">
            <BreadcrumbItem>智慧水价</BreadcrumbItem>
            <BreadcrumbItem>水费使用统计</BreadcrumbItem>
        </Breadcrumb>
		<WATERUSAGE></WATERUSAGE>
	</div>
</template>

<script type="text/javascript">
  import WATERUSAGE from '@/table/waterusage/waterusage.vue';
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      WATERUSAGE,       
      }
    }
</script>
<style lang="less" scope>
@import "../common/warmcss.less";
</style>