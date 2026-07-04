<template>
  <div class="layout">
    <div
      v-if="isMobile && sidebarOpen"
      class="layout__backdrop"
      @click="sidebarOpen = false"
      aria-hidden="true"
    />
    <Sidebar v-show="sidebarOpen" class="layout__sidebar" />
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
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Footer from './Footer.vue';
import Header from './Header.vue';
import Sidebar from './Sidebar.vue';

const MOBILE_BREAKPOINT = '(max-width: 768px)';

const route = useRoute();
const isMobile = ref(false);
const sidebarOpen = ref(true);
let mediaQuery: MediaQueryList | null = null;

const syncSidebarState = () => {
  if (!mediaQuery) {
    return;
  }

  isMobile.value = mediaQuery.matches;
  sidebarOpen.value = !mediaQuery.matches;
};

const toggleSidebar = () => {
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
  display: flex;
  min-height: 100vh;
  overflow: hidden;
  background: #f3f6fb;
  position: relative;
}

.layout__sidebar {
  flex: 0 0 auto;
}

.layout__backdrop {
  display: none;
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

@media (max-width: 768px) {
  .layout {
    display: block;
  }

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
    z-index: 30;
    width: min(256px, 86vw);
    box-shadow: 14px 0 36px rgba(18, 30, 53, 0.24);
  }

  .right-panel {
    min-height: 100vh;
    width: 100%;
  }
}
</style>
