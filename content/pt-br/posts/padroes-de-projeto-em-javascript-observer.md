---
layout: default
title: "Padrões de projeto em JavaScript: Observer"
tags:
  - patterns
  - javascript
date: 2024-12-12T19:42:00.000Z
---
Nos últimos posts sobre o **player HLS**, usamos a biblioteca [EventEmitter3](https://www.npmjs.com/package/eventemitter3) para enviar e receber eventos. O que talvez você não saiba é que ela implementa o Padrão Observer. Neste artigo, vamos explorar esse padrão, entender como ele funciona e aplicá-lo a um caso real. 

## O que é o Padrão Observer?

O **Padrão Observer** se baseia em uma relação de **inscrição e notificação**, onde um objeto (o "Subject") notifica outros objetos ("Observers") sobre mudanças em seu estado. Pense em uma lista de transmissão: você se inscreve, recebe as notificações e pode cancelar a qualquer momento.

![Exemplo do padrão observer](/img/observer.png)

Agora, por que isso é relevante? Em aplicações modernas, precisamos reagir a eventos de forma organizada, e o Observer nos ajuda a encapsular essa lógica.

## Exemplo prático

Imagine que estamos criando um player de vídeo customizado com uma interface minimalista: uma tag `<video>` e um botão "Play/Pause". Sempre que o vídeo inicia ou pausa, queremos atualizar o texto do botão para refletir o estado atual. Veja como isso funciona em um código simples:

```javascript
const $video = document.querySelector("video");
const $toggle = document.querySelector("button");

$toggle.addEventListener("click", togglePlay);
$video.addEventListener("play", updateButton);
$video.addEventListener("pause", updateButton);

function togglePlay() {
  const method = $video.paused ? "play" : "pause";
  $video[method]();
}

function updateButton() {
  $toggle.textContent = $video.paused ? "Play" : "Pause";
}
```

Essa implementação funciona, mas e se quisermos adicionar mais funcionalidades? Por exemplo, **enviar métricas** ou **registrar logs** sempre que o estado mudar?

Uma solução inicial seria criar funções específicas para cada caso. Por exemplo:

```javascript
$video.addEventListener("play", onPlay);
$video.addEventListener("pause", onPause);

function onPlay() {
  updateButton();
  log("Vídeo está tocando");
  sendAnalytics();
}

function onPause() {
  updateButton();
  log("Vídeo foi pausado");
  sendAnalytics();
}
```

Funciona? Sim. Mas, e se no futuro quisermos **adicionar ou remover funcionalidades em tempo de execução**? O código rapidamente se torna rígido e difícil de escalar.

## Como o Padrão Observer resolve isso?

Com o Observer, podemos abstrair essas ações. O Subject centraliza a lógica e notifica os Observers (ou assinantes) sempre que um evento ocorre. No JavaScript, criamos um objeto que gerencia os Observers:

```javascript
const subject = {
  observers: [],

  subscribe(func) {
    this.observers.push(func);
  },

  unsubscribe(func) {
    this.observers = this.observers.filter((observer) => observer !== func);
  },

  notify(data) {
    this.observers.forEach((observer) => observer(data));
  },
};

export default subject;
```

Agora, cada Observer pode se inscrever para receber notificações:

```javascript
subject.subscribe(updateButton);
subject.subscribe(log);
subject.subscribe(sendAnalytics);
```

E os eventos no player notificam o Subject:

```javascript
const $video = document.querySelector("video");

$video.addEventListener("play", () => {
  subject.notify("play");
});

$video.addEventListener("pause", () => {
  subject.notify("pause");
});
```

## Benefícios

* **Escalabilidade**: Adicione ou remova funcionalidades sem alterar a lógica principal.
* **Manutenção Simplificada**: O código fica mais modular e fácil de entender.
* **Reutilização**: Funções como `log` ou `sendAnalytics` podem ser reutilizadas em diferentes contextos.

## Conclusão

O Padrão Observer não é apenas uma boa prática de desenvolvimento; ele é um passo em direção a um código mais organizado, escalável e sustentável. Experimente o Padrão Observer e veja como ele funciona nos seus projetos!
