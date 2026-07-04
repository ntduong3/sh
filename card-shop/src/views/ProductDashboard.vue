<template>
  <section class="dashboard">
    <div class="dashboard__header">
      <div>
        <h1>Quản lý sản phẩm</h1>
      </div>
      <button type="button" class="add-button" @click="openModal">
        <Plus :size="18" :stroke-width="2.25" />
        <span>Thêm sản phẩm</span>
      </button>
    </div>

    <div class="dashboard__card">
      <div class="dashboard__toolbar">
        <label class="search-field" for="product-search">
          <Search :size="18" :stroke-width="2" class="field-icon" />
          <input
            id="product-search"
            v-model="searchQuery"
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
          />
        </label>

        <select v-model="selectedCategory" aria-label="Lọc theo danh mục">
          <option value="">Tất cả danh mục</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
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
            <tr v-if="filteredItems.length === 0">
              <td class="empty-state" colspan="6">
                Không tìm thấy sản phẩm phù hợp.
              </td>
            </tr>
            <tr v-for="(item, index) in filteredItems" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td><div class="thumb" :aria-label="item.name"></div></td>
              <td>
                <div class="name">{{ item.name }}</div>
                <div class="sub">{{ item.sub }}</div>
              </td>
              <td>{{ formatCurrency(item.price) }}</td>
              <td>{{ item.date }}</td>
              <td>{{ item.author }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Transition name="fade">
      <div
        v-if="isModalOpen"
        class="modal-backdrop"
        @click.self="closeModal"
      >
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title">
          <div class="modal__header">
            <div>
              <p class="modal__eyebrow">Sản phẩm mới</p>
              <h2 id="product-modal-title">Thêm sản phẩm</h2>
            </div>
            <button type="button" class="icon-button" @click="closeModal" aria-label="Đóng form">
              <X :size="20" :stroke-width="2.2" />
            </button>
          </div>

          <form class="modal__form" @submit.prevent="submitProduct">
            <div class="form-grid">
              <label>
                <span>Tên sản phẩm</span>
                <input v-model.trim="form.name" type="text" required placeholder="Nhập tên sản phẩm" />
              </label>
              <label>
                <span>Tên phụ</span>
                <input v-model.trim="form.sub" type="text" required placeholder="Ví dụ: Adidas Runfalcon 3.0" />
              </label>
              <label>
                <span>Danh mục</span>
                <input v-model.trim="form.category" type="text" required placeholder="Ví dụ: Giày dép" />
              </label>
              <label>
                <span>Giá nhập</span>
                <input v-model.number="form.price" type="number" min="0" required placeholder="850000" />
              </label>
              <label>
                <span>Ngày nhập</span>
                <input v-model="form.date" type="text" required placeholder="dd/mm/yyyy" />
              </label>
              <label>
                <span>Người nhập</span>
                <input v-model.trim="form.author" type="text" required placeholder="Nhập tên người nhập" />
              </label>
            </div>

            <div class="modal__actions">
              <button type="button" class="secondary-button" @click="closeModal">Hủy</button>
              <button type="submit" class="primary-button">
                <Save :size="18" :stroke-width="2.2" />
                <span>Lưu sản phẩm</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { Plus, Save, Search, X } from 'lucide-vue-next';

type ProductItem = {
  id: number;
  name: string;
  sub: string;
  price: number;
  date: string;
  author: string;
  category: string;
};

const today = () => new Date().toLocaleDateString('vi-VN');

const initialItems = ref<ProductItem[]>([
  {
    id: 1,
    name: 'Giày Thể Thao Nam',
    sub: 'Adidas Runfalcon 3.0',
    price: 850000,
    date: '20/05/2024',
    author: 'Nguyễn Văn A',
    category: 'Giày dép',
  },
  {
    id: 2,
    name: 'Áo Thun Nam',
    sub: 'Cotton 100%',
    price: 120000,
    date: '20/05/2024',
    author: 'Trần Thị B',
    category: 'Áo',
  },
  {
    id: 3,
    name: 'Balo Laptop Nam',
    sub: 'Đa năng',
    price: 320000,
    date: '21/05/2024',
    author: 'Lê Văn C',
    category: 'Túi xách',
  },
]);

const searchQuery = ref('');
const selectedCategory = ref('');
const isModalOpen = ref(false);

const form = reactive({
  name: '',
  sub: '',
  category: '',
  price: 0,
  date: today(),
  author: '',
});

const categories = computed(() => {
  return Array.from(new Set(initialItems.value.map((item) => item.category))).sort();
});

const filteredItems = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  return initialItems.value.filter((item) => {
    const matchesCategory = !selectedCategory.value || item.category === selectedCategory.value;
    const matchesQuery =
      !query ||
      [item.name, item.sub, item.author, item.category]
        .join(' ')
        .toLowerCase()
        .includes(query);

    return matchesCategory && matchesQuery;
  });
});

const formatCurrency = (value: number) => new Intl.NumberFormat('vi-VN').format(value);

const resetForm = () => {
  form.name = '';
  form.sub = '';
  form.category = '';
  form.price = 0;
  form.date = today();
  form.author = '';
};

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const submitProduct = () => {
  const nextId = Math.max(0, ...initialItems.value.map((item) => item.id)) + 1;

  initialItems.value.unshift({
    id: nextId,
    name: form.name,
    sub: form.sub,
    price: form.price,
    date: form.date,
    author: form.author,
    category: form.category,
  });

  selectedCategory.value = form.category;
  searchQuery.value = form.name;
  closeModal();
  resetForm();
};
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
  gap: 16px;
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
  box-shadow: 0 10px 20px rgba(39, 103, 214, 0.2);
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

.search-field {
  width: 100%;
  max-width: 450px;
  position: relative;
  display: flex;
  align-items: center;
}

.field-icon {
  position: absolute;
  left: 14px;
  color: #73819b;
  pointer-events: none;
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
  width: 100%;
}

.search-field input {
  padding-left: 42px;
}

select {
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

.empty-state {
  text-align: center;
  color: #6b7280;
  padding: 28px 16px;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal {
  width: min(720px, 100%);
  background: #ffffff;
  border-radius: 18px;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.28);
  padding: 22px;
}

.modal__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;
}

.modal__eyebrow {
  margin: 0 0 6px;
  color: #3e80ef;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.modal__header h2 {
  margin: 0;
  font-size: 26px;
  color: #17233a;
}

.icon-button {
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 999px;
  background: #eef3fb;
  color: #24324a;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.modal__form {
  display: grid;
  gap: 20px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.form-grid label {
  display: grid;
  gap: 8px;
  color: #24324a;
  font-weight: 600;
  font-size: 14px;
}

.form-grid label span {
  padding-left: 2px;
}

.form-grid input {
  max-width: none;
}

.modal__actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.secondary-button,
.primary-button {
  height: 44px;
  border-radius: 10px;
  padding: 0 16px;
  border: 0;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font: inherit;
  font-weight: 600;
}

.secondary-button {
  background: #eef3fb;
  color: #24324a;
}

.primary-button {
  background: linear-gradient(180deg, #3e80ef 0%, #2767d6 100%);
  color: #ffffff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .dashboard {
    padding: 18px 14px 14px;
  }

  h1 {
    font-size: 28px;
  }

  .dashboard__header,
  .dashboard__toolbar,
  .modal__header,
  .modal__actions {
    flex-direction: column;
    align-items: stretch;
  }

  .dashboard__toolbar {
    padding: 16px;
  }

  .search-field,
  select {
    max-width: none;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .modal {
    padding: 18px;
  }
}
</style>
