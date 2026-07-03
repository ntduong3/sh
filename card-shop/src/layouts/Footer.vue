<template>
  <footer class="footer-bar">
    <slot>© 2026 Product Management</slot>
  </footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
.footer-bar {
  height: 46px;
  padding: 0 24px;
  background: #ffffff;
  border-top: 1px solid #e7ebf2;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 14px;
}
</style>
