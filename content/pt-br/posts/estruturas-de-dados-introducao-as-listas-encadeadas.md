---
layout: default
title: "Estruturas de dados: Introdução às Listas Encadeadas"
tags:
  - javascript
  - testes
  - estruturasdedados
date: 2024-12-06T18:22:00.000Z
---
Neste artigo, você aprenderá a implementar uma lista encadeada explorando os conceitos básicos e as operações mais comuns. Vamos explorar as vantagens, desvantagens e como aplicá-las de forma prática no código.

## O que são Listas Encadeadas?

Imagine uma sequência de elementos, onde cada um aponta para o próximo, como uma corrente. Esses elementos, chamados de **nós**, podem estar em qualquer lugar da memória, mas são conectados por referências. Cada nó contém dois campos:

* O **valor** do nó.
* Um **ponteiro** que aponta para o próximo nó na sequência.

O último nó da lista sempre terá o valor `null` em seu ponteiro, indicando o fim da estrutura.

Exemplo em JavaScript:

```javascript
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
}
```

## Principais Operações em Listas Encadeadas

Aqui, vamos explorar a implementação de dois métodos fundamentais: `append`, para adicionar novos elementos, e `delete`, para removê-los. No entanto, vale destacar que existem diferentes abordagens e métodos.

### Adicionando elementos (`append`)

#### Cenário 1: Lista vazia

Adicionando o primeiro elemento:

```javascript
class LinkedList {
  // ...
  
  append(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
    }
  }
}
```

Teste automatizado:

```javascript
test('should append a node to the empty list', () => {
  const list = new LinkedList();
  list.append(10);
  expect(list.head.next).toBeNull();
});
```

#### Cenário 2: Lista com elementos

Ao adicionar em uma lista já preenchida, é necessário percorrê-la até encontrar o último elemento:

```javascript
class LinkedList {
  // ...
  
  append(value) {
    // ...
    
    let current;

    while (current.next) {
      current = current.next;
    }

    current.next = node;
  }
}
```

Teste correspondente:

```javascript
test('should append a node to the list', () => {
  const list = new LinkedList();
  list.append(10);
  list.append(15);
  expect(list.head.next.value).toBe(15);
});
```

### **Removendo elementos (`delete`)**

#### Cenário 1: Lista vazia

Antes de qualquer ação, verifique se a lista tem elementos:

```javascript
class LinkedList {
  // ...
  
  delete(value) {
    if (!this.head) return;
  }
}
```

#### Cenário 2: Removendo o primeiro elemento

Para isso, basta ajustar o **head** para apontar para o próximo elemento:

```javascript
class LinkedList {
  // ...
  
  delete(value) {
    // ...
    
    if (this.head.value === value) {
      this.head = this.head.next;
      return;
    }
  }
}
```

Teste para validar:

```javascript
test('should delete the first node by value', () => {
  const list = new LinkedList();
  list.append(10);
  list.append(15);
  list.delete(10);
  expect(list.head.value).toBe(15);
});
```

#### Cenário 3: Removendo elementos do meio ou final

Aqui, precisamos iterar pela lista até encontrar o nó desejado:

```javascript
class LinkedList {
  // ...
  
  delete(value) {
    // ...
    
    let current = this.head;
    while (current.next && current.next.value !== value) {
      current = current.next;
    }
  }
}
```

Teste correspondente:

```javascript
test('should delete any nodes by value', () => {
  const list = new LinkedList();
  list.append(10);
  list.append(20);
  list.append(30);
  list.delete(20);
  expect(list.head.next.value).toBe(30);
});
```

## Prós e Contras das Listas Encadeadas

### Vantagens

* **Inserções e remoções eficientes**: Não é necessário deslocar elementos na memória.
* **Leitura sequencial**: Ideal para percorrer itens de forma linear.

### Desvantagens

* **Acesso lento a elementos específicos**: É necessário iterar a lista para encontrar o nó desejado.

## Conclusão

Listas encadeadas são poderosas quando bem aplicadas, especialmente em cenários onde inserções e remoções frequentes são necessárias. Embora tenham suas limitações, seu uso eficiente pode fazer toda a diferença no desempenho de aplicações que lidam com grandes volumes de dados.

Gostou desse conteúdo? Deixe um comentário e compartilhe!
