---
layout: default
title: Como criar um componente React com TDD
tags:
  - react
  - tdd
  - javascript
date: 2021-07-06T02:20:58.090Z
aliases:
  - /como-criar-um-componente-react-com-tdd/
---
Quando começamos a estudar sobre TDD (Test Driven Development) é comum surgirem algumas dúvidas, por exemplo, o que testar? como escrever testes antes do código de produção?

Este é um artigo bem prático que tem como objetivo acabar com algumas dessas dúvidas se tratando de aplicações React.

## Test Driven Development

O Test Driven Development ou TDD significa Desenvolvimento Orientado a Testes e é uma prática que consiste em um ciclo curto de três passos, conhecidos como Red/Green/Refactor.

![TDD Flow](https://miro.medium.com/max/475/1*5IFu-XBsbzobAK3UxIOq4Q.png)

- **Red**: Primeiro escrevemos um teste que falha, para alguma funcionalidade que ainda será desenvolvida.
- **Green**: Com o teste criado, escrevemos uma solução simples para fazê-lo passar.
- **Refactor**: Por último refatoramos, ou seja, melhoramos o código.

Esse ciclo deve se repetir várias vezes durante todo o desenvolvimento.

Tendo isso em mente podemos ver como esse ciclo funciona na prática.

## Escrevendo um teste que falha

Para acompanhar o desenvolvimento você pode baixar o [repositório](https://github.com/felipecesr/react-com-tdd-na-pratica/tree/master) e fazer o checkout na branch `exercise-01-start`.

Após baixar o código, crie a pasta `src/components` e adicione o arquivo `Highlight.test.js` com o seguinte conteúdo:

```jsx
import ReactDOM from "react-dom";
import Highlight from "./Highlight";

test("renders a value", () => {
  const container = document.createElement("div");
  document.body.appendChild(container);

  ReactDOM.render(<Highlight />, container);

  expect(document.body.textContent).toBe("3000");
});
```

A função `test` recebe uma descrição do teste como primeiro parâmetro. É uma boa prática sempre começar com um verbo no presente. O segundo parâmetro é uma função anônima com o código do teste.

Uma `const` chamada `container` tem como valor uma `div`, que é o elemento onde o componente será renderizado.

O método `render` do `ReactDOM` é utilizado para renderizar o componente.

Por último, é feita uma chamada a função `expect`, ela fornece uma [lista de métodos](https://jestjs.io/docs/expect#methods) que nos permitem fazer diferentes asserções. Neste caso, verificamos se o `textContent` da página é `3000`.

Execute o comando `npm test`, veja que o teste está falhando, isso já era esperado, porque ainda estamos no primeiro passo do ciclo.

## Fazendo o teste passar

Agora crie o arquivo `Highlight.js` dentro de `src/components`, com o seguinte conteúdo:

```jsx
const Highlight = () => <div>3000</div>;

export default Highlight;
```

Por enquanto não precisamos de nada além disso para que o teste passe.

## Refatorando o código

Adicionamos um valor "na mão", apenas para o teste passar, mas vamos precisar que o componente funcione com outros valores, para isso vamos fazer a seguinte alteração no teste:

```jsx
ReactDOM.render(<Highlight value="3000" />, container);
```

E logo em seguida no componente:

```jsx
const Highlight = ({ value }) => <div>{value}</div>;
```

Fizemos essas mudanças na intenção ter um código melhor, que funcione com diferentes valores, mas quem garante que funciona?

## Repetindo o ciclo

Para garantir que o componente está funcionando como esperado, podemos repetir o ciclo escrevendo outro teste. Adicione o seguinte código no arquivo `Highlight.test.js`:

```jsx
test("renders another value", () => {
  const container = document.createElement("div");
  document.body.appendChild(container);

  ReactDOM.render(<Highlight value="5000" />, container);

  expect(document.body.textContent).toBe("5000");
});
```

Execute os testes novamente. Note que o segundo teste falha e com um erro bem estranho:

```
Expected substring: "5000"
Received string:    "30005000"
```

Isso acontece porque adicionamos um elemento ao `body` e não o removemos após a execução do primeiro teste.

## Removendo efeitos colaterais

Para que o teste passe, devemos garantir que o que foi feito em um não interfira no resultado do outro. Podemos remover todos os elementos do `body` após cada teste. A função `afterEach` do Jest permite fazer isso de uma forma bem simples. Adicione o seguinte código antes dos testes:

```javascript
afterEach(() => {
  document.body.innerHTML = "";
});
```

## Removendo código duplicado

Se olharmos bem o arquivo de teste, podemos ver claramente que alguns itens se repetem. Essa é a hora em que devemos resistir a tentação de passar para o próximo componente e trabalhar duro para deixar nosso código o mais limpo possível.

Crie a seguinte função no arquivo de testes:

```javascript
function render(component) {
  const container = document.createElement("div");
  document.body.appendChild(container);

  ReactDOM.render(component, container);
}
```

Ela contém o código que se repete nos dois testes. Com essa função, podemos refatorar os testes, tornando-os mais simples:

```jsx
test("renders a value", () => {
  const value = "3000"; // Arrange
  render(<Highlight value={value} />); // Act
  expect(document.body.textContent).toBe(value); // Assert
});

test("renders another value", () => {
  const value = "5000"; // Arrange
  render(<Highlight value={value} />); // Act
  expect(document.body.textContent).toBe(value); // Assert
});
```

Para saber se um teste é bom, você deve ser capaz de identificar cada uma das seguintes etapas:

- **Arrange**: Faz o setup das dependências de teste
- **Act**: Executa o código de produção em teste
- **Assert**: Verifica se as expectativas são atendidas

Mas isso não é tudo, podemos deixar os testes ainda melhores, garantindo que eles atendam alguns requisitos:

- Sejam descritivos
- Independentes de outros testes
- Não tenham efeitos colaterais

O ideal é sempre buscar atender todos esses requisitos, você vai ganhar muito com isso e provavelmente evitar algumas dores de cabeça no futuro.

## Conclusão

Nesse artigo desenvolvemos um componente React seguindo o TDD, fiz o possível para que não ficasse muito longo.

Se esse conteúdo te ajudou ou se ficou alguma dúvida, deixa um comentário, isso me ajuda a saber se devo criar mais conteúdo desse tipo.

Ah! O código completo pode ser encontrado nesse [repositório](https://github.com/felipecesr/react-com-tdd-na-pratica/tree/exercise-01-end). Abraço!
