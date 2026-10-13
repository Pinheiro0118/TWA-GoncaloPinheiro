// Importar as funções puras do teu ficheiro catalog.js
import { search, byCategory, categories, sortByPrice } from './catalog.js';

// 1. O Estado da Aplicação (State)
const state = {
  status: 'loading',
  error: null,
  items: [],
  query: '',
  category: '',
  sortDir: 'desc',
  selectedId: null,
};

// Referências aos elementos do HTML criados no passo anterior
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');
const sortButton = document.getElementById('sortButton');
const listEl = document.getElementById('list');
const detailEl = document.getElementById('detail');

// 2. Carregar os dados (com async/await e fetch)
async function load() {
  try {
    state.status = 'loading';
    render(); // Mostra mensagem de carregamento

    const res = await fetch('/items.json');
    if (!res.ok) throw new Error(`Erro de rede: ${res.status}`);
    
    const data = await res.json();
    state.items = data;
    state.status = 'ready';

    // Preencher as opções do <select> dinamicamente com base nos dados
    const cats = categories(state.items);
    cats.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      categorySelect.appendChild(option);
    });

  } catch (err) {
    state.status = 'error';
    state.error = err.message;
  } finally {
    render(); // Atualiza a interface no fim do processo
  }
}

// 3. Renderizar a Interface (Sem innerHTML, apenas createElement e textContent)
function render() {
  // Limpar as listas antes de as reconstruir
  listEl.textContent = '';
  detailEl.textContent = '';

  if (state.status === 'loading') {
    listEl.textContent = 'A carregar os jogos...';
    return;
  }

  if (state.status === 'error') {
    listEl.textContent = `Ocorreu um erro: ${state.error}`;
    return;
  }

  // A. Processar a lista com base no estado atual (Filtros e Ordenação)
  let processedList = state.items;
  
  if (state.category) {
    processedList = byCategory(processedList, state.category);
  }
  
  if (state.query) {
    processedList = search(processedList, state.query);
  }
  
  // A função sortByPrice tem de ser criada por ti no catalog.js
  if (typeof sortByPrice === 'function') {
    processedList = sortByPrice(processedList, state.sortDir);
  }

  // B. Construir a lista visual no DOM
  processedList.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} — ${item.price}€`;
    
    // Evento de clique no item para ver detalhes
    li.addEventListener('click', () => {
      state.selectedId = item.id;
      render(); // O evento só muda o estado e chama o render()
    });
    
    listEl.appendChild(li);
  });

  // C. Construir a secção de detalhes, se houver um jogo selecionado
  if (state.selectedId) {
    const selectedItem = state.items.find(i => i.id === state.selectedId);
    
    if (selectedItem) {
      const title = document.createElement('h2');
      title.textContent = selectedItem.name;
      
      const info = document.createElement('p');
      info.textContent = `Categoria: ${selectedItem.category} | Preço: ${selectedItem.price}€`;
      
      const tags = document.createElement('p');
      tags.textContent = `Tags: ${selectedItem.tags.join(', ')}`;
      
      const author = document.createElement('p');
      author.textContent = `Autor: ${selectedItem.author.name} (${selectedItem.author.country})`;

      // Anexar tudo à secção de detalhe
      detailEl.appendChild(title);
      detailEl.appendChild(info);
      detailEl.appendChild(tags);
      detailEl.appendChild(author);
    }
  }
}

// 4. Configurar os Eventos da Interface (Inputs e Botões)
searchInput.addEventListener('input', (e) => {
  state.query = e.target.value;
  render();
});

categorySelect.addEventListener('change', (e) => {
  state.category = e.target.value;
  render();
});

sortButton.addEventListener('click', () => {
  // Alternar a direção entre 'asc' e 'desc'
  state.sortDir = state.sortDir === 'desc' ? 'asc' : 'desc';
  render();
});

// Arrancar a aplicação
load();