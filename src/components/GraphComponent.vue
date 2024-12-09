<script lang="ts" setup>
import { computed, ref } from "vue";
import {
  Panel,
  VueFlow,
  type Node,
  type Edge,
  useVueFlow,
} from "@vue-flow/core";
import { Background } from "@vue-flow/background";
import { useLayout } from "../layout/index";
import { useNodeStore } from "@/stores/NodeStore";
import { mapActions, mapState, mapStores } from "pinia";
import BarComponent from "./BarComponent.vue";

const { onConnect, addEdges, onNodesChange, findNode, onNodeClick } = useVueFlow();

const nodeStore = useNodeStore();

function layoutGraph() {
  nodeStore.layoutGraph();
}
onNodesChange((param) => {
  console.log(findNode("0"))
  console.log("Change Nodes");
});

onNodeClick(({ event, node }) => {
  console.log(node)
})
</script>
<template>
  <div class="container">
    <BarComponent> </BarComponent>
  </div>
  <div class="layout-flow">
    <VueFlow
      :nodes-draggable="false"
      :width="400"
      :height="400"
      :nodes="nodeStore.nodes"
      :edges="nodeStore.edges"
      @nodes-initialized="layoutGraph()"
      fit-view-on-init
      @node-change="onNodesChange"
      @node-click="onNodeClick"
    ></VueFlow>
  </div>
</template>

<style lang="css">
@import "@vue-flow/core/dist/style.css";

@import "@vue-flow/core/dist/theme-default.css";

.container {
  position: fixed;
  top: 0;
  right: 0;
  /* min-width: 5%; */

  z-index: 1000;
}
.layout-flow {
  height: 100lh;
  width: 100lh;
}

.container,
.layout-flow {
  display: flex;
  gap: 10px;
}
</style>
