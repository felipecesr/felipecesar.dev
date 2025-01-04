---
layout: default
title: Como remover código duplicado nos testes?
tags:
  - testes
  - javascript
  - jest
date: 2024-05-17T20:46:08.909Z
---
É comum ver o uso de funções `beforeEach` e `afterEach` para acabar com a repetição de código nos testes, mas isso pode custar caro.

```jsx
describe("ShoppingCart", () => {
  let cart, el;

  beforeEach(() => {
    const container = document.createElement('div');
    cart = new ShoppingCart();
    renderCartDOM(container, cart);
    el = container.querySelector('#discountPercentage');
  });

  it("does not give a discount initially", () => {
    cart.addItem("Apple");
    expect(el.textContent).toBe('0');
  });

  it("gives a 5% discount when a book is added", () => {
    cart.addItem("Book");
    expect(el.textContent).toBe('5');
  });
});
```

Nesse caso, os testes parecem menores porque todo o código que estaria duplicado está dentro do `beforeEach`, o que parece ser o cenário ideal para tornar os testes legíveis e fáceis de manter.

No início isso não parece tão ruim, mas essa estrutura começa a ficar complicada a medida que a quantidade de testes aumenta. Observe como o arquivo fica quando outros testes começam a ser adicionados.

```jsx
describe("ShoppingCart", () => {
  let cart, el;

  beforeEach(() => {
    const container = document.createElement('div');
    cart = new ShoppingCart();
    renderCartDOM(container, cart);
    el = container.querySelector('#discountPercentage');
  });

  describe("without books", () => {
    it("does not give a discount", () => {
      cart.addItem("Apple");
      expect(el.textContent).toBe('0');
    });

    it("does not give a discount when a book is removed", () => {
      cart.addItem("Apple");
      cart.addItem("Book");
      cart.removeItem("Book");
      expect(el.textContent).toBe('0');
    });
  });

  describe("with books", () => {
    it("gives a 5% discount", () => {
      cart.addItem("Book");
      expect(el.textContent).toBe('5');
    });

    it("keeps discount when at least one book is added", () => {
      cart.addItem("Book");
      cart.addItem("Book");
      cart.removeItem("Book");
      expect(el.textContent).toBe('5');
    });
  });
});
```

Agora faça o seguinte, observe apenas o último teste e responda a pergunta:

- Onde o `ShoppingCart` foi declarado e instanciado?
- Quantos `beforeEach` afetam esse teste?

Você precisou fazer scroll para o topo do arquivo não é? Arquivos grandes nos fazem ficar dando scroll pra cima e pra baixo para entender o contexto dos testes. Isso nos faz perder muito tempo para ler e manter os testes, acaba se tornando uma tarefa bem cansativa.

## Lixeira dos testes

Em alguns casos o `beforeEach` tende a ser a lixeira dos arquivos de teste. Pessoas jogam todo tipo de coisa lá: coisas que só são usadas em alguns testes, coisas que afetam todos os testes, e coisas que ninguém mais usa.

## Factory functions

Factory functions são funções que nos ajudam a construir objetos ou estados e reusar a mesma lógica em diferentes lugares. Como ficariam os mesmos testes usando factory functions?

```jsx
describe("ShoppingCart", () => {
  function setup() {
    const container = document.createElement('div');
    const cart = new ShoppingCart();
    renderCartDOM(container, cart);
    const el = container.querySelector('#discountPercentage');
    return { cart, el };
  }

  describe("without books", () => {
    it("does not give a discount", () => {
      const { cart, el } = setup();
      cart.addItem("Apple");
      expect(el.textContent).toBe('0');
    });

    it("does not give a discount when a book is removed", () => {
      const { cart, el } = setup();
      cart.addItem("Apple");
      cart.addItem("Book");
      cart.removeItem("Book");
      expect(el.textContent).toBe('0');
    });
  });

  describe("with books", () => {
    it("gives a 5% discount", () => {
      const { cart, el } = setup();
      cart.addItem("Book");
      expect(el.textContent).toBe('5');
    });

    it("keeps discount when at least one book is added", () => {
      const { cart, el } = setup();
      cart.addItem("Book");
      cart.addItem("Book");
      cart.removeItem("Book");
      expect(el.textContent).toBe('5');
    });
  });
});
```

O tamanho do código é praticamente o mesmo, mas o código é mais legível. Eliminamos o `beforeEach` mas o código não perdeu nada em manutenibilidade. A quantidade de repetição que nós eliminamos não mudou muito, mas a legibilidade melhorou bastante. Não precisamos de tantos scrolls para entender onde e como um objeto foi criado, e fica bem claro quando ele foi criado e os parâmetros que foram passados na criação.

O `describe` é legal para criar um contexto, mas cria um aninhamento no código que pode dificultar a leitura, nesse caso podemos remove-lo do código.

```jsx
function setup() {
  const container = document.createElement('div');
  const cart = new ShoppingCart();
  renderCartDOM(container, cart);
  const el = container.querySelector('#discountPercentage');
  return { cart, el };
}

test("does not give a discount", () => {
  const { cart, el } = setup();
  cart.addItem("Apple");
  expect(el.textContent).toBe('0');
});

test("does not give a discount when a book is removed", () => {
  const { cart, el } = setup();
  cart.addItem("Apple");
  cart.addItem("Book");
  cart.removeItem("Book");
  expect(el.textContent).toBe('0');
});

test("gives a 5% discount", () => {
  const { cart, el } = setup();
  cart.addItem("Book");
  expect(el.textContent).toBe('5');
});

test("keeps discount when at least one book is added", () => {
  const { cart, el } = setup();
  cart.addItem("Book");
  cart.addItem("Book");
  cart.removeItem("Book");
  expect(el.textContent).toBe('5');
});
```