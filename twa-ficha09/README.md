# Ficha 09 — Estrutura, Validação e Erros

## Como correr

bash
cd twa-ficha09
npm install
npm run dev 
node check.mjs     ## noutro terminal, com o servidor a correr (silêncio = tudo bem)

## O que está feito

Separação de responsabilidades: src/server.js arranca o servidor HTTP na porta configurada, enquanto src/app.js configura os middlewares e exporta a aplicação Express.
Configuração por ambiente: src/config.js lê variáveis de ambiente (PORT, MONGODB_URI, NODE_ENV) carregadas nativamente pelo Node (--env-file-if-exists=.env), com .env.example versionado no Git e .env ignorado.
Organização por entidade: A entidade items foi isolada em src/entities/items/ (data.js, schema.js e router.js).
Validação e sanitização com Zod: src/validate.js valida POST, PUT e PATCH contra esquemas Zod (itemSchema e itemPatchSchema), removendo chaves extra (id, foo), limpando espaços (.trim()) e aplicando valores por omissão; listQuerySchema valida e converte parâmetros de pesquisa e paginação (q, page, limit).
Gestão centralizada de erros: src/errors.js define HttpError, notFound() e o errorHandler global para uniformizar respostas 400 (validação Zod e JSON mal formado), 404 e 500 (ocultando a stack trace ao cliente).

## Declaração de IA

Utilizei o Gemini durante a realização da ficha em casa nas seguintes partes:
Refatoração modular e depuração: Apoio na separação de responsabilidades entre app.js, server.js, errors.js e validate.js, bem como na identificação de erros de caminhos relativos (../../../data/items.json) e de sintaxe (template literals e parâmetros next).
Esquemas Zod e paginação: Estruturação das regras de validação em schema.js (itemSchema, itemPatchSchema e listQuerySchema) e formatação das mensagens de erro por campo (fieldErrors)
Verificação dos resultados: Todo o código sugerido foi testado e validado localmente executando o script node check.mjs em silêncio, verificando rotas no browser (/ e /api/items) e enviando pedidos curl.exe para confirmar os estados HTTP e payloads JSON em cenários de sucesso (201), dados inválidos (400), JSON mal formado (400) e recursos/rotas inexistentes (404)

## Perguntas de reflexão

1. O browser pode ser contornado via curl ou Postman, pelo que o servidor nunca deve confiar no cliente. Além de verificar tipos, o Zod sanitiza os dados (.trim()), preenche valores por omissão (.default()) e descarta propriedades injetadas ou não autorizadas como id: 1 e foo.

2. As rotas apenas sinalizam a ausência do recurso (throw notFound()) e o errorHandler centraliza a resposta HTTP. Com 4 entidades evita-se código repetido e garante-se sempre JSON; no M2, basta intercetar err.name === 'CastError' no errorHandler para converter IDs inválidos do Mongoose num erro único.

3. Entre máquinas mudam a porta (PORT), o URI do MongoDB e o ambiente (NODE_ENV). O .env.example documenta as variáveis necessárias no repositório sem expor segredos; se o .env fosse versionado, expunha credenciais e causava conflitos entre colegas.

4. A semântica HTTP (rotas, estados e JSON) é idêntica, mas o Express exige validação externa, o Fastify traz validação JSON Schema nativa de alto desempenho e o Hono assenta em Web Standards (Request/Response). Escolheria o Hono para um Cloudflare Worker por ser ultraleve, não depender de APIs exclusivas do Node.js e arrancar instantaneamente na edge.