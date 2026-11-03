<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { items, status, error, load, ensureLoaded } from '../store.js'
import { search, byCategory, categories, sortByPrice } from '../catalog.js'
import ItemList from '../components/ItemList.vue'

const router = useRouter()
const query = ref('')
const category = ref('')
const sortDir = ref('desc')

onMounted(ensureLoaded)

const cats = computed(() => categories(items.value ?? []))

const visible = computed(() => {
  let list = items.value ?? []
  if (category.value !== '') list = byCategory(list, category.value)
  if (query.value !== '') list = search(list, query.value)
  list = sortByPrice(list, sortDir.value)
  return list
})

function selectItem(id) {
  router.push({ name: 'item', params: { id } })
}
</script>

<template>
  <div>
    <h2>Catálogo de Jogos</h2>

    <div class="controls">
      <input v-model="query" type="text" placeholder="Pesquisar..." />
      <select v-model="category">
        <option value="">Todas as categorias</option>
        <option v-for="c in cats" :key="c" :value="c">{{ c }}</option>
      </select>
      <button @click="sortDir = sortDir === 'desc' ? 'asc' : 'desc'">
        Ordenar ({{ sortDir === 'desc' ? 'Maior → Menor' : 'Menor → Maior' }})
      </button>
    </div>

    <p v-if="status === 'loading'">A carregar os dados...</p>
    <div v-else-if="status === 'error'">
      <p>Erro: {{ error }}</p>
      <button @click="load">Tentar de novo</button>
    </div>
    <div v-else-if="status === 'ready'">
      <p v-if="visible.length === 0">Sem resultados.</p>
      <ItemList v-else :items="visible" @select="selectItem" />
    </div>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
</style>