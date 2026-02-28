import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Homepage from "../views/Homepage.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { guestOnly: true }, // Penanda: Hanya untuk tamu
  },
  {
    path: "/home",
    name: "Homepage",
    component: Homepage,
    meta: { requiresAuth: true }, // Penanda: Butuh login
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// C. Pasang Satpam (beforeEach)
router.beforeEach((to, from, next) => {
  // Ambil status login (contoh dari localStorage)
  const isAuthenticated = !!localStorage.getItem("user_token");

  // LOGIKA 1: Jika sudah login, dilarang masuk ke halaman Login lagi
  if (to.meta.guestOnly && isAuthenticated) {
    next({ name: "Homepage" });
  }

  // LOGIKA 2: Jika belum login, dilarang masuk ke halaman Beranda
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "Login" });
  }

  // LOGIKA 3: Jika aman, lanjutkan perjalanan
  next();
});

export default router;
