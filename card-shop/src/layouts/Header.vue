<template>
  <header class="header-bar">
    <button class="icon-button" type="button" aria-label="Toggle sidebar" @click="emit('toggle-sidebar')">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <div class="header-actions">
      <button class="notification-button" type="button" aria-label="Notifications">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span class="badge">{{ notificationCount }}</span>
      </button>

      <button class="profile-button" type="button" aria-label="User menu">
        <span class="avatar" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M12 12.75a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" />
            <path d="M4.5 20.25a7.5 7.5 0 0115 0" />
          </svg>
        </span>
        <span class="user-name">{{ userName }}</span>
        <svg class="chevron" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    userName?: string;
    notificationCount?: number;
  }>(),
  {
    userName: 'Nguyễn Văn A',
    notificationCount: 3,
  },
);

const emit = defineEmits<{
  (event: 'toggle-sidebar'): void;
}>();
</script>

<style scoped>
.header-bar {
  height: 76px;
  padding: 0 28px;
  background: rgba(255, 255, 255, 0.96);
  border-bottom: 1px solid #dfe5ef;
  display: flex;
  align-items: center;
  justify-content: space-between;
  backdrop-filter: blur(10px);
}

.icon-button,
.notification-button,
.profile-button {
  border: 0;
  background: transparent;
  cursor: pointer;
}

.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  color: #18253a;
}

.icon-button svg,
.notification-button svg,
.chevron {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.9;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 18px;
}

.nav-link {
  min-height: 40px;
  padding: 0 14px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #eef3fb;
  color: #18253a;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: background 0.18s ease, color 0.18s ease, transform 0.18s ease;
}

.nav-link:hover {
  background: #dfe8f6;
  transform: translateY(-1px);
}

.notification-button {
  position: relative;
  width: 44px;
  height: 44px;
  color: #25354f;
}

.badge {
  position: absolute;
  top: 5px;
  right: 2px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: 999px;
  background: #ef4d37;
  color: #fff;
  font-size: 11px;
  line-height: 18px;
  font-weight: 700;
}

.profile-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #18253a;
  font-size: 15px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: linear-gradient(180deg, #eef1f6 0%, #d9dee8 100%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #8a94a6;
}

.avatar svg {
  width: 24px;
  height: 24px;
  fill: currentColor;
  stroke: none;
}

.user-name {
  font-weight: 500;
}

.chevron {
  width: 18px;
  height: 18px;
  color: #243248;
}
</style>
