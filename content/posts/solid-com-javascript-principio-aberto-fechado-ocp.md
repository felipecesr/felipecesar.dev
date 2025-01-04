---
layout: default
title: "SOLID com JavaScript: Princípio Aberto/Fechado (OCP)"
date: 2018-07-31T20:38:18.756Z
serie: solid
---
Dando continuidade a série inciada no [ultimo post](/posts/princípio-da-responsabilidade-única-srp/) sobre os princípios **SOLID**, hoje o post será sobre o **Princípio Aberto/Fechado** (Open Closed Principle em inglês), ou apenas **OCP**.

Sua definição diz:

> “Entidades de software (classes, módulos, funções, etc.) devem ser abertas para extensão, mas fechadas para modificações”
> 

O que isso significa? Significa que: **quando precisar estender um código, crie um novo ao invés de alterar o código existente**.

Vamos entender melhor com alguns exemplos:

## **Exemplo de violação**

Imagine que temos algumas classes que representam componentes. Primeiro a classe `Card` que possui o atributo `description`.

```jsx
class Card {
  constructor(description) {
    this._description = description;
  }
  
  get description() {
    return this._description;
  }
  
  set description(value) {
    this._description = value;
  }
}
```

E depois a classe `List` com o atributo `items`.

```jsx
class List {
  constructor(items) {
    this._items = items;
  }
  
  get items() {
    return this._items;
  }
  
  set items(values) {
    this._items = values;
  }
}
```

Além das classes, vamos precisar de algo para renderizá-los, mas como faremos isso? Simples, criamos uma função que recebe um elemento do DOM e uma instância de um componente, verifica seu tipo e decide qual template será renderizado dentro do elemento.

```jsx
function renderComponent(element, component) {
  if (component instanceof Card) {
    element.innerHTML = `
      <div class="card">
        <p class="card__description">${ component.description }</p>
      </div>
    `;
  } else if (component instanceof List) {
    element.innerHTML = `
      <ul>
        ${ component.items.map(item => `<li>${ item }</li>`).join('') }
      </ul>
    `;
  } else {
    throw new Error('Component not supported');
  }
}
```

Dessa forma conseguimos renderizar nossos componentes dentro de qualquer elemento do DOM, mas e se quisermos adicionar novos componentes? Para cada classe adicionada será preciso um novo “else if” para checar o tipo e um template para ser renderizado, isso claramente é uma violação do **OCP**.

## **Resolvendo a violação**

Em JavaScript não existe uma implementação para **classes abstratas** ou **interfaces**, mas isso não nos impede de simular esses conceitos.

Nesse exemplo vamos **simular** o conceito de interface criando a classe `Component`, que servirá apenas como um “contrato” obrigando todos que o “assinarem” (suas subclasses) a implementar o método `render`.

```jsx
class Component {
  constructor() {
    if (!this.render) {
      throw new Error('Component subclass has no implementation for the render method');
    }
  }
}
```

Em seguida, vamos fazer com que as classes `Card` e `List` tornem-se subclasses de `Component`.

```jsx
class Card extends Component {
  constructor(description) {
    super();
    this._description = description;
  }
  
  // getters/setters ...
  
  render(element) {
    element.innerHTML = `
      <div class="card">
        <p class="card__description">${ this.description }</p>
      </div>
    `;
  }
}
```

```jsx
class List extends Component {
  constructor(items) {
    super();
    this._items = items;
  }
  
  // getters/setters ...
  
  render(element) {
    element.innerHTML = `
      <ul>
        ${ this.items.map(item => `<li>${ item }</li>`).join('') }
      </ul>
    `;
  }
}
```

Dessa forma cada subclasse terá seu template definido dentro da sua própria implementação do método `render`, sempre que quisermos estender nosso código, podemos simplesmente criar uma nova classe sem precisar alterar o código existente.

## **Conclusão**

Esse princípio nos atenta a usar **abstrações** e **polimorfismo** de forma consciente, diminuindo o **acoplamento** e tornando nosso código mais **fácil de manter**.

Espero que tenham gostado, e só para reforçar, se tiverem dúvidas ou sugestões não deixem de comentar. Abraço!
