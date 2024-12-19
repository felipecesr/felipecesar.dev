---
layout: default
title: Entenda como funcionam JSON Web Tokens
tags:
  - seguranca
date: 2024-12-19T15:02:00.000Z
---
Você já ouviu falar sobre **JSON Web Tokens (JWT)**? Eles são amplamente utilizados para proteger APIs e garantir a transmissão segura de informações. Se você está considerando usá-los no lugar de cookies e sessões, ou mesmo se já os utiliza, entender como funcionam é essencial. Neste guia, vamos explorar cada detalhe de um JWT, de forma prática e envolvente.

## O que é um JSON Web Token?

Um **JSON Web Token (JWT)** é uma estrutura compacta e segura para transmitir informações entre duas partes. Por exemplo, uma aplicação front-end pode enviar dados para uma API de back-end usando um JWT. Essa comunicação é confiável porque os dados contidos no token podem ser validados para garantir sua integridade.

## Por que usar JWT?

Ele inclui um mecanismo que permite verificar se as informações enviadas não foram alteradas durante o trajeto.

Imagine que você receba um JWT de uma requisição; se ele passar pela validação, pode ter certeza de que o conteúdo do payload (os dados transmitidos) não sofreu nenhuma modificação.

Essa segurança torna os JSON Web Tokens uma escolha popular para autenticação e autorização em sistemas modernos.

## A Estrutura de um JWT

Acesse a página inicial do [jwt.io](http://jwt.io) e você verá um exemplo prático da estrutura de um JWT. Ele é composto por três partes principais:

1. **Header**: Contém informações sobre o tipo de token e o algoritmo de assinatura.
2. **Payload**: Onde ficam os dados que você quer transmitir.
3. **Signature**: Garante que o token não foi alterado.

![Exemplo de JWT](/img/jwt.png)

Vamos mergulhar na criação de um JWT na prática.

## Como criar um JSON Web Token

Vamos começar com uma função chamada `encode`. Ela transforma objetos em **Base64**, um formato ideal para transmitir informações.

```javascript
const encode = obj => {
  const encoded = btoa(JSON.stringify(obj));
  return encoded;
};
```

## Codificando `header` e `payload`

Podemos usar essa função para codificar tanto o **header** quanto o **payload**:

```javascript
const header = {
  alg: "HS256",
  typ: "JWT",
};

const payload = {
  sub: "1234567890",
  name: "John Doe",
  iat: 1516239022,
};

encode(header);
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"

encode(payload);
// "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ=="
```

## Tornando o JWT seguro para URLs

Tokens Base64 às vezes incluem caracteres como `+`, `/` e `=` que podem causar problemas em URLs. Para resolver isso, criamos a função `makeUrlSafe`:

```javascript
const encodingReplacements = {
  '+': '-',
  '/': '_',
  '=': '',
};

const makeUrlSafe = encoded => {
  return encoded.replace(
    /[+/=]/g,
    match => encodingReplacements[match]
  );
};
```

Com essa função, garantimos que o token seja seguro para uso em qualquer URL.

## Criando a assinatura do JWT
