---
layout: default
title: Introdução ao Prisma ORM
tags:
  - backend
date: 2024-12-23T13:44:00.000Z
---
Se você está procurando uma maneira eficiente, moderna e escalável de gerenciar seu banco de dados, o Prisma ORM pode ser a solução perfeita. Neste post, vamos explorar o que é o Prisma, como ele funciona e como você pode começar a utilizá-lo hoje mesmo.

## O que é o Prisma ORM?

O Prisma ORM é uma ferramenta [open-source](https://github.com/prisma/prisma) que facilita muito a forma como desenvolvedores interagem com bancos de dados. Ele é composto por três componentes principais:

* **Prisma Client**: Um construtor de consultas (query builder) auto-gerado, com suporte a TypeScript, que oferece segurança de tipos e alta produtividade.
* **Prisma Migrate**: Um poderoso sistema de migração de banco de dados para gerenciar alterações de esquema com facilidade.
* **Prisma Studio**: Uma interface gráfica intuitiva para visualizar e editar dados diretamente no banco de dados.

Com o Prisma, você pode dizer adeus à complexidade das consultas SQL manuais e dar boas-vindas a uma abordagem mais limpa e produtiva.

## Como instalar e inicializar o Prisma

A instalação do Prisma é simples e rápida. Basta executar:

```
npx prisma init
```

Esse comando cria um diretório chamado `prisma` no seu projeto, contendo o arquivo `schema.prisma`. Esse arquivo é a **fonte da verdade** do seu banco de dados, onde você define toda a configuração necessária.

Por padrão, o Prisma utiliza o PostgreSQL, mas suporta outros bancos de dados populares como MySQL, SQLite e MongoDB. Veja um exemplo de configuração inicial:

```
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

A variável `DATABASE_URL` no arquivo `.env` define a conexão com o banco de dados. Um exemplo:

```
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

## Criando seu primeiro modelo

No arquivo `schema.prisma`, você pode criar modelos que representam tabelas no banco de dados. Cada modelo utiliza a palavra-chave `model` e define as propriedades como colunas.

```
model User {
  id        String   @id @default(cuid())
  firstname String
  lastname  String
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now())
}
```

### Explicação:

* **id**: Identificador único da tabela. O Prisma precisa que pelo menos um campo utilize o atributo `@id`. Além disso, ele usa o atributo `@default(cuid())` para gerar IDs automaticamente.
* **createdAt** e **updatedAt**: É uma boa prática definir esses campos para rastrear quando um registro foi criado ou atualizado.

## Adicionando tabelas com `prisma migrate`

O `prisma migrate` facilita a criação e atualização de tabelas no banco de dados. Execute o comando:

```
npx prisma migrate dev --name <nome_da_migracao>
```

Isso gera um diretório `migrations` contendo arquivos SQL que documentam as mudanças realizadas. Esses arquivos são essenciais para manter o histórico das migrações, garantindo consistência no ambiente de produção.

## Sincronizando alterações com `db push`

Se você está criando um protótipo e precisa de agilidade, use o comando `db push`:

```
npx prisma db push
```

Esse comando sincroniza o banco de dados com o esquema definido no `schema.prisma`, mas **não gera o diretório de migrações**. É útil para desenvolvimento inicial, mas não recomendado para produção.

## Conclusão

O Prisma ORM é uma ferramenta poderosa que simplifica o gerenciamento de bancos de dados e aumenta a produtividade de desenvolvedores. Com o Prisma Client, Migrate e Studio, você tem à disposição uma solução completa para construir aplicações robustas e escaláveis.

Pronto para começar? Instale o Prisma e descubra como ele pode transformar sua experiência de desenvolvimento!
