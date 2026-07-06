<script setup lang="ts">
const phone = "0869377405";

const zalo = "https://zalo.me/0869377405";

const email = "nhocvipditimvo9x@gmail.com";

</script>

<template>

<div class="contact">

    <h1>Liên hệ Quản trị viên</h1>

    <p>Đường dẫn bạn truy cập không tồn tại.</p>

    <div class="card">

        <p>📞 {{ phone }}</p>

        <p>✉ {{ email }}</p>

        <a :href="zalo" target="_blank">
           Liên hệ Chat Zalo
        </a>

    </div>

</div>

</template>

<style scoped>

.contact{
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    height:100vh;
}

.card{
    margin-top:20px;
    padding:30px;
    border-radius:10px;
    box-shadow:0 0 10px #ddd;
}

</style>