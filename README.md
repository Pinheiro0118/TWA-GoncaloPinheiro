# Tecnologias Web Avançadas 2026/27

# TWA — Ficha 03: Página do Catálogo de Jogos
## 🚀 Funcionalidades Implementadas

- **Carregamento Assíncrono (`load`)**: Comunicação com a fonte de dados via `fetch` com `async/await` e validação do `res.ok`. Gestão dos três estados da aplicação (`loading`, `error` e `ready`) em bloco `try/catch/finally`.
- **Mensagens de Estado Dedicadas**: As mensagens de erro e carregamento são exibidas num elemento dedicado (`#status`), mantendo a lista (`#list`) e os detalhes (`#detail`) isolados.
- **Renderização Segura e Reativa (`render`)**: Reconstrução dinâmica da interface a partir do objeto `state` recorrendo exclusivamente a `document.createElement()` e `textContent`. Prevenção total de vulnerabilidades XSS (sem utilização de `innerHTML` com dados de entrada).
- **Filtragem e Ordenação**:
  - Pesquisa por texto em tempo real (`input`).
  - Filtragem dinâmica por categoria (`select`).
  - Ordenação por preço ascendente/descendente (`button`) através da função pura `sortByPrice` no `catalog.js`.
- **Delegação de Eventos (Bónus B)**: Implementação de um único ouvinte de eventos de clique no elemento pai `#list`, identificando o item selecionado através do atributo `dataset.id`.
- **Testes Automatizados**: Suíte de asserções em `src/check.js` utilizando `node:assert/strict` para validar o comportamento do catálogo e a ordenação.

---

## 🛠️ Como Executar o Projeto

1. **Instalar dependências**:
   npm install


Neste projeto está a ser usado o Gemini Pro