<template>
  <div>
    <h1>{{ path }}</h1>
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

export default {
  name: "VideoList",
  props: {
    path: String,
  },
  setup(props: any) {
    const load = ref(true);
    const urltest = ref();

    const fetchData = () => {
      const test = fs.readBinaryFile(props.path);
      test
        .then((x) => {
          console.log(x);
          console.log(Uint8Array.from(x));
          const blobo = new Blob([Uint8Array.from(x)], {
            type: "octet/stream",
          });
          console.log(blobo);
          const url = URL.createObjectURL(blobo);
          console.log(url);
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

    return { load, urltest };
  },
};
</script>
