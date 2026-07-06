<template>
  <div class="dashboard">

    <!-- Header -->
    <div class="dashboard-header">
      <div>
        <h1>Tổng quan</h1>
        <p>Chào mừng bạn trở lại!</p>
      </div>

      <div class="date-filter">
        <i class="fas fa-calendar"></i>
        <span>13/05/2024 - 20/05/2024</span>
        <i class="fas fa-chevron-down"></i>
      </div>
    </div>

    <!-- Statistics -->
    <div class="stats-grid">

      <div class="stat-card">
        <div class="icon blue">
          <i class="fas fa-wallet"></i>
        </div>

        <div class="content">
          <span>Doanh thu</span>

          <h2>
            35.250.000
            <small>VND</small>
          </h2>

          <p class="up">
            ↑ 12.5%
            <span>so với 7 ngày trước</span>
          </p>
        </div>
      </div>

      <div class="stat-card">
        <div class="icon green">
          <i class="fas fa-shopping-cart"></i>
        </div>

        <div class="content">
          <span>Đơn hàng</span>

          <h2>
            128
            <small>đơn</small>
          </h2>

          <p class="up">
            ↑ 8.1%
            <span>so với 7 ngày trước</span>
          </p>
        </div>
      </div>

      <div class="stat-card">
        <div class="icon orange">
          <i class="fas fa-box"></i>
        </div>

        <div class="content">
          <span>Sản phẩm</span>

          <h2>
            156
            <small>sản phẩm</small>
          </h2>

          <p class="up">
            ↑ 4.3%
            <span>so với 7 ngày trước</span>
          </p>
        </div>
      </div>

      <div class="stat-card">
        <div class="icon purple">
          <i class="fas fa-users"></i>
        </div>

        <div class="content">
          <span>Khách hàng</span>

          <h2>
            248
            <small>khách hàng</small>
          </h2>

          <p class="up">
            ↑ 7.4%
            <span>so với 7 ngày trước</span>
          </p>
        </div>
      </div>

      <div class="stat-card">
        <div class="icon pink">
          <i class="fas fa-file-invoice"></i>
        </div>

        <div class="content">
          <span>Lợi nhuận</span>

          <h2>
            12.540.000
            <small>VND</small>
          </h2>

          <p class="up">
            ↑ 15.3%
            <span>so với 7 ngày trước</span>
          </p>
        </div>
      </div>

    </div>

    <!-- Revenue + Order Status -->
    <div class="chart-grid">

      <!-- Revenue -->
      <div class="card revenue-card">

        <div class="card-header">
          <div>
            <h3>Doanh thu</h3>
            <p>Thống kê doanh thu 7 ngày gần nhất</p>
          </div>

          <select>
            <option>7 ngày qua</option>
            <option>30 ngày</option>
            <option>90 ngày</option>
          </select>
        </div>

        <div class="chart-placeholder">

          <div
            v-for="(item,index) in revenueData"
            :key="index"
            class="bar-item"
          >

            <div class="bar-wrapper">

              <div
                class="bar"
                :style="{height:item.value+'%'}"
              ></div>

            </div>

            <span>{{ item.day }}</span>

          </div>

        </div>

      </div>

      <!-- Order Status -->
      <div class="card donut-card">

        <div class="card-header">
          <h3>Trạng thái đơn hàng</h3>
        </div>

        <div class="donut-container">

          <div class="donut">
            <div class="donut-center">
              <h2>128</h2>
              <span>Đơn hàng</span>
            </div>
          </div>

          <div class="legend">

            <div class="legend-item">
              <span class="dot completed"></span>
              <span>Hoàn thành</span>
              <strong>72</strong>
            </div>

            <div class="legend-item">
              <span class="dot processing"></span>
              <span>Đang xử lý</span>
              <strong>28</strong>
            </div>

            <div class="legend-item">
              <span class="dot pending"></span>
              <span>Chờ xác nhận</span>
              <strong>18</strong>
            </div>

            <div class="legend-item">
              <span class="dot cancel"></span>
              <span>Đã hủy</span>
              <strong>10</strong>
            </div>

          </div>

        </div>

      </div>

    </div>

    <!-- Bottom Tables -->

    <div class="bottom-grid">

      <!-- Top Products -->
      <div class="card">

        <div class="card-header">
          <h3>Sản phẩm bán chạy</h3>
        </div>

        <table class="simple-table">

          <thead>
            <tr>
              <th>#</th>
              <th>Tên sản phẩm</th>
              <th>Đã bán</th>
              <th>Doanh thu</th>
            </tr>
          </thead>

          <tbody>

            <tr
              v-for="(item,index) in topProducts"
              :key="index"
            >
              <td>{{ index+1 }}</td>

              <td class="product-name">
                <img :src="item.image">
                {{ item.name }}
              </td>

              <td>{{ item.sold }}</td>

              <td>{{ item.revenue }}</td>
            </tr>

          </tbody>

        </table>

      </div>

      <!-- New Customers -->
      <div class="card">

        <div class="card-header">
          <h3>Khách hàng mới</h3>
        </div>

        <div
          class="customer-item"
          v-for="customer in newCustomers"
          :key="customer.id"
        >

          <img
            :src="customer.avatar"
            class="avatar"
          >

          <div class="customer-info">
            <strong>{{ customer.name }}</strong>
            <span>{{ customer.email }}</span>
          </div>

          <small>{{ customer.date }}</small>

        </div>

      </div>
            <!-- Recent Orders -->
      <div class="card">

        <div class="card-header">
          <h3>Đơn hàng gần đây</h3>
        </div>

        <table class="simple-table">

          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Khách hàng</th>
              <th>Ngày</th>
              <th>Trạng thái</th>
              <th>Tổng tiền</th>
            </tr>
          </thead>

          <tbody>

            <tr
              v-for="order in recentOrders"
              :key="order.id"
            >
              <td>{{ order.code }}</td>

              <td>{{ order.customer }}</td>

              <td>{{ order.date }}</td>

              <td>
                <span
                  class="status"
                  :class="order.statusClass"
                >
                  {{ order.status }}
                </span>
              </td>

              <td>{{ order.total }}</td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";

const revenueData = ref([
  { day: "13/05", value: 45 },
  { day: "14/05", value: 60 },
  { day: "15/05", value: 55 },
  { day: "16/05", value: 72 },
  { day: "17/05", value: 90 },
  { day: "18/05", value: 65 },
  { day: "19/05", value: 82 },
  { day: "20/05", value: 100 },
]);

const topProducts = ref([
  {
    id: 1,
    name: "Laptop Dell Inspiron",
    sold: 32,
    revenue: "384.000.000đ",
    image: "https://picsum.photos/50?1",
  },
  {
    id: 2,
    name: "iPhone 15 Pro Max",
    sold: 28,
    revenue: "952.000.000đ",
    image: "https://picsum.photos/50?2",
  },
  {
    id: 3,
    name: "Tai nghe Sony WH1000XM5",
    sold: 25,
    revenue: "199.000.000đ",
    image: "https://picsum.photos/50?3",
  },
  {
    id: 4,
    name: "Chuột Logitech MX Master",
    sold: 22,
    revenue: "43.000.000đ",
    image: "https://picsum.photos/50?4",
  },
  {
    id: 5,
    name: "Màn hình LG UltraWide",
    sold: 18,
    revenue: "126.000.000đ",
    image: "https://picsum.photos/50?5",
  },
]);

const newCustomers = ref([
  {
    id: 1,
    avatar: "https://i.pravatar.cc/50?img=11",
    name: "Nguyễn Văn A",
    email: "vana@gmail.com",
    date: "20/05",
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/50?img=12",
    name: "Trần Thị B",
    email: "tranb@gmail.com",
    date: "20/05",
  },
  {
    id: 3,
    avatar: "https://i.pravatar.cc/50?img=13",
    name: "Lê Văn C",
    email: "lec@gmail.com",
    date: "19/05",
  },
  {
    id: 4,
    avatar: "https://i.pravatar.cc/50?img=14",
    name: "Phạm Thị D",
    email: "phamd@gmail.com",
    date: "18/05",
  },
  {
    id: 5,
    avatar: "https://i.pravatar.cc/50?img=15",
    name: "Hoàng Văn E",
    email: "hoange@gmail.com",
    date: "18/05",
  },
]);

const recentOrders = ref([
  {
    id: 1,
    code: "DH200524001",
    customer: "Nguyễn Văn A",
    date: "20/05/2024",
    status: "Hoàn thành",
    statusClass: "completed",
    total: "2.850.000đ",
  },
  {
    id: 2,
    code: "DH200524002",
    customer: "Trần Thị B",
    date: "20/05/2024",
    status: "Đang xử lý",
    statusClass: "processing",
    total: "1.450.000đ",
  },
  {
    id: 3,
    code: "DH200524003",
    customer: "Lê Văn C",
    date: "19/05/2024",
    status: "Chờ xác nhận",
    statusClass: "pending",
    total: "3.250.000đ",
  },
  {
    id: 4,
    code: "DH200524004",
    customer: "Hoàng Văn E",
    date: "19/05/2024",
    status: "Hoàn thành",
    statusClass: "completed",
    total: "5.620.000đ",
  },
  {
    id: 5,
    code: "DH200524005",
    customer: "Phạm Thị D",
    date: "18/05/2024",
    status: "Đã hủy",
    statusClass: "cancel",
    total: "980.000đ",
  },
]);
</script>

<style scoped>
*{
    box-sizing:border-box;
}

.dashboard{
    padding:24px;
    background:#f5f7fb;
    min-height:100vh;
}

/* Header */

.dashboard-header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:24px;
}

.dashboard-header h1{
    font-size:34px;
    font-weight:700;
    margin:0;
}

.dashboard-header p{
    color:#777;
    margin-top:6px;
}

.date-filter{
    display:flex;
    align-items:center;
    gap:10px;
    background:#fff;
    padding:12px 18px;
    border-radius:10px;
    border:1px solid #e6e6e6;
    cursor:pointer;
}

/* Statistics */

.stats-grid{
    display:grid;
    grid-template-columns:repeat(5,1fr);
    gap:18px;
    margin-bottom:25px;
}

.stat-card{
    background:#fff;
    border-radius:14px;
    padding:22px;
    display:flex;
    gap:18px;
    align-items:center;
    border:1px solid #ececec;
    transition:.25s;
}

.stat-card:hover{
    transform:translateY(-3px);
    box-shadow:0 8px 20px rgba(0,0,0,.08);
}

.icon{
    width:60px;
    height:60px;
    border-radius:50%;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:24px;
}

.blue{
    background:#e8f1ff;
    color:#2979ff;
}

.green{
    background:#e9f8ef;
    color:#23b35d;
}

.orange{
    background:#fff4e6;
    color:#ff9800;
}

.purple{
    background:#efe9ff;
    color:#7e57c2;
}

.pink{
    background:#ffe8ef;
    color:#e91e63;
}

.content span{
    color:#777;
    font-size:14px;
}

.content h2{
    margin:10px 0;
    font-size:26px;
}

.content small{
    font-size:13px;
    color:#888;
}

.up{
    color:#23b35d;
    font-size:14px;
    font-weight:600;
}

.up span{
    color:#888;
}

/* Charts */

.chart-grid{
    display:grid;
    grid-template-columns:2fr 1fr;
    gap:20px;
    margin-bottom:20px;
}

.card{
    background:#fff;
    border-radius:14px;
    border:1px solid #ececec;
    padding:20px;
}

.card-header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:20px;
}

.card-header h3{
    margin:0;
}

.card-header p{
    margin-top:5px;
    color:#888;
    font-size:13px;
}

.card-header select{
    padding:8px 12px;
    border-radius:8px;
    border:1px solid #ddd;
}

/* Revenue */

.chart-placeholder{
    height:320px;
    display:flex;
    justify-content:space-around;
    align-items:flex-end;
    padding-top:20px;
}

.bar-item{
    display:flex;
    flex-direction:column;
    align-items:center;
    width:50px;
}

.bar-wrapper{
    width:28px;
    height:240px;
    background:#edf2f7;
    border-radius:20px;
    display:flex;
    align-items:flex-end;
    overflow:hidden;
}

.bar{
    width:100%;
    background:linear-gradient(#5c9eff,#2f6fff);
    border-radius:20px;
    transition:.3s;
}

.bar:hover{
    opacity:.8;
}

.bar-item span{
    margin-top:10px;
    font-size:13px;
    color:#666;
}

/* Donut */

.donut-container{
    display:flex;
    flex-direction:column;
    align-items:center;
}

.donut{
    width:210px;
    height:210px;
    border-radius:50%;
    background:
    conic-gradient(
        #28c76f 0 56%,
        #3b82f6 56% 78%,
        #ff9f43 78% 92%,
        #ea5455 92% 100%
    );
    display:flex;
    justify-content:center;
    align-items:center;
    margin-bottom:25px;
}

.donut-center{
    width:135px;
    height:135px;
    background:#fff;
    border-radius:50%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
}

.donut-center h2{
    margin:0;
    font-size:34px;
}

.legend{
    width:100%;
}

.legend-item{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:14px;
    font-size:14px;
}

.dot{
    width:12px;
    height:12px;
    border-radius:50%;
    display:inline-block;
    margin-right:8px;
}

.completed{
    background:#28c76f;
}

.processing{
    background:#3b82f6;
}

.pending{
    background:#ff9f43;
}

.cancel{
    background:#ea5455;
}

/* Bottom */

.bottom-grid{
    display:grid;
    grid-template-columns:1.3fr 1fr 1.5fr;
    gap:20px;
}

.simple-table{
    width:100%;
    border-collapse:collapse;
}

.simple-table th{
    text-align:left;
    background:#f8fafc;
    padding:14px;
    font-size:14px;
}

.simple-table td{
    padding:14px;
    border-bottom:1px solid #eee;
}

.product-name{
    display:flex;
    align-items:center;
    gap:12px;
}

.product-name img{
    width:42px;
    height:42px;
    border-radius:8px;
}

/* Customer */

.customer-item{
    display:flex;
    align-items:center;
    gap:14px;
    padding:12px 0;
    border-bottom:1px solid #eee;
}

.customer-item:last-child{
    border-bottom:none;
}

.avatar{
    width:45px;
    height:45px;
    border-radius:50%;
}

.customer-info{
    flex:1;
}

.customer-info strong{
    display:block;
}

.customer-info span{
    color:#888;
    font-size:13px;
}

/* Status */

.status{
    padding:6px 12px;
    border-radius:20px;
    font-size:13px;
    font-weight:600;
}

.status.completed{
    color:#22c55e;
    background:#dcfce7;
}

.status.processing{
    color:#2563eb;
    background:#dbeafe;
}

.status.pending{
    color:#d97706;
    background:#fef3c7;
}

.status.cancel{
    color:#dc2626;
    background:#fee2e2;
}

/* Responsive */

@media(max-width:1400px){

.stats-grid{
grid-template-columns:repeat(3,1fr);
}

.chart-grid{
grid-template-columns:1fr;
}

.bottom-grid{
grid-template-columns:1fr;
}

}

@media(max-width:768px){

.stats-grid{
grid-template-columns:1fr;
}

.dashboard-header{
flex-direction:column;
align-items:flex-start;
gap:15px;
}

.chart-placeholder{
overflow:auto;
}

}
</style>