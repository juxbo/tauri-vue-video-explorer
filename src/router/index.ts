import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/components/Home.vue";
import VideoList from "@/components/VideoList.vue";
import VideoPlayer from "@/components/VideoPlayer.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dirs/" + encodeURI("E:\\Musik"),
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
