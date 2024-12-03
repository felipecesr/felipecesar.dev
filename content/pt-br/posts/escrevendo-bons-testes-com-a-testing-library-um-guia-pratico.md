---
layout: default
title: "Escrevendo Bons Testes com a Testing Library: Um Guia Prático"
tags:
  - javascript
  - testes
  - framework
  - qualidade
  - react
date: 2024-12-03T18:27:00.000Z
---
Os testes são a base de uma aplicação robusta e confiável. Mas o que define um **bom teste**? Como desenvolvedor front-end, aprendi que **bons testes** devem seguir quatro regras simples, mas poderosas. Neste artigo, vou mostrar como aplicá-las com a **[Testing Library](https://testing-library.com/)**, uma ferramenta que transforma a forma como escrevemos testes.

## O que define um bom teste?

Antes de mergulharmos no código, vamos entender os pilares de um bom teste. Ele deve:

1. **Proteger contra regressões**: Garantir que a aplicação funcione corretamente para os usuários.
2. **Resistir a refatorações**: Ser independente de mudanças estruturais no código.
3. **Dar feedback rápido**: Identificar problemas rapidamente durante o desenvolvimento.
4. **Ser fácil de manter**: Ter clareza e simplicidade para que ajustes futuros sejam tranquilos.

Esses critérios guiam o desenvolvimento de testes que realmente agregam valor. Vamos ver como aplicá-los na prática!

## Comparando abordagens de testes

Imagine que queremos testar o comportamento de um menu onde o usuário precisa clicar para exibir as opções dele. Vamos entender como seriam feitos os testes manuais e automatizados.

### Teste manual

* O usuário lê o texto do botão.
* Clica no botão.
* Verifica se o menu aparece.

### Teste automatizado com Jest

O código do teste automatizado é o seguinte:

```javascript
test('opens the menu', () => {
  mountMenu();
  const menuBar = document.querySelector('.menu-bar');
  const button = document.querySelector('button');

  button.click();

  expect(menuBar.className).toContain('menu-bar--open');
});
```

Esse código executa os seguintes passos:

* Pesquisa os elementos button e menu-bar usando os seletores corretos
* Faz uma chamada ao método click a partir do elemento button
* Verifica se uma classe foi adicionada no elemento menu-bar

Este teste dá **feedback rápido**, mas falha nos seguintes pontos:

* **Resistência a refatorações**: Mudanças na classe ou estrutura do DOM quebram o teste.
* **Proteção contra regressões**: Ele testa detalhes de implementação, e não o comportamento do usuário.

## A solução: Testing Library

A Testing Library muda o jogo ao priorizar o que o usuário realmente vê e faz. Ela ajuda a escrever testes que:

* Focam no comportamento, não na implementação.
* São mais resistentes a refatorações.

### Reescrevendo o teste

Usando a [DOM Testing Library](https://testing-library.com/docs/dom-testing-library/intro/) e o [jest-dom](https://github.com/testing-library/jest-dom), nosso exemplo de menu fica assim:

```javascript
import { screen, fireEvent } from '@testing-library/dom';

test('opens the menu', () => {
  mountMenu();
  const button = screen.getByRole('button', { name: /audio and subtitles menu/i });

  fireEvent.click(button);

  expect(screen.getByRole('menu')).toBeVisible();
});
```

### Por que isso é melhor?

* **Sem detalhes de implementação:** Não precisamos saber sobre classes CSS ou métodos do DOM.
* **Mais legível:** O teste descreve claramente o comportamento esperado.
* **Resistente a refatorações:** Alterações no código interno não impactam o teste.

## Conclusão

Bons testes garantem qualidade e confiança no desenvolvimento. Com a [Testing Library](https://testing-library.com/), focamos no comportamento do usuário, criando testes mais claros, resistentes a mudanças e fáceis de manter. Ao aplicar essas práticas, economizamos tempo e asseguramos que nossa aplicação funcione como esperado, mesmo com evoluções no código.
