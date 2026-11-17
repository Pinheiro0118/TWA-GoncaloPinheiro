import { Router } from 'express'
import { readFile } from 'node:fs/promises'
import { search } from '../catalog.js'

const router = Router()

const items = JSON.parse(
  await readFile(new URL('../../data/items.json', import.meta.url), 'utf8')
)

// GET /api/items (lista + pesquisa opcional ?q=)
router.get('/', (req, res) => {
  const { q } = req.query
  res.json(q ? search(items, q) : items)
})

// GET /api/items/:id (detalhe)
router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  const item = items.find((i) => i.id === id)
  if (!item) return res.status(404).json({ error: `item ${id} not found` })
  res.json(item)
})

// POST /api/items (criação com validação)
router.post('/', (req, res) => {
  const { name = '', price } = req.body ?? {}
  const errors = {}
  if (name.trim().length < 3) errors.name = 'at least 3 characters'
  if (!(price > 0)) errors.price = 'must be > 0'
  if (Object.keys(errors).length) return res.status(400).json({ errors })

  const id = Math.max(0, ...items.map((i) => i.id)) + 1
  const item = { tags: [], ...req.body, id, name: name.trim() }
  items.push(item)
  res.status(201).json(item)
})

// PUT /api/items/:id (atualização)
router.put('/:id', (req, res) => {
  const i = items.findIndex((x) => x.id === Number(req.params.id))
  if (i === -1) return res.status(404).json({ error: 'not found' })
  items[i] = { ...req.body, id: items[i].id }
  res.json(items[i])
})

// DELETE /api/items/:id (remoção)
router.delete('/:id', (req, res) => {
  const i = items.findIndex((x) => x.id === Number(req.params.id))
  if (i === -1) return res.status(404).json({ error: 'not found' })
  items.splice(i, 1)
  res.status(204).end()
})

export default router