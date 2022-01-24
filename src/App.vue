<template>
  <video-list path="E:/Musik" />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import VideoList from "./components/VideoList.vue";

@Options({
  components: {
    VideoList,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
