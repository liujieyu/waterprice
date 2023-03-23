<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '10px'}">
            <BreadcrumbItem>信息维护</BreadcrumbItem>
            <BreadcrumbItem>阶梯水价维护</BreadcrumbItem>
        </Breadcrumb>
		<STEPMANAGER></STEPMANAGER>
	</div>
</template>

<script type="text/javascript">
  import STEPMANAGER from '@/table/stepprice/manage/mamage.vue';
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      STEPMANAGER,       
      }
    }
</script>
<style lang="less" scope>
@import "../../common/warmcss.less";
</style>