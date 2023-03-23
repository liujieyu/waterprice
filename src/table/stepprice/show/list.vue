<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '10px'}">
            <BreadcrumbItem>智慧水价</BreadcrumbItem>
            <BreadcrumbItem>阶梯水价查询</BreadcrumbItem>
        </Breadcrumb>
		<SETPSHOW></SETPSHOW>
	</div>
</template>

<script type="text/javascript">
  import SETPSHOW from '@/table/stepprice/show/show.vue';
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      SETPSHOW,       
      }
    }
</script>
<style lang="less" scope>
@import "../../common/warmcss.less";
</style>