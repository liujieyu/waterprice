<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '10px'}">
            <BreadcrumbItem>信息维护</BreadcrumbItem>
            <BreadcrumbItem>支渠用户信息维护</BreadcrumbItem>
        </Breadcrumb>
		<CANALUSER></CANALUSER>
	</div>
</template>

<script type="text/javascript">
  import CANALUSER from '@/table/wateruser/canaluser/manage.vue';
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      CANALUSER,       
      }
    }
</script>
<style lang="less" scope>
@import "../../common/warmcss.less";
</style>