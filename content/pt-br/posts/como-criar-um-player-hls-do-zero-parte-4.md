---
layout: default
title: Como criar um player HLS do zero (Parte 4)
tags:
  - video
  - javascript
  - streaming
  - arquitetura
date: 2024-12-10T18:32:00.000Z
---
Chegamos a mais uma etapa do desenvolvimento do nosso player HLS. Até agora, exploramos os conceitos fundamentais e construímos partes essenciais do sistema. Agora, vamos mergulhar em dois componentes cruciais: **PlaylistLoader** e **StreamController**. Pronto para dar mais um passo nessa jornada? Vamos lá!

📖 **Confira os posts anteriores da série:**

* [Parte 1: Introdução e Configuração Inicial](/posts/como-criar-um-player-hls-do-zero-parte-1/)
* [Parte 2: Construindo o Parser de Playlist](/posts/como-criar-um-player-hls-do-zero-parte-2/)
* [Parte 3: Gerenciamento de Eventos com o HLS.js](/posts/como-criar-um-player-hls-do-zero-parte-3/)

📂 **Acesse o código completo no GitHub:** [Repositório do Player HLS](https://github.com/felipecesr/hls-player/tree/main)

## [](https://github.com/felipecesr/hls-player/tree/main)A classe `PlaylistLoader`

No componente `PlaylistLoader`, ao invés de apenas exibir a playlist no console, vamos fazer algo muito mais interessante: enviar esse objeto por meio do evento `LEVEL_LOADED`. Essa abordagem permitirá que outros componentes do player respondam automaticamente às mudanças na playlist.

```javascript
export default class PlaylistLoader {
  // ...

  onManifestLoading(event, data) {
    const { url } = data;
    fetch(url)
      .then(response => response.text())
      .then(text => parsePlaylist(text, '/video'))
      .then(details => {
	      this.hls.trigger(Events.LEVEL_LOADED, { details })
      });
  }
}
```

## [](<>)A classe `StreamController`

O **`StreamController`** escuta eventos importantes, como `MEDIA_ATTACHED` e `LEVEL_LOADED`, e usa essas informações para atribuir propriedades essenciais e configurar o fluxo de dados. Veja como configuramos os ouvintes de eventos e definimos as propriedades da classe:

```javascript
export default class StreamController {
  constructor(hls) {
    this.hls = hls;
    registerListeners();
  }
	
  registerListeners() {
    this.hls.on(Events.MEDIA_ATTACHED, this.onMediaAttached, this);
    this.hls.on(Events.LEVEL_LOADED, this.onLevelLoaded, this);
  }
  
  onMediaAttached(event, data) {
    const { media, mediaSource } = data;
    this.media = media;
    this.mediaSource = mediaSource;
  }
}
```

Quando o evento `LEVEL_LOADED` ocorre, ele traz os detalhes da playlist. Com essas informações, configuramos o **`MediaSource`** e criamos um **`SourceBuffer`** para lidar com os dados de vídeo:

```javascript
export default class StreamController {
  // ...

  onLevelLoaded(event, data) {
    const { details } = data;
    const duration = details.totalduration;

    this.sourceBuffer = this.mediaSource.addSourceBuffer(
      'video/mp4; codecs="avc1.42c01e"'
    );
    this.mediaSource.duration = duration;
  }
}
```

A propriedade `fragments` no objeto `details` contém informações essenciais sobre os segmentos de vídeo. Cada fragmento tem sua própria URL, duração e posição na timeline:

```json
{
  "url": "/video/data00.ts",
  "baseurl": "/video",
  "duration": 10,
  "start": 0,
  "sn": 0
}
```

Com esses dados, podemos buscar cada segmento e processá-lo. Veja como implementamos isso:

```javascript
export default class StreamController {
  // ...

  async onLevelLoaded(event, data) {
    // ...

    for (const fragment of details.fragments) {
      const segmentData = await fetch(fragment.url).then((buf) =>
        buf.arrayBuffer()
      );
      await this._handleFragmentLoadProgress(segmentData)
    }
  }

  async _handleFragmentLoadProgress(segmentData) {}
}
```

O método `_handleFragmentLoadProgress` será o responsável por processar os dados brutos do segmento. Por enquanto, estamos apenas configurando a base para as próximas etapas.

## Conclusão

Agora, se você abrir a aba **Network** no navegador, verá que as requisições para os segmentos da playlist estão sendo feitas corretamente. No entanto, esses arquivos ainda não estão prontos para serem reproduzidos no browser.

Na próxima parte, vamos explorar como usar a biblioteca [`mux.js`](https://github.com/videojs/mux.js) para preparar os dados e finalizar o fluxo de reprodução.
