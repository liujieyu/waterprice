<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '10px'}">
            <BreadcrumbItem>支渠水量分析</BreadcrumbItem>
            <BreadcrumbItem>小时水量监测</BreadcrumbItem>
        </Breadcrumb>
		<HOURWATER></HOURWATER>
	</div>
</template>

<script type="text/javascript">
  import HOURWATER from '@/table/channelwater/hourwater/show.vue';
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      HOURWATER,       
      }
    }
</script>
<style lang="less" scope>
@import "../../common/warmcss.less";
</style>