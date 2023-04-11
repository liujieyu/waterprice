<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '10px'}">
            <BreadcrumbItem>节约用水回购</BreadcrumbItem>
            <BreadcrumbItem>执行水价标准</BreadcrumbItem>
            <BreadcrumbItem>农户用户标准</BreadcrumbItem>
        </Breadcrumb>
		<FARMBACK></FARMBACK>
	</div>
</template>

<script type="text/javascript">
  import FARMBACK from '@/table/stepprice/backfarm/show.vue';
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      FARMBACK,       
      }
    }
</script>
<style lang="less" scope>
@import "../../common/warmcss.less";
</style>