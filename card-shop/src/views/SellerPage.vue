<template>
  <section class="dashboard">
    <div class="dashboard__header">
      <div>
        <h1>Quản lý Đonơ Hang</h1>
      </div>
      <button type="button" class="add-button">
        <span>+</span>
        <span>Thêm sản phẩm</span>
      </button>
    </div>

    <div class="dashboard__card">
      <div class="dashboard__toolbar">
        <input type="text" placeholder="Tìm kiếm sản phẩm..." />
        <select>
          <option>Tất cả danh mục</option>
        </select>
      </div>

      <div class="table-shell">
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Ảnh sản phẩm</th>
              <th>Tên sản phẩm</th>
              <th>Giá nhập vào (VNĐ)</th>
              <th>Ngày nhập</th>
              <th>Người nhập</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{ item.id }}</td>
              <td><div class="thumb"></div></td>
              <td>
                <div class="name">{{ item.name }}</div>
                <div class="sub">{{ item.sub }}</div>
              </td>
              <td>{{ item.price }}</td>
              <td>{{ item.date }}</td>
              <td>{{ item.author }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type ProductItem = {
  id: number;
  name: string;
  sub: string;
  price: string;
  date: string;
  author: string;
};

const items: ProductItem[] = [
  { id: 1, name: 'Giày Thể Thao Nam', sub: 'Adidas Runfalcon 3.0', price: '850.000', date: '20/05/2024', author: 'Nguyễn Văn A' },
  { id: 2, name: 'Áo Thun Nam', sub: 'Cotton 100%', price: '120.000', date: '20/05/2024', author: 'Trần Thị B' },
  { id: 3, name: 'Balo Laptop Nam', sub: 'Đa năng', price: '320.000', date: '21/05/2024', author: 'Lê Văn C' },
];
</script>

<style scoped>
.dashboard {
  padding: 22px 18px 18px;
}

.dashboard__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

h1 {
  margin: 0;
  font-size: 34px;
  line-height: 1.15;
  color: #17233a;
  font-weight: 800;
}

.add-button {
  height: 44px;
  padding: 0 18px;
  border: 0;
  border-radius: 8px;
  background: linear-gradient(180deg, #3e80ef 0%, #2767d6 100%);
  color: #fff;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  cursor: pointer;
}

.dashboard__card {
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid #dde4ef;
  border-radius: 10px;
  overflow: hidden;
}

.dashboard__toolbar {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 22px;
  border-bottom: 1px solid #e4eaf2;
}

input,
select {
  height: 42px;
  border: 1px solid #d8dfeb;
  border-radius: 8px;
  padding: 0 14px;
  font: inherit;
  color: #23324a;
  background: #fff;
}

input {
  width: 100%;
  max-width: 450px;
}

select {
  width: 100%;
  max-width: 260px;
}

.table-shell {
  overflow: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;
}

th,
td {
  padding: 18px 16px;
  border-bottom: 1px solid #e5ebf2;
  text-align: left;
  vertical-align: middle;
}

th {
  background: #f7f9fc;
  color: #1e2b42;
  font-size: 15px;
}

td {
  color: #1f2937;
}

.thumb {
  width: 48px;
  height: 56px;
  border-radius: 8px;
  background: linear-gradient(180deg, #eef1f7 0%, #dfe5ef 100%);
}

.name {
  font-weight: 500;
}

.sub {
  margin-top: 4px;
  color: #4b5563;
}
</style>
