<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '10px'}">
            <BreadcrumbItem>节约用水回购</BreadcrumbItem>
            <BreadcrumbItem>支渠用户节水信息</BreadcrumbItem>
        </Breadcrumb>
		<CANALBACKWATER></CANALBACKWATER>
	</div>
</template>

<script type="text/javascript">
  import CANALBACKWATER from '@/table/canalwatertj/backwater/show.vue';
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      CANALBACKWATER,       
      }
    }
</script>
<style lang="less" scope>
@import "../../common/warmcss.less";
</style>