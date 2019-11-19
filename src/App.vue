<template>
  <component :is="layout">
    <router-view :layout.sync="layout" />
  </component>
</template>


<script>
import LayoutDefault from './layouts/LayoutDefault'

export default {
  name: 'App',
  data() {
    return {
      layout: LayoutDefault,
    };
  },
};
</script>
