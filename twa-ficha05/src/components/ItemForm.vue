<script setup>
import { computed, reactive } from 'vue'

defineProps({
  cats: { type: Array, required: true }
})

const emit = defineEmits(['save'])

// Rascunho vazio
const empty = { name: '', category: '', price: null, tags: '' }
// Estado reativo do formulário
const form = reactive({ ...empty })

// Validação dupla (computed)
const errors = computed(() => {
  const e = {}
  if (form.name.length > 0 && form.name.length < 3) e.name = 'Pelo menos 3 caracteres'
  if (form.price !== null && !(form.price > 0)) e.price = 'Tem de ser > 0'
  return e
})

const isValid = computed(() => {
  return form.name.length >= 3 && form.category && form.price > 0 && Object.keys(errors.value).length === 0
})

function submit() {
  if (!isValid.value) return // Segurança extra

  // Limpeza de dados
  const cleanItem = {
    name: form.name.trim(),
    category: form.category,
    price: form.price,
    tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    author: { name: 'Gonçalo Pinheiro', country: 'PT' } // Simulação de autor fixo
  }

  // Emite para o pai
  emit('save', cleanItem)

  // Limpa o formulário sem perder a reatividade
  Object.assign(form, empty)
}
</script>

<template>
  <form @submit.prevent="submit" class="item-form">
    <h3>Adicionar Novo Jogo</h3>
    
    <div class="field">
      <input v-model.trim="form.name" placeholder="Nome do jogo" required minlength="3">
      <small v-if="errors.name" class="error">{{ errors.name }}</small>
    </div>

    <div class="field">
      <select v-model="form.category" required>
        <option value="" disabled>Escolhe uma categoria</option>
        <option v-for="cat in cats" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>

    <div class="field">
      <input v-model.number="form.price" type="number" min="0" step="0.01" placeholder="Preço (€)" required>
      <small v-if="errors.price" class="error">{{ errors.price }}</small>
    </div>

    <div class="field">
      <input v-model.trim="form.tags" placeholder="tags, separadas por vírgulas">
    </div>

    <button type="submit" :disabled="!isValid">Guardar Jogo</button>
  </form>
</template>

<style scoped>
.item-form {
  margin-top: 24px;
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  max-width: 400px;
}
.field {
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
}
.field input, .field select {
  padding: 6px;
}
.error {
  color: red;
  font-size: 0.8rem;
  margin-top: 4px;
}
button {
  margin-top: 12px;
  padding: 10px 18px;
  background-color: #0066cc;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
button:hover:not(:disabled) {
  background-color: #004999;
}
button:disabled {
    background-color: #ccc;
    color: #666;
    opacity: 0.8;
    cursor: not-allowed;
}
</style>