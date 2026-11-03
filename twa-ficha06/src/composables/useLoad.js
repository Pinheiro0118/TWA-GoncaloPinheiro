import { onMounted, ref } from 'vue'

export function useLoad(fetcher) {
  const status = ref('loading')
  const error = ref(null)
  const data = ref(null)

  async function load() {
    try {
      status.value = 'loading'
      error.value = null
      data.value = await fetcher()
      status.value = 'ready' // passa a ready no sucesso
    } catch (err) {
      status.value = 'error'
      error.value = err.message
    }
  }

  onMounted(load) // Chama a função automaticamente quando o componente é montado

  return { status, error, data, load }
}