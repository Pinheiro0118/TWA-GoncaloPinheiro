import {readFile} from 'node:fs/promises'
import {notFound} from '../../errors.js'

export const items = JSON.parse(
  await readFile(new URL('../../../data/items.json', import.meta.url), 'utf8')
)

export const nextId = () => Math.max(0, ...items.map((i) => i.id)) + 1

export function indexOf(id) {
    const i = items.findIndex((item) => item.id === Number(id))
    if (i === -1) throw notFound(`item ${id} not found`)
    return i
}