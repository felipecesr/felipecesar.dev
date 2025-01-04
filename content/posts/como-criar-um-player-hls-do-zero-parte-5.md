---
layout: default
title: Como criar um player HLS do zero (Parte 5)
tags:
  - video
  - javascript
  - streaming
  - arquitetura
date: 2024-12-11T18:37:00.000Z
serie: player-hls
---
No [último post](/posts/como-criar-um-player-hls-do-zero-parte-4/), mostramos como realizar o download dos segmentos de vídeo, mas você deve ter percebido que o navegador ainda não consegue reproduzi-los diretamente. Isso acontece porque esses arquivos precisam passar por um processo de **conversão** para se tornarem compatíveis com os players dos navegadores. Neste artigo, vamos guiá-lo por esse processo e explicar como preparar os arquivos de forma eficiente.

## Por que os seguimentos precisam de conversão?

Os fragmentos de vídeo que chegam via **streaming adaptativo** (como HLS ou DASH) geralmente estão em um formato bruto que não pode ser reproduzido diretamente. Eles contêm dados de vídeo e áudio que precisam ser **reorganizados e empacotados** em um formato compreensível para o navegador, como MP4. Para isso, utilizamos uma biblioteca poderosa chamada **[mux.js](https://github.com/videojs/mux.js)**.

## Preparando os arquivos

O primeiro passo é instalar a biblioteca **mux.js** em seu projeto. Ela será responsável por realizar a conversão (ou "transmuxing") dos fragmentos.

### Instalando a Biblioteca

Execute o comando abaixo no terminal para adicionar o **mux.js** ao seu projeto:

```
npm install --save mux.js
```

Com isso, temos acesso às ferramentas necessárias para processar os segmentos de vídeo.

## Criando a classe `TransmuxerInterface`

Agora vamos criar um "adapter" para o código da biblioteca. Essa adaptação nos ajudará a gerenciar o processo de conversão de maneira mais organizada. Crie o arquivo `src/demux/transmuxer-interface.js` e adicione o seguinte código:

```javascript
import { mp4 } from 'mux.js';

export default class TransmuxerInterface {
  constructor(hls, onTransmuxComplete) {
    this.hls = hls;
    this.onTransmuxComplete = onTransmuxComplete;

    this.transmuxer = new mp4.Transmuxer();
    this.transmuxer.on('data', segment => this.onTransmuxComplete(segment));
  }

  push(segmentData) {
    this.transmuxer.push(segmentData);
  }

  flush() {
    this.transmuxer.flush();
  }
}
```

### Explicando o código:

* **Importação da biblioteca**: O `mp4.Transmuxer` é a ferramenta que realiza o processo de transmuxing, transformando os dados recebidos em um formato adequado para reprodução.
* **Construtor**: A classe aceita dois parâmetros:

  * `hls`: É a instância de `Hls`.
  * `onTransmuxComplete`: Função chamada quando o processo de transmuxing termina.
* **push**: Envia os dados do fragmento para o transmuxer processá-los.
* **flush**: Finaliza o processamento e dispara os eventos para o próximo passo.

Com essa classe configurada, podemos integrar a conversão ao nosso fluxo de carregamento dos segmentos.

## Adicionando métodos ao `StreamController`

No próximo passo, vamos adicionar os seguintes métodos ao `StreamController` para gerenciar os segmentos e integrá-los ao buffer de reprodução do navegador.

```javascript
async _handleFragmentLoadProgress(segmentData) {
  const transmuxer = (this.transmuxer =
    this.transmuxer ||
    new TransmuxerInterface(
      this.hls,
      this._handleTransmuxComplete.bind(this)
    ));
  transmuxer.push(new Uint8Array(segmentData));
  transmuxer.flush();
  return waitForEvent(this.sourceBuffer, "updateend");
}

_handleTransmuxComplete(segment) {
  const data = new Uint8Array(
    segment.initSegment.byteLength + segment.data.byteLength
  );
  data.set(segment.initSegment, 0);
  data.set(segment.data, segment.initSegment.byteLength);
  this.sourceBuffer.appendBuffer(data);
}
```

O método `_handleFragmentLoadProgress` é chamado sempre que um novo fragmento é carregado. Ele cria ou reutiliza uma instância do `TransmuxerInterface` e utiliza os métodos **`push` e `flush`** para enviar os dados do fragmento para o transmuxer processá-los e finaliza o processamento.

É necessário aguardar o evento `updateend`, isso garante que o navegador concluiu a atualização do buffer antes de adicionar novos fragmentos.

Já o método `_handleTransmuxComplete` é chamado quando o transmuxer termina de processar os dados do fragmento. Nesse método, os dados do seguimento são enviados para o `sourceBuffer`, que é usado pelo navegador para reproduzir o conteúdo.

## Conclusão

Com esses passos, criamos uma solução completa para reproduzir streaming de vídeo no navegador. Usamos a biblioteca **mux.js** para realizar o transmuxing e integramos essa funcionalidade ao fluxo de carregamento e reprodução. Agora, o vídeo deve estar pronto para tocar!

Esse foi o último post da série, e como mencionei no início, estou compartilhando um estudo que fiz a algum tempo. Mais uma vez vou deixar o [link do repositório](https://github.com/felipecesr/hls-player/tree/part-05). Espero que tenham gostado, e fiquem a vontade para comentar. Abraço!
