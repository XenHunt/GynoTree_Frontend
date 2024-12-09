import EditPerson from "@/components/EditPerson.vue";
import GraphComponent from "@/components/GraphComponent.vue";
import InputComponent from "@/components/InputComponent.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: GraphComponent,
    },
    {
      path: "/new_person",
      name: "new_person",
      component: InputComponent,
    },
    { path: "/edit_person/:id", component: EditPerson },
  ],
});

export default router;
