---
language: pt-BR
title: Escrevendo um componente React com TDD
date: 2020-04-02T22:51:54.849Z
---

Como funciona o desenvolvimento guiado por testes na criação de um componente React.

## Introdução

Nesse artigo vamos ver um passo a passo de como criar um componente React seguindo o TDD. Não vou me aprofundar muito, então é importante que você tenha algum conhecimento em React e Jest. Antes de começar a prática vamos relembrar como funciona o TDD.

## Test-driven Development

![TDD Flow](https://miro.medium.com/max/475/1*5IFu-XBsbzobAK3UxIOq4Q.png)

O Test-driven Development (TDD) é uma técnica que guia o desenvolvimento de software por meio de testes.

Basicamente seguimos um fluxo de desenvolvimento que possui 3 passos:

- **Red**: Primeiro escrevemos um teste que falha, para alguma funcionalidade que ainda será desenvolvida.
- **Green**: Com o teste criado, escrevemos uma solução simples para fazê-lo passar.
- **Refactor**: Por último refatoramos, ou seja, melhoramos o código.

Tendo isso em mente, podemos começar a desenvolver nosso componente passando por cada uma dessas etapas.

## Escrevendo um teste que falha

Vamos criar um componente bem simples, ele recebe um nome de usuário e exibe.

Como o desenvolvimento é guiado por testes, começamos criando o arquivo de teste `UserInfo.test.js`.

Dentro desse arquivo ficarão os testes do nosso componente. Vamos adicionar o seguinte código:

```javascript
import React from 'react'
import ReactDOM from 'react-dom'

describe('UserInfo', () => {
  it('renders the user name', () => {})
})
```

A função `describe` define uma suíte de testes. Para componentes React é uma boa prática atribuir a suíte de testes o mesmo nome do componente que será testado.

A função `it` define um único teste. O primeiro argumento é a descrição do teste e é uma boa prática sempre começar com um verbo no presente.

Você pode ler as descrições das funções `describe` e `it` como uma única frase: **UserInfo renders the user name (UserInfo renderiza o nome de usuário)**. Essa é uma boa prática que deve ser seguida sempre que possível.

Dentro do bloco `it` vamos criar uma `const` chamada `user` com um atributo `name` que armazena o nome do usuário. Depois criamos outra `const` chamada `component` que armazena o componente `UserInfo` com a prop `name`.

```jsx
const user = { name: 'Walter White' }
const component = <UserInfo name={user.name} />
```

Vamos criar uma `const` chamada `container` e dentro dela vamos criar uma `div`. Essa `div` é onde o componente será renderizado.

```javascript
const container = document.createElement('div')
```

Depois chamamos o método `ReactDOM.render` passando o componente que queremos renderizar e o elemento HTML onde ele será renderizado.

```javascript
ReactDOM.render(component, container)
```

Por fim chamamos a função `expect` que recebe um valor e compara com um valor esperado. Nesse caso o valor esperado é **`Walter White`** e o valor recebido é `container.textContent`.

```javascript
expect(container.textContent).toMatch('Walter White')
```

Quando executarmos o teste ele vai dar o seguinte erro:

```shell
ReferenceError: UserInfo is not defined
   5 |   it('renders the user name', () => {
   6 |     const user = { name: 'Walter White' };
>  7 |     const component = <UserInfo name={user.name} />;
```

Não definimos o componente `UserInfo` de propósito, primeiro escrevemos um teste que falha lembra?

## Fazendo o teste passar

Dentro do arquivo UserInfo.js vamos criar o nosso componente da maneira mais simples possível para o teste passar.

```javascript
import React from 'react'

export const UserInfo = () => <div>Walter White</div>
```

Não se assuste! Como eu disse, a solução deve ser a **mais simples possível**.

E importá-lo dentro do arquivo `UserInfo.test.js`.

```javascript
import { UserInfo } from './UserInfo'
```

Ao executar novamente nosso teste vemos que ele passou:

```
PASS  test/UserInfo.test.js

UserInfo
✓ renders the user name (21ms)
```

Show! Nosso teste está passando, mas e se quisermos usar esse componente com outro valor?

Para chegar em uma implementação real, precisamos adicionar mais testes, esse processo é chamado de **triangulação**. Então vamos escrever mais um teste:

```javascript
it('renders another user name', () => {
  const user = { name: 'Jesse Pinkman' }
  const component = <UserInfo name={user.name} />
  const container = document.createElement('div')
  ReactDOM.render(component, container)
  expect(container.textContent).toMatch('Jesse Pinkman')
})
```

Ao executar novamente nosso teste, vemos que ele volta a falhar, mas com um erro diferente dessa vez:

```
● UserInfo › renders another user name

  expect(received).toMatch(expected)

  Expected substring: "Jesse Pinkman"
  Received string:    "Walter White"
```

Precisamos alterar nosso componente de uma forma que os dois testes passem:

```javascript
export const UserInfo = ({ name }) => <div>{name}</div>
```

Show! Agora quando rodamos nossos testes eles passam.

```
PASS  test/UserInfo.test.js

UserInfo
✓ renders the user name (26ms)
✓ renders another user name (2ms)
```

Mas será que nosso código não poderia ficar melhor?

## Refatoração

Essa é a hora em que devemos resistir a tentação de passar para o próximo componente e trabalhar duro para deixar nosso código, tanto de produção quanto o de teste, o mais limpo possível.

Se reparamos bem no nosso arquivo `UserInfo.test.js`, podemos ver claramente que alguns itens se repetem e isso não é uma boa prática.

```jsx{3,4,5,6,12,13,14,15}
describe('UserInfo', () => {
  it('renders the user name', () => {
    const user = { name: 'Walter White' }
    const component = <UserInfo name={user.name} />
    const container = document.createElement('div')
    ReactDOM.render(component, container)

    expect(container.textContent).toMatch('Walter White')
  })

  it('renders another user name', () => {
    const user = { name: 'Jesse Pinkman' }
    const component = <UserInfo name={user.name} />
    const container = document.createElement('div')
    ReactDOM.render(component, container)

    expect(container.textContent).toMatch('Jesse Pinkman')
  })
})
```

Para melhorar esse cenário podemos fazer algumas melhorias no código do nosso teste:

Ambos os testes usam as mesmas duas variáveis: `container` e `user`. Podemos mover essas declarações para o topo da função `describe`, deixando para fazer as atribuições dentro dos testes, isso significa que precisaremos usar `let` ao invés de `const`:

```javascript
let container, user
```

Usamos a função `createElement` da mesma forma em ambos os testes, nesse tipo de caso podemos usar a função `beforeEach` que será executada antes de cada teste:

```javascript
beforeEach(() => {
  container = document.createElement('div')
})
```

Também usamos o método `ReactDOM.render` em ambos os testes, a diferença é que precisamos passar o componente `UserInfo` como parâmetro dentro de cada teste. Nesse caso podemos criar uma função `render`:

```javascript
const render = (component) => ReactDOM.render(component, container)
```

Com isso nosso teste deve ficar assim:

```javascript
it('renders the user name', () => {
  user = { name: 'Walter White' }
  render(<UserInfo name={user.name} />)
  expect(container.textContent).toMatch('Walter White')
})
```

Dividimos nosso teste em três seções distintas:

- **Arrange**: Configura dependências de teste
- **Act**: Executa o código de produção em teste
- **Assert**: Verifica as expectativas são atendidas

Com isso, conseguimos deixar nosso teste bem mais limpo e conciso. Abaixo podemos ver como ficou o arquivo final:

```javascript
describe('UserInfo', () => {
  let container, user

  beforeEach(() => {
    container = document.createElement('div')
  })

  const render = (component) => ReactDOM.render(component, container)

  it('renders the user name', () => {
    user = { name: 'Walter White' }
    render(<UserInfo name={user.name} />)
    expect(container.textContent).toMatch('Walter White')
  })

  it('renders another user name', () => {
    user = { name: 'Jesse Pinkman' }
    render(<UserInfo name={user.name} />)
    expect(container.textContent).toMatch('Jesse Pinkman')
  })
})
```

## Conclusão

É isso, tentei resumir bastante para que o artigo não ficasse muito longo, espero que tenham gostado, se tiverem dúvidas ou sugestões não deixem de comentar. Abraço!
