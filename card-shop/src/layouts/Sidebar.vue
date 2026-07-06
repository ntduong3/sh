<template>
  <aside class="sidebar">
    <div class="sidebar__brand">
      <div class="brand-mark" aria-hidden="true">
        <ShoppingBag :size="24" :stroke-width="1.8" />
      </div>
      <div>
        <div class="brand-title">SHOP MANAGER</div>
      </div>
    </div>

    <nav class="sidebar__nav" aria-label="Primary">
      <template v-for="item in menuItems" :key="item.label">
        <RouterLink
          v-if="item.to"
          :to="item.to"
          custom
          v-slot="{ href, navigate, isExactActive }"
        >
          <a
            :href="href"
            class="nav-item"
            :class="{ 'nav-item--active': isExactActive }"
            @click="navigate"
          >
            <span class="nav-icon">
              <component :is="item.icon" :size="24" :stroke-width="1.7" />
            </span>
            <span class="nav-label">{{ item.label }}</span>
          </a>
        </RouterLink>
        <div v-else class="nav-item">
          <span class="nav-icon">
            <component :is="item.icon" :size="24" :stroke-width="1.7" />
          </span>
          <span class="nav-label">{{ item.label }}</span>
        </div>
      </template>
    </nav>

    <div class="sidebar__logout">
      <a href="#" class="logout-link">
        <span>©Nocopyright by Sunny Nguyen</span>
      </a>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { Component } from 'vue';
import {
  BarChart3,
  FileText,
  FolderClosed,
  LayoutGrid,
  Package,
  PackagePlus,
  Settings,
  ShoppingBag,
  ShoppingCart,
  UsersRound,
} from 'lucide-vue-next';

type MenuItem = {
  label: string;
  icon: Component;
  to?: string;
};

const menuItems: MenuItem[] = [
  {
    label: 'Tổng quan',
    to: '/',
    icon: LayoutGrid,
  },
  {
    label: 'Sản phẩm',
    to: '/product',
    icon: Package,
  },
  {
    label: 'Danh mục',
    to: '/menu',
    icon: FolderClosed,
  },
  {
    label: 'Nhập hàng',
    to: '/inputProduct',
    icon: PackagePlus,
  },
  {
    label: 'Bán hàng',
    to: '/seller',
    icon: ShoppingCart,
  },
  {
    label: 'Khách hàng',
    to: '/customer',
    icon: UsersRound,
  },
  {
    label: 'Thống kê',
    to: '/summary',
    icon: BarChart3,
  },
  {
    label: 'Báo cáo',
    to: '/report',
    icon: FileText,
  },
  {
    label: 'Cài đặt',
    to: '/setting',
    icon: Settings,
  },
];
</script>

<style scoped>
.sidebar {
  width: 256px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(180deg, #23345a 0%, #1d2c4b 58%, #233556 100%);
  color: #d2d9e6;
  box-shadow: 10px 0 30px rgba(18, 30, 53, 0.16);
  overflow-y: auto;
  overscroll-behavior: contain;
}

.sidebar__brand {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 22px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.brand-mark {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #4a8ef7 0%, #2f6cd8 100%);
  color: #fff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18);
}

.brand-mark :deep(svg) {
  width: 24px;
  height: 24px;
}

.brand-title {
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.4px;
  color: #ffffff;
}

.sidebar__nav {
  display: grid;
  gap: 8px;
  padding: 18px 12px;
}

.nav-item {
  height: 54px;
  padding: 0 16px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 14px;
  color: #d4dbea;
  text-decoration: none;
  transition: background 0.18s ease, color 0.18s ease, transform 0.18s ease;
}

.nav-item:hover {
  background: linear-gradient(180deg, #3d7ef0 0%, #2b67d3 100%);
  color: #ffffff;
}

.nav-item--active {
  background: linear-gradient(180deg, #3d7ef0 0%, #2b67d3 100%);
  color: #fff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
}

.nav-icon {
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 24px;
}

.nav-icon :deep(svg) {
  width: 24px;
  height: 24px;
}

.nav-label {
  font-size: 16px;
  font-weight: 500;
}

.sidebar__logout {
  padding: 18px 20px 24px;
}

.logout-link {
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 14px;
  color: #d4dbea;
  text-decoration: none;
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.logout-link :deep(svg) {
  width: 22px;
  height: 22px;
}

@media (max-width: 768px) {
  .sidebar {
    width: min(256px, 86vw);
  }
}
</style>
