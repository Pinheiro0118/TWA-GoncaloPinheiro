<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLoad } from '../composables/useLoad.js'
import { list, PAGE } from '../api/pokeapi.js'

const route = useRoute()
const router = useRouter()

const page = computed(() => Number(route.query.page ?? 1))
const { status, error, data, load } = useLoad(() => list(page.value))

watch(page, load)

const pages = computed(() => Math.ceil((data.value?.count ?? 0) / PAGE))

function go(p) {
  router.push({ query: { page: p } })
}
</script>

<template>
  <div>
    <h2>Lista Pokémon</h2>

    <div v-if="status === 'loading'">A carregar Pokémon...</div>
    <div v-else-if="status === 'error'">
      <p>Erro: {{ error }}</p>
      <button @click="load">Tentar de novo</button>
    </div>
    <div v-else-if="status === 'ready'">
      <p>Página {{ page }} de {{ pages }}</p>
      <div class="pagination-buttons">
        <button :disabled="page <= 1" @click="go(page - 1)">Anterior</button>
        <button :disabled="page >= pages" @click="go(page + 1)">Seguinte</button>
      </div>

      <ul class="pokemon-list">
        <li v-for="p in data.results" :key="p.name">
          {{ p.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.pagination-buttons {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
.pokemon-list {
  text-transform: capitalize;
}
</style>