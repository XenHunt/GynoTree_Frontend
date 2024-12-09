// TODO Реализовать хранение узлов и ребер
import { useVueFlow, type Edge, type Node } from "@vue-flow/core";
import { defineStore } from "pinia";
import { type Ref, ref, computed, nextTick } from "vue";

import type { Person } from "@/shared";
import { useLayout } from "@/layout";

export interface State {
  nodes: Array<Node>;
  edges: Array<Edge>;
}
const { layout } = useLayout();

const { fitView, addNodes, addEdges } = useVueFlow();
export const useNodeStore = defineStore("node", {
  state: (): State => ({
    edges: [],
    nodes: [],
  }),
  // getters: {
  //   getEdges(state: State) {
  //     return state.edges;
  //   },
  //   getNodes(state: State) {
  //     return state.nodes;
  //   },
  // },
  actions: {
    layoutGraph() {
      return new Promise((resolve, _) => {
        setTimeout(() => {
          resolve("done");
        }, 1000);
      }).then((_) => {
        console.log(this.nodes);
        console.log(this.edges);
        this.nodes = layout(this.nodes, this.edges);
        // console.log(nodes);
        nextTick(() => {
          fitView();
        });
      });
    },
    processAllNodes(
      familyName: string,
      persons: Array<Person>,
      roots: Array<number>,
    ) {
      this.nodes.push({
        id: "0",
        position: { x: 0, y: 0 },
        data: {
          label: `Семья:\n${familyName}`,
        },
      });

      // addNodes({
      //   id: "0",
      //   position: { x: 0, y: 0 },
      //   data: {
      //     label: familyName,
      //   },
      // });

      for (var id of roots)
        this.edges.push({
          id: `r-${id}`,
          source: "0",
          target: id.toString(),
        });
      // addEdges({
      //   id: `r-${id}`,
      //   source: "0",
      //   target: id.toString(),
      // });
      for (var person of persons) this.processOneNode(person);
      // this.layoutGraph();
    },
    processOneNode(person: Person) {
      this.nodes.push({
        id: person.id.toString(),
        position: { x: 0, y: 0 },
        data: {
          label:
            person.firstName + " " + person.lastName + " " + person.middleName,
        },
      });
      addNodes({
        id: person.id.toString(),
        position: { x: 0, y: 0 },
        data: {
          label:
            person.firstName + " " + person.lastName + " " + person.middleName,
        },
      });
      for (var id of person.childrenId) {
        this.edges.push({
          id: `${person.id}->${id}`,
          source: person.id.toString(),
          target: id.toString(),
        });
        addEdges({
          id: `${person.id}->${id}`,
          source: person.id.toString(),
          target: id.toString(),
        });
      }
    },
  },
});
