<script lang="ts">
  import { useGraphStore } from "@/stores";
  import { computed, defineComponent, ref, type Ref } from "vue";
  import { type Family } from "@/shared";
  export default defineComponent({
    setup() {
      const store = useGraphStore();
      const families = computed(() => store.familiesArray || []);
      const family: Ref<"" | Family> = ref("");
      function selectFamily() {
        console.log(family.value.id);
      }

      return { store, families, selectFamily, family };
    },
    created() {
      this.store.loadFamilies();
    },
  });
</script>
<template>
  <div>
    <span v-if="families.length > 0">
      <select v-model="family" @change="selectFamily">
        <option disabled value="">Выберете семью</option>
        <option v-for="fam in families" :value="fam">{{fam.name}}</option>
      </select>
    </span>
  </div>
</template>
