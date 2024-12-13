---
layout: default
title: Introdução a Monorepos com Yarn Workspaces
tags:
  - architetura
  - monorepo
date: 2024-12-13T18:35:00.000Z
---
Se você já ouviu falar em monorepos, mas ainda não sabe por onde começar ou quais são suas vantagens, este guia foi feito para você. Vamos explorar de maneira simples e prática o que é um monorepo, como ele se diferencia de outras abordagens e como configurar um usando [Yarn Workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/).

## O que é um Monorepo?

Um monorepo é um único repositório que armazena **múltiplos projetos distintos**, que podem ser utilizados de forma independente ou combinados em aplicações maiores.

A principal vantagem é que o código está **disponível em um só lugar** na sua versão mais atualizada.

## Monorepos vs. Polyrepos

A abordagem "polyrepo" é a mais comum no desenvolvimento de software: cada projeto tem seu próprio repositório. Isso pode ser funcional, mas nem sempre eficiente.

No monorepo, por outro lado, o acesso ao código é instantâneo e unificado, permitindo maior colaboração e reutilização entre projetos.

## Monorepos não são Monolitos

É importante destacar que monorepos não são sinônimos de monolitos.

* **Monorepo:** Projetos separados, mas organizados em um único repositório. Temos pacotes completamente isolados uns dos outros.
* **Monolito:** Um monolito é um grupo de projetos que compoem um grande projeto.

## Configurando Yarn Workspaces em um Monorepo

Primeiro, inicialize seu projeto com Yarn:

```
yarn init -y
```

Em seguida, configure o `package.json` para suportar Yarn Workspaces:

```
{
  "private": true,
  "workspaces": ["packages/*"]
}
```

**Nota:** A propriedade `private: true` é obrigatória. Isso garante que o monorepo não será publicado acidentalmente como um pacote público.

## Criando pacotes no Monorepo

Dentro do diretório do projeto, crie uma pasta chamada `packages` para armazenar seus pacotes:

```
mkdir packages
mkdir packages/package-01
mkdir packages/package-02
```

Crie um arquivo `package.json` dentro da pasta de cada pacote, você pode fazer isso usando o seguinte comando:

```
yarn init -y
```

Volte para o diretório root e instale as dependências:

```
yarn install
```

Observe que o monorepo terá apenas um arquivo `yarn.lock`, centralizando a gestão de dependências.

## Gerenciando Pacotes no Monorepo com Yarn

Para rodar um comando em um pacote específico, use:

```
yarn workspace package-01 start  
```

Precisa rodar um comando em todos os pacotes do monorepo? Simples:

```
yarn workspaces run start  
```

## Instalando Dependências

Para adicionar uma dependência em um pacote específico:

```
yarn workspace package-01 add react
```

Para adicionar uma dependência ao root do monorepo:

```
yarn add lodash -W
```

## Usando Pacotes Internos do Monorepo

Para utilizar um pacote dentro de outro, instale a mesma versão especificada no `package.json`:

```
yarn workspace package-01 add package-02 --peer
```

Isso criará um link automático no monorepo, facilitando a integração.

## Conclusão

Monorepos oferecem colaboração eficiente, gestão centralizada de dependências e maior produtividade para equipes que trabalham em múltiplos projetos. Com Yarn Workspaces, configurar e gerenciar um monorepo se torna uma tarefa simples e escalável.

Agora que você conhece os fundamentos, está pronto para começar a utilizar essa poderosa abordagem em seus projetos!
