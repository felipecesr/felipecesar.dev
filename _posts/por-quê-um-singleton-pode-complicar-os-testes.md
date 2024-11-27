---
layout: default
title: Por quê um Singleton pode complicar os testes?
tags:
  - patterns
  - javascript
  - testing
date: 2024-05-09T22:13:00.226Z
---
É possível que em alguma situação você queira criar um objeto que funcione como ponto de acesso único para alguma informação. Isso pode até parecer uma boa ideia no começo, mas pode trazer alguns problemas com o tempo.

Neste artigo quero mostrar alguns problemas que podem acontecer quando testamos e o que podemos fazer para solucioná-los.

## O que é um **Singleton**?

De acordo com o site [Refactoring.Guru](https://refactoring.guru/), o **Singleton** é um padrão de projeto criacional que permite a você garantir que uma classe tenha apenas uma instância, enquanto provê um ponto de acesso global para essa instância.

Em linguagens como Java e C++, só é possível criar objetos por meio de classes, esses objetos são instâncias, nesses casos garantir que uma classe tenha sempre a mesma instância pode ser um pouco mais complicado. Em JavaScript podemos criar um objeto de forma literal e ter exatamente o mesmo resultado.

## Usando um objeto literal

No exemplo abaixo temos um objeto representando um carrinho de compras.

```js
const shoppingCart = {
  items: [],
  addItem(item) {
    this.items.push(item);
  },
  get total() {
    let total = 0;
    for (let item of this.items) {
      total += item.price;
    }
    return total;
  }
};
```

Esse objeto é usado em um função que adiciona itens no carrinho e atualiza a página para exibir o valor calculado.

```js
function addItemToCart(name, price) {
  shoppingCart.addItem({ name, price });
  updateCartTotalDOM(shoppingCart.total);
}
```

Podemos testar essa função da seguinte forma:

```js
test("first case", () => {
  addItemToCart("Book", 5);
  expect(document.body.textContent).toBe("5");
});
```

Mas o que acontece se criarmos outro teste?

```js
test("second case", () => {
  addItemToCart("Case", 10);
  expect(document.body.textContent).toBe("10");
});
```

Nesse caso temos um problema, por se tratar do mesmo objeto, o valor adicionado no teste anterior continua lá. Isso viola o princípio de que os testes devem ser isolados uns dos outros.

```bash
Expected: "10"
Received: "15"

   8 | test("second case", () => {
   9 |   addItemToCart("Case", 10);
> 10 |   expect(document.body.textContent).toBe("10");
```

## Como resolver esse problema?

Uma possível solução nesse caso seria limpar os itens após cada teste, dessa forma sempre que um teste for executar o carrinho estará com o estado inicial.

```js
import shoppingCart from "./shopping-cart";

afterEach(() => {
  shoppingCart.items = [];
});
```

Mas você pode fazer de outra forma, que no meu ponto de vista é melhor. Você pode passar o `shoppingCart` como parâmetro.

```js
function addItemToCart(shoppingCart, name, price) {
  shoppingCart.addItem({ name, price });
  updateCartTotalDOM(shoppingCart.total);
}
```

Dessa forma, você diminui o acoplamento e os testes ficam completamente isolados uns dos outros.

```js
import addItemToCart from "./add-item-to-cart";
import buildShoppingCart from "./shopping-cart";

test("add a book", () => {
  const shoppingCart = buildShoppingCart();
  addItemToCart(shoppingCart, "Book", 5);
  expect(document.body.textContent).toBe("5");
});

test("add a case", () => {
  const shoppingCart = buildShoppingCart();
  addItemToCart(shoppingCart, "Case", 10);
  expect(document.body.textContent).toBe("10");
});
```

## Conclusão

Neste artigo vimos alguns problemas que podem ser causados quando testamos um código que usa um Singleton, além disso, também vimos algumas formas de lidar com isso durante os testes. Mas me conta aí, você já passou por alguma situação parecida? Comenta aí! Abraço!