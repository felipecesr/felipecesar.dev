---
layout: default
title: Como executar queries com Prisma
tags:
  - backend
  - javascript
date: 2024-12-24T14:27:00.000Z
---
O Prisma simplifica significativamente a interação com bancos de dados, e o Prisma Client é uma das ferramentas principais que tornam isso possível. Neste post, você aprenderá como executar queries e habilitar logs para depuração e criar dados com segurança e eficiência.

Se você é novo no Prisma, recomendo a leitura do [post anterior](/posts/introducao-ao-prisma-orm) para entender melhor os componentes essenciais dessa poderosa ferramenta.

## O que é o Prisma Client e como usá-lo?

O Prisma Client é a interface que permite realizar queries no seu banco de dados de forma simples e intuitiva. Para começar, importe o Prisma Client no seu projeto:

```javascript
import { PrismaClient } from "@prisma/client";
```

Em seguida, instancie-o:

```javascript
const prisma = new PrismaClient();
```

Agora, você está pronto para executar queries no lado do servidor. Por exemplo, para buscar um usuário com um e-mail específico:

```javascript
const existingEmail = await prisma.user.findUnique({
  where: {
    email: userData.email,
  }
});
```

Um dos recursos mais úteis do Prisma Client é o autocomplete, que oferece sugestões baseadas nos modelos definidos no seu esquema. Isso acelera o desenvolvimento e reduz erros.

## Habilitando logs de queries

Quando você utiliza métodos como `findUnique`, o Prisma executa queries no banco de dados para recuperar as informações. Para visualizar essas queries no terminal, basta habilitar os logs ao instanciar o Prisma Client:

```javascript
const prisma = new PrismaClient({
  log: ['query']
});
```

Com essa configuração, todas as queries executadas serão exibidas no terminal enquanto sua aplicação está em execução. Isso é extremamente útil para depuração e monitoramento.

## Criando registros no banco

Criar registros no banco de dados é simples e seguro com o Prisma. Você pode usar o método `create`, que espera uma propriedade `data` contendo os dados que você deseja inserir:

```javascript
const savedUser = await prisma.user.create({
  data: {
    email: email.toLowerCase(),
    firstName,
    lastName,
    password: hashedPassword,
    role: "admin",
  }
});
```

Se você tentar inserir um valor incompatível com o tipo definido no modelo, o Prisma gerará um erro. Essa tipagem robusta é um recurso valioso que ajuda a evitar problemas comuns em interações com bancos de dados.

## Definindo tipos explicitamente

Caso prefira definir os dados em outro local, você pode usar utilitários do Prisma para especificar explicitamente o tipo do objeto:

```javascript
const userData: Prisma.UserCreateInput = {
  email: email.toLowerCase(),
  firstName,
  lastName,
  password: hashedPassword,
  role: "admin",
};

const savedUser = await prisma.user.create({
  data: userData
});
```

## Conclusão

O Prisma é uma ferramenta incrivelmente poderosa para trabalhar com bancos de dados. Ele oferece tipagem segura, autocomplete e logs para simplificar o processo de desenvolvimento e reduzir erros.

Se você gostou deste conteúdo, compartilhe com sua rede e ajude outros desenvolvedores a descobrirem os benefícios do Prisma!
