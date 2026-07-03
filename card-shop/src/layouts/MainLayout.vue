<template>
  <div class="layout">
    <Sidebar />
    <div class="right-panel">
      <Header />
      <main class="content">
        <RouterView />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import Footer from './Footer.vue';
import Header from './Header.vue';
import Sidebar from './Sidebar.vue';
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
  overflow: hidden;
  background: #f3f6fb;
}

.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.content {
  flex: 1;
  overflow: auto;
  padding: 0;
}
</style>
