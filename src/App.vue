<script setup lang="ts">
import { ref } from 'vue';
import TreeTable from "@/components/TreeTable.vue";

const isViewMode = ref(false);

const toggleMode = () => isViewMode.value = !isViewMode.value;
</script>

<template>
  <div class="wrapper-table">
    <button class="mode-toggle" @click="toggleMode">{{isViewMode ? 'Режим: просмотра' : 'Режим: редактирования'}}</button>
    <TreeTable :isViewMode="isViewMode"/>
  </div>
</template>

<style scoped>
.wrapper-table {
  height: 500px;
  width: 100%;
  padding: 15px 12px;
  background: #F2F1F0;
  border-radius: 8px;
}

.mode-toggle {
  color: blue;
  margin-bottom: 5px;
  cursor: pointer;
  border: none;
}

.mode-toggle:hover{
  text-decoration: underline;
}
</style>
