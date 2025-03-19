<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTreeStore } from "@/stores/useTreeStore";
import { AllCommunityModule, ModuleRegistry, RowGroupingDisplayType } from 'ag-grid-community';
import {  RowGroupingModule,} from 'ag-grid-enterprise';
import { AgGridVue } from "ag-grid-vue3";

ModuleRegistry.registerModules([AllCommunityModule, RowGroupingModule]);

const treeStory = useTreeStore();
const groupDefaultExpanded = ref(-1);
const columnDefs = ref([
  { field: "id", headerName: "№", lockPosition: 'left', width: 60},
  { field: "parent", rowGroup: true, hide: true },
  { field: "label", headerName: "Наименование", width: 440  /*aggFunc: 'first'*/},
]);

// const defaultColDef = {
//   flex: 1,
// };

const autoGroupColumnDef = {
  headerName: 'Категория',
  width: 400,
  field: "parent",
  cellRenderer: "agGroupCellRenderer",
}

const rowSelection = {
  mode: "multiRow",
  groupSelects: 'descendants',
  checkboxes: false,
  headerCheckbox: false,
}

const rowData = computed(() => treeStory.treeStore.getAll());
</script>

<template>
  <AgGridVue
    style="width: 100%; height: 90%"
    :columnDefs="columnDefs"
    :defaultColDef="defaultColDef"
    :isGroupOpenByDefault="isGroupOpenByDefault"
    :autoGroupColumnDef="autoGroupColumnDef"
    :rowSelection="rowSelection"
    :suppressAggFuncInHeader="true"
    :rowData="rowData"
    :groupDefaultExpanded="groupDefaultExpanded"
  />
</template>
