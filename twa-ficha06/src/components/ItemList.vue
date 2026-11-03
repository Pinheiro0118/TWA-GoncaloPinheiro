<script setup>
// Props para receber dados do pai
defineProps({
  items: { type: Array, required: true },
  selectedId: { type: Number, default: null }
})

// Emits para avisar o pai de uma ação
const emit = defineEmits(['select'])
</script>

<template>
  <ul class="list">
    <li
      v-for="item in items"
      :key="item.id"
      :class="{ selected: item.id === selectedId }"
      @click="emit('select', item.id)"
    >
      {{ item.name }} · {{ item.price.toFixed(2) }} €
    </li>
  </ul>
</template>

<style scoped>
.selected {
  font-weight: bold;
  background-color: #e0e0e0;
}
li {
  cursor: pointer;
  padding: 6px;
  margin: 2px 0;
}
</style>