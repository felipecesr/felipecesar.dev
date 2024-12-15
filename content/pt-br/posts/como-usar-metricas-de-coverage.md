---
layout: default
title: Como usar métricas de coverage
tags:
  - testes
  - qualidade
  - javascript
date: 2024-12-15T12:55:00.000Z
---
Você já ouviu falar sobre métricas de coverage (ou cobertura de código) e se perguntou como elas podem impactar a qualidade dos seus testes? Será que alcançar 100% de cobertura significa que você tem testes perfeitos? Neste artigo, vamos explorar a fundo essas métricas, entender como elas funcionam e, principalmente, como utilizá-las da maneira correta.

Aqui, vou usar o [Istanbul](https://istanbul.js.org/), uma ferramenta poderosa e compatível com diversos frameworks de testes. No exemplo, utilizaremos o [Jest](https://jestjs.io/), já que o Istanbul está integrado a ele por padrão, eliminando a necessidade de configurações extras.

Ao final deste artigo, você será capaz de:

* Compreender as 4 principais métricas de cobertura: **Statements**, **Branches**, **Functions** e **Lines**
* Descobrir como interpretá-las para melhorar seus testes
* Evitar armadilhas comuns, como perseguir números de cobertura sem critério

## Por que as métricas de cobertura são importantes?

É fácil cair na armadilha de achar que "quanto maior o número de cobertura, melhor o teste". No entanto, isso é um mito. Métricas de cobertura **não medem qualidade**, apenas indicam quanto do código é executado por uma suite de testes.

Imagine que você tem 100% de cobertura. Isso não garante que seus testes estão verificando comportamentos corretos ou atendendo aos requisitos do sistema.

As métricas de cobertura **são boas para indicar o que está ruim** (as partes do código que não estão sendo testadas), mas não são boas para indicar o que está bom.

## As 4 métricas de coverage explicadas

Agora que entendemos a importância (e as limitações) dessas métricas, vamos explorar como cada uma funciona.

### Cobertura (Lines)

Essa métrica é calculada como a razão entre o número de linhas do código executadas por pelo menos um teste e o número total de linhas no código de produção.

![Formula da métrica de cobertura](/img/lines.png)

Exemplo:

```javascript
function isStringLong(input) {
  if (input.length > 5)
    return true
  return false
}

test('isStringLong', () => {
  const result = isStringLong('abc')
  expect(result).toBe(false)
})
```

O número total de linhas na função `isStringLong` é 3. O número de linhas executadas pelo teste é 2, o teste executa todas as linhas menos a declaração (statement) `return true`. Então 2/3 = 0.6666 = **66.66% de cobertura de código**. O valor da métrica é exibido em % Lines.

![Exemplo do output da métrica de cobertura no browser](/img/lines-example.png)

![Exemplo do output da métrica de cobertura no terminal](/img/lines-terminal.png)

Mas o que acontece se refatorarmos o código?

```javascript
export function isStringLong(input) {
  return input.length > 5
}
```

![Exemplo do output da métrica com 100% de cobertura no browser](/img/lines-browser-100.png)

![Exemplo do output da métrica com 100% de cobertura no terminal](/img/lines-terminal-100.png)

A lógica continua a mesma, a diferença é que agora temos 100% de cobertura. Isso não garante que a lógica está correta, certo?

## Branches (Ramificações)

Essa métrica avalia as ramificações lógicas do código, como `if`, `else` ou `switch`. Ela mede se todas as condições possíveis foram testadas.

![Formula da métrica de cobertura de branches](/img/lagrida_latex_editor.png)

Exemplo:

```javascript
if (user.isAdmin) {
  // faz algo
} else {
  // faz outra coisa
}
```

Os testes precisam passar por **todas as condições** (`isAdmin` sendo verdadeiro e falso). Se apenas uma for testada, a cobertura estará incompleta.

## Functions (Funções)

Aqui, o foco está em quantas funções do código foram chamadas durante os testes. Se sua aplicação tem uma função principal e funções auxiliares, os testes devem cobrir todas elas. Mas cuidado: chamar a função não significa que os cenários corretos foram testados!

## Statements (Declarações)

Essa métrica cobre declarações de código, como atribuições, loops, instruções `return` e `throw`.

Exemplo:

```javascript
return input.length > 5;
```

## Por que buscar 100% de cobertura pode ser prejudicial?

A busca obsessiva por números perfeitos de cobertura pode levar a maus hábitos, como criar testes artificiais que não verificam a lógica do código, mas apenas aumentam o índice.

O ideal é usar as métricas para identificar **o que falta ser testado**, mas sempre com foco na qualidade dos testes, e não apenas na quantidade.

## Conclusão

Métricas de cobertura são ferramentas úteis para identificar **o que não está bom em sua suíte de testes**, mas não devem ser usadas como um indicador absoluto de qualidade.

Para garantir testes realmente eficazes, lembre-se:

* Use as métricas como **ferramentas de diagnóstico**, não como metas rígidas.
* Foque em cobrir cenários relevantes para o comportamento do código.
* Não persiga 100% de cobertura sem avaliar a qualidade real dos testes.

Com isso, você estará pronto para criar uma base de testes sólida e confiável, sem cair nas armadilhas dos números.

**Gostou do artigo?** Compartilhe com seus colegas de equipe e contribua para uma cultura de testes mais consciente!
