<script lang="ts">
  import { useGraphStore } from "@/stores";
  import { computed, defineComponent, ref, type Ref } from "vue";
  import { type Family } from "@/shared";
  export default defineComponent({
    setup() {
      const store = useGraphStore();
      const families = computed(() => store.familiesArray || []);
      const family: Ref<null | Family> = ref(null);
      function selectFamily() {
        // console.log(family)
        store.setFamily(family.value);
      }

      return { store, families, selectFamily, family };
    },
  });
</script>
<template>
  <div class="bar-container">
    <span v-if="families.length > 0">
      <select v-model="family" @change="selectFamily()">
        <option disabled value="null">Выберете семью</option>
        <option v-for="fam in families" :value="fam">{{ fam.name }}</option>
      </select>
      <RouterLink to="/new_person">+</RouterLink>
    </span>
  </div>
</template>

<style lang="css" scoped>
  select {
    /* min-width */
    min-width: 5%;
    min-height: 5%;
  }
  .bar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: auto;
    padding: 20px;
    border-radius: 10px;
    background-color: gray;
  }
  .btn {
    margin: 5px;
  }
</style>
