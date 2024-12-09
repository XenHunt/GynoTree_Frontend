<script lang="ts">
import { useGraphStore } from "@/stores";
import { defineComponent } from "vue";
import { type Family } from "@/shared";
import { mapState } from "pinia";
export default defineComponent({
  data() {
    return {
      store: useGraphStore(),
      form: {
        firstName: "",
        lastName: "",
        middleName: "",
        is_male: true,
        family: {
          id: -1,
          name: "",
        },
      },
    };
  },
  computed: {
    isNotFirstNameEmpty() {
      return this.form.firstName.length !== 0;
    },
    isNotLastNameEmpty() {
      return this.form.lastName.length != 0;
    },
    isFamilySelected() {
      return this.form.family.name.length != 0;
    },
    isFormValid() {
      return (
        this.isNotFirstNameEmpty &&
        this.isNotLastNameEmpty &&
        this.isFamilySelected
      );
    },
    ...mapState(useGraphStore, ["familiesArray"]),
  },
  methods: {
    submitPerson(ev: Event) {
      ev.preventDefault();
      console.log(this.form);
    },
  },
});
</script>

<template>
  <form @submit="submitPerson" b>
    <div class="form-group">
      <label>Имя</label>
      <input type="text" class="form-control" v-model="form.firstName" />
    </div>
    <div class="form-group">
      <label>Фамилия</label>
      <input type="text" class="form-control" v-model="form.lastName" />
    </div>
    <div class="form-group">
      <label>Отчестов</label>
      <input type="text" class="form-control" v-model="form.middleName" />
    </div>
    <div class="form-group">
      <label>Мужчина?</label>
      <input type="checkbox" class="form-control" v-model="form.is_male" />
    </div>
    <div class="form-group">
      <label>Family Name</label>
      <select v-model="form.family">
        <option disabled value="">Выберете семью</option>
        <option v-for="family in familiesArray" :value="family">
          {{ family.name }}
        </option>
      </select>
    </div>
    <button :disabled="!isFormValid">Submit</button>
  </form>
</template>
<style>
.form-group {
  padding: 2px;
}
</style>
