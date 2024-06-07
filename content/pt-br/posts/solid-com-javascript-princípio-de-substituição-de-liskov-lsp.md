---
layout: default
title: "SOLID com JavaScript: Princípio de Substituição de Liskov (LSP)"
tags:
  - javascript
  - oop
  - solid
  - es6
date: 2024-06-07T20:12:04.630Z
---
De volta aos princípios **SOLID**, hoje vou falar sobre o terceiro princípio do acrônimo: o **Princípio de Substituição de Liskov** (Liskov Substitution Principle), ou simplesmente **LSP**. Se você não leu os posts anteriores pode encontrá-los clicando [aqui](/posts/princípio-da-responsabilidade-única-srp/) e [aqui](/posts/solid-com-javascript-princípio-aberto-fechado-ocp/).

Sua definição formal diz:

> “ Se para cada objeto O1 do tipo S existe um objeto O2 do tipo T de tal modo que para todos os programas P definidos em termos de T, o comportamento de P não muda quando O2 é substituído por O1, então S é um subtipo de T.”
> 

Isso significa que: **Se a classe B herda da classe A, então você deve ser capaz de usar B no lugar de A sem quebrar a funcionalidade.**

Vamos entender melhor com alguns exemplos:

## **Exemplo de violação**

Imagine que temos uma aplicação de estoque de produtos em que queremos armazenar produtos em alguma forma de persistência de dados. Para isso temos a classe `Produto` com os atributos `nome`, `preco` e o método `salvar` que é responsável pela persistência dos dados.

```jsx
class Produto {
  constructor(nome, preco) {
    this.nome = nome;
    this.preco = preco;
  }
  
  salvar(storage) {
    storage.store({ nome: this.nome, preco: this.preco });
    return storage.length;
  }
}
```

Temos a subclasse `ProdutoDesconto` que adiciona o atributo `desconto` e sobrescreve o método `salvar`.

```jsx
class ProdutoDesconto extends Produto {
  constructor(nome, preco, desconto) {
    super(nome, preco);
    this.desconto = desconto;
  }
  
  salvar(storage) {
    const comDesconto = { nome: this.nome, preco: this.preco - (this.preco * this.desconto) };
    storage.store(comDesconto);
    return comDesconto;
  }
}
```

A classe `ProdutoStorage` ficará responsável pela persistência dos dados (em memória nesse caso).

```jsx
class ProdutoStorage {
  constructor() {
    this.produtos = [];
  }
  
  get length() {
    return this.produtos.length;
  }
  
  store(produto) {
    this.produtos.push(produto);
  }
}
```

Agora que temos todas as classes, vamos criar um array com os produtos que queremos armazenar.

```jsx
const produtos = [
  { nome: 'ProdutoA', preco: 28.90 },
  { nome: 'ProdutoB', preco: 34.40 },
  { nome: 'ProdutoC', preco: 149.90, desconto: 0.2 }
];
```

Devemos criar uma instância para cada item do array, utilizando a classe `Produto` para os itens que não tem desconto e `ProdutoDesconto` para os que tem.

Vamos criar uma função chamada `insereTodos` que claramente viola o princípio do [**SRP**](/posts/princípio-da-responsabilidade-única-srp/), mas que está aqui apenas para automatizar a execução de algumas tarefas e facilitar o entendimento.

```jsx

function insereTodos(produtos) {
  const storage = new ProdutoStorage(); //{1}

  for (let p of produtos) { //{2}
    let produto;
    if (p.desconto) {
      produto = new ProdutoDesconto(p.nome, p.preco, p.desconto);
    } else {
      produto = new Produto(p.nome, p.preco);
    }
    const contador = produto.salvar(storage); //{3}
    console.log(`Produto inserido. ${contador} produtos no total`); //{4}
  }
}

insereTodos(produtos); //{5}
```

A primeira tarefa é criar uma instância de `ProdutoStorage` (linha {1}), que será responsável por armazenar os produtos. Depois disso, um loop `for...of` irá percorrer o array de produtos criando uma instância para cada item (linha {2}), após a criação de cada instância o método `salvar` será chamado (linha {3}) e o total de produtos exibido no console (linha {4}). Por fim, vamos executar a função (linha {5}).

Após a execução, podemos ver no console que uma das mensagens retornadas não mostra o valor esperado. Isso acontece porque o princípio **LSP** foi violado.

```jsx
"Produto inserido. 1 produtos no total"
"Produto inserido. 2 produtos no total"
"Produto inserido. [object Object] produtos no total"
```

## **Resolvendo a violação**

Para resolver essa violação é muito simples, repare que o método salvar sobrescrito na classe `ProdutoDesconto` retorna um objeto ao invés de um número como na classe `Produto`. Então tudo que precisamos fazer é alterar esse retorno para que seja do mesmo tipo.

```jsx

class ProdutoDesconto extends Produto {
  constructor(nome, preco, desconto) {
    super(nome, preco);
    this.desconto = desconto;
  }
  
  salvar(storage) {
    const comDesconto = { nome: this.nome, preco: this.preco - (this.preco * this.desconto) };
    storage.store(comDesconto);
    return storage.length;
  }
}
```

Agora quando o código for executado teremos o valor esperado.

```jsx
"Produto inserido. 1 produtos no total"
"Produto inserido. 2 produtos no total"
"Produto inserido. 3 produtos no total"
```

## **Conclusão**

Este princípio garante que as classes derivadas sejam completamente substituíveis por suas classes-base, evitando surpresas desagradáveis com polimorfismo e tornando o código mais fácil de manter e estender.

Se tiverem dúvidas ou sugestões não deixem de comentar. Abraço!