---
layout: default
title: Como usar a função describe do Jest?
tags:
  - testes
  - javascript
  - jest
date: 2024-05-15T15:12:10.353Z
---
A função `describe` do [Jest](https://jestjs.io/) é usada para criar um contexto para nossos testes. Ela funciona de forma parecida com os testes, recebendo dois parâmetros:

1. Uma descrição do contexto.
2. Uma função onde os testes que pertencem a esse contexto devem ficar aninhados.

O código abaixo mostra como ela pode ser usada.

```jsx
describe('aliquotaIR', () => {
  test('retorna a tarifa de 22,5% quando recebe o valor de 180 dias', () => {
    const tempoInvestidoEmDias = 180;

    const tarifa = aliquotaIR(tempoInvestidoEmDias);

    expect(tarifa).toBeCloseTo(0.225);
  });
});
```

Nesse caso, a descrição do contexto é o nome da unidade que está sendo testada. Além disso, o contexto também fica visível quando executamos os testes.

```bash
 PASS  src/__tests__/aliquotaIR.test.ts
  aliquotaIR
    ✓ retorna a tarifa de 22,5% quando recebe o valor de 180 dias

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
```

### A função `it`

O [Jest](https://jestjs.io/) também expõe a função `it`. Esta função é um alias para a função `test`, mas se encaixa melhor em termos de sintaxe com essa abordagem usando o `describe`.

```jsx
describe('aliquotaIR', () => {
  it('retorna a tarifa de 22,5% quando recebe o valor de 180 dias', () => {
    const tempoInvestidoEmDias = 180;

    const tarifa = aliquotaIR(tempoInvestidoEmDias);

    expect(tarifa).toBeCloseTo(0.225);
  });
});
```

Neste caso, podemos entender que o `it` se refere ao contexto. Sendo assim, podemos ler como uma única frase: `aliquotaIR retorna a tarifa de 22,5% quando recebe o valor de 180 dias`.

### Contexto dentro de contexto

Podemos usar o `describe` para criar outro nível de contexto para explicar o cenário, e o teste abaixo dele.

```jsx
describe('aliquotaIR', () => {
  describe('dado o valor de 180 dias', () => {
    test('retorna a tarifa de 22,5%', () => {
      const tempoInvestidoEmDias = 180;

      const tarifa = aliquotaIR(tempoInvestidoEmDias);

      expect(tarifa).toBeCloseTo(0.225);
    });
  });
});
```

Algumas pessoas podem odiar isso (inclusive eu ) porque os testes ficam mais difíceis de ler a medida eles aumentam, mas é importante saber que você pode separar cada informação em um nível diferente.

## Conclusão

A função `describe` pode ajudar quando você quiser criar diferentes contextos dentro do mesmo arquivo, mas é importante tomar cuidado para não deixar os testes difíceis de manter.