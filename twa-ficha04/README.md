# TWA — Ficha 04: Catálogo em Vue

## 🚀 Como Executar
npm install
npm run dev

comomando para teste 
node check.js

## O que está feito
Estrutura Vue 3 <script setup>: Migração completa da lógica da Ficha 03 para um componente Vue único (App.vue)
Estado Reativo (ref): Gestão do estado da aplicação (status, error, items, query, category, sortDir, selectedId) através de variáveis reativas
Valores Derivados (computed): Implementação de cats, visible e selected para cálculo automático de categorias, filtragem/ordenação e detalhes do item selecionado sem manipulação manual do DOM
Template Reativo: Interface declarativa no <template> utilizando v-model para sincronizar inputs, @click para eventos, v-if / v-else-if / v-else para gerir os 3 estados da aplicação e v-for com :key="item.id" para rendilhar a lista
Tratamento de Erros e Re-tentativa: Gestão de falhas de rede/ficheiros no load() com botão Retry para recarregar dados sem atualizar a página

Utilização do Gemini Pro para auxílio

## Respostas as perguntas de reflexão
1- Estado: Passou para variáveis ref() individuais no <script setup> do App.vue
render(): Desapareceu; o Vue atualiza o DOM automaticamente quando o estado reativo muda
Handlers: Os escutadores manuais (addEventListener) foram substituídos por diretivas diretas no template (v-model, @click)

2- No <script setup>, a ref é um objeto reativo, necessitando de .value para aceder/modificar os dados. No <template>, o Vue faz o unwrapping automático da ref, permitindo utilizar diretamente o nome da variável

3- O visible é um valor derivado. Sendo computed, recalcula-se sozinho sempre que items, query, category ou sortDir mudam. Se fosse um ref, teríamos de recalcular manualmente o seu valor em cada evento, gerando código redundante e risco de dessincronizar a interface

4- O :key permite ao Virtual DOM identificar cada nó da lista de forma única. Usar o índice do array (index) numa lista que reordena faz com que o Vue associe o estado visual e os elementos aos índices numéricos e não aos objetos reais, causando falhas de renderização e seleção incorreta de itens