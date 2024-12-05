---
layout: default
title: "Vitest: A próxima geração dos frameworks de teste"
tags:
  - teste
  - qualidade
  - performance
  - frameworks
date: 2024-12-05T19:12:00.000Z
---
Você está buscando uma ferramenta moderna e eficiente para revolucionar seus testes automatizados? Conheça o Vitest, um framework que une simplicidade, performance e flexibilidade, projetado para atender às necessidades dos desenvolvedores de hoje.

## Por que escolher o Vitest?

O Vitest foi desenvolvido pensando em produtividade e modernidade. Com suporte nativo a ES Modules, TypeScript e JSX, ele facilita a vida de quem trabalha com tecnologias atuais.

Se você utiliza o [Vite](https://vite.dev/) em seus projetos, a integração é ainda mais impressionante: o Vitest reaproveita configurações e plugins do `vite.config.js`, eliminando a necessidade de arquivos de configuração adicionais.

Além disso, o modo de observação (watch mode) do Vitest é incrivelmente rápido, funcionando como um HMR (Hot Module Replacement) para testes. Isso significa feedback instantâneo durante o desenvolvimento, aumentando sua eficiência.

Ah, e você não precisa usar Vite para aproveitar tudo isso! O Vitest também funciona perfeitamente em outros cenários.

## Já usa o Jest? Adapte-se em minutos

Se você já está familiarizado com o Jest, migrar para o Vitest é fácil. Sua API é quase idêntica, incluindo ferramentas poderosas como **Snapshot** e **Coverage**. Veja um exemplo prático retirado da documentação:

```javascript
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

describe('purchasing flow', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('allows purchases within business hours', () => {
    const date = new Date(2000, 1, 1, 13)
    vi.setSystemTime(date)
    expect(purchase()).toEqual({ message: 'Success' })
  })

  it('disallows purchases outside of business hours', () => {
    const date = new Date(2000, 1, 1, 19)
    vi.setSystemTime(date)
    expect(purchase()).toEqual({ message: 'Error' })
  })
})
```

Quer manter as funções de teste disponíveis globalmente, como no Jest? Basta configurar:

```javascript
export default defineConfig({
  test: {
    globals: true,
  },
});
```

Explore mais sobre essas funcionalidades na [documentação oficial](https://vitest.dev/api/).

## Compatibilidade com DOM: JSDOM ou Happy DOM?

Precisa testar interações com DOM? O Vitest oferece suporte a dois simuladores populares: **JSDOM** e **Happy DOM**.

* **JSDOM**: Ideal para testes que requerem alta fidelidade ao comportamento do navegador. Perfeito para frameworks como React, Vue e Angular.
* **Happy DOM**: Uma alternativa mais rápida e leve, projetada para performance em grandes suítes de teste ou pipelines de CI.

Enquanto o JSDOM é mais completo, o Happy DOM é otimizado para testes simples e rápidos. Escolha com base nas necessidades do seu projeto.

## Asserções

O Vitest oferece duas abordagens principais para asserções: **expect** e **assert**.

### Exemplo com `assert`

```javascript
import { assert, test } from 'vitest'

test('assert', () => {
  assert('foo' !== 'bar', 'foo should not be equal to bar')
})
```

### Exemplo com `expect`

```javascript
import { expect } from 'vitest'

const input = Math.sqrt(4)

expect(input).to.equal(2) // chai API
expect(input).toBe(2) // jest API
```

## Conclusão

O **Vitest** é mais do que uma alternativa ao Jest; ele representa uma evolução na forma de realizar testes automatizados. Seja pela performance superior, integração simplificada ou API familiar, o Vitest oferece tudo o que você precisa para elevar a qualidade do seu código.

Experimente hoje mesmo e descubra por que o Vitest está se tornando o framework de testes favorito entre os desenvolvedores.
