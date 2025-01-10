---
title: " Como implementar um chat em tempo real com SSE no Next.js"
tags:
  - javascript
  - nextjs
date: 2025-01-10T16:51:00.000Z
---
Neste post, você vai aprender como implementar um chat real time utilizando Server-Sent Events (SSE) com Next.js.

## O que são Server-Sent Events (SSE)?

Os **Server-Sent Events (SSE)** são um padrão web que permite aos servidores enviarem dados para os navegadores por meio de uma conexão HTTP única e persistente. Essa tecnologia é ideal para fluxos de dados unidirecionais, onde o servidor precisa atualizar o cliente, como em atualizações de texto, envio de JSON ou fragmentos de HTML para atualizar a interface do usuário em tempo real.

### Por quê usar SSE?

* **Nativo nos navegadores modernos**: Sem necessidade de bibliotecas externas ou polyfills.
* **Economia de recursos**: Melhor performance do servidor em cenários onde a comunicação bidirecional não é necessária, ao contrário do WebSocket.

## Criando a Página de Mensagens

Vamos começar criando uma página para exibir as mensagens do chat. O código abaixo utiliza React com hooks para lidar com o estado das mensagens e enviar novas mensagens para o servidor.

```jsx
"use client";

import { useState } from "react";

const Messages = ({ initialMessages = [] }) => {
  const [messages, setMessages] = useState(initialMessages);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get("message");

    fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({ message }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <>
      <ul>
        {messages.map((m, i) => (
          <li key={i}>{JSON.stringify(m)}</li>
        ))}
        <form onSubmit={handleSubmit}>
          <input id="message" name="message" type="text" />
          <button type="submit">Send</button>
        </form>
      </ul>
    </>
  );
};
```

## Criando o Controller

O controller gerencia as mensagens no servidor e fornece a funcionalidade para notificar os clientes quando novas mensagens chegam. Ele utiliza o `EventEmitter`, que é uma implementação do padrão de design **Observer**.

```javascript
import EventEmitter from "events";

class MessagesController {
  constructor() {
    this.messages = [];
    this.emitter = new EventEmitter();
  }

  subscribe(callback): void {
    this.emitter.on("message", callback);
  }

  unsubscribe(callback): void {
    this.emitter.off("message", callback);
  }

  addMessage(message) {
    this.messages.push(message);
    this.emitter.emit("message", message);
  }

  getMessages() {
    return this.messages;
  }
}

export default new MessagesController();
```

### **Quer saber mais sobre o padrão Observer?**

O `EventEmitter` é um exemplo clássico de como o padrão Observer funciona. Se você quer aprender mais sobre esse padrão e como aplicá-lo em seus projetos, confira o meu [post sobre o padrão Observer](/posts/padroes-de-projeto-em-javascript-observer). Ele traz explicações detalhadas, exemplos práticos e insights para aprofundar seu conhecimento!

## Criando a API para mensagens

Agora, criamos uma rota para receber as mensagens via `POST` e adicioná-las ao nosso controller.

```jsx
import { NextResponse } from "next/server";
import messageController from "@/controllers/messages";

export async function POST(req: Request) {
  const { message } = await req.json();

  // Add message to store
  messageController.addMessage(message);

  return new Response(null, { status: 204 });
}
```

## Configurando o Endpoint SSE

Para implementar o streaming de mensagens em tempo real, criamos um endpoint que utiliza SSE para enviar atualizações aos clientes.

```javascript
export async function GET(request) {
  const body = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      const sendEvent = (data) => {
        const message = `data: ${JSON.stringify(data)}\n\n`;
        controller.enqueue(encoder.encode(message));
      };

      // Subscribe to new messages
      messageController.subscribe(sendEvent);

      request.signal.addEventListener("abort", () => {
        messageController.unsubscribe(sendEvent);
        controller.close();
      });
    },
  });

  const res = new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });

  return res;
}
```

## Inscrevendo-se no SSE no client

Agora, conectamos a página de mensagens ao endpoint SSE para receber as atualizações em tempo real.

```jsx
"use client";

import { useEffect, useState } from "react";

const Messages = ({ initialMessages = [] }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (!listening) {
      const events = new EventSource("/api/messages");

      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        setMessages((m) => m.concat(parsedData));
      };

      setListening(true);
    }
  }, [listening, messages]);

  // ...
};
```

## Conclusão

Com SSE, você consegue implementar atualizações em tempo real no navegador com simplicidade, sem a complexidade dos WebSockets. Essa abordagem é ideal para aplicações como chats, notificações e atualizações em dashboards. Além disso, com a integração ao Next.js, você ganha flexibilidade e performance.

Se você gostou deste artigo ou ficou com dúvidas, deixe um comentário ou compartilhe com outros desenvolvedores!
