<script lang="ts">
  import { apiUrl } from "@/shared";
  import { useGraphStore } from "@/stores";
  import { useEditStore } from "@/stores/EditStore";
  import axios from "axios";
  import { mapState } from "pinia";
  import { createTypeReferenceDirectiveResolutionCache } from "typescript";
  import { defineComponent } from "vue";

  export default defineComponent({
    data() {
      return {
        store: useGraphStore(),
        editStore: useEditStore(),
        form: {
          firstName: "",
          lastName: "",
          middleName: "",
          is_male: true,
        },
        selecters: {
          father: "",
          mother: "",
        },
        family: {
          id: -1,
          name: "",
        },
      };
    },
    created() {
      this.editStore.loadPeople().then(() => {
        // let father, mother
        axios
          .get(apiUrl + "person/" + this.$route.params.id)
          .then((response) => {
            this.form.firstName = response.data.person.firstName;
            this.form.lastName = response.data.person.lastName;
            this.form.middleName = response.data.person.middleName;
            this.form.is_male = response.data.person.is_male;
            this.selecters.father = response.data.parents.father;
            this.selecters.mother = response.data.parents.mother;
            console.log(response.data.family);
            this.family = response.data.family || { id: -1, name: "" };
          });
      });
    },
    computed: {
      isNotFirstNameEmpty() {
        return this.form.firstName.length !== 0;
      },
      isNotLastNameEmpty() {
        return this.form.lastName.length != 0;
      },
      isFamilySelected() {
        return this.family.name.length != 0;
      },
      isFormValid() {
        return (
          this.isNotFirstNameEmpty &&
          this.isNotLastNameEmpty &&
          this.isFamilySelected
        );
      },
      ...mapState(useGraphStore, ["familiesArray"]),
      ...mapState(useEditStore, ["men", "women"]),
    },
    methods: {
      submitPerson(ev: Event) {
        ev.preventDefault();
        const id = this.$route.params.id;
        if (!id) return;
        const parents = Object.values(this.selecters);
        this.editStore
          .updatePerson(id, this.form, this.family, parents)
          .then(() => {
            this.store.setFamily(this.store.family);
            this.$router.push("/");
          })
          .catch((err) => {
            console.log(err);
          });
      },
      deletePerson() {
        const id = this.$route.params.id;
        if (!id) return;
        this.editStore.deletePerson(id).then((_) => {
          this.$router.push("/");
          this.store.setFamily(this.store.family);
        });
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
      <select v-model="family">
        <option disabled value="">Выберете семью</option>
        <option v-for="family in familiesArray" :value="family">
          {{ family.name }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label>Отец</label>
      <select v-model="selecters.father">
        <option disabled value="">Отца</option>
        <option v-for="dad in men" :value="dad">
          {{ dad.firstName + " " + dad.lastName + " " + dad.middleName}}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label>Мать</label>
      <select v-model="selecters.mother">
        <option disabled value="">Мать</option>
        <option v-for="mom in women" :value="mom">
          {{ mom.firstName + " " + mom.lastName + " " + mom.middleName}}
        </option>
      </select>
    </div>
    <button :disabled="!isFormValid">Submit</button>
    <div class="form-group">
    <input type="button" class="btn" @click="deletePerson()">Delete</input>
    </div>
  </form>
</template>
<style>
  .form-group {
    padding: 2px;
  }
  .btn {
      
      padding:0;
      border:none;
      height:20px;
      width:40px;
      /* line-height:normal; */
      background: red;
      /* height:100%; */
      /* width: auto; */
  }
</style>
