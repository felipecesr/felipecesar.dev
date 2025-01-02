---
layout: default
title: Chain of Responsibility
tags:
  - javascript
  - cleancode
  - oop
  - designpatterns
date: 2024-06-25T17:47:18.858Z
---
Neste artigo, vou falar um pouco sobre o padrão Chain of Responsibility (Cadeia de responsabilidades) pode ajudar a diminuir o acoplamento do seu código.

## Como funciona?

Você cria uma **cadeia de objetos** para examinar requisições. Cada objeto examina uma requisição e a **trata ou repassa** para o próximo objeto na cadeia.

![Chain of responsibility](/img/solution1-en.png)

## Vantagens

* Desacopla quem faz a requisição de quem recebe.
* Simplifica seu objeto porque não precisa conhecer a estrutura da cadeia.
* Permite adicionar ou remover responsabilidades dinamicamente.

## **Desvantagens**

* Algumas solicitações podem acabar não atendidas.

## **Diagrama de classes**

![Diagrama de classes](/img/captura-de-tela-2024-06-25-às-14.48.29.png)

## Código

```jsx
export default class Handler {
  constructor() {
    this.next = null
  }

  setNext(handler) {
    this.next = handler
    return handler
  }

  handle(request) {
    if (this.next)
      return this.next.handle(request)
    return null
  }
}
```

```jsx
class SpamHandler extends Middleware {
  handle(request) {
    if (request === 'Spam') {
      return `This is a ${request}!`;
    }
    return super.handle(request);
  }
}

class FanHandler extends Middleware {
  handle(request) {
    if (request === 'Fan') {
      return `Fan: ${request}.`;
    }
    return super.handle(request);
  }
}
```

## Client

```jsx
const spam = new SpamHandler()
const fan = new FanHandler()

span.setNext(fan)
span.handle('Spam') // This is a Spam!
span.handle('Fan') // This is a Fan!
span.handle('Complaint') // null
```