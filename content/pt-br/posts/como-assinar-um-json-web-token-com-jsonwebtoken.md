---
layout: default
title: Como assinar um JSON Web Token com jsonwebtoken
tags:
  - seguranca
date: 2024-12-20T10:13:00.000Z
---
Quer saber como criar e assinar um **JSON Web Token (JWT)** de forma simples e eficiente? Neste post curto, vamos explorar como usar a biblioteca [`jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken) para autenticar usuários de forma segura.

Se quiser se aprofundar no funcionamento do **JWT**, confira este [post detalhado sobre o tema](/posts/entenda-como-funcionam-json-web-tokens/).

## O que fazer após o login?

Quando um usuário faz login na sua aplicação, é fundamental gerar e fornecer um **JWT** como resultado da autenticação. Este token será usado para validar todas as requisições subsequentes, garantindo que apenas usuários autenticados tenham acesso às rotas protegidas.

## Instalando a biblioteca `jsonwebtoken`

O primeiro passo é instalar a biblioteca responsável por criar e assinar os tokens. Use o comando:

```
npm install jsonwebtoken
```

Com a biblioteca instalada, importe-a no seu código e configure uma **chave secreta** para assinar os tokens:

```javascript
import jwt from 'jsonwebtoken';

const secretKey = 'secret';
```

## Criando o payload do JWT

O **payload** do JWT é onde você define as informações que deseja armazenar no token. Esses dados podem incluir o ID único do usuário, nome, ou outros dados relevantes para sua aplicação.

Aqui está um exemplo básico:

```javascript
const payload = {
  sub: "1234567890",
  name: "John Doe",
  iat: 1516239022,
};
```

O campo `sub` (subject) é comumente usado para armazenar o ID único do usuário, enquanto outros campos como `name` e `iat` ajudam a complementar as informações.

## Assinando o JWT com expiração

Com o **payload** pronto, agora é hora de assinar o token usando a função `sign()` da biblioteca `jsonwebtoken`.

A função aceita três parâmetros principais:

* O **payload** com os dados do token.
* A **chave secreta** utilizada para criar a assinatura.
* As **opções**, onde você pode definir configurações como o tempo de expiração e o algoritmo de hash.

Veja um exemplo de como configurar o tempo de expiração do token:

```javascript
const token = jwt.sign(payload, secretKey, {
  expiresIn: '1h', // O token expira em 1 hora
});

console.log(token); // Token JWT assinado
```

O header do JWT pode ser customizado com as opções, como o algoritmo de hash. Por padrão, o algoritmo utilizado é o **HS256**, mas você pode alterá-lo conforme necessário usando a opção `algorithm`.

Porém, neste exemplo, utilizamos apenas o `payload` e a `secretKey` para simplificar o processo.

## Conclusão

Com este guia, você aprendeu como gerar e assinar um **JWT** utilizando a biblioteca `jsonwebtoken`, incluindo a criação do payload e a configuração da expiração. Essa é uma solução simples e eficiente para autenticação segura.
