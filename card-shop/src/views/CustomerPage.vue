<template>
  <div class="customer-page">
    <div class="page-header">
      <div class="header-copy">
        <p class="eyebrow">Khách hàng</p>
        <h2>Quản lý khách hàng</h2>
        <p class="header-note">Tìm kiếm và theo dõi khách hàng theo thời gian thực.</p>
      </div>

      <button class="btn-primary" @click="addCustomer">
        <Plus :size="18" :stroke-width="2.25" />
        Thêm khách hàng
      </button>
    </div>

    <div class="toolbar">
      <label class="search-field" for="customer-search">
        <Search :size="18" :stroke-width="2" class="field-icon" />
        <input
          id="customer-search"
          v-model.trim="searchQuery"
          type="text"
          placeholder="Tìm theo tên, số điện thoại, email hoặc nhóm..."
        />
      </label>

      <div class="toolbar-meta">
        <span>{{ filteredCustomers.length }} kết quả</span>
        <span>Gõ để lọc tự động</span>
      </div>
    </div>

    <div v-if="filteredCustomers.length" class="table-wrapper desktop-only">
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Ảnh</th>
            <th>Họ và tên</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Nhóm khách hàng</th>
            <th>Ngày tạo</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(customer, index) in filteredCustomers" :key="customer.id">
            <td>{{ index + 1 }}</td>

            <td>
              <img :src="customer.avatar" :alt="customer.name" class="avatar" />
            </td>

            <td>{{ customer.name }}</td>

            <td>{{ customer.phone }}</td>

            <td>{{ customer.email }}</td>

            <td>{{ customer.group }}</td>

            <td>{{ customer.createdAt }}</td>

            <td>
              <span class="status" :class="customer.active ? 'active' : 'inactive'">
                {{ customer.active ? 'Hoạt động' : 'Không hoạt động' }}
              </span>
            </td>

            <td>
              <div class="actions">
                <button class="icon-btn edit" @click="editCustomer(customer)">Sửa</button>
                <button class="icon-btn delete" @click="deleteCustomer(customer)">Xóa</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="filteredCustomers.length" class="mobile-list">
      <article v-for="(customer, index) in filteredCustomers" :key="customer.id" class="customer-card">
        <div class="customer-card__top">
          <div class="customer-card__identity">
            <img :src="customer.avatar" :alt="customer.name" class="avatar" />

            <div>
              <p class="customer-index">#{{ index + 1 }}</p>
              <h3>{{ customer.name }}</h3>
              <p class="customer-group">{{ customer.group }}</p>
            </div>
          </div>

          <span class="status" :class="customer.active ? 'active' : 'inactive'">
            {{ customer.active ? 'Hoạt động' : 'Không hoạt động' }}
          </span>
        </div>

        <div class="customer-card__meta">
          <div>
            <span>Số điện thoại</span>
            <strong>{{ customer.phone }}</strong>
          </div>
          <div>
            <span>Email</span>
            <strong>{{ customer.email }}</strong>
          </div>
          <div>
            <span>Ngày tạo</span>
            <strong>{{ customer.createdAt }}</strong>
          </div>
        </div>

        <div class="customer-card__actions">
          <button class="icon-btn edit" @click="editCustomer(customer)">Sửa</button>
          <button class="icon-btn delete" @click="deleteCustomer(customer)">Xóa</button>
        </div>
      </article>
    </div>

    <div v-else class="empty-state">
      <h3>Không tìm thấy khách hàng</h3>
      <p>Thử đổi từ khóa để xem kết quả khác nhé.</p>
    </div>

    <div class="table-footer">
      <span>Hiển thị {{ filteredCustomers.length }} khách hàng</span>

      <div class="pagination" aria-hidden="true">
        <button>&lt;</button>
        <button class="active">1</button>
        <button>&gt;</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Plus, Search } from 'lucide-vue-next';

type Customer = {
  id: number;
  avatar: string;
  name: string;
  phone: string;
  email: string;
  group: string;
  createdAt: string;
  active: boolean;
};

const searchQuery = ref('');

const customers = ref<Customer[]>([
  {
    id: 1,
    avatar: 'https://i.pravatar.cc/100?img=1',
    name: 'Nguyễn Văn A',
    phone: '0901234567',
    email: 'nguyenvana@gmail.com',
    group: 'Khách hàng thân thiết',
    createdAt: '20/05/2024',
    active: true,
  },
  {
    id: 2,
    avatar: 'https://i.pravatar.cc/100?img=5',
    name: 'Trần Thị B',
    phone: '0912345678',
    email: 'tranthib@gmail.com',
    group: 'Khách hàng mới',
    createdAt: '20/05/2024',
    active: true,
  },
  {
    id: 3,
    avatar: 'https://i.pravatar.cc/100?img=12',
    name: 'Lê Văn C',
    phone: '0923456789',
    email: 'levanc@gmail.com',
    group: 'Khách hàng thân thiết',
    createdAt: '21/05/2024',
    active: true,
  },
  {
    id: 4,
    avatar: 'https://i.pravatar.cc/100?img=15',
    name: 'Phạm Thị D',
    phone: '0934567890',
    email: 'phamthid@gmail.com',
    group: 'Khách hàng mới',
    createdAt: '21/05/2024',
    active: true,
  },
  {
    id: 5,
    avatar: 'https://i.pravatar.cc/100?img=20',
    name: 'Hoàng Văn E',
    phone: '0945678901',
    email: 'hoangvane@gmail.com',
    group: 'Khách hàng thường',
    createdAt: '22/05/2024',
    active: false,
  },
]);

const normalizeText = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const filteredCustomers = computed(() => {
  const keyword = normalizeText(searchQuery.value.trim());

  if (!keyword) {
    return customers.value;
  }

  return customers.value.filter((customer) =>
    [customer.name, customer.phone, customer.email, customer.group]
      .some((field) => normalizeText(field).includes(keyword)),
  );
});

const addCustomer = () => {
  console.log('Add');
};

const editCustomer = (customer: Customer) => {
  console.log(customer);
};

const deleteCustomer = (customer: Customer) => {
  console.log(customer);
};
</script>

<style scoped>
.customer-page {
  background:
    radial-gradient(circle at top left, rgba(37, 99, 235, 0.08), transparent 28%),
    linear-gradient(180deg, #ffffff 0%, #f7f9fc 100%);
  padding: 24px;
  border-radius: 20px;
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.08);
  color: #172033;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 20px;
}

.header-copy {
  text-align: left;
}

.eyebrow {
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #2563eb;
}

.page-header h2 {
  font-size: clamp(26px, 3vw, 34px);
  font-weight: 800;
  margin: 0;
}

.header-note {
  margin-top: 8px;
  color: #64748b;
}

.btn-primary {
  border: none;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: #ffffff;
  padding: 12px 18px;
  border-radius: 14px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 12px 24px rgba(37, 99, 235, 0.24);
}

.toolbar {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 14px;
  align-items: center;
  margin-bottom: 20px;
}

.search-field {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 0 16px;
  height: 52px;
  border: 1px solid #dbe3ef;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
}

.field-icon {
  color: #64748b;
  flex: 0 0 auto;
}

.search-field input {
  width: 100%;
  min-width: 0;
  border: 0;
  outline: none;
  background: transparent;
  font-size: 15px;
  color: #172033;
}

.search-field input::placeholder {
  color: #94a3b8;
}

.toolbar-meta {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 13px;
  color: #64748b;
  white-space: nowrap;
}

.table-wrapper {
  border: 1px solid #e6edf6;
  border-radius: 18px;
  overflow: hidden;
  background: #fff;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #f8fafc;
}

th,
td {
  padding: 16px 18px;
  text-align: left;
  border-bottom: 1px solid #eef2f7;
  vertical-align: middle;
}

th {
  font-size: 13px;
  font-weight: 700;
  color: #475569;
  letter-spacing: 0.01em;
}

td {
  font-size: 14px;
  color: #172033;
}

.avatar {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fff;
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.1);
}

.status {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
}

.active {
  background: #dcfce7;
  color: #16a34a;
}

.inactive {
  background: #fee2e2;
  color: #dc2626;
}

.actions {
  display: flex;
  gap: 10px;
}

.icon-btn {
  min-width: 70px;
  height: 36px;
  border: 1px solid #dbe3ef;
  border-radius: 10px;
  background: #ffffff;
  cursor: pointer;
  font-weight: 700;
  color: #334155;
}

.icon-btn.edit {
  background: #eff6ff;
  border-color: #bfdbfe;
  color: #1d4ed8;
}

.icon-btn.delete {
  background: #fff1f2;
  border-color: #fecdd3;
  color: #e11d48;
}

.mobile-list {
  display: none;
  gap: 14px;
}

.customer-card {
  background: #ffffff;
  border: 1px solid #e6edf6;
  border-radius: 18px;
  padding: 16px;
  box-shadow: 0 10px 22px rgba(15, 23, 42, 0.05);
}

.customer-card__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 14px;
}

.customer-card__identity {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.customer-card__identity h3 {
  margin: 2px 0 4px;
  font-size: 18px;
}

.customer-index {
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  color: #2563eb;
}

.customer-group {
  margin: 0;
  color: #64748b;
  font-size: 13px;
}

.customer-card__meta {
  display: grid;
  gap: 12px;
}

.customer-card__meta div {
  display: grid;
  gap: 3px;
}

.customer-card__meta span {
  font-size: 12px;
  color: #64748b;
}

.customer-card__meta strong {
  font-size: 14px;
  font-weight: 700;
  color: #172033;
  word-break: break-word;
}

.customer-card__actions {
  display: flex;
  gap: 10px;
  margin-top: 16px;
}

.empty-state {
  display: grid;
  gap: 6px;
  place-items: center;
  text-align: center;
  padding: 40px 16px;
  border: 1px dashed #cbd5e1;
  border-radius: 18px;
  color: #64748b;
  background: rgba(255, 255, 255, 0.7);
}

.empty-state h3 {
  margin: 0;
  color: #172033;
}

.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 2px 0;
  color: #64748b;
  font-size: 14px;
}

.pagination {
  display: flex;
  gap: 8px;
}

.pagination button {
  width: 36px;
  height: 36px;
  border: 1px solid #dbe3ef;
  background: #ffffff;
  border-radius: 10px;
  color: #334155;
}

.pagination .active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}

@media (max-width: 768px) {
  .customer-page {
    padding: 16px;
    border-radius: 18px;
  }

  .page-header {
    flex-direction: column;
    align-items: stretch;
  }

  .btn-primary {
    width: 100%;
    justify-content: center;
  }

  .toolbar {
    grid-template-columns: 1fr;
  }

  .toolbar-meta {
    justify-content: flex-start;
    flex-wrap: wrap;
    white-space: normal;
  }

  .desktop-only {
    display: none;
  }

  .mobile-list {
    display: grid;
  }

  .table-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding-top: 16px;
  }
}

@media (min-width: 769px) {
  .mobile-list {
    display: none;
  }
}
</style>
