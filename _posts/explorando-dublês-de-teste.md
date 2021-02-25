---
layout: default
title: Explorando Mocks
date: 2021-02-25T18:37:48.751Z
---
Neste artigo vamos entender o que são Dublês de Teste e como usá-los em aplicações JavaScript.

## O que são Dublês de Teste?

São objetos que atuam no lugar de outros objetos. Como assim?

![What?](https://media.giphy.com/media/CiYImHHBivpAs/giphy.gif)

Deixa eu explicar melhor. Vamos supor que temos que enviar dados para uma api a partir de um formulário e estamos testando essa funcionalidade. Ao invés de enviar os dados exatamente como faríamos em produção cada vez que o teste executar, podemos modificar alguns módulos da aplicação durante os testes e evitar possíveis problemas.

É bem comum utilizá-los quando fazemos requisições HTTP em testes unitários e testes de integração, mas não são os únicos casos.

## Como usar?

O Jest nos dá algumas formas de trabalhar com mocks. A primeira que vamos ver são as mock functions.

Vamos criar o componente Button.

```javascript
```
