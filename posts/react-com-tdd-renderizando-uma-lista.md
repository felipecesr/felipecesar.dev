---
layout: default
title: "React com TDD: Renderizando uma lista"
date: 2020-04-05T00:24:22.838Z
---
Aprenda como criar um componente de lista em React com desenvolvimento guiado por testes.

## Introdução

Dando continuidade ao [artigo anterior](https://felipecesar.dev/escrevendo-um-componente-react-com-tdd), onde criamos o componente `UserInfo`, neste artigo vamos criar o componente `UserList` que vai receber um `array` com nomes de usuários e renderizar uma lista com cada um deles.

Além disso, também vamos começar a usar uma ferramenta que não usamos no artigo anterior, o [Testing Library](https://testing-library.com/).

## Testing Library

O Testing Library, de uma forma bem resumida, é uma familia de pacotes que nos permite interagir diretamente com DOM por meio de queries que ajudam a testar nossas aplicações de um ponto de vista semelhante ao do usuário, reduzindo detalhes de implementação.

Ele pode ser usado em aplicações com JavaScript puro ou com frameworks, incluindo [React](https://testing-library.com/docs/react-testing-library/intro), [Vue](https://testing-library.com/docs/vue-testing-library/intro) e [Angular](https://testing-library.com/docs/angular-testing-library/intro).

Como estamos usando React, vamos instalar o pacote próprio para ele no nosso projeto.

```shell
npm install --save-dev @testing-library/react
```

Após a instalação, vamos criar um arquivo chamado `UserList.test.js`. Dessa vez não vamos criar um método render, vamos importá-lo diretamente do Testing Library.

```javascript
import { render } from '@testing-library/react';
```

## Renderizando a lista

Com o arquivo `UserList.test.js` criado, vamos escrever nosso primeiro teste.

```javascript
describe("UserList", () => {
  it("renders multiple users in ul element", () => {
    const users = [
      { id: 1, name: "Matthew Murdock" },
      { id: 2, name: "Frank Castle" }
    ];

    const { container } = render(<UserList users={users} />);

    expect(container.querySelector("ul")).not.toBeNull();
    expect(container.querySelector("ul").children).toHaveLength(2);
  });
});
```

Repare que o `render` do Testing Library nos permite usar o `container` de forma semelhante a que criamos antes.

Lembrando que quando estamos desenvolvendo com TDD precisamos seguir todo o fluxo dele, então vamos executar nosso teste e vê-lo falhar.

```shell
● UserList › renders multiple users in ul element

ReferenceError: UserList is not defined
```

Para corrigir isso, vamos criar o arquivo `UserList.js`, retornando apenas `null` por enquanto.

```javascript
export const UserList = () => null;
```

E importá-lo dentro do teste.

```javascript
import { UserList } from '../src/UserList';
```

Ao retornar `null` dessa forma, deixamos de receber um erro do React e passamos a receber uma mensagem de erro mais amigável.

```shell
expect(received).not.toBeNull()

Received: null

   9 | const { container } = render(<UserList users={users} />);
  10 | 
> 11 | expect(container.querySelector("ul")).not.toBeNull();
     |                                           ^
```

Vamos fazer o mínimo necessário para o teste passar.

```javascript
const List = () => <ul />;
```

Ao executar o teste novamente, recebemos outro erro.

```shell
Expected length: 2
Received length: 0
Received object: []

  10 | 
  11 | expect(container.querySelector("ul")).not.toBeNull();
> 12 | expect(container.querySelector("ul").children).toHaveLength(2);
     |   
```

Como temos mais de um `expect` podemos ver em qual deles o teste está falhando.

Vamos usar a função `map` para renderizar todos os itens da lista.

```javascript
const List = ({ users }) => (
  <ul>
    {users.map(() => <div />)}
  </ul>
);
```

Você pode estar se perguntando por quê usei `div` ao invés de `li`, por enquanto isso não vai fazer diferença no resultado do teste, podemos usar os próximos testes para verificar se os itens são `li`.

Após essa alteração o teste deve passar, mas com um aviso que não devemos ignorar.

```shell
console.error node_modules/react/cjs/react.development.js:175
Warning: Each child in a list should have a unique "key" prop.
```

Para remover esse aviso, podemos fazer o que ele diz e adicionar a `prop` nos itens da lista.

```javascript
<ul>
  {users.map(user => <div key={user.id} />)}
</ul>
```

## Especificando os itens da lista

Agora vamos preencher os itens da lista que acabamos de criar. Primeiro, vamos criar outro teste.

```javascript
it("renders each user in a li", () => {
  const users = [
    { id: 1, name: "Matthew Murdock" },
    { id: 2, name: "Frank Castle" }
  ];

  const { container } = render(<UserList users={users} />);
  const listItems = container.querySelectorAll("li");


  expect(listItems).toHaveLength(2);
  expect(listItems[0].textContent).toEqual("Matthew Murdock");
  expect(listItems[1].textContent).toEqual("Frank Castle");
});
```

Ao executá-lo devemos receber o seguinte erro.

```shell
Expected length: 2
Received length: 0
Received object: []

  25 | const listItems = container.querySelectorAll("li");
  26 | 
> 27 | expect(listItems).toHaveLength(2);
     |                   ^
```

Como não existe nenhum elemento `li` o teste não vai passar, vamos corrigir isso.

```javascript
<ul>
  {users.map(user => <li key={user.id} />)}
</ul>
```

Recebemos outro erro após executar novamente o teste.

```shell
Expected: "Matthew Murdock"
Received: ""

  26 |
  27 | expect(listItems).toHaveLength(2);
> 28 | expect(listItems[0].textContent).toEqual("Matthew Murdock");
     |                                  ^
```

Para corrigi-lo, precisamos exibir o nome do usuário no item da lista.

```javascript
<ul>
  {users.map(user => (
    <li key={user.id}>{user.name}</li>
  ))}
</ul>
```

Pronto! Temos o nosso componente de lista funcionando e coberto por testes, só falta refatorar nosso código.

## Refatorando

Não sei se você reparou, mas instalamos o Testing Library para melhorar a forma como escrevemos os testes. Até agora não vimos nenhuma diferença, simplesmente deixamos de criar um método `render` para usar um que já está pronto.

Para deixar nossos testes mais próximos da forma como o usuário interage com a aplicação, podemos usar as queries que o Testing Library nos dá.

O Testing Library conta com queries que podemos usar para interagir diretamente com o DOM, `ByLabelText`, `ByPlaceholderText` e `ByText`, são algumas delas, além disso, cada query tem variantes como `getBy` e `getAllBy`. Na [documentação](https://testing-library.com/docs/dom-testing-library/api-queries) você pode ver exatamente o que cada uma delas faz.

No primeiro teste, vamos usar a query `getByRole`, com ela podemos buscar um elemento do DOM a partir de uma **ARIA role**.

```javascript
it("renders multiple users in list", () => {
  const users = [
    { id: 1, name: "Matthew Murdock" },
    { id: 2, name: "Frank Castle" }
  ];

  const { getByRole } = render(<UserList users={users} />);

  expect(getByRole("list")).not.toBeNull();
  expect(getByRole("list").children).toHaveLength(2);
});
```

Quando usamos o `getByRole` não passamos o seletor do elemento, ao invés disso passamos a `role` dele. Cada elemento possui uma `role` padrão, que deve ser usada caso não tenha nenhuma outra definida com por meio de um atributo.

Como isso torna nosso código mais próximo da forma que o usuário interage com a aplicação?

Podemos pensar que estamos dizendo para o usuário checar se uma existe uma lista e se ela tem dois itens, independente de ser um `ul` ou `ol`, não precisamos desses detalhes de implementação no teste.

Você pode conferir a `role` de cada elemento nessa [lista](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles).

No segundo teste, podemos usar a query `getByAllRole` para obter todos os itens da lista.

```javascript
it("renders each user in a list item", () => {
  const users = [
    { id: 1, name: "Matthew Murdock" },
    { id: 2, name: "Frank Castle" }
  ];

  const { getAllByRole } = render(<UserList users={users} />);
  const listItems = getAllByRole("listitem");

  expect(listItems).toHaveLength(2);
  expect(listItems[0].textContent).toEqual("Matthew Murdock");
  expect(listItems[1].textContent).toEqual("Frank Castle");
});
```

Por fim, movemos o `array` de usuários para o topo da função `describe`, deixando o código mais limpo e sem repetições.

```javascript
describe("UserList", () => {
  const users = [
    { id: 1, name: "Matthew Murdock" },
    { id: 2, name: "Frank Castle" }
  ];

  it("renders multiple users in list", () => {
    const { getByRole } = render(<UserList users={users} />);
    expect(getByRole("list")).not.toBeNull();
    expect(getByRole("list").children).toHaveLength(2);
  });

  it("renders each user in a list item", () => {
    const { getAllByRole } = render(<UserList users={users} />);
    const listItems = getAllByRole("listitem");
    expect(listItems).toHaveLength(2);
    expect(listItems[0].textContent).toEqual("Matthew Murdock");
    expect(listItems[1].textContent).toEqual("Frank Castle");
  });
});
```

## Conclusão

Neste artigo, criamos um componente de lista com TDD e ainda podemos aprender um pouco sobre Testing Library, nos próximos vamos explorar um pouco mais essa lib. Se tiverem dúvidas ou sugestões não deixem de comentar. Abraço!