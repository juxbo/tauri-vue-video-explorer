<template>
  <div>
    <h1>{{ filepath }}</h1>
    <div v-if="load"><p>Loading</p></div>
    <div v-else>
      <div>
        <video controls :src="urltest" />
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

    return { load, urltest, filepath };
  },
};
</script>
