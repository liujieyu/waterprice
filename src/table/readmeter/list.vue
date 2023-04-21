<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '10px'}">
            <BreadcrumbItem>智慧水价</BreadcrumbItem>
            <BreadcrumbItem>抄表录入</BreadcrumbItem>
        </Breadcrumb>
		<READMETER></READMETER>
	</div>
</template>

<script type="text/javascript">
  import READMETER from '@/table/readmeter/readmeter.vue';
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      READMETER,       
      }
    }
</script>
<style lang="less" scope>
@import "../common/warmcss.less";
</style>