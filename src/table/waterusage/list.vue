<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '10px'}">
            <BreadcrumbItem>超额用水加价</BreadcrumbItem>
            <BreadcrumbItem>水费收缴信息</BreadcrumbItem>
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