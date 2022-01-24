<template>
  <div>
    <div class="m-4">
      <p class="text-lg">Please choose a directory to start with:</p>
      <button @click="openDialog()" type="button" class="btn">
        Pick a directory
      </button>
    </div>
    <div class="m-4">
      <p class="text-lg">Picked the following directory: {{ chosen }}</p>
      <button
        @click="goToRoute()"
        type="button"
        :disabled="!chosen"
        class="btn"
      >
        Go
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { dialog } from "@tauri-apps/api";
import { useRouter } from "vue-router";

export default {
  components: {},
  name: "VideoList",
  setup() {
    const chosen = ref("");
    const router = useRouter();

    const openDialog = () => {
      const choice = dialog.open({ directory: true });
      choice
        .then((val) => {
          chosen.value = val as string;
        })
        .catch((err) => {
          alert(err);
        });
      return;
    };

    const goToRoute = () => {
      router.push("/dirs/" + encodeURI(chosen.value));
    };

    return { chosen, openDialog, goToRoute };
  },
};
</script>
