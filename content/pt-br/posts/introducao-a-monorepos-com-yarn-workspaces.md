---
layout: default
title: Introducao a Monorepos com Yarn Workspaces
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
