<template>
  <div class="hello">
    <h1>{{ filepath }}</h1>
    <div v-if="load"><p>Loading</p></div>
    <div v-else>
      <div v-for="f of files" :key="f.name">
        <p>{{ f.name }}</p>
        <div>
          <router-link v-if="f.children" :to="'/dirs/' + encodeURI(f.path)">
            go deeper
          </router-link>
          <router-link v-else :to="'/files/' + encodeURI(f.path)">
            listen
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import { fs } from "@tauri-apps/api";
import { FileEntry } from "@tauri-apps/api/fs";
import { useRoute } from "vue-router";

export default {
  components: {},
  name: "VideoList",
  props: {
    path: String,
  },
  setup(props: any) {
    const files = ref<FileEntry[]>([]);
    const load = ref(true);
    const filepath = ref(props.path);

    const route = useRoute();
    const routePath = route.params.path;
    if (routePath) {
      filepath.value = routePath;
    }

    const fetchData = () => {
      const res = fs.readDir(filepath.value);

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

    return { files, load, filepath };
  },
};
</script>

function useRoute() { throw new Error('Function not implemented.'); } function
useRoute() { throw new Error('Function not implemented.'); }
