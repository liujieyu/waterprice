<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '10px'}">
            <BreadcrumbItem>智慧水价</BreadcrumbItem>
            <BreadcrumbItem>用户信息查询</BreadcrumbItem>
        </Breadcrumb>
		<USERSHOW></USERSHOW>
	</div>
</template>

<script type="text/javascript">
  import USERSHOW from '@/table/wateruser/show/show.vue';
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      USERSHOW,       
      }
    }
</script>
<style lang="less" scope>
@import "../../common/warmcss.less";
</style>