import dagre from "@dagrejs/dagre";
import { Position, useVueFlow, type Edge, type Node } from "@vue-flow/core";
import { ref } from "vue";

/**
 * Composable to run the layout algorithm on the graph.
 * It uses the `dagre` library to calculate the layout of the nodes and edges.
 */
export function useLayout() {
  const { findNode } = useVueFlow();

  const graph = ref(new dagre.graphlib.Graph());

  // const previousDirection = ref("LR");

  function layout(nodes: Array<Node>, edges: Array<Edge>) {
    // we create a new graph instance, in case some nodes/edges were removed, otherwise dagre would act as if they were still there
    // console.log(nodes);
    // console.log(edges);
    console.log(findNode("0"));
    const dagreGraph = new dagre.graphlib.Graph();

    graph.value = dagreGraph;

    dagreGraph.setDefaultEdgeLabel(() => ({}));

    // const isHorizontal = direction === "LR";
    dagreGraph.setGraph({});

    for (const node of nodes) {
      // if you need width+height of nodes for your layout, you can use the dimensions property of the internal node (`GraphNode` type)
      const graphNode = findNode(node.id);
      // console.log(graphNode);
      dagreGraph.setNode(node.id, {
        // graphNode!.dimensions.width ||
        width: 150,
        // graphNode!.dimensions.height ||
        height: 50,
      });
    }

    for (const edge of edges) {
      dagreGraph.setEdge(edge.source, edge.target);
    }

    dagre.layout(dagreGraph);

    // set nodes with updated positions
    return nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);

      return {
        ...node,
        targetPosition: Position.Top,
        sourcePosition: Position.Bottom,
        position: { x: nodeWithPosition.x, y: nodeWithPosition.y },
      };
    });
  }

  return { graph, layout };
}
