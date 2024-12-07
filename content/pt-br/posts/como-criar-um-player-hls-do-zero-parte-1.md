---
layout: default
title: Como criar um player HLS do zero (Parte 1)
tags:
  - video
  - streaming
  - javascript
  - arquitetura
date: 2024-12-07T12:09:00.000Z
---
Neste artigo, vamos dar inicio a uma série onde iremos construir um player de vídeo inspirado na biblioteca [`hls.js`](https://github.com/video-dev/hls.js). Começaremos explorando conceitos fundamentais, como a arquitetura orientada a eventos, enquanto implementamos as primeiras funcionalidades.

## O que é HLS?

**HLS (HTTP Live Streaming)** é um protocolo de streaming criado pela Apple. Ele divide vídeos em pequenos pedaços (chunks) e os organiza em um arquivo de texto chamado **manifesto** ou **playlist** (formato `.m3u8`). Isso garante uma reprodução eficiente e adaptativa, perfeita para transmissões ao vivo e vídeos sob demanda.

## Arquitetura Orientada a Eventos

A arquitetura orientada a eventos organiza a comunicação do sistema por meio de mensagens (eventos). Componentes não interagem diretamente; eles emitem e ouvem eventos gerenciados por um intermediário, como um **EventBus**.

## Criando a classe `Hls`

Nossa classe principal será chamada de `Hls`, onde centralizaremos a comunicação por eventos. Para isso, usaremos a biblioteca `eventemitter3`.

```javascript
import { EventEmitter } from 'eventemitter3'

export default class Hls {
  _emitter = new EventEmitter();
  
  on(event, listener, context) {
    this._emitter.on(event, listener, context);
  }
  
  trigger(event, eventObject) {
    return this._emitter.emit(event, event, eventObject);
  }
}
```

## Carregando a Playlist

Adicionaremos o método `loadSource` para iniciar o carregamento da playlist e emitir um evento correspondente.

```javascript
class Hls {
  // ...

  loadSource(url) {
    this.trigger('hlsManifestLoading', { url });
  }
}
```

## Criando a classe `PlaylistLoader`

Agora, criaremos uma classe dedicada ao carregamento do manifesto, chamada `PlaylistLoader`.

```javascript
export default class PlaylistLoader {
  constructor(hls) {
    this.hls = hls;
    this.registerListeners();
  }

  registerListeners() {
    this.hls.on('hlsManifestLoading', this.onManifestLoading, this);
  }

  onManifestLoading(event, data) {
    const { url } = data;
    fetch(url)
      .then(response => response.text())
      .then(text => console.log(text));
  }
}
```

Essa classe recebe uma instância de `Hls` que permite que ela escute e emita eventos.

```javascript
export default class Hls {
  _emitter = new EventEmitter()

  constructor() {
    new PlaylistLoader(this)
  }
  
  // ...
}
```

## Utilizando constantes para eventos

Para evitar erros ao nomear eventos, criaremos um arquivo `events.js` com constantes:

```javascript
export const Events = {
  MANIFEST_LOADING: 'hlsManifestLoading',
}
```

Use as constantes no código:

```javascript
import { Events } from './events';

export default class PlaylistLoader {
  // ...

  registerListeners() {
    this.hls.on(Events.MANIFEST_LOADING, this.onManifestLoading, this);
  }
}
```

## Por que usar a arquitetura orientada a eventos?

* **Reutilização:** Novos módulos podem ouvir eventos existentes, reduzindo a duplicação de código.
* **Flexibilidade:** Alterações em um componente não afetam os demais.
* **Reatividade:** Ideal para aplicações dinâmicas, como players de vídeo.

Embora essa arquitetura ofereça diversas vantagens, também apresenta algumas limitações:

* **Dificuldade no debug:** Rastrear eventos pode ser desafiador.
* **Sobrecarga:** Eventos desnecessários podem consumir recursos.

## Conclusão

Essa foi apenas a primeira etapa do projeto. Nos próximos artigos, evoluiremos o player até ele reproduzir vídeos. Acompanhe o repositório no [GitHub](https://github.com/felipecesr/hls-player) para mais atualizações!

Gostou? Deixe seu feedback ou compartilhe este post com outros desenvolvedores interessados em aprender mais sobre HLS.
