<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { items, addItem } from '../store.js'
import { categories } from '../catalog.js'
import ItemForm from '../components/ItemForm.vue'

const router = useRouter()
const cats = computed(() => categories(items.value ?? []))

function onSave(item) {
  const id = addItem(item)
  router.push({ name: 'item', params: { id } })
}
</script>

<template>
  <div>
    <h2>Novo Item</h2>
    <ItemForm :cats="cats" @save="onSave" />
  </div>
</template>