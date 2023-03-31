<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '10px'}">
            <BreadcrumbItem>支渠水量分析</BreadcrumbItem>
            <BreadcrumbItem>月水量监测</BreadcrumbItem>
        </Breadcrumb>
		<MONTHWATER></MONTHWATER>
	</div>
</template>

<script type="text/javascript">
  import MONTHWATER from '@/table/channelwater/monthwater/show.vue';
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      MONTHWATER,       
      }
    }
</script>
<style lang="less" scope>
@import "../../common/warmcss.less";
</style>