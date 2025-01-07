---
title: Entendendo o Clappr
tags:
  - streaming
  - javascript
date: 2025-01-07T14:15:00.000Z
serie: solid
---
O Clappr é um player de vídeo open-source desenvolvido pela [Globo](https://www.globo.com/), amplamente utilizado em diversos produtos. Sua flexibilidade e facilidade de uso o tornam uma excelente opção para desenvolvedores que precisam incorporar vídeos na web. Neste post, você aprenderá o básico para começar a utilizar o Clappr, desde a instalação até a criação de plugins personalizados.

Se você ainda não conhece o projeto, vale a pena conferir o [repositório no GitHub](https://github.com/clappr/clappr), onde você também pode contribuir com melhorias!

## Instalação

O Clappr pode ser instalado de diferentes maneiras, dependendo da sua necessidade.

### Sem build tools

Para começar sem configurar ferramentas de build, basta copiar o código abaixo em um arquivo HTML e abri-lo no navegador:

```javascript
<script src="https://cdn.jsdelivr.net/npm/@clappr/player@latest/dist/clappr.plainhtml5.min.js"></script>

<div id="player"></div>

<script>
  new Clappr.Player({
    source: "http://your.video/here.mp4",
    parentId: "#player",
  });
</script>
```

### Com build tools

Caso prefira integrá-lo em um projeto com ferramentas de build, siga os passos abaixo:

Instale o pacote do Clappr:

```
npm install @clappr/player
```

Configure o player:

```javascript
import { Player } from '@clappr/player'

new Player({
  source: "http://clappr.io/media/video.mp4",
  parentId: "#player",
});
```

### Uso avançado com pacotes separados

O Clappr é composto por dois pacotes principais: `@clappr/core` e `@clappr/plugins`. Você pode instalá-los separadamente e criar seu próprio player personalizado, adicionando apenas os plugins que desejar.

```
npm install @clappr/core @clappr/plugins
```

```javascript
import { Player } from "@clappr/core";
import { MediaControl } from '@clappr/plugins'

new Player({
  source: "http://your.video/here.mp4",
  parentId: "#player",
  plugins: {
    core: [MediaControl],
  }
});
```

## Conhecendo o Player

O Clappr organiza seus componentes em uma hierarquia. O "Core" é o contexto principal, enquanto o "Container" é a área onde o vídeo é exibido. Para visualizar essa estrutura, imagine o seguinte HTML gerado pelo player:

```html
<div id="player">
  <!-- core -->
  <div data-player="">
    <!-- container -->
    <div class="container" data-container="">
	    <!-- playback -->
      <video src="http://your.video/here.mp4"></video>
		  <!-- END playback -->
    </div>
    <!-- END container -->
  </div>
  <!-- END core -->
</div>
```

## Criando Plugins Personalizados

Os plugins permitem estender as funcionalidades do Clappr. Eles podem ser de dois tipos principais:

* `CorePlugin`

  : para modificar o contexto geral do player.
* `ContainerPlugin`

  : para alterar a área de exibição do vídeo.

Você pode criar versões visuais desses plugins (`UICorePlugin` e `UIContainerPlugin`) para adicionar elementos de interface.

Exemplo de um `CorePlugin` simples:

```javascript
import { CorePlugin } from '@clappr/player';

export default class Plugin extends CorePlugin {
}
```

Adicionando o plugin ao player:

```javascript
import { Player } from '@clappr/player'

new Player({
  source: "http://clappr.io/media/video.mp4",
  parentId: "#player",
  plugins: {
    core: [Plugin]
  }
});
```

### Comunicação entre plugins

Os plugins são observers, e se comunicam por meio de eventos. Para ouvir um evento podemos usar o método `listenTo` que recebe como primeiro argumento a instância do Core (Se fosse um plugin de Container seria o container), o segundo argumento é o nome do evento e o terceiro é um callback.

```javascript
import { Player, CorePlugin, Events } from '@clappr/player'

export default class Plugin extends CorePlugin {
  constructor(core) {
    super(core)
    this.listenTo(core, 'core:ready', this.onCoreReady)
  }

  onCoreReady() {
    alert('Core ready')
  }
}
```

Podemos importar o objeto Events que contém propriedades com o nome dos eventos.

```javascript
import { Player, CorePlugin, Events } from '@clappr/player'

export default class Plugin extends CorePlugin {
  constructor(core) {
    super(core)
    this.listenTo(core, Events.CORE_READY, this.onCoreReady)
  }
```

Uma boa prática é criar o método `bindEvents` para agrupar os listeners do plugin.

```javascript
import { Player, CorePlugin, Events } from '@clappr/player'

export default class Plugin extends CorePlugin {
  constructor(core) {
    super(core)
    this.core = core
    this.bindEvents()
  }

  bindEvents() {
    this.listenTo(this.core, Events.CORE_READY, this.onCoreReady)
  }
```

O Container é a área onde o vídeo é exibido, no momento que um plugin de Core é instanciado o Container ainda não está pronto. Se quisermos ouvir um evento do Container, precisamos esperar o Core ficar pronto. Para isso, podemos fazer o seguinte:

```javascript
export default class Plugin extends CorePlugin {
  constructor(core) {
    super(core)
    this.core = core
    this.bindEvents()
  }

  bindEvents() {
    this.listenTo(this.core, Events.CORE_READY, this.bindContainerEvents)
  }

  bindContainerEvents() {
    this.listenTo(this.core.activeContainer, Events.CONTAINER_TIMEUPDATE, this.onTimeUpdate)
  }

  onTimeUpdate({ current }) {
    console.log('Current Time: ', current)
  }
}
```

Dessa forma exibimos no console o tempo atual sempre que ele for atualizado.

## Adicionando elementos de UI

Para transformar esse plugin em um plugin de UI, tudo que precisamos fazer é alterar o tipo de plugin que ele extende.

```diff
- import { Player, CorePlugin, Events } from '@clappr/player'
+ import { Player, UICorePlugin, Events } from '@clappr/player'

- export default class Plugin extends CorePlugin {
+ export default class Plugin extends UICorePlugin {
```

Com isso temos acesso a outras propriedades, por exemplo, podemos definir a tag do elemento que será renderizado no player e os atributos dela.

O elemento não é renderizado automaticamente, para isso criar utilizar o método `render`, que é usado para adicionar o elemento do plugin no player.

Dica: Plugins de UI sempre criam um elemento, sendo a `div` o padrão. Nesse caso, não seria necessário definir explicitamente o `tagName`. No entanto, optei por mantê-lo definido para fins didáticos, já que, em situações reais, costumamos alterá-lo apenas quando utilizamos um elemento diferente.

```javascript
export default class Plugin extends UICorePlugin {
  get tagName() {
    return 'div'
  }

  get attributes() {
    return {
      style: 'background-color: gray;'
    }
  }

  render() {
    this.core.el.appendChild(this.el)
  }

  /* ... */
}
```

Vamos alterar o método `onTimeUpdate` para exibir o tempo atual do vídeo na tela do player e não só no console.

```diff
export default class Plugin extends UICorePlugin {
  /* ... */

  onTimeUpdate({ current }) {
-   console.log('Current Time: ', current)
+   this.el.innerHTML = `Current Time: ${current}`
  }
}
```

## Escutando eventos do DOM

Em Plugins de UI também podemos ouvir eventos do DOM a partir do elemento do plugin.

```javascript
export default class Plugin extends UICorePlugin {
  /* ... */

  get events() {
    return {
      click: 'handleClick'
    }
  }

  handleClick() {
    alert('clicked!')
  }

  /* ... */
}
```

## Parando de ouvir eventos

Podemos parar de ouvir um evento usando o método `stopListening`. Vamos fazer isso quando o usuário clicar no elemento do plugin.

```diff
handleClick() {
- alert('clicked!')
+ this.stopListening(this.core.activeContainer, Events.CONTAINER_TIMEUPDATE)
}
```

> Obs: Se nenhum argumento for passado para o `stopListening` ele para de ouvir todos os eventos do plugin.

## Habilitando e Desabilitando plugins

Plugins podem ser habitilados e desabilitados utilizando os métodos `enable` e `disable`. Podemos aproveitar o evento do click pra desabilitar nosso plugin.

```diff
handleClick() {
  this.stopListening(this.core.activeContainer, Events.CONTAINER_TIMEUPDATE)
+ this.disable()
}
```

## Conclusão

O Clappr é uma ferramenta poderosa para criar experiências de vídeo personalizadas na web. Sua estrutura modular facilita a adaptação às necessidades de diferentes projetos, seja através de plugins simples ou interfaces complexas. Com este guia, você já tem o básico para começar e explorar as possibilidades que o Clappr oferece.

Agora é com você! Que tal começar a experimentar e criar seu próprio player?
