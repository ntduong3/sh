<template>
  <section class="dashboard">
    <div class="dashboard__header">
      <div class="dashboard__headline">
        <h1>Quản lý sản phẩm</h1>
      </div>

      <div class="header-actions">
        <button type="button" class="secondary-button" @click="refreshProducts">
          <RefreshCw :size="18" :stroke-width="2.25" />
          <span>Tải lại</span>
        </button>

        <button type="button" class="add-button" @click="openCreateModal">
          <Plus :size="18" :stroke-width="2.25" />
          <span>Thêm sản phẩm</span>
        </button>
      </div>
    </div>

    <div class="dashboard__card">
      <div class="dashboard__toolbar">
        <label class="search-field" for="product-search">
          <Search :size="18" :stroke-width="2" class="field-icon" />
          <input
            id="product-search"
            v-model.trim="searchQuery"
            type="text"
            placeholder="Tìm theo tên, mô tả hoặc giá..."
          />
        </label>

        <div class="toolbar-meta">
          <span>{{ filteredProducts.length }} sản phẩm</span>
          <span v-if="isLoading">Đang tải</span>
          <span v-else>Đã nạp từ Supabase</span>
        </div>
      </div>

      <div v-if="isLoading" class="state-card">
        <div class="state-card__spinner" aria-hidden="true"></div>
        <h2>Đang tải sản phẩm</h2>
        <p>Vui lòng chờ một chút trong lúc lấy dữ liệu từ Supabase.</p>
      </div>

      <div v-else-if="errorMessage" class="state-card state-card--error">
        <h2>Không tải được dữ liệu</h2>
        <p>{{ errorMessage }}</p>
        <button type="button" class="retry-button" @click="refreshProducts">Thử lại</button>
      </div>

      <template v-else>
        <div v-if="filteredProducts.length" class="table-shell desktop-only">
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Mô tả</th>
                <th>Giá</th>
                <th>Ngày tạo</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in filteredProducts" :key="product.id">
                <td>{{ index + 1 }}</td>
                <td>
                  <div class="thumb">
                    <img v-if="product.image" :src="product.image" :alt="product.name" />
                    <span v-else>Không có ảnh</span>
                  </div>
                </td>
                <td>
                  <div class="name">{{ product.name }}</div>
                </td>
                <td class="description">{{ product.description || '---' }}</td>
                <td>{{ formatCurrency(product.price) }}</td>
                <td>{{ formatDate(product.created_at) }}</td>
                <td>
                  <div class="row-actions">
                    <button type="button" class="action-button action-button--edit" @click="openEditModal(product)">
                      <PencilLine :size="16" :stroke-width="2" />
                      Sửa
                    </button>
                    <button type="button" class="action-button action-button--delete" @click="confirmDelete(product)">
                      <Trash2 :size="16" :stroke-width="2" />
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="filteredProducts.length" class="mobile-list">
          <article v-for="product in filteredProducts" :key="product.id" class="product-card">
            <div class="product-card__top">
              <div class="thumb thumb--mobile">
                <img v-if="product.image" :src="product.image" :alt="product.name" />
                <span v-else>Không có ảnh</span>
              </div>

              <div class="product-card__summary">
                <p class="product-card__eyebrow">#{{ product.id }}</p>
                <h3>{{ product.name }}</h3>
                <p class="product-card__price">{{ formatCurrency(product.price) }}</p>
              </div>
            </div>

            <p class="product-card__description">
              {{ product.description || 'Chưa có mô tả cho sản phẩm này.' }}
            </p>

            <div class="product-card__meta">
              <span>{{ formatDate(product.created_at) }}</span>
            </div>

            <div class="mobile-actions">
              <button type="button" class="action-button action-button--edit" @click="openEditModal(product)">
                <PencilLine :size="16" :stroke-width="2" />
                Sửa
              </button>
              <button type="button" class="action-button action-button--delete" @click="confirmDelete(product)">
                <Trash2 :size="16" :stroke-width="2" />
                Xóa
              </button>
            </div>
          </article>
        </div>

        <div v-else class="empty-state">
          <h2>Không tìm thấy sản phẩm phù hợp</h2>
          <p>Thử đổi từ khóa tìm kiếm hoặc tải lại dữ liệu.</p>
        </div>
      </template>
    </div>

    <Transition name="fade">
      <div v-if="isModalOpen" class="modal-backdrop" @click.self="closeModal">
        <div class="modal" role="dialog" aria-modal="true" :aria-labelledby="modalTitleId">
          <div class="modal__header">
            <div>
              <p class="modal__eyebrow">{{ isEditing ? 'Cập nhật sản phẩm' : 'Sản phẩm mới' }}</p>
              <h2 :id="modalTitleId">{{ isEditing ? 'Sửa sản phẩm' : 'Thêm sản phẩm' }}</h2>
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
                <span>Giá</span>
                <input v-model.number="form.price" type="number" min="0" required placeholder="850000" />
              </label>

              <label class="full-width">
                <span>Mô tả</span>
                <textarea v-model.trim="form.description" rows="4" placeholder="Mô tả ngắn về sản phẩm"></textarea>
              </label>

              <label class="full-width">
                <span>Link ảnh</span>
                <input v-model.trim="form.image" type="url" placeholder="https://..." />
              </label>
            </div>

            <div class="modal__actions">
              <button type="button" class="secondary-button" @click="closeModal">Hủy</button>
              <button type="submit" class="primary-button" :disabled="isSaving">
                <Save :size="18" :stroke-width="2.2" />
                <span>{{ isSaving ? 'Đang lưu...' : 'Lưu sản phẩm' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import {
  PencilLine,
  Plus,
  RefreshCw,
  Save,
  Search,
  Trash2,
  X,
} from 'lucide-vue-next';
import productApi from '../supabase/product.api';
import type { Product } from '../models/Product';

type ProductForm = {
  name: string;
  description: string;
  price: number | null;
  image: string;
};

const searchQuery = ref('');
const products = ref<Product[]>([]);
const isLoading = ref(true);
const isSaving = ref(false);
const errorMessage = ref('');
const isModalOpen = ref(false);
const editingProductId = ref<number | null>(null);
const editingCreatedAt = ref('');
const modalTitleId = 'product-modal-title';
const isEditing = computed(() => editingProductId.value !== null);

const emptyForm = (): ProductForm => ({
  name: '',
  description: '',
  price: null,
  image: '',
});

const form = reactive<ProductForm>(emptyForm());

const normalizeText = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);

const formatDate = (value: string) => {
  if (!value) {
    return '--';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

const filteredProducts = computed(() => {
  const keyword = normalizeText(searchQuery.value.trim());

  if (!keyword) {
    return products.value;
  }

  return products.value.filter((product) =>
    [product.name, product.description, String(product.price)]
      .some((field) => normalizeText(field ?? '').includes(keyword)),
  );
});

const resetForm = () => {
  Object.assign(form, emptyForm());
  editingProductId.value = null;
  editingCreatedAt.value = '';
};

const openCreateModal = () => {
  resetForm();
  isModalOpen.value = true;
};

const openEditModal = (product: Product) => {
  editingProductId.value = product.id;
  editingCreatedAt.value = product.created_at;
  form.name = product.name ?? '';
  form.description = product.description ?? '';
  form.price = product.price ?? null;
  form.image = product.image ?? '';
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  resetForm();
};

const loadProducts = async () => {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    products.value = await productApi.findAll();
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Không thể tải danh sách sản phẩm.';
  } finally {
    isLoading.value = false;
  }
};

const refreshProducts = () => {
  void loadProducts();
};

const submitProduct = async () => {
  if (!form.name.trim() || form.price === null) {
    errorMessage.value = 'Vui lòng nhập tên và giá sản phẩm.';
    return;
  }

  isSaving.value = true;
  errorMessage.value = '';

  try {
    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      image: form.image.trim(),
    };

    if (editingProductId.value === null) {
      await productApi.insert(payload);
    } else {
      await productApi.update({
        id: editingProductId.value,
        created_at: editingCreatedAt.value,
        ...payload,
      });
    }

    closeModal();
    await loadProducts();
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Không thể lưu sản phẩm.';
  } finally {
    isSaving.value = false;
  }
};

const confirmDelete = async (product: Product) => {
  const confirmed = window.confirm(`Xóa sản phẩm "${product.name}"?`);

  if (!confirmed) {
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';

  try {
    await productApi.delete(product.id);
    await loadProducts();
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Không thể xóa sản phẩm.';
    isLoading.value = false;
  }
};

onMounted(() => {
  void loadProducts();
});
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

.dashboard__headline {
  text-align: left;
}

.eyebrow {
  margin: 0 0 6px;
  color: #2563eb;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  font-size: 34px;
  line-height: 1.15;
  color: #17233a;
  font-weight: 800;
}

.headline-note {
  margin-top: 8px;
  color: #667085;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.add-button,
.secondary-button {
  height: 44px;
  padding: 0 18px;
  border: 0;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(39, 103, 214, 0.2);
}

.add-button {
  background: linear-gradient(180deg, #3e80ef 0%, #2767d6 100%);
  color: #fff;
}

.secondary-button {
  background: #eef3fb;
  color: #24324a;
  box-shadow: none;
}

.dashboard__card {
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid #dde4ef;
  border-radius: 16px;
  overflow: hidden;
}

.dashboard__toolbar {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 22px;
  border-bottom: 1px solid #e4eaf2;
  align-items: center;
}

.search-field {
  width: 100%;
  max-width: 520px;
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
textarea {
  width: 100%;
  border: 1px solid #d8dfeb;
  border-radius: 10px;
  padding: 0 14px 0 42px;
  font: inherit;
  color: #23324a;
  background: #fff;
  outline: none;
}

input {
  height: 44px;
}

textarea {
  min-height: 112px;
  padding: 12px 14px;
  resize: vertical;
}

input:focus,
textarea:focus {
  border-color: #3e80ef;
  box-shadow: 0 0 0 4px rgba(62, 128, 239, 0.12);
}

.toolbar-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: #667085;
  white-space: nowrap;
}

.table-shell {
  overflow: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 980px;
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
  font-size: 14px;
}

td {
  color: #1f2937;
}

.thumb {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: linear-gradient(180deg, #eef1f7 0%, #dfe5ef 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: #64748b;
  font-size: 12px;
  text-align: center;
  padding: 6px;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumb--mobile {
  width: 72px;
  height: 72px;
  flex: 0 0 auto;
}

.name {
  font-weight: 700;
}

.description {
  color: #667085;
  max-width: 360px;
}

.row-actions,
.mobile-actions {
  display: flex;
  gap: 10px;
}

.action-button {
  height: 36px;
  padding: 0 12px;
  border: 1px solid transparent;
  border-radius: 10px;
  background: #fff;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  cursor: pointer;
}

.action-button--edit {
  background: #eff6ff;
  border-color: #bfdbfe;
  color: #1d4ed8;
}

.action-button--delete {
  background: #fff1f2;
  border-color: #fecdd3;
  color: #e11d48;
}

.empty-state,
.state-card {
  display: grid;
  place-items: center;
  gap: 8px;
  text-align: center;
  padding: 34px 18px;
  color: #667085;
}

.state-card h2,
.empty-state h2 {
  margin: 0;
  color: #17233a;
  font-size: 20px;
}

.state-card--error {
  color: #b42318;
}

.state-card--error h2 {
  color: #7a271a;
}

.state-card__spinner {
  width: 36px;
  height: 36px;
  border: 3px solid #dbe4f2;
  border-top-color: #3e80ef;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.retry-button {
  height: 40px;
  padding: 0 16px;
  border: 0;
  border-radius: 10px;
  background: #3e80ef;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}

.mobile-list {
  display: none;
  gap: 14px;
  padding: 16px;
}

.product-card {
  background: #fff;
  border: 1px solid #e4eaf2;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05);
}

.product-card__top {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.product-card__summary {
  min-width: 0;
}

.product-card__eyebrow {
  margin: 0 0 4px;
  color: #667085;
  font-size: 12px;
  font-weight: 700;
}

.product-card__summary h3 {
  margin: 0;
  font-size: 18px;
  color: #17233a;
}

.product-card__price {
  margin: 8px 0 0;
  font-weight: 800;
  color: #2563eb;
}

.product-card__description {
  margin: 14px 0 0;
  color: #667085;
  line-height: 1.5;
}

.product-card__meta {
  margin-top: 14px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: #667085;
  font-size: 13px;
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

.full-width {
  grid-column: 1 / -1;
}

.modal__actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

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
  font-weight: 700;
  background: linear-gradient(180deg, #3e80ef 0%, #2767d6 100%);
  color: #ffffff;
}

.primary-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
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
  .header-actions,
  .modal__actions {
    flex-direction: column;
    align-items: stretch;
  }

  .add-button,
  .secondary-button,
  .primary-button {
    width: 100%;
    justify-content: center;
  }

  .dashboard__toolbar {
    padding: 16px;
  }

  .toolbar-meta {
    white-space: normal;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .search-field {
    max-width: none;
  }

  .desktop-only {
    display: none;
  }

  .mobile-list {
    display: grid;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .modal {
    padding: 18px;
  }
}
</style>
