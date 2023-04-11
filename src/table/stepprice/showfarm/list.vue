<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '10px'}">
            <BreadcrumbItem>超额用水加价</BreadcrumbItem>
            <BreadcrumbItem>执行水价标准</BreadcrumbItem>
            <BreadcrumbItem>农户用户标准</BreadcrumbItem>
        </Breadcrumb>
		<FARMSHOW></FARMSHOW>
	</div>
</template>

<script type="text/javascript">
  import FARMSHOW from '@/table/stepprice/showfarm/show.vue';
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      FARMSHOW,       
      }
    }
</script>
<style lang="less" scope>
@import "../../common/warmcss.less";
</style>