---
layout: default
title: Como usar metricas de coverage
tags:
  - testes
  - qualidade
  - javascript
date: 2024-12-15T12:55:00.000Z
---
Você já ouviu falar sobre métricas de coverage (ou cobertura de código) e se perguntou como elas podem impactar a qualidade dos seus testes? Será que alcançar 100% de cobertura significa que você tem testes perfeitos? Neste artigo, vamos explorar a fundo essas métricas, entender como elas funcionam e, principalmente, como utilizá-las da maneira correta.

Aqui, vou usar o [Istanbul](https://istanbul.js.org/), uma ferramenta poderosa e compatível com diversos frameworks de testes. No exemplo, utilizaremos o [Jest](https://jestjs.io/), já que o Istanbul está integrado a ele por padrão, eliminando a necessidade de configurações extras.

Ao final deste artigo, você será capaz de:

* Compreender as 4 principais métricas de cobertura: **Statements**, **Branches**, **Functions** e **Lines**
* Descobrir como interpretá-las para melhorar seus testes
* Evitar armadilhas comuns, como perseguir números de cobertura sem critério

## Por que as métricas de cobertura são importantes?
