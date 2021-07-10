---
layout: default
title: Web Workers
date: "2020-04-09T13:59:08.195Z"
---
JavaScript é uma linguagem single-threaded, isso quer dizer que pode executar apenas um processo por vez. Com Web Workers isso muda, eles permitem executar processos em background, a ideia é executar processos longos em background sem quebrar o funcionamento do site.

Para criar um novo worker precisamos usar o construtor `Worker()`:

```javascript
const worker = new Worker('task.js');
```

A função recebe o nome de um arquivo como parâmetro, esse arquivo será baixado de forma assíncrona e só depois de baixado será executado.

Web workers se comunicam por meio de mensagens. O método `postMessage()` pode ser usado para fazer a troca de mensagens entre os scripts.

Para enviar uma mensagem do script principal para o worker chamamos o `postMessage` a partir da variável worker que foi criada.

```javascript
worker.postMessage('Hello');
```

Para enviar uma mensagem de dentro do worker para o script principal usamos a palavra chave `self` para referenciar o worker:

```javascript
self.postMessage('Finished');
```

Quando uma mensagem é enviada, um evento `message` é disparado, e os dados passados na mensagem são armazenados na propriedade `data` dentro do objeto para a função de callback.

```javascript
worker.addEventListener('message', event => {
  console.log(event.data);
}, false);
```
Quando um worker terminar seu trabalho ele pode ser parado usando o método `terminate()`:

```javascript
worker.terminate();
```

Ou o método `close()` caso seja finalizado de dentro do worker:

```javascript
self.close();
```

## Exemplo prático