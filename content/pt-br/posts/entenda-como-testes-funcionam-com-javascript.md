---
layout: default
title: Entenda como testes funcionam com JavaScript
tags:
  - javascript
  - testes
  - qualidade
date: 2024-12-03T11:49:00.000Z
---
Neste post, você aprenderá como os testes funcionam na prática, enquanto constrói um "mini framework de testes" do zero e explora conceitos essenciais de forma simples e direta.

## O que é um teste?

Teste é o processo onde verificamos se algo funciona de acordo com o esperado. Por exemplo, no código abaixo utilizo a função `sum` para somar 2 + 2 e digo que o valor esperado é 4. Se não der erro durante a execução do código significa que o teste passou.

```javascript
const result = sum(2, 2);
const expected = 4;

if (result !== expected) {
  throw new Error(`${result} is not equal to ${expected}`);
}
```

## Por quê testar?

O objetivo principal dos testes é possibilitar o **crescimento sustentável do projeto**. Eles **fornecem segurança** para refatorar, corrigir bugs e adicionar novas funcionalidades sem medo de quebrar o que já funciona.

**Importante:** o sucesso não está na busca por 100% de cobertura de testes, mas na criação de uma suíte de testes confiável que permita trabalhar com confiança. Ter muitos testes não significa nada se você ainda tiver medo de modificar o código.

Isso já é funcional, mas não escalável. Então, vamos melhorar!

## Criando uma biblioteca de asserção

Bibliotecas de asserção ajudam a escrever testes mais legíveis e organizados. Aqui está uma implementação simples:

```javascript
function expect(result) {
  return {
    toBe(expected) {
      if (result !== expected) {
        throw new Error(`${result} is not equal to ${expected}`);
      }
    },
  };
}
```

Agora podemos testar assim:

```javascript
expect(sum(2, 2)).toBe(4);
```

## Construindo um framework de testes

Um framework de testes padroniza a execução e a organização dos testes. Vamos criar uma função simples para organizar os testes e exibir os resultados:

```javascript
function test(title, callback) {
  try {
    callback();
    console.log(`✔️ PASSED: ${title}`);
  } catch (error) {
    console.error(`❌ FAILED: ${title}`);
    console.error(error.message);
  }
}
```

Agora, podemos adicionar múltiplos testes:

```javascript
test("two positive numbers", () => {
  expect(sum(2, 2)).toBe(4);
});

test("two negative numbers", () => {
  expect(sum(-2, -3)).toBe(-5);
});

test("a positive and a negative number", () => {
  expect(sum(5, -3)).toBe(2);
});
```

## Conclusão

Testes são uma peça-chave para escrever códigos mais confiáveis e sustentáveis. Frameworks populares como [Jest](https://jestjs.io/) e [Vitest](https://vitest.dev/) tornam o processo mais simples, mas compreender como eles funcionam por baixo dos panos é essencial para aproveitar todo o seu potencial. Neste artigo, você deu os primeiros passos para dominar os fundamentos e entender sua aplicação prática.

O que você achou deste post? Tem dúvidas ou experiências para compartilhar? Deixe seu comentário!
