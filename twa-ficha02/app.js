import { writeFile } from "node:fs/promises";
import { items } from "./data.js";
import { byCategory, search, top, total, categories } from "./catalog.js";

// Extrai o comando e o argumento passados no terminal
const [cmd, arg] = process.argv.slice(2);

// Função auxiliar para imprimir os itens de forma limpa (ex: "1 - Clean Code")
const printItems = (list) => {
  if (list.length === 0) console.log("Nenhum item encontrado.");
  list.forEach((item) => console.log(`${item.id} - ${item.name}`));
};

if (!cmd) {
  // node app.js -> lista tudo
  console.log("--- Catálogo Completo ---");
  printItems(items);
} else if (cmd === "search") {
  // node app.js search <texto> -> pesquisa
  console.log(`--- Pesquisa por: "${arg}" ---`);
  printItems(search(items, arg));
} else if (cmd === "top") {
  // node app.js top <n> -> os <n> mais caros[cite: 3]
  console.log(`--- Top ${arg} mais caros ---`);
  printItems(top(items, Number(arg)));
} else if (cmd === "report") {
  // node app.js report -> escreve report.json com count, total, categories, top3[cite: 3]
  const reportData = {
    count: items.length,
    total: total(items),
    categories: categories(items),
    top3: top(items, 3),
  };

  // Guardar usando o módulo node:fs/promises[cite: 3]
  writeFile("report.json", JSON.stringify(reportData, null, 2))
    .then(() => console.log("✅ report.json guardado com sucesso!"))
    .catch((err) => console.error("❌ Erro ao guardar o ficheiro:", err));
} else {
  // node app.js <categoria> -> só essa categoria (fallback se não for search, top ou report)[cite: 3]
  console.log(`--- Categoria: ${cmd} ---`);
  printItems(byCategory(items, cmd));
}
