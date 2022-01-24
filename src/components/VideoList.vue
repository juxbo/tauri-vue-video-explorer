<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-if="load"><p>Loading</p></div>
    <div v-else>
      <div v-for="f of files" :key="f">
        <p>{{ f.name }}</p>
        <button type="button" @click="newPath(f.path)">Test</button>
        <video-player v-if="!f.children" :path="f.path" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import { fs } from "@tauri-apps/api";
import { FileEntry } from "@tauri-apps/api/fs";
import VideoPlayer from "./VideoPlayer.vue";

export default {
  components: { VideoPlayer },
  name: "VideoList",
  props: {
    path: String,
  },
  setup(props: any) {
    const files = ref<FileEntry[]>([]);
    const load = ref(true);
    const urltest = ref();

    const newPath = (path: string) => {
      console.log(path);
    };

    const fetchData = () => {
      const res = fs.readDir(props.path);

      res
        .then((v) => {
          files.value = v;
          load.value = false;
        })
        .catch((err) => {
          alert(err);
        });

      return;
    };

    onMounted(() => {
      fetchData();
    });

    return { files, load, urltest, newPath };
  },
};
</script>
