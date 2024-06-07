---
layout: default
title: "React com TDD: Renderizando uma lista"
tags:
  - javascript
  - tdd
  - react
  - testing
date: 2020-02-16T20:31:17.067Z
---
Aprenda como criar um componente de lista em React com desenvolvimento guiado por testes.

# **Introdução**

Neste artigo vamos criar o componente `UserList` que vai receber um `array` com nomes de usuários e renderizar uma lista com cada um deles.

Além disso, também vamos a usar a [`@testing-library`](https://testing-library.com/).

# **Testing Library**

![Testing Library Logo](/img/1_1combowqieofiahw5qb-hw.png)

O `@testing-library`, de uma forma bem resumida, é uma familia de pacotes que nos permite interagir diretamente com DOM por meio de queries que ajudam a testar nossas aplicações de um ponto de vista semelhante ao do usuário, reduzindo detalhes de implementação.

Ele pode ser usado em aplicações com JavaScript puro ou com frameworks, incluindo [React](https://testing-library.com/docs/react-testing-library/intro), [Vue](https://testing-library.com/docs/vue-testing-library/intro) e [Angular](https://testing-library.com/docs/angular-testing-library/intro).

Como estamos usando React, vamos instalar o pacote próprio para ele no nosso projeto.

```bash

```

Após a instalação, vamos criar um arquivo chamado `UserList.test.js`. Vamos importar a função `render` diretamente do `@testing-library`.

```jsx

```

# **Renderizando a lista**

Com o arquivo `UserList.test.js` criado, vamos escrever nosso primeiro teste.

```jsx

```

Repare que o `render` do `@testing-library` nos permite usar o `container`.

Lembrando que quando estamos desenvolvendo com TDD precisamos seguir todo o fluxo dele, então vamos executar nosso teste e vê-lo falhar.

```

```

Para corrigir isso, vamos criar o arquivo `UserList.js`, retornando apenas `null` por enquanto.

```jsx

```

E importá-lo dentro do teste.

```jsx

```

Ao retornar `null` dessa forma, deixamos de receber um erro do React e passamos a receber uma mensagem de erro mais amigável.

```

```

Vamos fazer o mínimo necessário para o teste passar.

```jsx

```

Ao executar o teste novamente, recebemos outro erro.

```

```

Como temos mais de um `expect` podemos ver em qual deles o teste está falhando.

Vamos usar a função `map` para renderizar todos os itens da lista.

```jsx

```

Você pode estar se perguntando por quê usei `div` ao invés de`li`, por enquanto isso não vai fazer diferença no resultado do teste, podemos usar os próximos testes para verificar se os itens são `li`.

Após essa alteração o teste deve passar, mas com um aviso que não devemos ignorar.

```

```

Para remover esse aviso, podemos fazer o que ele diz e adicionar a `prop` nos itens da lista.

```jsx

```

# **Especificando os itens da lista**

Agora vamos preencher os itens da lista que acabamos de criar. Primeiro, vamos criar outro teste.

```jsx

```

Ao executá-lo devemos receber o seguinte erro.

```

```

Como não existe nenhum elemento `li` o teste não vai passar, vamos corrigir isso.

```

```

Recebemos outro erro após executar novamente o teste.

```

```

Para corrigi-lo, precisamos exibir o nome do usuário no item da lista.

```jsx

```

Pronto! Temos o nosso componente de lista funcionando e coberto por testes, só falta refatorar nosso código.

# **Refatorando**

Não sei se você reparou, mas instalamos o `@testing-library` para melhorar a forma como escrevemos os testes. Até agora não vimos nenhuma diferença, simplesmente deixamos de criar um método `render` para usar um que já está pronto.

Para deixar nossos testes mais próximos da forma como o usuário interage com a aplicação, podemos usar as queries que o `@testing-library` nos dá.

O `@testing-library` conta com queries que podemos usar para interagir diretamente com o DOM, `ByLabelText`, `ByPlaceholderText` e `ByText`, são algumas delas, além disso, cada query tem variantes como `getBy` e `getAllBy`. Na [documentação](https://testing-library.com/docs/dom-testing-library/api-queries) você pode ver exatamente o que cada uma delas faz.

No primeiro teste, vamos usar a query `getByRole`, com ela podemos buscar um elemento do DOM a partir de uma **ARIA role**.

```jsx

```

Quando usamos o `getByRole` não passamos o seletor do elemento, ao invés disso passamos a `role` dele. Cada elemento possui uma `role` padrão, que deve ser usada caso não tenha nenhuma outra definida com por meio de um atributo.

Como isso torna nosso código mais próximo da forma que o usuário interage com a aplicação?

Podemos pensar que estamos dizendo para o usuário checar se uma existe uma lista e se ela tem dois itens, independente de ser um `ul` ou `ol`, não precisamos desses detalhes de implementação no teste.

Você pode conferir a `role` de cada elemento nessa [lista](https://github.com/A11yance/aria-query#elements-to-roles).

No segundo teste, podemos usar a query `getByAllRole` para obter todos os itens da lista.

```jsx

```

Por fim, movemos o `array` de usuários para o topo da função `describe`, deixando o código mais limpo e sem repetições.

```jsx

```

# **Conclusão**

Neste artigo, criamos um componente de lista com TDD e ainda podemos aprender um pouco sobre `@testing-library`, nos próximos vamos explorar um pouco mais essa lib. Se tiverem dúvidas ou sugestões não deixem de comentar. Abraço!

<!-- notionvc: 328dc4cd-15af-4677-82c9-808d96804b39 -->