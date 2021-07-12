---
layout: default
title: Como criar testes de integração em aplicações React
date: 2021-07-12T20:09:12.831Z
---
Fala galera! Nos artigos anteriores criamos dois componentes e uma função, testamos cada uma das partes de forma isolada, criando testes que são conhecidos como testes unitários.

Chegou a hora de testar se tudo isso funciona junto, para isso vamos desenvolver uma aplicação simples, criando outro tipo de teste, testes de integração.

## Conhecendo a aplicação

A aplicação é um conversor de moedas, o usuário deve preencher uma quantia e selecionar a moeda dela, quando clicar no botão, a quantia convertida em Real Brasileiro deve ser exibida.

![Wireframe de uma aplicação para converter de moedas](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/o759twvmy48d3q7rj1uk.png)

Para continuar de onde paramos você pode baixar o [repositório](https://github.com/felipecesr/react-com-tdd-na-pratica/tree/master) e fazer um `checkout` na branch `exercise-04`.

Crie o arquivo `App.test.js` dentro de `src` e adicione o seguinte:

```jsx
import { render } from "@testing-library/react";
import App from "./App";

test("shows the amount in brazilian real after submit", () => {
  render(<App />);
});
```

Execute o comando `npm test -- --watch`, e em seguida crie o arquivo `App.js` dentro de `src`.

```jsx
const App = () => null;

export default App;
```

O componente vai funcionar da seguinte forma:

1. Renderiza os componentes `Form` e `Highlight`;
2. O usuário preenche as informações no formulário;
3. As informações são enviadas para uma API que retorna a cotação;
4. A função `multiply` multiplica o valor pela cotação;
5. O valor retornado pela função `multiply` é salvo em um estado e atualizado no componente.

Faça as seguintes alterações no arquivo `App.test.js`:

```jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("shows the amount in brazilian real after submit", () => {
  render(<App />);

  userEvent.type(screen.getByLabelText(/valor/i), "3000");
  userEvent.selectOptions(screen.getByLabelText(/moeda/i), "USD");
  userEvent.click(screen.getByRole("button", { name: /calcular/i }));

  expect(screen.getByText("14808.9")).toBeInTheDocument();
});
```

Dessa forma, após o `render`, o formulário é preenchido com o `userEvent` e após o clique do botão verificamos se o valor esperado está sendo exibido.

O teste deve retornar o seguinte erro:

```
TestingLibraryElementError: Unable to find a label with the text of: /valor/i
```

Para teste passe, faça as seguintes alterações no arquivo `App.js`:

```jsx
import Form from "./components/Form";
import Highlight from "./components/Highlight";

const App = () => {
  const handleSubmit = () => null;

  return (
    <>
      <Form onSubmit={handleSubmit} />
      <Highlight value="14808.90" />
    </>
  )
};
```

Agora precisamos refatorar o código, para que tenha uma implementação que funcione realmente. Para isso, vamos utilizar a [API de Cotações de Moedas](https://docs.awesomeapi.com.br/api-de-moedas) para obter a cotação.

## Refatoração

Faça as seguintes alterações no arquivo `App.js`.

```jsx
import { useState } from "react";
import Form from "./components/Form";
import Highlight from "./components/Highlight";
import { multiply } from './utils/math'

const App = () => {
  const [value, setValue] = useState(null);

  const handleSubmit = async ({ value, coin }) => {
    const res = await window.fetch(
      `https://economia.awesomeapi.com.br/json/last/${coin}-BRL`
    );
    const data = await res.json();

    const result = multiply(data[`${coin}BRL`].ask, value).toFixed(2);
    setValue(result);
  };

  return (
    <>
      <Form onSubmit={handleSubmit} />
      <Highlight value={value} />
    </>
  )
};
```

Com essas alterações o `handleSubmit` envia os dados, multiplica os valores e armazena o valor em um estado, exatamente como descrevemos antes.

Teoricamente os testes deveriam estar passando, mas não estão, repare que aparecem várias mensagens de erro, e uma delas é essa:

```
TypeError: window.fetch is not a function
```

Isso acontece porque os testes são executados em um ambiente [Node.js](https://nodejs.org/en/), onde não existe uma implementação nativa para a [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

Para resolver isso, é necessário usar um polyfill, você pode instalar usando o seguinte comando:

```
npm install --save whatwg-fetch
```

Após a instalação, adicione a seguinte linha no arquivo `jest.config.js`:

```
setupFiles: [require.resolve('whatwg-fetch')],
```

Isso é o suficiente para que possamos usar o `fetch` no ambiente de testes. Se você olhar no terminal, os erros sobre o `fetch` não aparecem mais, o único problema é o teste falhando, mas já vamos resolver isso.

## Testando fluxos assíncronos

Observe onde o teste falha:

```
> 12 |   expect(screen.getByText("14808.90")).toBeInTheDocument();
```

Observe também, que a `div` onde o valor deveria estar, está vazia:

```
<body>
  <div>
    <form>...</form>
    <div />
  </div>
</body>
```

Nenhum valor foi exibido porque o `expect` foi executado antes da requisição ser concluída. Para resolver isso, precisamos fazer duas alterações.

Primeiro, o bloco do teste deve ser assíncrono:

```javascript
test("shows the amount in brazilian real after submit", async () => {
  render(<App />);
```

E segundo, a asserção deve ser feita após a requisição ser concluída para exibir o valor esperado. Podemos usar uma query do tipo `findBy` ao invés de `getBy`, queries desse tipo são assíncronas.

```javascript
expect(await screen.findByText("14808.90")).toBeInTheDocument();
```

## Criando um mock para a Fetch API

Nesse momento, provavelmente o teste está falhando, e eu falo provavelmente porque é algo incerto. Estamos fazendo um requisição para uma API externa, que retorna valores que mudam constantemente.

Nesse tipo de teste, não devemos nos fazer requisições para nenhum serviço externo. Então, ao invés de chamar o `fetch` original, precisamos de algo que funcione no lugar dele, um `mock`.

Dessa vez vamos utilizar o método [`spyOn`](https://jestjs.io/docs/jest-object#jestspyonobject-methodname) dentro de um [`beforeAll`](https://jestjs.io/docs/api#beforeallfn-timeout). Adicione a seguinte linha antes da função `test` no arquivo `App.test.js`:

```javascript
beforeAll(() => jest.spyOn(window, "fetch"));
```

O `spyOn` funciona de forma parecida com o [`jest.fn`](https://jestjs.io/docs/jest-object#jestfnimplementation), ele recebe um objeto, o nome do método que será mocado e adiciona as propriedades de uma [função mock](https://jestjs.io/docs/mock-function-api), permitindo fazer as seguintes asserções:

```javascript
expect(window.fetch).toHaveBeenCalledWith(
  "https://economia.awesomeapi.com.br/json/last/USD-BRL"
);
expect(window.fetch).toHaveBeenCalledTimes(1);
```

Só isso não é o suficiente, porque o `fetch` original continua sendo chamado. Para que isso não aconteça, podemos usar o método [`mockImplementationOnce`](https://jestjs.io/docs/mock-function-api#mockfnmockimplementationoncefn) para definir uma implementação própria para o `fetch`. Adicione o seguinte código após a chamada do `render` no teste:

```javascript
window.fetch.mockImplementationOnce(() => Promise.resolve({
  ok: true,
  json: async () => ({
    USDBRL: { ask: "4.9363" },
  }),
}));
```

Dessa forma, ao invés de chamar o `fetch` original, a função que passamos para o `mockImplementationOnce` é que será chamada. O Jest conta com um método chamado [`mockResolvedValueOnce`](https://jestjs.io/docs/mock-function-api#mockfnmockresolvedvalueoncevalue) que é um "syntactic sugar" para o que acabamos de fazer.

```javascript
window.fetch.mockResolvedValueOnce({
  ok: true,
  json: async () => ({
    USDBRL: { ask: "4.9363" },
  }),
});
```

Feito isso, os testes devem voltar a passar.

## Testando um erro na requisição

Para testar a situação em que a API retorna um erro, podemos criar um teste parecido com o anterior, a diferença nesse caso, é que a API retorna uma mensagem de erro e verificamos se essa mensagem está sendo exibida.

```jsx
test("renders an error message from the server", async () => {
  const testError = "test error";
  render(<App />);

  window.fetch.mockResolvedValueOnce({
    ok: false,
    json: async () => ({ message: testError }),
  });

  userEvent.type(screen.getByLabelText(/valor/i), "3000");
  userEvent.selectOptions(screen.getByLabelText(/moeda/i), "USD");
  userEvent.click(screen.getByRole("button", { name: /calcular/i }));

  expect(await screen.findByRole("alert")).toHaveTextContent(testError);
});
```

Para que o teste passe, faça as seguintes alterações no arquivo `App.js`

```jsx
const App = () => {
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async ({ value, coin }) => {
    const res = await window.fetch(
      `https://economia.awesomeapi.com.br/json/last/${coin}-BRL`
    );
    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return;
    }

    const result = multiply(data[`${coin}BRL`].ask, value).toFixed(2);
    setValue(result);
  };

  return (
    <>
      <Form onSubmit={handleSubmit} />
      <Highlight value={value} />
      {error && <div role="alert">{error}</div>}
    </>
  )
};
```

## Conclusão

Nesse artigo, criamos testes de integração para verificar se os componentes que foram desenvolvidos nos artigos anteriores funcionam juntos em uma aplicação, adicionamos suporte para a Fetch API e mais uma vez criamos mocks.

Em aplicações Front-End, testes unitários e testes de integração são bem parecidos, a diferença é que nos testes de integração podemos testar fluxos bem maiores, como páginas ou até mesmo uma aplicação completa, como nesse caso.

Essa série é algo que estou gostando bastante de fazer, espero que este conteúdo esteja ajudando, qualquer coisa não deixa de comentar.

Como de costume, aqui o [repositório](https://github.com/felipecesr/react-com-tdd-na-pratica/tree/exercise-05) para com código feito nesse artigo. Abraço!