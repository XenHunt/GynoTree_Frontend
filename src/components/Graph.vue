<script lang="ts" setup>
  
import { nextTick, ref } from 'vue'
import { Panel, VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import {useLayout} from '../layout/index'
useLayout

const { fitView } = useVueFlow()

const nodesDraggable = ref(false);

async function layoutGraph(direction) {
  nodes.value = layout(nodes.value, edges.value, direction)

  nextTick(() => {
    fitView()
  })
}
</script>
<template>
  <VueFlow :nodes-draggable="nodesDraggable"></VueFlow>
</template>
