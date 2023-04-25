<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '10px'}">
            <BreadcrumbItem>智慧水价</BreadcrumbItem>
            <BreadcrumbItem>收费通知</BreadcrumbItem>
        </Breadcrumb>
		<METERSHOW></METERSHOW>
	</div>
</template>

<script type="text/javascript">
  import METERSHOW from '@/table/showmeter/show.vue';
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      METERSHOW,       
      }
    }
</script>
<style lang="less" scope>
@import "../common/warmcss.less";
</style>