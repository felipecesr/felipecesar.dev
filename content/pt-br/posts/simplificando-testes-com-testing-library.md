---
layout: default
title: Simplificando testes com Testing Library
date: 2021-07-06T16:19:42.847Z
aliases: [/simplificando-testes-com-testing-library/]
---
Fala pessoal! Neste artigo vamos falar sobre [Testing Library](https://testing-library.com/) dando continuidade ao [artigo anterior](https://dev.to/felipecesr/como-criar-um-componente-react-com-tdd-236p). Se quiser pode baixar o [repositório](https://github.com/felipecesr/react-com-tdd-na-pratica/tree/exercise-01-end) para acompanhar o conteúdo.

## O que é?

Como a própria documentação diz, a Testing Library é uma família de pacotes que ajudam a testar componentes de UI do ponto de vista do usuário.

Ele pode ser usado em aplicações com JavaScript puro ou com frameworks, incluindo [React](https://testing-library.com/docs/react-testing-library/intro), [Vue](https://testing-library.com/docs/vue-testing-library/intro) e [Angular](https://testing-library.com/docs/angular-testing-library/intro).

Como estamos usando React, vamos instalar o pacote próprio para ele no nosso projeto:

```bash
npm i -D @testing-library/react
```

Após instalar, altere o arquivo `Highlight.test.js`, removendo a função `render` que criamos e importando a da Testing Library. Você também pode remover o `afterEach`, agora isso é feito por baixo dos panos.

```jsx
import { render } from "@testing-library/react";
import Highlight from "./Highlight";

test("renders a value", () => {
  const value = "3000";
  render(<Highlight value={value} />);
  expect(document.body.textContent).toBe(value);
});

test("renders another value", () => {
  const value = "5000";
  render(<Highlight value={value} />);
  expect(document.body.textContent).toBe(value);
});
```

## Removendo detalhes de implementação

Repare que estamos sempre verificando se o texto da página toda é o valor esperado.

Se houvessem outros elementos com textos na página, seria necessário usar um `querySelector`, com um seletor específico para o elemento.

```javascript
expect(document.querySelector("div").textContent).toBe(value);
```

Isso funcionaria, mas imagine que por algum motivo o elemento deixa de ser uma `div` e passa a ser um `p`.

Sempre que uma mudança desse tipo precisar ser feita você vai alterar o componente e os testes. Esse é um detalhe de implementação que normalmente não faz diferença para o usuário.

Para resolver isso a Testing Library conta com [`queries`](https://testing-library.com/docs/queries/about) que se assemelham a forma como um usuário encontra os elementos na página. Podemos usá-las importando o objeto `screen`, da seguinte forma:

```jsx
import { render, screen } from "@testing-library/react";
import Highlight from "./Highlight";

test("renders a value", () => {
  const value = "3000";
  render(<Highlight value={value} />);
  expect(screen.getByText(value)).toBeTruthy();
});
```

Note que o `expect` mudou um pouco, agora estamos utilizando o método `getByText` para obter um elemento com aquele texto.

Se o elemento for encontrado o teste deve passar, mas repare que passamos a utilizar `toBeTruthy` para fazer a asserção. Será que não tem uma asserção que faça mais sentido?

> Se tiver dúvidas sobre quando um valor é Truthy, esse [link](https://developer.mozilla.org/pt-BR/docs/Glossary/Truthy) do MDN deve te ajudar.

## Adicionando mais asserções

Quando testamos componentes de UI é bem comum verificar se o elemento está na tela, se ele tem um atributo, uma classe, etc.

O [Jest](https://jestjs.io/) não conta com asserções para esse tipo de situação, mas ele nos permite adicioná-las, e a Testing Library conta com uma biblioteca própria para isso, o [`jest-dom`](https://github.com/testing-library/jest-dom).

Execute o seguinte comando:

```bash
npm i -D @testing-library/jest-dom
```

Agora altere o arquivo `Highlight.test.js`, importando o `jest-dom` e utilizando a asserção `toBeInTheDocument`.

```jsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Highlight from "./Highlight";

test("renders a value", () => {
  const value = "3000";
  render(<Highlight value={value} />);
  expect(screen.getByText(value)).toBeInTheDocument();
});
```

Dessa forma, fica bem claro que estamos verificando se um elemento está no DOM.

## `jest-dom` global

Nesse exemplo importamos o `jest-dom` direto no arquivo do teste, mas não precisamos fazer dessa forma, podemos importá-lo de forma global.

Para fazer isso, crie o arquivo `setupTests.js` dentro de `src` e adicione a seguinte linha:

```javascript
import "@testing-library/jest-dom/extend-expect";
```

Feito isso, altere o arquivo `jest.config.js` para que fique assim:

```javascript
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
};
```

Pronto! Com isso não precisamos mais importar o `jest-dom` nos testes.

## Conclusão

Nesse artigo tivemos um primeiro contato com a Testing Library, simplificamos testes e asserções, removendo detalhes de implementação e deixando-os mais próximos da visão do usuário.

A Testing Library conta com muitos recursos que facilitam os testes, e vamos explorá-los mais ainda nos próximos artigos. Se quiser ver como ficou o código pode acessar esse [repositório](https://github.com/felipecesr/react-com-tdd-na-pratica/tree/exercise-02).

Se tiver alguma dúvida ou sugestão deixa um comentário, bora trocar uma ideia. Abraço!