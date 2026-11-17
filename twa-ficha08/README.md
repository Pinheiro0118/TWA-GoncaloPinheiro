# Ficha 08 — API REST com Express

## Como correr

bash
cd twa-ficha08
npm install
npm run dev 
node check.mjs     ## noutro terminal, com o servidor a correr (silêncio = tudo bem)

## O que está feito

Servidor HTTP em Node.js com Express 5 a expor a API REST /api/items (e /api/health) sobre o catálogo em memória. Inclui rotas modulares (Router()), filtro por query string (?q=), criação (POST) com validação de erros 400, atualização (PUT), remoção (DELETE), middleware de logging e respostas 404 em JSON.

Utilização do Gemini Pro para auxílio

## Perguntas de Reflexão

P1.
É o servidor que decide o estado (res.status(404)); o fetch não rejeita porque houve resposta HTTP válida da rede (só falha se não houver ligação ou resposta).

P2.
Os middlewares correm por ordem; se express.json() ficar depois das rotas, req.body chega undefined. Sem o cabeçalho Content-Type: application/json, o corpo não é lido (req.body fica undefined) e a validação devolve 400.

P3.
Tal como no create() local do M1, os dados ficam apenas em RAM e desaparecem ao reiniciar, mas no Express são partilhados entre todos os clientes; no M2 o MongoDB substitui o array para dar persistência em disco.

P4
A semântica HTTP (rota, parâmetros, JSON e estados) é igual, mas o Laravel fornece estrutura MVC e ORM integrados. Um array em memória funciona em Node porque o processo é persistente, enquanto em PHP cada pedido cria e destrói um processo isolado.