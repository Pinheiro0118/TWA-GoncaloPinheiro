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

// Referências aos elementos do HTML (incluindo o statusEl)
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');
const sortButton = document.getElementById('sortButton');
const statusEl = document.getElementById('status');
const listEl = document.getElementById('list');
const detailEl = document.getElementById('detail');

// 2. Carregar os dados (com async/await e fetch)
async function load() {
  try {
    state.status = 'loading';
    render();

    const res = await fetch('/items.json');
    if (!res.ok) throw new Error(`Erro de rede: ${res.status}`);
    
    const data = await res.json();
    state.items = data;
    state.status = 'ready';

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
    render();
  }
}

// 3. Renderizar a Interface (Sem innerHTML, apenas createElement e textContent)
function render() {
  // Limpar os elementos antes de os reconstruir
  statusEl.textContent = '';
  listEl.textContent = '';
  detailEl.textContent = '';

  // As mensagens de estado vão para o #status e não para o #list
  if (state.status === 'loading') {
    statusEl.textContent = 'A carregar os jogos...';
    return;
  }

  if (state.status === 'error') {
    statusEl.textContent = `Ocorreu um erro: ${state.error}`;
    return;
  }

  // A. Processar a lista com base no estado atual
  let processedList = state.items;
  
  if (state.category) {
    processedList = byCategory(processedList, state.category);
  }
  
  if (state.query) {
    processedList = search(processedList, state.query);
  }

  processedList = sortByPrice(processedList, state.sortDir);

  // B. Construir a lista visual no DOM com data-id (sem event listener individual)
  processedList.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} — ${item.price}€`;
    li.dataset.id = item.id; // Guarda o ID no elemento HTML
    
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

      detailEl.appendChild(title);
      detailEl.appendChild(info);
      detailEl.appendChild(tags);
      detailEl.appendChild(author);
    }
  }
}

// 4. Delegação de Eventos (Um único listener no #list)
listEl.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (li && li.dataset.id) {
    state.selectedId = Number(li.dataset.id);
    render();
  }
});

// 5. Eventos dos Controlos da Interface
searchInput.addEventListener('input', (e) => {
  state.query = e.target.value;
  render();
});

categorySelect.addEventListener('change', (e) => {
  state.category = e.target.value;
  render();
});

sortButton.addEventListener('click', () => {
  state.sortDir = state.sortDir === 'desc' ? 'asc' : 'desc';
  render();
});

// Arrancar a aplicação
load();