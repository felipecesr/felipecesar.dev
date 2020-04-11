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

Os próximos testes vão verificar se o componente `UserList` está será renderizado corretamente, para isso precisamos importá-lo primeiro.

```javascript
import * as UserListExports from "../src/UserList";
```

Ele está sendo importado dessa forma porque vamos criar um stub para ele (isso mesmo, também podemos fazer stubs de componentes).

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

Feito isso, nosso próximo teste deve verificar se `UserList` está sendo iniciado corretamente.

```javascript
it("initially passes no data to UserList", () => {
  render(<UserListContainer />);
  expect(UserListExports.UserList).toHaveBeenCalledWith(
    { users: [] },
    expect.anything()
  );
});
```

Nesse caso queremos saber se `UserList` foi chamado e se ele recebeu um `array` vazio como prop, por isso usamos `toHaveBeenCalledWith`.

Quando usamos toHaveBeenCalledWith podemos passar expect.anything como argumento para dizer que não nos importamos com qual é o valor dele.*

Para que o teste passe precisamos importar o `UserList` dentro de `UserListContainer` e retorná-lo com o valor esperado.

```javascript
import { UserList } from './UserList';

...

return <UserList users={[]} />;
```

Agora precisamos testar se o componente vai exibir os dados corretamente quando a requisição for concluída.

```javascript
it("displays users that are fetched on mount", () => {
  render(<UserListContainer />);
  expect(UserListExports.UserList).toHaveBeenCalledWith(
    { users },
    expect.anything()
  );
});
```

Para fazer o teste passar precisamos importar o hook `userState` dentro do `UserListContainer` e usá-lo para armazenar os dados no estado do componente.

```javascript
import React, { useEffect, useState } from "react";

const UserListContainer = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const result = await window.fetch("/tv/popular", {
        method: "GET",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
      });

      setUsers(result);
    };

    fetchMovies();
  }, []);

  return <UserList users={users} />;
};
```

Executando os testes agora, podemos ver que o teste ainda não está passando e além do erro ele mostra vários warnings dizendo que o `act` não está sendo usado corretamente.

Esse warning aparece porque alteramos o estado quando a requisição terminou.

```javascript
import { render, act } from "@testing-library/react";

...

it("displays users that are fetched on mount", async () => {
  await act(async () => render(<UserListContainer />));

  ...
});
```

> The async form of act does the same two things that the sync form does, but it also flushes the current runtime task queue. For those of you who have been doing this manually before React 16.9, this is equivalent to calling await new Promise(setTimeout).

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