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
Neste artigo, vamos dar inicio a uma série onde iremos construir um player de vídeo inspirado na biblioteca `hls.js`. Começaremos explorando conceitos fundamentais, como a arquitetura orientada a eventos, enquanto implementamos as primeiras funcionalidades.

## O que é HLS?

**HLS (HTTP Live Streaming)** é um protocolo de streaming criado pela Apple. Ele divide vídeos em pequenos pedaços (chunks) e os organiza em um arquivo de texto chamado **manifesto** ou **playlist** (formato `.m3u8`). Isso garante uma reprodução eficiente e adaptativa, perfeita para transmissões ao vivo e vídeos sob demanda.

Aqui está um exemplo básico de um arquivo `.m3u8`:

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

**Significado das tags principais:**

* **EXTM3U:** Indica o formato da playlist.
* **EXT-X-VERSION:** Versão do protocolo HLS utilizada.
* **EXT-X-TARGETDURATION:** Duração máxima de cada chunk (em segundos).
* **EXTINF:** Define a duração de um segmento de vídeo.
* **EXT-X-ENDLIST:** Indica o fim da playlist.
