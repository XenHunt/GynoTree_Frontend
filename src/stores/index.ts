// import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { apiUrl, type Person, type Family, type PersonForm } from "@/shared";
import axios from "axios";
import { useNodeStore } from "./NodeStore";

export interface State {
  selectedPerson: Person | null;
  personsOfFamily: Array<Person> | null;
  family: Family | null;
  familiesArray: Array<Family> | null;
  isLoading: boolean;
}

export const useGraphStore = defineStore("base", {
  state: (): State => ({
    selectedPerson: null,
    personsOfFamily: null,
    family: null,
    familiesArray: null,
    isLoading: false,
  }),
  getters: {
    getSelectedPerson(state: State) {
      if (state.selectedPerson) {
        return state.personsOfFamily?.find(
          (person) => person.id == state.selectedPerson?.id,
        );
      }
    },
  },
  actions: {
    putNewPerson(person: PersonForm, family: Family) {
      return axios
        .put(apiUrl + "person", { person: person, familyId: family.id })
        .then((res) => {
          this.setFamily(this.family); // TODO заменить на изменение в графе без обращения в БД
        });
    },
    loadFamilies() {
      axios
        .get(apiUrl + "family")
        .then((response) => {
          this.familiesArray = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setFamily(family: Family | null) {
      if (!family) return;
      this.isLoading = true;
      const nodesStore = useNodeStore();
      return axios
        .post(apiUrl + "family", { id: family.id })
        .then((response) => {
          this.personsOfFamily = response.data.persons;
          // console.log(this.personsOfFamily);
          // this.
          nodesStore.processAllNodes(
            family.name,
            response.data.persons,
            response.data.roots,
          );
          this.isLoading = false;
        });
    },
  },
});
