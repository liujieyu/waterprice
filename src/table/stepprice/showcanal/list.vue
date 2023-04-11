<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '10px'}">
            <BreadcrumbItem>超额用水加价</BreadcrumbItem>
            <BreadcrumbItem>执行水价标准</BreadcrumbItem>
            <BreadcrumbItem>支渠用户标准</BreadcrumbItem>
        </Breadcrumb>
		<CANALSHOW></CANALSHOW>
	</div>
</template>

<script type="text/javascript">
  import CANALSHOW from '@/table/stepprice/showcanal/show.vue';
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      CANALSHOW,       
      }
    }
</script>
<style lang="less" scope>
@import "../../common/warmcss.less";
</style>