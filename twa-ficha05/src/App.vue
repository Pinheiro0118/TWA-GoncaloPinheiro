<script setup>
import { ref, computed, watch } from 'vue'
import { search, byCategory, categories, sortByPrice } from './catalog.js'
import { getJSON } from './api/getJSON.js'
import { useLoad } from './composables/useLoad.js'

// Importar os nossos novos componentes filhos
import ItemList from './components/ItemList.vue'
import ItemDetail from './components/ItemDetail.vue'
import ItemForm from './components/ItemForm.vue'

const { status, error, data: items, load } = useLoad(() => getJSON('/items.json'))

const query = ref('')
const category = ref('')
const sortDir = ref('desc')
const selectedId = ref(null)

watch(query, () => { selectedId.value = null })

const cats = computed(() => categories(items.value ?? []))

const visible = computed(() => {
  let list = items.value ?? []
  if (category.value !== '') list = byCategory(list, category.value)
  if (query.value !== '') list = search(list, query.value)
  list = sortByPrice(list, sortDir.value)
  return list
})

const selected = computed(() => (items.value ?? []).find(i => i.id === selectedId.value))

// --- Função para adicionar o novo item vindo do formulário ---
const nextId = computed(() => Math.max(0, ...(items.value ?? []).map((i) => i.id)) + 1)

function addItem(item) {
  items.value.push({ id: nextId.value, ...item })
}
</script>

<template>
  <main>
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

    <!-- Gestão dos estados via useLoad -->
    <p v-if="status === 'loading'">A carregar os jogos...</p>

    <div v-else-if="status === 'error'">
      <p>Ocorreu um erro: {{ error }}</p>
      <button @click="load">Tentar de novo</button>
    </div>

    <div v-else-if="status === 'ready'">
      <p v-if="visible.length === 0">Sem resultados para a pesquisa "{{ query }}".</p>
      <p v-else>{{ visible.length }} jogo(s) encontrado(s):</p>

      <!--  Componentes Filhos com props e emits -->
      <ItemList 
        :items="visible" 
        :selected-id="selectedId" 
        @select="selectedId = $event" 
      />
      
      <ItemDetail 
        v-if="selected" 
        :item="selected" 
      />
      
      <ItemForm 
        :cats="cats" 
        @save="addItem" 
      />
    </div>
  </main>
</template>

<style scoped>
.controls {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
</style>