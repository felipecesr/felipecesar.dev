---
layout: default
title: "React com TDD: Buscando dados de uma API"
date: 2020-04-10T19:12:13.285Z
---
Componentes React normalmente contém um mix de **lógica** e **apresentação**. Quando falamos em lógica, nos referimos a qualquer parte que não seja relacionada a UI, como chamadas de API, eventos e manipulação de dados.

No artigo anterior criamos o componente `UserList` que será a camada de apresentação, nesse artigo vamos criar o componente que terá a lógica responsável por fazer a requisição dos dados. Essa separação de responsabilidades é conhecida como **Container and Presentational Pattern**.

## Iniciando o desenvolvimento

Antes de iniciar o desenvolvimento vamos instalar o `whatwg-fetch` que é um polyfill da api `fetch`, vamos precisar dele nos nossos testes.

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

Antes de seguir em frente vamos entender esse código.

* `beforeEach` e `AfterEach` são funções que serão executadas antes e depois de cada teste.
* Usamos o `jest.spyOn` para criar um `stub`, um `stub` é um dublê de teste que sempre retorna o mesmo valor quando é chamado.
* Dublês de teste são objetos que atuam no lugar de outros objetos, nesse caso um objeto vai atuar como o `fetch`.
* `mockRestore` restaura o `fetch` original.

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

Nesse teste montamos o componente e verificamos se o `fetch` foi chamado com os parâmetros corretos usando `toHaveBeenCalledWith`.

Se executarmos o teste agora, ele vai retornar uma mensagem de erro "Cannot find module" porque ainda não criamos o arquivo com o componente. Então vamos criar o arquivo `src/UserListContainer.js` retornando null por enquanto.

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

Para fazer o teste passar precisamos importar o hook `useEffect` e fazer a requisição quando o componente for iniciado.

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

Os próximos testes vão verificar se o componente `UserList` está será renderizado corretamente, para isso precisamos importá-lo primeiro.

```javascript
import * as UserListExports from "../src/UserList";
```

Ele está sendo importado dessa forma porque vamos criar um stub para o `UserList` (isso mesmo, também podemos fazer stubs de componentes).

```javascript
beforeEach(() => {
  jest.spyOn(window, "fetch").mockReturnValue(users);
  jest.spyOn(UserListExports, "UserList").mockReturnValue(null);
});

afterEach(() => {
  window.fetch.mockRestore();
  UserListExports.UserList.mockRestore();
});
```

Feito isso, nosso próximo teste deve verificar se `UserList` está sendo chamado e se recebe a `prop` users com um `array` vazio.

```javascript
it("initially passes no data to UserList", () => {
  render(<UserListContainer />);
  expect(UserListExports.UserList).toHaveBeenCalledWith(
    { users: [] },
    expect.anything()
  );
});
```

No `toHaveBeenCalledWith` podemos usar `expect.anything` quando o valor do argumento pode ser qualquer coisa, contanto que não seja `null` ou `undefined`.

Para que o teste passe precisamos importar o `UserList` dentro de `UserListContainer` e retorná-lo com o valor esperado.

```javascript
import { UserList } from './UserList';

const UserListContainer = () => {

  ...

  return <UserList users={[]} />;
};
```

Feito isso, precisamos criar um teste que vai verificar se o componente exibe os dados corretamente quando a requisição for concluída.

```javascript
it("displays users that are fetched on mount", () => {
  render(<UserListContainer />);
  expect(UserListExports.UserList).toHaveBeenCalledWith(
    { users },
    expect.anything()
  );
});
```

Para o teste passar precisamos importar o hook `userState` dentro do `UserListContainer` e usá-lo para armazenar os dados no estado do componente.

```javascript
import React, { useEffect, useState } from "react";

const UserListContainer = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await window.fetch("/tv/popular", {
        method: "GET",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
      });
      const users = await response.json();

      setUsers(users);
    };

    fetchMovies();
  }, []);

  return <UserList users={users} />;
};
```

Executando os testes agora, podemos ver que o teste ainda não está passando e além do erro ele mostra vários avisos dizendo que o `act` não está sendo usado corretamente, como alteramos o estado do componente após a requisição precisamos usa o `act`.

```javascript
import { render, act } from "@testing-library/react";

...

it("displays users that are fetched on mount", async () => {
  await act(async () => render(<UserListContainer />));

  ...
});
```

Agora o teste está passando, mas ainda tem warnings sendo exibidos. Isso acontece porque agora os testes anteriores também precisam do `act`.

```javascript
it("fetches data when component is mounted", async () => {
  await act(async () => render(<UserListContainer />));

  ...
});

it("initially passes no data to UserList", async () => {
  await act(async () => render(<UserListContainer />));

  ...
});
```

adsa