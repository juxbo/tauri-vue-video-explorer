<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <div v-for="f of files" :key="f">
        <p>{{ f }}</p>
        <div><p>video</p></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import { fs } from "@tauri-apps/api";
export interface File {
  name: String;
}

export default {
  name: "VideoList",
  props: {
    msg: String,
  },
  setup() {
    const files = ref<File[]>([]);
    const load = ref(true);

    const fetchData = () => {
      const res = fs.readDir("E:/Musik");

      res
        .then((v) => {
          load.value = false;
          return v;
        })
        .catch((err) => {
          alert(err);
        });
      return [];
    };

    onMounted(() => {
      files.value = fetchData();
    });

    return { files };
  },
};
</script>
