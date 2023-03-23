<template>
	<div style="overflow:hidden;">
		<Breadcrumb :style="{margin: '10px'}">
            <BreadcrumbItem>智慧水价</BreadcrumbItem>
            <BreadcrumbItem>实时用水信息</BreadcrumbItem>
        </Breadcrumb>
		<REALWATER></REALWATER>
	</div>
</template>

<script type="text/javascript">
  import REALWATER from '@/table/realwater/realwater.vue';
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