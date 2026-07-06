<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

onMounted(() => {
  console.log("Không tìm thấy:", route.fullPath);

  setTimeout(() => {
    // router.replace("/");
    router.replace("/contact-admin");
  }, 2000);
});
</script>

<template>
  <div class="not-found">
    <h1>404</h1>

    <h2>Không tìm thấy trang</h2>

    <p>{{ route.fullPath }}</p>

    <button @click="$router.push('/')">
      Quay về trang chủ
    </button>
  </div>
</template>