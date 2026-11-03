# TWA — Ficha 06: Rotas e Paginação

## 🚀 Como Executar
bash
npm install
npm install vue-router
npm run dev

## O que está feito
Gestão Global de Estado (store.js): Extração do estado reativo do App.vue para um módulo ES reutilizável, mantendo a reatividade entre navegações
Navegação Declarativa e Programática: Implementação do Vue Router com <RouterView>, <RouterLink> e router.push()
Ecrãs por Rota: Criação de CatalogPage, ItemPage (rota dinâmica /:id), NewItemPage e NotFound (404 catch-all)
Paginação via URL (PokemonPage): Integração com a PokéAPI sincronizando o número da página diretamente no parâmetro query (?page=X) com reatividade via computed e watch

Utilização do Gemini Pro para auxílio

P1.
Se a página estivesse num ref, o estado da paginação perder-se-ia ao recarregar a página (F5), seria impossível partilhar/enviar o link direto de uma página específica a outro utilizador e os botões de avançar e recuar do navegador não navegariam no histórico de páginas

P2.
O item permaneceu durante a navegação porque o store.js é um módulo reativo mantido na memória RAM da SPA enquanto o contexto da aplicação não é destruído. Ao fazer reload, o browser reinicia a aplicação e limpa a memória. No M2, o addItem fará um pedido HTTP (POST) para guardar os dados na base de dados/API do servidor, garantindo a sua persistência

P3.
O onMounted é executado apenas quando o componente é inserido pela primeira vez no DOM (ex.: de / para /items/1). Quando se transita entre parâmetros da mesma rota (de /items/1 para /items/2), o Vue reativa e reutiliza a mesma instância do componente, pelo que o onMounted não volta a correr. Nesses casos, é necessário utilizar um watch sobre $route.params para reagir à alteração de parâmetros

P4.
Para o nosso projeto sobre Desporto, escolheria SPA (Single Page Application), pois a aplicação consome a API da TheSportsDB no lado do cliente e oferece alta interatividade sem reloads completos, sendo o foco a experiência do utilizador e não a indexação em motores de busca (SEO). Para o site público da ISLA, escolheria SSR (Server-Side Rendering) ou SSG (Static Site Generation), assegurando um tempo de primeira pintura veloz, pré-renderização de páginas para indexação perfeita (SEO) e um servidor preparado para lidar eficientemente com acessos públicos intensos.