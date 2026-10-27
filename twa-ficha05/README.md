# TWA — Ficha 05: Componentes e Formulários

## 🚀 Como Executar

npm install
npm run dev

## O que está feito
Componentização: Divisão do monólito App.vue em três componentes filhos isolados (ItemList.vue, ItemDetail.vue, ItemForm.vue)
Comunicação Pai-Filho: Utilização de defineProps para passar dados para os filhos (descendente) e defineEmits para avisar o pai de eventos (ascendente)
Formulário com Estado Próprio: Criação de um rascunho usando reactive, com validação dupla (HTML5 e computed) e um único emit('save') com o objeto limpo
Lógica Reutilizável: Extração da gestão de rede e dos 3 estados (loading, error, ready) para um composable (useLoad.js)
Efeitos Colaterais: Utilização de watch para limpar a seleção automaticamente quando o utilizador escreve na barra de pesquisa

Utilização do Gemini Pro para auxílio

## Respostas às Perguntas de Reflexão

P1.
As props são estritamente de leitura (read-only). O App.vue (Pai) é o único dono do estado. Se o filho alterasse a prop diretamente, quebraríamos o fluxo de dados unidirecional do Vue. Com o emit, o filho avisa o pai de que houve uma interação, e é o pai que decide atualizar o seu próprio estado, mantendo o código previsível.

P2.
Usa-se o computed quando queremos derivar um novo valor a partir de um estado existente sem o alterar (sem efeitos colaterais). Usa-se o watch quando queremos executar uma ação ou efeito colateral em resposta a uma mudança de estado (ex: alterar outra variável reativa, como limpar o selectedId, ou guardar algo na localStorage).

P3.
O useLoad poupa-nos a duplicação de dezenas de linhas de código, reaproveitando a gestão dos estados (status, error, data) e o fetch em todos os 6 ecrãs do projeto. Se o onMounted e esta lógica estivessem fora do composable, teríamos de reescrever exatamente as mesmas variáveis e blocos try/catch manualmente dentro de cada um dos componentes do projeto.

P4.
A validação HTML dá feedback rápido e nativo ao utilizador. A validação via computed permite criar regras visuais customizadas (como desativar o botão). No entanto, ambas correm no frontend e podem ser contornadas. A validação na API (M2) é a única que protege realmente os dados, pois barra qualquer pedido malicioso antes de chegar à base de dados.