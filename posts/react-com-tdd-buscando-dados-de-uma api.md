---
layout: default
title: "React com TDD: Buscando dados de uma API"
date: 2020-04-10T19:12:13.285Z
---
Componentes React normalmente contém um mix de **lógica** e **apresentação**. Quando falamos em lógica, nos referimos a qualquer parte que não seja relacionada a UI, como chamadas de API, eventos e manipulação de dados.

No artigo anterior criamos o componente `UserList` que será a camada de apresentação, nesse artigo vamos criar o componente que terá a lógica responsável por fazer a requisição dos dados.

Essa separação de responsabilidades é conhecida como **Container and Presentational Pattern** e será usada nesse artigo.

## Iniciando o desenvolvimento

Antes de iniciar o desenvolvimento vamos instalar o `whatwg-fetch` que é um polyfill que vai nos permitir usar o `fetch` dentro do Jest.

```shell
npm i whatwg-fetch
```

Feito isso, vamos criar o arquivo `test/UserListContainer.test.js` e adicionar o conteúdo.

```javascript
import React from "react";
import "whatwg-fetch";
import { UserListContainer } from "../src/UserListContainer";

describe("UserListContainer", () => {
  const users = [
    { id: 1, name: "Iron Man" },
    { id: 2, name: "Hulk" },
  ];

  beforeEach(() => {
    jest.spyOn(window, "fetch").mockReturnValue(users);
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });
});
```

Antes de seguir em frente vou explicar o que está algumas coisas sobre esse código.

* beforeEach e AfterEach são funções que serão executadas antes e depois de cada teste.
* Usamos o jest.spyOn para criar um stub no window.fetch, um stub é um dublê de teste que sempre retorna o mesmo valor quando é chamado.
* mockRestore restaura o fetch ao que era antes

  > Dublês de teste são objetos que atuam no lugar de outros objetos

Agora podemos escrever nosso primeiro teste:

```javascript
it("fetches data when component is mounted", () => {
  render(<UserListContainer />);
  expect(window.fetch).toHaveBeenCalledWith(
    "/tv/popular",
    expect.objectContaining({
      method: "GET",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
    })
  );
});
```

No teste usamos o método `toHaveBeenCalledWith` para verificar se o `fetch` foi chamado quando montamos o componente.

Se executarmos o teste agora, ele vai retornar uma mensagem de erro "Cannot find module" porque ainda não criamos o arquivo com o Container. Então vamos criar o arquivo `src/UserListContainer.js` retornando null por enquanto.

```javascript
const UserListContainer = () => null;

export { UserListContainer };
```

Agora quando executamos o código podemos ver que o fetch não foi chamado.

```shell
expect(jest.fn()).toHaveBeenCalledWith(...expected)
Expected: "/tv/popular", ...
Number of calls: 0
```

Para fazer o teste passar precisamos importar o hook `useEffect` para fazer a requisição quando o componente for iniciado.*

```javascript
import React, { useEffect } from "react";

const UserListContainer = () => {
  useEffect(() => {
    const fetchMovies = () => {
      window.fetch("/tv/popular", {
        method: "GET",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
      });
    };

    fetchMovies();
  }, []);

  return null;
};
```

## Testando a apresentação

Os próximos testes vão verificar se o componente `UserList` está sendo renderizado corretamente...