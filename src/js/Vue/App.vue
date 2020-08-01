<template>
  <div>
    <hello-vue></hello-vue>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  watch,
  computed,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered,
  provide,
} from "vue";
import HelloVue from "./Components/HelloVue.vue";

export default {
  setup(props, { attrs, slots, emit }) {
    const ob = reactive({
      title: "Vue 3!",
      num: 3,
    });
    provide("ob", ob);
    onMounted(() => {
      setInterval(() => {
        if (ob.title == "Reactivity!") {
          ob.title = "Vue 3!";
        } else if (ob.title == "Vue 3!") {
          ob.title = "Reactivity!";
        }
      }, 5000);
    });
    return {};
  },
  components: {
    HelloVue,
  },
};
</script>

<style>
</style>
