<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '10px'}">
            <BreadcrumbItem>节约用水回购</BreadcrumbItem>
            <BreadcrumbItem>执行水价标准</BreadcrumbItem>
            <BreadcrumbItem>支渠用户标准</BreadcrumbItem>
        </Breadcrumb>
		<CANALBACK></CANALBACK>
	</div>
</template>

<script type="text/javascript">
  import CANALBACK from '@/table/stepprice/backcanal/show.vue';
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      CANALBACK,       
      }
    }
</script>
<style lang="less" scope>
@import "../../common/warmcss.less";
</style>