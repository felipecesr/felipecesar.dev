---
layout: default
title: MVC Pattern
tags:
  - javascript
  - engineer
  - architecture
date: 2023-09-16T15:05:22.047Z
aliases: []
---
Neste post compartilho algumas anotações sobre MVC que fiz lendo o livro [Learning JavaScript Design Pattern](https://www.amazon.com.br/Learning-JavaScript-Design-Patterns-Developers/dp/1098139879/) do [Addy Osmani](https://twitter.com/addyosmani).

* Um Model representava dados específicos do domínio e desconhecia a UI (Views e Controllers). Quando um modelo mudava, ele informava seus observers.
* Uma View representava o estado atual de um Model. O padrão Observer era usado para que a View soubesse sempre que o Model fosse atualizado ou modificado.
* A View cuidava da apresentação, mas não havia apenas uma única View e Controller - um par View-Controller era necessário para cada seção ou elemento exibido na tela.
* O papel do Controller neste par era lidar com a interação do usuário (como pressionar uma tecla ou a ação de clicar) e tomar decisões para a View.

## Resumindo

Model são dados de negócio.

View em JavaScript constrói e organiza uma coleção de elementos DOM.

A tarefa de atualizar o Model é do Controller.

## Exemplo

O `photoModel` adiciona nosso callback `render()` como um de seus subscribers para que possamos atualizar a View quando o Model for atualizado usando o padrão Observer.

Quando um usuário clica em algum elemento da View, não é responsabilidade da View saber o que fazer depois. Ela confia no Controller para tomar esta decisão.

```javascript
const buildPhotoView = (photoModel, photoController) => {
  const photoEl = document.createElement('div')

  const render = () => {
	/* ... */
  }

  photoModel.addSubscriber(render)

  photoEl.addEventListener('click', () => {
    photoController.handleEvent('click', photoModel)
  })
}
```

Templates não são Views. Uma View é um objeto que observa um Model e mantém a representação visual atualizada. Views representam os dados da aplicação visualmente, e templates podem ser usados para gerar Views.