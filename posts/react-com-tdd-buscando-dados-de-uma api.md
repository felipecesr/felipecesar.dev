---
layout: default
title: "React com TDD: Buscando dados de uma API"
date: 2020-04-10T19:12:13.285Z
---
Componentes React normalmente contém um mix de **lógica** e **apresentação**. Quando falamos em lógica, nos referimos a qualquer parte que não seja relacionada a UI, como chamadas de API, eventos e manipulação de dados.

No artigo anterior criamos um componente de lista, esse componente será a apresentação e a lógica será o componente que vamos criar agora.

Essa separação de responsabilidades é conhecida como **Container and Presentational Pattern** e será usada nesse artigo.

## Iniciando o desenvolvimento

Para começar vamos criar o arquivo `test/MoviesContainer.test.js` com o primeiro teste.

```javascript
import React from "react";
import { render } from "@testing-library/react";
import { MovieContainer } from "../src/MovieContainer";

describe("MovieContainer", () => {
  it("fetches data when component is mounted", () => {
    render(<MovieContainer />);
    expect(window.fetch).toHaveBeenCalledWith(
      "/tv/popular",
      expect.objectContaining({
        method: "GET",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" }
      })
    );
  });
});
```