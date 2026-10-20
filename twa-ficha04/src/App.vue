<script setup>
import { ref, computed } from 'vue'
import { search, byCategory, categories, sortByPrice } from './catalog.js'

// --- PARTE 2: Estado Reativo (refs) ---
const status = ref('loading') // 'loading' | 'error' | 'ready'
const error = ref(null)
const items = ref([])
const query = ref('')
const category = ref('')
const sortDir = ref('desc')
const selectedId = ref(null)

async function load() {
  try {
    status.value = 'loading'
    error.value = null

    const res = await fetch('/items.json')
    if (!res.ok) throw new Error(`Erro de rede: ${res.status}`)

    const data = await res.json()
    items.value = data
    status.value = 'ready'
  } catch (err) {
    status.value = 'error'
    error.value = err.message
  }
}

load()

// --- PARTE 3: Três valores derivados (computed) ---
const cats = computed(() => categories(items.value))

const visible = computed(() => {
  let list = items.value
  if (category.value !== '') {
    list = byCategory(list, category.value)
  }
  if (query.value !== '') {
    list = search(list, query.value)
  }
  list = sortByPrice(list, sortDir.value)
  return list
})

const selected = computed(() => items.value.find(i => i.id === selectedId.value))
</script>

<template>
  <main>
    <!-- PARTE 4: Controlos com v-model e @click -->
    <div class="controls">
      <input v-model="query" type="text" placeholder="Pesquisar jogos..." />

      <select v-model="category">
        <option value="">Todas as categorias</option>
        <option v-for="c in cats" :key="c" :value="c">
          {{ c }}
        </option>
      </select>

      <button @click="sortDir = sortDir === 'desc' ? 'asc' : 'desc'">
        Ordenar por Preço ({{ sortDir === 'desc' ? 'Maior → Menor' : 'Menor → Maior' }})
      </button>
    </div>

    <!-- Gestão dos 3 estados -->
    <p v-if="status === 'loading'">A carregar os jogos...</p>

    <div v-else-if="status === 'error'">
      <p>Ocorreu um erro: {{ error }}</p>
      <button @click="load">Tentar de novo</button>
    </div>

    <div v-else-if="status === 'ready'">
      <p v-if="visible.length === 0">Sem resultados para a pesquisa "{{ query }}".</p>
      <p v-else>{{ visible.length }} jogo(s) encontrado(s):</p>

      <!-- Lista de jogos com v-for + :key -->
      <ul class="list">
        <li
          v-for="item in visible"
          :key="item.id"
          :class="{ selected: item.id === selectedId }"
          @click="selectedId = item.id"
        >
          {{ item.name }} · {{ item.price.toFixed(2) }} €
        </li>
      </ul>

      <!-- Painel de Detalhes -->
      <section v-if="selected" class="detail">
        <h2>{{ selected.name }}</h2>
        <p>Categoria: {{ selected.category }} | Preço: {{ selected.price.toFixed(2) }} €</p>
        <p>Tags: {{ selected.tags.join(', ') }}</p>
        <p>Autor: {{ selected.author.name }} ({{ selected.author.country }})</p>
      </section>
    </div>
  </main>
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

.controls {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.detail {
  margin-top: 16px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>