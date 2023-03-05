<template>
  <div>
    <p class="text-lg font-bold">{{ filepath }}</p>
    <div v-if="load"><p>Loading</p></div>
    <div v-else>
      <div class="p-2 mt-2 mb-2 flex place-content-center">
        <video v-if="'video' === getType()" controls :src="convertedSrc" />
        <audio v-else-if="'audio' === getType()" controls :src="convertedSrc" />
        <img v-else-if="'img' === getType()" controls :src="convertedSrc" />
        <p v-else-if="'text' === getType()">{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import { fs, tauri } from "@tauri-apps/api";
import { useRoute } from "vue-router";

export default {
  name: "VideoList",
  props: {
    path: String,
  },
  setup(props: any) {
    const load = ref(true);
    const urltest = ref();
    const filepath = ref(props.path);
    const text = ref("");

    const convertedSrc = ref("");

    const route = useRoute();
    const routePath = route.params.file;
    if (routePath) {
      filepath.value = routePath;
    }

    const getType = () => {
      const extension = filepath.value.split(".").pop().toLowerCase();
      switch (extension) {
        case "mp3":
          return "audio";
        case "png":
        case "jpg":
        case "jpeg":
          return "img";
        case "mp4":
        case "wmv":
        case "mkv":
        case "webm":
        case "ts":
          return "video";
        default:
          return "text";
      }
    };

    const readText = () => {
      const test = fs.readTextFile(filepath.value);
      test
        .then((val) => {
          text.value = val;
          load.value = false;
        })
        .catch((err) => {
          alert(err);
        });
    };

    // Convert file path to local src url and let webview handle streaming
    const readBinary = () => {
      convertedSrc.value = tauri.convertFileSrc(filepath.value);
      load.value = false;
    };

    const fetchData = () => {
      getType() === "text" ? readText() : readBinary();
      return;
    };

    onMounted(() => {
      fetchData();
    });

    return { load, urltest, filepath, getType, text, convertedSrc };
  },
};
</script>
