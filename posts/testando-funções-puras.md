---
layout: default
title: Testando funções puras
date: 2020-09-29T01:03:58.098Z
---
Of all = De tudo
Go ahead = continue
First off = Primeiramente
get rid = livrar-se

the easiest thing you can test is a pure function

o que torna fácil testar funções puras é porque elas
sempre retornam as mesmas coisas quando passados os mesmos argumentos e sua execução não tem efeitos colaterais

não há nenhuma configuração extra para fazer quando testamos funções puras

para mostrar um exemplo dprático vamos usar essa função:

// binaryGap...

Essa função deve receber um número inteiro positivo e retornar ..., para mais detalhes...

Nós vamos escrever testes para ambos os cenários, quando for passado um valor válido e um inválido.

// valid

// 9
// 529
// 20

// invalid
// -10
// '2'

test('binaryGap returns the correct value', () => {
    expect(binaryGap(9)).toBe(2)
    expect(binaryGap(529)).toBe(4)
    expect(binaryGap(20)).toBe(1)
})

Tratando erros
Quando criamos testes é muito importante retornar mensagens de erro mais claramente possíveis.

test('binaryGap throws an error for negative number', () => {
    expect(binaryGap(-10)).toThrowError(/you must use a positive integer number/)
})

test('binaryGap throws an error for string', () => {
    expect(binaryGap('2')).toThrowError(/you must use a positive integer number/)
})

Conclusão
O que fizemos foi criar um teste para um caso de uso, e depois outro caso de uso que essa função suporta.
Simplesmente chamamos a função e checamos se os resultados batem.
Por isso é tão simples testar funções puras.

... Now it's really important that we make sure that these tests can fail.