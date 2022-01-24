import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import VideoList from "@/views/VideoList.vue";
import VideoPlayer from "@/views/VideoPlayer.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/dirs/:path",
    name: "Dir",
    component: VideoList,
  },
  {
    path: "/files/:file",
    name: "File",
    component: VideoPlayer,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
