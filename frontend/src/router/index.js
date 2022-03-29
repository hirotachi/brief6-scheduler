import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home";
import Booking from "@/views/Booking";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/booking", component: Booking },
  ],
});

export default router;
