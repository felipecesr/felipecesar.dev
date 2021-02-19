---
layout: default
title: React Test-Driven Development
date: 2021-02-19T17:28:48.865Z
---
## O que é um teste?

Teste é o processo onde verificamos se uma aplicação está funcionando corretamente.

## Tipos de teste

- Testes manuais
- Testes automatizados

## O que são testes automatizados?
Testes automatizados são, de forma bem resumida, códigos que disparam erros quando o resultado retornado da execução é diferente do resultado esperado.

### Como assim?

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

Nesse caso, resolvemos apenas alterando o operador utilizado na função e se executarmos o código novamente nenhum erro é retornado.

### E no mundo real, como funcionam?

O exemplo acima serve apenas para dar uma base. No mundo real existem tipos diferentes de testes e ferramentas que auxiliam em cada um deles.

Neste artigo vou falar sobre os testes mais comuns utilizados em aplicações React

## Tipos de Teste Automatizado

### Estáticos

### Unitários

- Testam partes isoladas da aplicação (funções e componentes)

### Integração

- Testam como componentes funcionam juntos
- Utilizam todos os providers
- Mocar o mínimo (fetch e animações)

### E2E

- Executamos toda a aplicação (frontend e backend) e testamos as interações como se fosse um usuário.

### Referências

<https://kentcdodds.com/blog/but-really-what-is-a-javascript-test>