---
layout: default
title: Como criar funções puras com TDD
date: 2021-07-10T16:58:47.689Z
aliases:
  - /como-criar-funções-puras-com-tdd/
---
Nesse artigo vamos criar a função `multiply`, seguindo o TDD, que foi explicado em detalhes no primeiro [artigo](https://dev.to/felipecesr/como-criar-um-componente-react-com-tdd-236p). Ela deve receber dois valores e retornar a multiplicação deles.

As principais características de funções puras são, elas não causam efeitos colaterais e retornam o mesmo valor sempre que são chamadas com os mesmos argumentos, isso as torna muito fáceis de testar.

Então chega de conversa e vamos partir para a prática. Baixe o [repositório](https://github.com/felipecesr/react-com-tdd-na-pratica/tree/master) e faça o `checkout` na branch `exercise-03`. Em seguida, crie a pasta `utils` dentro de `src` e dentro dela crie o arquivo `math.test.js`, com as seguintes linhas:

```javascript
test.todo('multiply: returns the multiplication of two numbers')

test.todo('multiply: throws an error when some of the arguments is NaN')
```

E execute o comando `npm test -- --watch` para que o [Jest](https://jestjs.io/) fique observando os arquivos que forem modificados.

O método `todo` permite anotar os testes que queremos escrever no futuro, nesse caso, vamos criar dois testes.

## Testando casos de sucesso

Remova o `todo` do primeiro teste e adicione o seguinte código:

```javascript
test('multiply: returns the multiplication of two numbers', () => {
  expect(multiply(1000, 5.26)).toBe(5260)
})
```

Para fazer o teste passar crie o arquivo `math.js` dentro de `utils`, apenas com o necessário para que o teste passe.

```javascript
export function multiply() {
  return 5260
}
```

Com o teste passando, vamos testar se a função funciona com outros valores, diferente de como foi feito no [desenvolvimento do componente](https://dev.to/felipecesr/como-criar-um-componente-react-com-tdd-236p), não vamos criar outro bloco de teste, ao invés disso, adicione apenas mais um `expect`.

```javascript
import { multiply } from './math'

test('multiply: returns the multiplication of two numbers', () => {
  expect(multiply(1000, 5.26)).toBe(5260)
  expect(multiply(2, 6.24)).toBe(12.48)
})
```

Refatore a função, fazendo o teste passar novamente:

```javascript
export function multiply(a, b) {
  return a * b
}
```

Nesse caso a função também deve funcionar quando receber números em `string`.

```javascript
test('multiply: returns the multiplication of two numbers', () => {
  expect(multiply(1000, 5.26)).toBe(5260)
  expect(multiply(2, 6.24)).toBe(12.48)
  expect(multiply(15, '7.29')).toBe(109.35)
  expect(multiply('3', 5)).toBe(15)
  expect(multiply('5', '5')).toBe(25)
})
```

Com isso, conseguimos garantir que a função `multiply` com funciona com diferentes valores.

## Testando casos de erro

E o que acontece se a função for passada com um valor inválido, por exemplo, um texto ou um booleano?

Para esses casos, podemos fazer a função disparar um erro. Adicione o próximo teste no arquivo `math.test.js`.

```javascript
test('multiply: throws an error when some of the arguments is NaN', () => {
  expect(() => multiply('some invalid value', 'another invalid value')).toThrowError('Arguments must be numbers')
})
```

Note que a chamada para a função `multiply` está dentro de outra função, isso é necessário porque ela vai disparar um erro, nesses casos, se não fizermos dessa forma, o teste não passa.

Para que o teste passe, faça as seguintes alterações no arquivo `math.js`:

```javascript
export function multiply(a, b) {
  if (isNaN(a) || isNaN(b)) {
    throw new Error('Arguments must be numbers')
  }

  return a * b
}
```

Com isso, os testes estão passando, mas observe as mensagens exibidas no terminal:

```
✓ multiply: returns the multiplication of two numbers (5 ms)
✓ multiply: throws an error when some of the arguments is NaN (8 ms)
```

Da forma que estão, os casos que foram testados não ficam claros, podemos melhorar isso com algumas refatorações.

## Refatorando os testes

Para melhorar a forma como os testes são exibidos, podemos criar grupos de teste, usando a função `describe`, ela recebe uma descrição e uma função onde ficam os testes. Faça as seguintes alterações no arquivo `math.test.js`:

```javascript
describe('multiply: returns the multiplication', () => {
  test('of two numbers', () => {
    expect(multiply(1000, 5.26)).toBe(5260)
    expect(multiply(2, 6.24)).toBe(12.48)
    expect(multiply(15, '7.29')).toBe(109.35)
    expect(multiply('3', 5)).toBe(15)
    expect(multiply('5', '5')).toBe(25)
  })
})
```

Observe como os testes são exibidos agora:

```
multiply: returns the multiplication
    ✓ of two numbers (4 ms)
```

Podemos continuar lendo como uma única frase: `returns the multiplication of two numbers`, a diferença é que podemos criar um teste para cada caso e saber exatamente como a função está sendo testada.

```javascript
describe('multiply: returns the multiplication', () => {
  test('of two numbers', () => {
    expect(multiply(1000, 5.26)).toBe(5260)
  })
  
  test('of others two numbers', () => {
    expect(multiply(2, 6.24)).toBe(12.48)
  })

  test('of a number and a string', () => {
    expect(multiply(15, '7.29')).toBe(109.35)
  })

  ...
})
```

Também podemos fazer isso para os casos de erro:

```javascript
describe('multiply: throws an error when', () => {
  test('arguments are texts', () => {
    expect(() => multiply('some invalid value', 'another invalid value')).toThrowError('Arguments must be numbers')
  })
})
```

Conseguimos melhorar as mensagens, mas consequentemente criamos bastante repetição de código, felizmente podemos resolver isso facilmente.

## Removendo código duplicado

Para remover o código duplicado, podemos usar o método `each` que permite repetir o mesmo teste com valores diferentes. O código deve ficar assim:

```javascript
describe('multiply: returns the multiplication', () => {
  const cases = [
    ['of two numbers', 1000, 5.26, 5260],
    ['of others two numbers', 2, 6.24, 12.48],
    ['of a number and a string', 15, '7.29', 109.35],
    ['of a string and a number', '3', 5, 15],
    ['of two strings', '5', '5', 25]
  ]

  test.each(cases)('%s', (_, a, b, expected) => {
    expect(multiply(a, b)).toBe(expected)
  })
})

describe('multiply: throws an error when', () => {
  const cases = [
    [
      'arguments are texts',
      'some invalid value',
      'another invalid value',
      'Arguments must be numbers'
    ]
  ]

  test.each(cases)('%s', (_, a, b, expected) => {
    expect(() => multiply(a, b)).toThrowError(expected)
  })
})
```

Criamos um `Array` de `Arrays` com os argumentos que são passados para o teste. Para mais detalhes sobre o método `each`, você pode consultar a [documentação](https://jestjs.io/docs/api#testeachtablename-fn-timeout).

## Conclusão

Antes de escrever esse artigo eu pensei bastante na função que seria desenvolvida, preferi deixar o mais simples possível para poder focar apenas nos testes e mostrar mais alguns recursos do [Jest](https://jestjs.io/docs/api#testeachtablename-fn-timeout).

Criamos uma função pura, bem simples, mas o que vimos aqui pode ser usado no desenvolvimento de qualquer outra função. E como de costume vou deixar o link do [repositório](https://github.com/felipecesr/react-com-tdd-na-pratica/tree/exercise-04) com o código que foi feito nesse artigo. Abraço!