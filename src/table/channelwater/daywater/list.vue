<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '10px'}">
            <BreadcrumbItem>支渠水量分析</BreadcrumbItem>
            <BreadcrumbItem>日水量监测</BreadcrumbItem>
        </Breadcrumb>
		<DAYWATER></DAYWATER>
	</div>
</template>

<script type="text/javascript">
  import DAYWATER from '@/table/channelwater/daywater/show.vue';
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      DAYWATER,       
      }
    }
</script>
<style lang="less" scope>
@import "../../common/warmcss.less";
</style>