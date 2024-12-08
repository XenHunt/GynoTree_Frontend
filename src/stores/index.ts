// import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { apiUrl, type Person, type Family } from "@/shared";
import axios from "axios";

export interface State {
  selectedPersonId: number;
  selectedFamalyId: number | null;
  personsOfFamily: Array<Person> | null;
  family: Family | null;
  familiesArray: Array<Family> | null;
  isLoading: boolean;
}

export const useGraphStore = defineStore("base", {
  state: (): State => ({
    selectedPersonId: -1,
    selectedFamalyId: null,
    personsOfFamily: null,
    family: null,
    familiesArray: null,
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
      axios
        .get(apiUrl + "family")
        .then((response) => {
          this.familiesArray = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setFamily(id: number) {
      this.isLoading = true;
      axios.post(apiUrl + "families", { id: id }).then((response) => {
        this.personsOfFamily = response.data.persons;
        // this.
        this.isLoading = false;
      });
    },
  },
});
