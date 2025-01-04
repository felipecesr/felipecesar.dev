---
layout: default
title: Como criar um player HLS do zero (Parte 2)
tags:
  - video
  - streaming
  - javascript
  - arquitetura
date: 2024-12-08T16:04:00.000Z
serie: player-hls
---
No [post anterior](https://felipecesar.dev/posts/como-criar-um-player-hls-do-zero-parte-1/), mergulhamos na criação de um player inspirado na biblioteca [**hls.js**](https://github.com/video-dev/hls.js). Exploramos os fundamentos da **arquitetura orientada a eventos** e demos os primeiros passos na implementação do código. Hoje, vamos dar um passo adiante! Você vai entender como o é feito o parser da playlist. Vamos lá?

## Preparando o projeto

Para facilitar o acompanhamento, criei a branch [part-01](https://github.com/felipecesr/hls-player/tree/part-01) no repositório. Nessa branch, você encontrará o código exatamente como o deixamos no último post.

No projeto, o arquivo principal é o `main.js`. Ele é responsável por inicializar a classe `Hls` e carregar a URL da playlist. Aqui está o código atual:

```javascript
import Hls from './hls';

const videoSrc = '/video/index.m3u8';

const hls = new Hls();
hls.loadSource(videoSrc);
```

## O que é uma playlist HLS?

A playlist, também conhecida como **manifesto**, é um arquivo de texto que contém as URLs dos segmentos de vídeo e informações essenciais para a reprodução.

Neste momento, nosso player simplesmente carrega esse arquivo e exibe seu conteúdo no console. Veja um exemplo de playlist:

```
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:10
#EXTINF:10.000000,
data00.ts
#EXTINF:10.000000,
data01.ts
#EXTINF:10.000000,
data02.ts
#EXT-X-ENDLIST
```

Cada linha que começa com **#** é uma tag especial. Vamos entender o significado de cada uma:

- **EXTM3U**: Indica o tipo do arquivo. Toda playlist HLS começa com essa tag.
- **EXT-X-VERSION**: Especifica a versão do protocolo HLS. No exemplo, estamos usando a versão 3.
- **EXT-X-TARGETDURATION**: Define a duração máxima de cada segmento de mídia, que neste caso é de 10 segundos.
- **EXTINF**: Identifica cada segmento de vídeo com sua duração. Exemplo: `data00.ts`, `data01.ts`, etc.
- **EXT-X-ENDLIST**: Indica o fim da playlist, ou seja, que não haverá mais segmentos.

## Fazendo o parse da playlist

Atualmente, a playlist é apenas um texto. Para torná-la funcional, precisamos **fazer o parse** do arquivo. Aqui entra o arquivo `m3u8-parser.js`. Adicione este código à pasta `loader`:

```javascript
const LEVEL_PLAYLIST_REGEX_FAST =
  /(?:#EXT-X-(MEDIA-SEQUENCE):(\d+))|(?:#EXT-X-(TARGETDURATION):(\d+))|(?:#EXT(INF):([\d.]+)[^\r\n]*[\r\n]+([^\r\n]+)|(?:#EXT-X-(ENDLIST)))/g;

export function parsePlaylist(string, baseurl, id) {
  const level = { fragments: [] };
  let result = null;
  let totalduration = 0;
  let currentSN = 0;

  while ((result = LEVEL_PLAYLIST_REGEX_FAST.exec(string)) !== null) {
    result.shift();
    result = result.filter((n) => n !== undefined);

    switch (result[0]) {
      case "MEDIA-SEQUENCE":
        level.startSN = parseInt(result[1]);
        break;
      case "TARGETDURATION":
        level.targetduration = parseFloat(result[1]);
        break;
      case "ENDLIST":
        level.live = false;
        break;
      case "INF":
        const duration = parseFloat(result[1]);
        level.fragments.push({
          url: `${baseurl}/${result[2].trim()}`,
          baseurl,
          duration,
          start: totalduration,
          sn: currentSN++,
          level: id,
        });
        totalduration += duration;
        break;
      default:
        break;
    }
  }

  level.totalduration = totalduration;
  level.endSN = currentSN - 1;
  return level;
}
```

Agora vamos usar essa função no arquivo `playlist-loader.js`. Adicione a importação e modifique o método `onManifestLoading`:

```javascript
import { parsePlaylist } from './m3u8-parser';

export default class PlaylistLoader {
  // ...
  
  onManifestLoading(event, data) {
    const { url } = data;
    fetch(url)
      .then(response => response.text())
      .then(text => console.log(parsePlaylist(text, '/video')));
  }
}

```

A função `parsePlaylist` transforma o texto da playlist em um objeto JavaScript utilizável no player. Passe o texto da playlist e uma `baseUrl` para que os segmentos sejam corretamente localizados no projeto.

## Conclusão

Agora, ao abrir o console do navegador, você verá um objeto JavaScript detalhado com os dados da playlist. Esse é o primeiro passo para criar um player HLS totalmente funcional.

No próximo post, vamos explorar como usar esses dados. Fique ligado e acompanhe os próximos capítulos dessa jornada!
