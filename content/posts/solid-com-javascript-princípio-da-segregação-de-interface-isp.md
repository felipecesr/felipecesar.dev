---
layout: default
title: "SOLID com JavaScript: Princípio da Segregação de Interface (ISP)"
tags:
  - javascript
  - oop
  - solid
  - es6
date: 2019-04-23T20:22:15.293Z
---
Nesse artigo vamos ver a teoria por trás do **Princípio da Segregação de Interface** (Interface Segregation Principle), ou simplesmente **ISP**, e como representar esse conceito em aplicações JavaScript.

Sua definição formal diz:

> Uma classe não deve ser forçada a implementar métodos que não irá usar.

## **Exemplo de violação**

Abaixo temos um exemplo que viola o **ISP**:

![Violação do ISP](/img/1_zjpdy_4ntqxejkfuqvcokw.webp)

A interface `ISmartDevice` define os métodos `print` e `scan`, e a classe `Printer` a implementa, dessa forma, toda classe que herdar de `Printer` deve implementar os dois métodos.

Simples, não? O problema é que a classe `Economic` ***\*deve ter apenas o método print e dessa forma forçamos a implementação do método `scan`, violando o** ISP\*\*.

## **Resolvendo a violação do ISP**

Aqui temos um exemplo onde aplicamos o **ISP**, dividindo `ISmartDevice` em duas interfaces menores: `IPrinter`, e `IScanner`. Desta forma, temos um código mais desacoplado e fácil de manter, podendo implementar classes que não precisam de todas as funcionalidades.

![Resolvendo a violação do ISP](/img/1_pd6jojuwixssmsz9clhusq.webp)

Até aí tudo bem, mas como vamos implementar isso em JavaScript se a linguagem não suporta interfaces? Vamos parar um pouco para pensar, o que é uma interface?

> Interface é um contrato que força uma classe ou um objeto (no caso do JavaScript) a implementar uma funcionalidade especifica.

## **E na prática, como funciona?**

Realmente não existe uma implementação concreta de interfaces em JavaScript, mas isso não nos impede de criar um “contrato” que se comporte dessa maneira. Vejamos o seguinte código:

```jsx
class Printer {
    constructor(name) {
        this.name = name;
    }
}

class AllInOne extends Printer {
    constructor(name) {
        super(name);
    }

    scan() {
        return 'scanning...';
    }
}

function printerFunctionalities(printers) {
    console.log('Impressoras digitalizando: ');
    for (let printer of printers) {
        console.log(`${printer.name} is ${printer.scan()}`);
    }
}

let printers = [
    new AllInOne('HP 1'),
    new AllInOne('HP 2'),
];

printerFunctionalities(printers);
```

Aqui temos uma classe `Printer` e uma subclasse `AllInOne` que implementa o método `scan`. Temos também uma função chamada `printerFunctionalities` que percorre uma lista de instâncias de `AllInOne` \*\*\*\*chamando o método `scan` de cada um dos itens da lista.

Mas temos um problema, e se criarmos uma classe `Economic` que não deve ter o método `scan`?

```jsx
class Economic extends Printer {
    constructor(name) {
        super(name);
    }
}
```

Se adicionarmos uma instância de `Economic` dentro do array o código retornará um erro, e é óbvio que é porque não implementamos o método `scan` dentro da classe `Economic`.

```jsx
let printers = [
    new AllInOne('HP 1'),
    new AllInOne('HP 2'),
    new Economic('HP 3'),
];
```

De fato, JavaScript não tem uma implementação de interfaces, mas nesse código criamos um "contrato" que nos força a implementar o método `scan`.

Poderíamos acabar com esse erro implementando o método `scan` na classe `Economic`, mas não é isso que queremos, pois desta forma estaríamos violando o **ISP**. Então, para resolver esse problema de uma maneira simples que nos trará o resultado esperado. Vamos adicionar uma condição que verifica a existência do método em cada uma das instâncias.

```jsx
function printerFunctionalities(printers) {
    console.log('Impressoras digitalizando: ');
    for (let printer of printers) {
        if (printer.scan) {
            console.log(`${printer.name} is ${printer.scan()}`);
        }
    }
}
```

Dessa forma tornamos o método `scan` opcional, não forçando classes concretas a implementarem métodos desnecessários, evitamos um aumento no acoplamento e deixamos nossas classes mais coesas.

## **Conclusão**

O fato de JavaScript não possuir interfaces faz com que esse princípio não se aplique estritamente como os outros. Entretanto, é importante lembrar que interfaces são “contratos” e podemos implementá-los de forma implícita em JavaScript.

Espero que estejam gostando da série, se tiverem dúvidas ou sugestões não deixem de comentar. Abraço!