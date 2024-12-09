import { apiUrl, type Family, type Person, type PersonForm } from "@/shared";
import axios from "axios";
import { defineStore } from "pinia";

export interface State {
  men: Array<Person>;
  women: Array<Person>;
}

export const useEditStore = defineStore("edit", {
  state: (): State => ({
    men: [],
    women: [],
  }),
  actions: {
    loadPeople() {
      return this.loadMen().then(() => {
        return this.loadWomen();
      });
    },
    loadMen() {
      return axios.get(apiUrl + "men").then((response) => {
        this.men = response.data;
      });
    },
    loadWomen() {
      return axios.get(apiUrl + "women").then((response) => {
        this.women = response.data;
      });
    },
    updatePerson(
      id: string,
      person: PersonForm,
      family: Family,
      parents: Array<Person>,
    ) {
      return axios.post(apiUrl + "person/" + id, {
        person: person,
        family: family,
        parents: parents,
      });
    },
  },
});
