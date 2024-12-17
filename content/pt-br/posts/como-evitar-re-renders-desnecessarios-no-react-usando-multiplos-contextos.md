---
layout: default
title: Como evitar re-renders desnecessários no React usando múltiplos contextos
tags:
  - react
  - performance
date: 2024-12-17T17:18:00.000Z
---
Você já se perguntou por que atualizar uma lista no contexto do React acaba re-renderizando componentes que nem mesmo deveriam ser afetados? Vamos entender isso com um exemplo simples.

Imagine que você tenha o seguinte código:

```jsx
import { createContext, useReducer } from 'react';
import { getInitialItems } from './lib/items';
import { reducer } from './lib/reducer';

const ItemsContext = createContext({});

const ItemsProvider = ({ children }) => {
  const [items, dispatch] = useReducer(reducer, getInitialItems());

  return (
    <ItemsContext.Provider value={{ items, dispatch }}>
      {children}
    </ItemsContext.Provider>
  );
}

export default ItemsProvider;
```

No código acima, temos dois valores no mesmo objeto:

```jsx
<ItemsContext.Provider value={{ items, dispatch }}>
```

Aqui está o detalhe: mesmo que `items` ou `dispatch` não tenham mudado, o **objeto inteiro** é recriado a cada renderização. Como o React faz a comparação por **referência**, ele assume que algo mudou e dispara re-renderizações em todos os componentes que consomem esse contexto.

Resultado? **Re-renderizações desnecessárias** e, em aplicações maiores, queda de performance.

## A solução: separe o que muda do que não muda

Para resolver esse problema, podemos dividir o contexto em **dois contextos separados**:

1. Um contexto para valores **que mudam** (como `items`).
2. Um contexto para valores **que não mudam** (como `dispatch`).

Veja como isso fica:

```jsx
import { createContext, useReducer } from 'react';
import { getInitialItems } from './lib/items';
import { reducer } from './lib/reducer';

const ItemsContext = createContext({});
const ActionsContext = createContext({});

const ItemsProvider = ({ children }) => {
  const [items, dispatch] = useReducer(reducer, getInitialItems());

  return (
    <ActionsContext.Provider value={dispatch}>
      <ItemsContext.Provider value={items}>
        {children}
      </ItemsContext.Provider>
    </ActionsContext.Provider>
  );
}

export default ItemsProvider;
```

## **Por que separar os contextos melhora a performance?**

A mágica acontece porque agora:

* **`ActionsContext`** (que contém `dispatch`) **não muda**, então os componentes que o consomem **não re-renderizam** desnecessariamente.
* **`ItemsContext`** contém apenas o valor `items`, que será atualizado somente quando necessário.

Além disso, **a ordem dos providers é importante**. Como todos os "pais" no React disparam re-renderizações nos filhos, ao colocar o que não muda fora do que muda, evitamos que a atualização de um contexto afete o outro.

## Conclusão

Separar o que muda do que não muda no React Context é uma técnica poderosa para evitar re-renderizações desnecessárias e melhorar a performance da sua aplicação.

Seguindo essa prática, suas aplicações React ficarão mais rápidas, eficientes e fáceis de manter!
