---
layout: default
title: Como criar um player HLS do zero (Parte 3)
tags:
  - video
  - streaming
  - javascript
  - arquitetura
date: 2024-12-09T17:47:00.000Z
---
Se você chegou até aqui, já está familiarizado com a arquitetura orientada a eventos e o parser M3U8 que construímos anteriormente. Agora, vamos elevar o nível conectando o elemento `<video>` ao nosso player HLS. Essa etapa é fundamental para transformar o código em um player funcional. Para acompanhar o projeto do início você pode ver a [parte 1](/posts/como-criar-um-player-hls-do-zero-parte-1/) e a [parte 2](/posts/como-criar-um-player-hls-do-zero-parte-2/) e o [repositório](https://github.com/felipecesr/hls-player/tree/main).

## Como vincular o elemento `<video>` ao código

Vamos começar adicionando o método `attachMedia` à classe `Hls`. Ele será responsável por conectar o elemento `<video>` ao nosso player. Confira o código:

```javascript
export default class Hls {
  // ...
  
  attachMedia(media) {
    this.trigger(Events.MEDIA_ATTACHING, { media });
  }
}
```

Este método recebe o elemento `<video>` e dispara um evento. Para que isso funcione, precisamos incluir o evento no arquivo `events.js`:

```javascript
export const Events = {
  MEDIA_ATTACHING: 'hlsMediaAttaching',
  // ...
};
```

Agora, basta capturar o elemento `<video>` no DOM e utilizar o método `attachMedia` no arquivo `main.js`:

```javascript
import Hls from './hls';

const video = document.querySelector('#video');
const videoSrc = '/video/index.m3u8';

const hls = new Hls();
hls.loadSource(videoSrc);
hls.attachMedia(video);
```

Com isso, nosso player já está vinculado ao elemento de vídeo. Mas o que acontece por trás dessa conexão? Vamos explorar na próxima etapa.

## Criando a classe `MSEMediaController`

Para gerenciar a interação entre o player e o Media Source Extensions API (MSE), criamos a classe `MSEMediaController`. Sua estrutura é similar à do `PlaylistLoader`:

```javascript
export default class MSEMediaController {
  constructor(hls) {
    this.hls = hls;
    this.registerListeners();
  }

  registerListeners() {
    this.hls.on(Events.MEDIA_ATTACHING, this.onMediaAttaching, this);
  }
}
```

Esse código escuta o evento `MEDIA_ATTACHING` e executa o método `onMediaAttaching`. Antes de seguir, vamos criar o arquivo `utils.js` com a função `waitForEvent`. Ela será essencial para lidar com eventos de maneira assíncrona, como veremos a seguir.

```javascript
export function waitForEvent(
  target,
  types,
  signal
) {
  types = Array.isArray(types) ? types : [types];
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      return reject(signal.reason);
    }
    const listener = (event) => {
      for (const type of types) {
        target.removeEventListener(type, listener);
      }
      signal?.removeEventListener("abort", abortListener);
      resolve(event);
    };
    const abortListener = () => {
      reject(signal.reason);
    };
    for (const type of types) {
      target.addEventListener(type, listener, { once: true, signal });
    }
    signal?.addEventListener("abort", abortListener, { once: true });
  });
}
```

## O método `onMediaAttaching`

O método `onMediaAttaching` é o coração da integração com o [MSE](https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API). Ele instância a API e prepara o player para o streaming de mídia:

```javascript
async onMediaAttaching(event, data) {
  if (!data.media) return;

  const media = data.media;
  const mediaSource = new MediaSource();

  media.src = URL.createObjectURL(mediaSource);

  await waitForEvent(mediaSource, "sourceopen");

  this.hls.trigger(Events.MEDIA_ATTACHED, { media, mediaSource });
}
```

### O que esse código faz?

1. **Validação inicial:** Verifica se `data.media` está presente. Caso contrário, interrompe a execução.
2. **Criação do MediaSource:** Instancia a API MSE e cria um novo `MediaSource`.
3. **Vinculação ao elemento `<video>`:** Associa o `MediaSource` ao vídeo usando um [Object URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static).
4. **Espera pelo evento `sourceopen`:** Garante que o `MediaSource` esteja pronto para receber dados.
5. **Dispara o evento `MEDIA_ATTACHED`:** Indica que a mídia foi anexada com sucesso, permitindo que outras partes do player continuem o processamento.

## Conclusão

A [API Media Source Extensions](https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API) é o que permite ao navegador fazer streaming de vídeo adaptativo, fundamental para lidar com formatos como HLS. Essa etapa é o primeiro passo para tornar o player HLS dinâmico e pronto para exibir vídeos em diferentes condições de rede.

Fique ligado e acompanhe os próximos capítulos dessa jornada!
