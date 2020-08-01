<template>
  <h3>Hello {{ob.title}}</h3>
</template>

<script>
import { reactive, ref, onMounted, inject } from "vue";

export default {
  name: "helloVue",
  setup(props, ctx) {
    const http = inject("$http");
    const say = reactive({ say: "Vue 3!" });

    const ob = inject("ob");
    onMounted(() => {
      console.log("Hello Vue is mounted!");
    });

    return {
      http,
      ob,
      say,
    };
  },
};
</script>

<style>
</style>
