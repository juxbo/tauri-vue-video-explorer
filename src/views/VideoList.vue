<template>
  <div class="container">
    <p class="text-lg font-bold">{{ filepath }}</p>
    <div v-if="load"><p>Loading...</p></div>
    <div v-else>
      <div v-for="f of files" :key="f.name" class="p-2 mt-2 mb-2">
        <p class="pb-2">{{ f.name }}</p>
        <div>
          <router-link
            v-if="f.children"
            :to="'/dirs/' + encodeURI(f.path)"
            class="btn"
          >
            go deeper
          </router-link>
          <router-link v-else :to="'/files/' + encodeURI(f.path)" class="btn">
            {{ getText(f.path) }}
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

    const getText = (fp: string) => {
      const extension = fp.split(".")?.pop()?.toLowerCase();
      switch (extension) {
        case "mp3":
          return "listen";
        case "png":
        case "jpg":
        case "jpeg":
          return "view";
        default:
          return "watch";
      }
    };

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

    return { files, load, filepath, getText };
  },
};
</script>
