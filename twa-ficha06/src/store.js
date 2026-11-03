import { ref } from 'vue'
import { getJSON } from './api/getJSON.js'

export const items = ref(null)
export const status = ref('idle') // 'idle' | 'loading' | 'error' | 'ready'
export const error = ref(null)

export async function load() {
  try {
    status.value = 'loading'
    error.value = null
    items.value = await getJSON('/items.json')
    status.value = 'ready'
  } catch (err) {
    status.value = 'error'
    error.value = err.message
  }
}

export function ensureLoaded() {
  if (items.value === null && status.value !== 'loading') {
    load()
  }
}

export function addItem(item) {
  const nextId = Math.max(0, ...(items.value ?? []).map((i) => i.id)) + 1
  const newItem = { id: nextId, ...item }
  if (items.value) {
    items.value.push(newItem)
  } else {
    items.value = [newItem]
  }
  return nextId
}