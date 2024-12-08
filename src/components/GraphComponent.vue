<script lang="ts" setup>
  import { nextTick, ref } from "vue";
  import { Panel, VueFlow, useVueFlow } from "@vue-flow/core";
  import { Background } from "@vue-flow/background";
  import { useLayout } from "../layout/index";
  useLayout;

  const { fitView } = useVueFlow();

  const nodesDraggable = ref(false);

  async function layoutGraph(direction) {
    nodes.value = layout(nodes.value, edges.value, direction);

    nextTick(() => {
      fitView();
    });
  }
</script>
<template>
  <VueFlow :nodes-draggable="nodesDraggable" width="400" height="400"></VueFlow>
</template>

<style lang="css">
  @import "@vue-flow/core/dist/style.css";

  @import "@vue-flow/core/dist/theme-default.css";
</style>
