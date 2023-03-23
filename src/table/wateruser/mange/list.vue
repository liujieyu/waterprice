<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '10px'}">
            <BreadcrumbItem>信息维护</BreadcrumbItem>
            <BreadcrumbItem>用户信息维护</BreadcrumbItem>
        </Breadcrumb>
		<USERMANAGER></USERMANAGER>
	</div>
</template>

<script type="text/javascript">
  import USERMANAGER from '@/table/wateruser/mange/manage.vue';
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      USERMANAGER,       
      }
    }
</script>
<style lang="less" scope>
@import "../../common/warmcss.less";
</style>