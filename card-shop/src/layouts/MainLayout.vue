<template>
  <div class="layout">
    <div
      v-if="isMobile && sidebarOpen"
      class="layout__backdrop"
      @click="sidebarOpen = false"
      aria-hidden="true"
    />
    <Sidebar v-show="isSidebarVisible" class="layout__sidebar" />
    <div class="right-panel">
      <Header @toggle-sidebar="toggleSidebar" />
      <main class="content">
        <RouterView />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Footer from './Footer.vue';
import Header from './Header.vue';
import Sidebar from './Sidebar.vue';

const MOBILE_BREAKPOINT = '(max-width: 768px)';

const route = useRoute();
const isMobile = ref(false);
const sidebarOpen = ref(true);
let mediaQuery: MediaQueryList | null = null;

const isSidebarVisible = computed(() => !isMobile.value || sidebarOpen.value);

const syncSidebarState = () => {
  if (!mediaQuery) {
    return;
  }

  isMobile.value = mediaQuery.matches;
  sidebarOpen.value = !mediaQuery.matches;
};

const toggleSidebar = () => {
  if (!isMobile.value) {
    return;
  }

  sidebarOpen.value = !sidebarOpen.value;
};

const onMediaChange = () => {
  syncSidebarState();
};

watch(
  () => route.fullPath,
  () => {
    if (isMobile.value) {
      sidebarOpen.value = false;
    }
  },
);

onMounted(() => {
  mediaQuery = window.matchMedia(MOBILE_BREAKPOINT);
  syncSidebarState();
  mediaQuery.addEventListener('change', onMediaChange);
});

onBeforeUnmount(() => {
  mediaQuery?.removeEventListener('change', onMediaChange);
});
</script>

<style scoped>
.layout {
  --sidebar-width: 256px;
  --header-height: 76px;

  min-height: 100vh;
  background: #f3f6fb;
  position: relative;
}

.layout__sidebar {
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 30;
  width: var(--sidebar-width);
}

.layout__backdrop {
  display: none;
}

.right-panel {
  display: flex;
  flex-direction: column;
  margin-left: var(--sidebar-width);
  min-width: 0;
  min-height: 100vh;
}

.content {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: calc(var(--header-height) + 24px) 28px 24px;
}

@media (max-width: 768px) {
  .layout__backdrop {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 20;
    background: rgba(15, 23, 42, 0.35);
    backdrop-filter: blur(1px);
  }

  .layout__sidebar {
    position: fixed;
    inset: 0 auto 0 0;
    width: min(256px, 86vw);
    box-shadow: 14px 0 36px rgba(18, 30, 53, 0.24);
  }

  .right-panel {
    width: 100%;
    margin-left: 0;
  }

  .content {
    padding: calc(72px + 16px) 16px 18px;
  }
}
</style>
