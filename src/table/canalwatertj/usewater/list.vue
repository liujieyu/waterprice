<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '10px'}">
            <BreadcrumbItem>超额用水加价</BreadcrumbItem>
            <BreadcrumbItem>支渠用户超水信息</BreadcrumbItem>
        </Breadcrumb>
		<CANALUSEWATER></CANALUSEWATER>
	</div>
</template>

<script type="text/javascript">
  import CANALUSEWATER from '@/table/canalwatertj/usewater/show.vue';
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      CANALUSEWATER,       
      }
    }
</script>
<style lang="less" scope>
@import "../../common/warmcss.less";
</style>