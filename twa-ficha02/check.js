import assert from 'node:assert/strict';
import { items } from './data.js';
import { byCategory, search, total, top, categories, withDiscount } from './catalog.js';

// 1. byCategory: Sabemos que existem 4 jogos na categoria 'Desporto'
assert.equal(byCategory(items, 'Desporto').length, 4);

// 2. search: Sabemos que ao pesquisar "Minecraft", deve encontrar 1 jogo
assert.equal(search(items, 'Minecraft').length, 1);

// 3. top: O jogo mais caro da lista (55.99) é o 'EA FC 27'
assert.equal(top(items, 1)[0].name, 'EA FC 27');

// 4. categories: Devem ser 3 categorias únicas e ordenadas alfabeticamente
assert.deepEqual(categories(items), ['Aventura', 'Ação', 'Desporto', 'Simulação']);

// 5. withDiscount: Se aplicarmos 50% de desconto a uma lista pequena para teste rápido
const testeDesconto = [{ price: 20, name: 'Teste' }];
assert.equal(withDiscount(testeDesconto, 50)[0].price, 10);

// 6. total: A soma de uma lista de teste rápida deve estar correta
const testeSoma = [{ price: 10 }, { price: 25.5 }];
assert.equal(total(testeSoma), 35.5);