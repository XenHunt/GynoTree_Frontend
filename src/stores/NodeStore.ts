// TODO Реализовать хранение узлов и ребер
import type { Edge, Node } from "@vue-flow/core";
import { defineStore } from "pinia";
import { type Ref, ref, computed } from "vue";

import type { Person } from "@/shared";

export interface State {
  nodes: Array<Node>;
  edges: Array<Edge>;
}

export const useNodeStore = defineStore("nodes-edges", {
  state: (): State => ({
    edges: [],
    nodes: [],
  }),

  actions: {
    processAllNodes(
      familyName: string,
      persons: Array<Person>,
      roots: Array<number>,
    ) {
      this.nodes.push({
        id: "0",
        position: { x: 0, y: 0 },
        data: {
          label: familyName,
        },
      });

      for (var id of roots)
        this.edges.push({
          id: `r-${id}`,
          source: "0",
          target: id.toString(),
        });
      for (var person of persons) this.processOneNode(person);
    },
    processOneNode(person: Person) {
      this.nodes.push({
        id: person.id.toString(),
        position: { x: 0, y: 0 },
        data: {
          label:
            person.firstname + " " + person.lastname + " " + person.middlename,
        },
      });
      for (var id of person.childrenid) {
        this.edges.push({
          id: `${person.id}->${id}`,
          source: person.id.toString(),
          target: id.toString(),
        });
      }
    },
  },
});
