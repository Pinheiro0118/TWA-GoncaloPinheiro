<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { items, status, ensureLoaded } from '../store.js'
import ItemDetail from '../components/ItemDetail.vue'

const route = useRoute()

onMounted(ensureLoaded)

const id = computed(() => Number(route.params.id))
const item = computed(() => (items.value ?? []).find((i) => i.id === id.value))
</script>

<template>
  <div>
    <p><RouterLink to="/">← Voltar ao Catálogo</RouterLink></p>

    <p v-if="status === 'loading'">A carregar item...</p>
    <div v-else-if="status === 'ready'">
      <ItemDetail v-if="item" :item="item" />
      <p v-else>Item {{ id }} não encontrado.</p>
    </div>
  </div>
</template>