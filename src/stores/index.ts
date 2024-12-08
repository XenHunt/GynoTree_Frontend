// import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { apiUrl, type Person } from "@/shared";
import axios from "axios";

interface State {
  selectedPersonId: number;
  selectedFamalyId: number | null;
  personsOfFamily: Array<Person> | null;
  familyName: string;
  familiesNames: Array<string> | null;
  isLoading: boolean;
}

export const useGraphStore = defineStore("counter", {
  state: (): State => ({
    selectedPersonId: -1,
    selectedFamalyId: null,
    personsOfFamily: null,
    familyName: "",
    familiesNames: null,
    isLoading: false,
  }),
  getters: {
    getSelectedPerson(state: State) {
      if (state.selectedPersonId) {
        return state.personsOfFamily?.find(
          (person) => person.id == state.selectedPersonId,
        );
      }
    },
  },
  actions: {
    loadFamilies() {
      axios.get(apiUrl + "families").then((response) => {
        this.familiesNames = response.data;
      });
    },
  },
});
