<script setup lang="ts">
import { ref, computed, defineProps, watch } from 'vue'
import { AgGridVue } from "ag-grid-vue3";
import {
  AllCommunityModule,
  ModuleRegistry,
  GetDataPath,
  ColDef,
} from 'ag-grid-community';
import {  RowGroupingModule, TreeDataModule} from 'ag-grid-enterprise';
import { useTreeStore } from "@/stores/useTreeStore";
import CellRenderer from "@/components/CellRenderer.vue";

ModuleRegistry.registerModules([AllCommunityModule, RowGroupingModule, TreeDataModule]);

const props = defineProps<{
  isViewMode: boolean
}>();

const treeStory = useTreeStore();
const rowData = computed(() => processData(treeStory.treeStore.getAll()));

const rowSelection = {
  mode: "multiRow",
  groupSelects: 'descendants',
  checkboxes: false,
  headerCheckbox: false,
}

const groupDefaultExpanded = ref(-1);
const columnDefs = ref<ColDef[]>([
  {
    field: "id",
    headerName: "№ п/п",
    lockPosition: 'left',
    flex: 1,
  },
  {
    field: "label",
    headerName: "Наименование",
    cellEditor: "SimpleTextEditor",
    flex: 4,
  },
]);

const defaultColDef = ref<ColDef>({
  editable: false,
});

const autoGroupColumnDef = ref<ColDef>({
  headerName: 'Категория',
  width: 400,
  field: "category",
  cellRenderer: CellRenderer,
  cellRendererParams:(params) => ({
    data: params.data,
    addItem: () => addItem(params.data.id),
    deleteItem: () => deleteItem(params.data.id),
  }),
  filterParams: {
    treeList: true,
  },
  flex: 2,
});

const addItem = (id: string | number) => {
  treeStory.treeStore.addItem({id: rowData.value.length + 1, parent: id, label: `Айтем ${rowData.value.length + 1}`});
}

const deleteItem = (id: string | number) => {
  treeStory.treeStore.removeItem(id)
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
    :style="{width: '100%', height: '90%'}"
    :columnDefs="columnDefs"
    :defaultColDef="defaultColDef"
    :treeData="true"
    :getDataPath="getDataPath"
    :autoGroupColumnDef="autoGroupColumnDef"
    :rowSelection="rowSelection"
    :suppressAggFuncInHeader="true"
    :rowData="rowData"
    :groupDefaultExpanded="groupDefaultExpanded"
    :undoRedoCellEditing="true"
    :undoRedoCellEditingLimit="1"
  />
</template>
