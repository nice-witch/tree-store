<script setup lang="ts">
import {ref, defineProps, onBeforeMount} from "vue";

const props = defineProps<{
  data: object;
  isViewMode:  boolean;
}>();

const category = ref<String>('');
const isGroup = ref<Boolean>();
const marginLeft = ref<String>('');
const rotation = ref<String>('');
const mode = ref<Boolean>();

const onExpand = () => {
  props.params.node.setExpanded(!props.params.node.expanded);
  rotation.value = props.params.node.expanded ? 'rotate(90deg)' : 'rotate(0deg)';
}

const handlerAddItem = () => {
  props.params.addItem(props.params.node.id);
}

const handlerDeleteItem = () => {
  props.params.deleteItem(props.params.node.id);
}

onBeforeMount(() => {
  category.value = props.params.data.category;
  isGroup.value = props.params.node.group;
  mode.value = props.params.isViewMode;

  marginLeft.value = props.params.data.dataPath.length * 20;
  if(isGroup.value) marginLeft.value -= 10;

  rotation.value = props.params.node.expanded ? 'rotate(90deg)' : 'rotate(0deg)';
})
</script>

<template>
  <div :style="{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}">
    <div>
      <div
        v-if="isGroup"
        :style="{
          marginRight: '10px',
          transform: rotation,
          cursor: 'pointer',
          display: 'inline-block'
        }"
        @click="onExpand"
      >
        &rarr;
      </div>
      <span :style="{marginLeft: `${marginLeft}px`}">{{ category }}</span>
    </div>

    <div>
      <button
        v-if="!mode"
        :style="{marginRight: '10px', backgroundColor: '#3131d8', color: 'white', border: 'none', borderRadius: '50%', cursor: 'pointer'}"
        @click="handlerAddItem"
      >+</button>
      <button
        v-if="!mode"
        :style="{backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '50%', cursor: 'pointer'}"
        @click="handlerDeleteItem"
      >x</button>
    </div>
  </div>
</template>

