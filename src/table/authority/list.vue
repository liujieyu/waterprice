<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '10px'}">
            <BreadcrumbItem>信息维护</BreadcrumbItem>
            <BreadcrumbItem>权限管理</BreadcrumbItem>
        </Breadcrumb>
		<LOGINMANAGER></LOGINMANAGER>
	</div>
</template>

<script type="text/javascript">
  import LOGINMANAGER from '@/table/authority/manage.vue';
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      LOGINMANAGER,       
      }
    }
</script>
<style lang="less" scope>
@import "../common/warmcss.less";
</style>