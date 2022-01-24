<template>
  <div>
    <p class="text-lg font-bold">{{ filepath }}</p>
    <div v-if="load"><p>Loading</p></div>
    <div v-else>
      <div class="p-2 mt-2 mb-2 flex place-content-center">
        <video v-if="'video' === getType()" controls :src="urltest" />
        <audio v-else-if="'audio' === getType()" controls :src="urltest" />
        <img v-else-if="'img' === getType()" controls :src="urltest" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import { fs } from "@tauri-apps/api";
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
        default:
          return "video";
      }
    };

    const fetchData = () => {
      const test = fs.readBinaryFile(filepath.value);
      test
        .then((x) => {
          const blobo = new Blob([Uint8Array.from(x)], {
            type: "octet/stream",
          });
          const url = URL.createObjectURL(blobo);
          urltest.value = url;
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

    return { load, urltest, filepath, getType };
  },
};
</script>
