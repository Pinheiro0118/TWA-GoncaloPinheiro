// 1. Devolve os itens que pertencem à categoria especificada
export const byCategory = (list, cat) =>
  list.filter((item) => item.category === cat);

// 2. Devolve os itens cujo nome ou tags contêm o texto (case-insensitive)
export const search = (list, text) => {
  const searchTerm = text.toLowerCase();
  return list.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
  );
};

// 3. Devolve a soma total dos preços de todos os itens
export const total = (list) => list.reduce((acc, item) => acc + item.price, 0);

// 4. Devolve um novo array com os n itens mais caros, ordenados descendentemente
export const top = (list, n) =>
  list.toSorted((a, b) => b.price - a.price).slice(0, n);

// 5. Devolve os nomes das categorias únicos e ordenados alfabeticamente
export const categories = (list) =>
  [...new Set(list.map((item) => item.category))].toSorted();

// 6. Devolve novos objetos com o preço reduzido em pct%, mantendo os originais intactos
export const withDiscount = (list, pct) =>
  list.map((item) => ({
    ...item,
    price: Number((item.price * (1 - pct / 100)).toFixed(2)),
  }));
