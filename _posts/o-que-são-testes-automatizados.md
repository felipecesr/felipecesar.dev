---
layout: default
title: O que são testes automatizados?
date: 2021-02-19T17:28:48.865Z
---
Testes automatizados são, de forma bem resumida, códigos que disparam erros quando o resultado retornado da execução é diferente do resultado esperado.

## Como assim?

Um exemplo bem simples, e bem comum é o teste de uma função de soma.

```javascript
const sum = (a, b) => a - b

const result = sum(6, 4)
const expected = 10

if (result !== expected) {
  throw new Error(`${result} is not equal to ${expected}`)
}
```

No código acima estamos executando a função `sum` com os valores 6 e 4, e o valor que esperamos receber é 10. Nesse caso uma mensagem de erro será retornada.

```bash
Error: -4 is not equal to 10
```

Para que nosso código funcione como esperamos, precisamos corrigir esse bug.

```javascript
const sum = (a, b) => a - b
```

Nesse caso, resolvemos apenas alterando o operador utilizado na função e quando executamos o codigo novamente nenhum   sssssss\/