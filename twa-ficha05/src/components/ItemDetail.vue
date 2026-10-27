<script setup>
defineProps({
  item: { type: Object, required: true }
})
</script>

<template>
  <section class="detail">
    <h2>{{ item.name }}</h2>
    <p>Categoria: {{ item.category }} | Preço: {{ item.price.toFixed(2) }} €</p>
    <p>Tags: {{ item.tags.join(', ') }}</p>
    <p>Autor: {{ item.author?.name || 'Desconhecido' }} ({{ item.author?.country || 'N/A' }})</p>
  </section>
</template>

<style scoped>
.detail {
  margin-top: 16px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>