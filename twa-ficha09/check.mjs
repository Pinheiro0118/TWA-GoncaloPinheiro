import assert from 'node:assert/strict'

const BASE = 'http://localhost:3000/api'
const json = { 'Content-Type': 'application/json' }

// lista completa
let res = await fetch(`${BASE}/items`)
assert.equal(res.status, 200)
const all = await res.json()
assert.ok(all.length >= 8)

// pesquisa por ?q= (no meu catálogo, "counter" apanha os 2 Counter Strike)
res = await fetch(`${BASE}/items?q=counter`)
assert.equal((await res.json()).length, 2)

// 404 com corpo JSON (nunca HTML)
res = await fetch(`${BASE}/items/999`)
assert.equal(res.status, 404)
assert.ok((await res.json()).error)

// POST inválido → 400 com os dois erros
res = await fetch(`${BASE}/items`, { method: 'POST', headers: json, body: JSON.stringify({ name: 'ab', price: -1 }) })
assert.equal(res.status, 400)
assert.deepEqual(Object.keys((await res.json()).errors).sort(), ['name', 'price'])

// POST válido → 201 com id novo
res = await fetch(`${BASE}/items`, { method: 'POST', headers: json, body: JSON.stringify({ name: 'Chess', price: 19.9, category: 'game' }) })
assert.equal(res.status, 201)
const created = await res.json()
assert.equal(created.name, 'Chess')
assert.ok(created.id > 8)

// o item criado aparece no detalhe...
res = await fetch(`${BASE}/items/${created.id}`)
assert.equal((await res.json()).name, 'Chess')

// ...e também entra na pesquisa
res = await fetch(`${BASE}/items?q=chess`)
assert.equal((await res.json()).length, 1)
