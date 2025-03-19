<script setup lang="ts">
import { ref } from 'vue';
import TreeTable from "@/components/TreeTable.vue";

const isViewMode = ref(true)
</script>

<template>
  <div class="wrapper-table">
    <p class="mode-toggle">{{isViewMode ? 'Режим просмотра' : 'Режим редактирования'}}</p>
    <TreeTable />
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
}

.mode-toggle:hover{
  text-decoration: underline;
}
</style>
