<!-- BaseLayout.vue -->
<template>
  <router-view class="app-content" ref="appcontent"></router-view>
</template>

<script lang="ts">
export default {
  name: 'BaseView'
}
</script>

<style scoped>
.app-content {
  width: 100vw;
  height: 100vh;
}
</style>

