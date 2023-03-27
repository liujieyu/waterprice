<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '10px'}">
            <BreadcrumbItem>支渠水量分析</BreadcrumbItem>
            <BreadcrumbItem>实时水情监控</BreadcrumbItem>
        </Breadcrumb>
		<REALWATER></REALWATER>
	</div>
</template>

<script type="text/javascript">
  import REALWATER from '@/table/channelwater/realwater/show.vue';
	export default {
        data() {
        return { };
      },

      mounted() { },
      methods: { },
      computed: { },
      components: { 
      REALWATER,       
      }
    }
</script>