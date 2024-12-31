---
layout: default
title: CORS Anti-Patterns e Headers de Segurança em Requisições
tags:
  - seguranca
  - backend
date: 2024-12-31T14:25:00.000Z
---
CORS (Cross-Origin Resource Sharing) é uma parte essencial da segurança das aplicações web modernas, mas pode ser fácil cair em armadilhas ao configurá-lo. Neste post, exploraremos os **anti-patterns mais comuns relacionados ao CORS** e aprenderemos sobre **headers de segurança que ajudam a proteger suas requisições.**

## Anti-Patterns de CORS

### Evitar substituição de métodos sujeitos ao CORS

É uma má prática tentar "driblar" restrições do CORS trocando métodos HTTP sujeitos a verificações prévias (como `PUT`, `PATCH` e `DELETE`) por métodos "mais simples" (`GET` ou `POST`). Essa abordagem pode introduzir riscos de segurança e complicar o rastreamento do comportamento da aplicação.

Um exemplo disso seria o uso de um middleware que sobrescreve o método HTTP:

```javascript
const methodOverride = (req, res, next) => {
  const method =
    req.query._method ||
    req.headers['x-http-method-override'];

  if (method) {
    req.method = method.toUpperCase();
  }

  delete req.body?._method;
  delete req.query?._method;

  next();
};
```

Essa prática é desaconselhada porque pode gerar inconsistências e comprometer a segurança.

### Evitar curingas para origens variadas

Usar curingas (`*`) nas políticas de CORS para permitir diversas origens pode ser problemático, especialmente se você precisar permitir credenciais (como cookies ou cabeçalhos de autenticação).

**Dica:** Use curingas **somente** se você tiver certeza de que não precisará habilitar credenciais.

## Headers de Segurança em Requisições

Headers que começam com o prefixo `sec-` são configurados automaticamente pelo navegador e não podem ser manipulados por JavaScript. Isso garante maior segurança para suas requisições. Aqui estão alguns exemplos importantes:

### `sec-fetch-site`

Este header indica a relação entre o site que iniciou a solicitação e o servidor que está hospedando o recurso.

* `cross-site`: O iniciador e o servidor têm origens diferentes.
* `same-site`: O iniciador e o servidor têm o mesmo site, mas podem ter origens diferentes.
* `same-origin`: O iniciador e o servidor têm a mesma origem.
* `none`: O usuário iniciou diretamente, por exemplo, digitando a URL na barra de endereço ou abrindo um marcador.

### `sec-fetch-dest`

Este header indica o destino do recurso solicitado. Exemplos:

* `empty`: Quando a solicitação foi feita via `fetch()`.
* `image`: Para imagens.
* `worker`: Quando a solicitação é feita por um `new Worker()`.
* `document`: Para navegações de nível superior.
* `iframe`: Para recursos carregados em iframes.

### `sec-fetch-user`

* Este header é um booleano (ou tecnicamente, `true`) incluído em solicitações de navegação que foram explicitamente acionadas por um usuário.

### `sec-fetch-mode`

Define o modo da requisição. Pode ter um dos seguintes valores:

* `cors`: Quando a requisição está sujeita a regras de CORS.
* `navigate`: Para solicitações de navegação.
* `no-cors`: Para solicitações onde CORS não é necessário.
* `same-origin`: Quando a origem é a mesma.
* `websocket`: Para conexões WebSocket.

## Resumo

Evite práticas inseguras ao configurar CORS e aproveite os headers de segurança para proteger sua aplicação. Mantenha-se atualizado com boas práticas e adote uma abordagem responsável ao lidar com origens cruzadas.
