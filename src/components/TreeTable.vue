<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTreeStore } from "@/stores/useTreeStore";
import { AllCommunityModule, ModuleRegistry, GetDataPath } from 'ag-grid-community';
import {  RowGroupingModule, TreeDataModule} from 'ag-grid-enterprise';
import { AgGridVue } from "ag-grid-vue3";

ModuleRegistry.registerModules([AllCommunityModule, RowGroupingModule, TreeDataModule]);

const treeStory = useTreeStore();
const rowData = computed(() => processData(treeStory.treeStore.getAll()));

const rowSelection = {
  mode: "multiRow",
  groupSelects: 'descendants',
  checkboxes: false,
  headerCheckbox: false,
}

const groupDefaultExpanded = ref(-1);
const columnDefs = ref([
  {
    field: "id",
    headerName: "№",
    lockPosition: 'left',
    width: 60,

  },
  {
    field: "label",
    headerName: "Наименование",
    width: 440,
    filterParams: {
      treeList: true,

    }
  },
]);

const autoGroupColumnDef = {
  headerName: 'Категория',
  width: 400,
  field: "category",
  cellRendererParams: {
    suppressCount: true,
  },
  filterParams: {
    treeList: true
  }
}

const getDataPath = ref<GetDataPath>((data) => {
  return data.dataPath;
});

function processData(data) {
  const flattenedData = [];

  const row = (row) => {
    const category = treeStory.treeStore.getChildren(row.id).length ? 'Группа' : 'Элемент';
    const dataPath = [];

    if(treeStory.treeStore.getAllParents(row.id).length) {
      treeStory.treeStore.getAllParents(row.id).map(el =>dataPath.push(el.id))
    } else {
      dataPath.push(row.id)
    }

    flattenedData.push({...row, dataPath: dataPath.reverse(), category})
  }

  data.forEach((item) => row(item))
  return flattenedData;
}

</script>

<template>
  <AgGridVue
    style="width: 100%; height: 90%"
    :columnDefs="columnDefs"
    :treeData="true"
    :getDataPath="getDataPath"
    :autoGroupColumnDef="autoGroupColumnDef"
    :rowSelection="rowSelection"
    :suppressAggFuncInHeader="true"
    :rowData="rowData"
    :groupDefaultExpanded="groupDefaultExpanded"
  />
</template>
