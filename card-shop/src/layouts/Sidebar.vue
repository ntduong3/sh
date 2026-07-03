<template>
  <aside class="sidebar">
    <div class="sidebar__brand">
      <div class="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M6 10V8a6 6 0 0112 0v2" />
          <path d="M5 10h14l1 10H4l1-10z" />
          <path d="M9 10V8a3 3 0 116 0v2" />
        </svg>
      </div>
      <div>
        <div class="brand-title">SHOP MANAGER</div>
      </div>
    </div>

    <nav class="sidebar__nav" aria-label="Primary">
      <a
        v-for="item in menuItems"
        :key="item.label"
        href="#"
        class="nav-item"
        :class="{ 'nav-item--active': item.active }"
      >
        <span class="nav-icon" v-html="item.icon" />
        <span class="nav-label">{{ item.label }}</span>
      </a>
    </nav>

    <div class="sidebar__logout">
      <a href="#" class="logout-link">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M10 17l5-5-5-5" />
          <path d="M15 12H3" />
          <path d="M21 3v18" />
        </svg>
        <span>Đăng xuất</span>
      </a>
    </div>
  </aside>
</template>

<script setup lang="ts">
type MenuItem = {
  label: string;
  active?: boolean;
  icon: string;
};

const menuItems: MenuItem[] = [
  {
    label: 'Tổng quan',
    icon: '<svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 1116 0v6H4v-6z"/><path d="M8 18v-3a4 4 0 018 0v3"/><path d="M12 8v4"/></svg>',
  },
  {
    label: 'Sản phẩm',
    active: true,
    icon: '<svg viewBox="0 0 24 24"><path d="M21 8.5l-9 5-9-5 9-5 9 5z"/><path d="M3 8.5v7l9 5 9-5v-7"/><path d="M12 13.5v7"/></svg>',
  },
  {
    label: 'Danh mục',
    icon: '<svg viewBox="0 0 24 24"><path d="M4 6a2 2 0 012-2h5l2 3h7a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"/></svg>',
  },
  {
    label: 'Nhập hàng',
    icon: '<svg viewBox="0 0 24 24"><path d="M6 20V4"/><path d="M6 20l-3-3"/><path d="M6 20l3-3"/><path d="M10 7h9"/><path d="M10 12h9"/><path d="M10 17h6"/></svg>',
  },
  {
    label: 'Bán hàng',
    icon: '<svg viewBox="0 0 24 24"><path d="M3 4h2l2 12h11l2-8H7"/><path d="M9 20a1 1 0 100-2 1 1 0 000 2z"/><path d="M18 20a1 1 0 100-2 1 1 0 000 2z"/></svg>',
  },
  {
    label: 'Khách hàng',
    icon: '<svg viewBox="0 0 24 24"><path d="M15 7a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M4 20a8 8 0 0116 0"/><path d="M18 8a2 2 0 100-4 2 2 0 000 4z"/></svg>',
  },
  {
    label: 'Thống kê',
    icon: '<svg viewBox="0 0 24 24"><path d="M5 20V10"/><path d="M12 20V4"/><path d="M19 20v-8"/></svg>',
  },
  {
    label: 'Báo cáo',
    icon: '<svg viewBox="0 0 24 24"><path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h6"/></svg>',
  },
  {
    label: 'Cài đặt',
    icon: '<svg viewBox="0 0 24 24"><path d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"/><path d="M19.4 15a1.8 1.8 0 00.36 1.98l.04.04a2.2 2.2 0 01-1.56 3.76 2.2 2.2 0 01-1.56-.64l-.04-.04a1.8 1.8 0 00-1.98-.36 1.8 1.8 0 00-1.09 1.65V21a2.2 2.2 0 01-4.4 0v-.01a1.8 1.8 0 00-1.09-1.65 1.8 1.8 0 00-1.98.36l-.04.04a2.2 2.2 0 01-3.12-3.12l.04-.04a1.8 1.8 0 00.36-1.98 1.8 1.8 0 00-1.65-1.09H3a2.2 2.2 0 010-4.4h.01a1.8 1.8 0 001.65-1.09 1.8 1.8 0 00-.36-1.98l-.04-.04A2.2 2.2 0 018.4 3.15l.04.04a1.8 1.8 0 001.98.36A1.8 1.8 0 0011.5 1.9V1a2.2 2.2 0 014.4 0v.01a1.8 1.8 0 001.09 1.65 1.8 1.8 0 001.98-.36l.04-.04a2.2 2.2 0 013.12 3.12l-.04.04a1.8 1.8 0 00-.36 1.98A1.8 1.8 0 0021 9.5h.01a2.2 2.2 0 010 4.4H21a1.8 1.8 0 00-1.6 1.1z"/></svg>',
  },
];
</script>

<style scoped>
.sidebar {
  width: 256px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(180deg, #23345a 0%, #1d2c4b 58%, #233556 100%);
  color: #d2d9e6;
  box-shadow: 10px 0 30px rgba(18, 30, 53, 0.16);
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

.brand-mark svg {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
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
  background: rgba(255, 255, 255, 0.06);
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
  fill: currentColor;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.nav-label {
  font-size: 16px;
  font-weight: 500;
}

.sidebar__logout {
  padding: 18px 20px 24px;
}

.logout-link {
  display: flex;
  align-items: center;
  gap: 14px;
  color: #d4dbea;
  text-decoration: none;
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.logout-link svg {
  width: 22px;
  height: 22px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
