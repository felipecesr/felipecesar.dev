---
layout: default
title: O que são Dublês de teste e como usá-los?
tags:
  - testes
  - javascript
  - jest
date: 2024-05-20T19:57:29.038Z
---
Quando criamos testes de unidade, geralmente verificamos algumas dessas saídas:

- Um valor retornado
- Um estado
- Uso de dependências

Neste artigo vamos entender como testar o último item da lista utilizando **Dublês de Teste**. Dependências podem ser execuções assíncronas como timers, requisições ou simplesmente algo complicado de configurar ou que leva muito tempo para executar. Existem dependências de saída e de entrada. Vamos entender melhor como elas funcionam:

## Dependências de saída

Representam um ponto de saída da unidade, por exemplo, a chamada de um logger, salvar alguma informação no banco de dados, enviar um email, notificar uma API ou um webhook que algo aconteceu, chamar um método de uma biblioteca de terceiros, etc.

<aside>
💡 Observe que todos são verbos: salvar, enviar e notificar, chamar. São chamadas para ações que precisamos apenas garantir que aconteceram e nada mais.

</aside>

Para testar esse tipo de dependências podemos usar **Mocks**. Mocks são módulos fake, objetos ou funções que nós verificamos se forma chamadas em nossos testes. Esses mocks podem ser divididos em duas categorias:

### Spies

São usados para verificar a lógica de forma independente, quando ela **possui** saídas indiretas para outros componentes de software.

```jsx
import video from './video';

test('plays video', () => {
  jest.spyOn(video, 'play');
  
  video.play();

  expect(video.play).toHaveBeenCalled();
});
```

Neste caso, o método `play` é sobrescrito de forma que o teste possa verificar se ele foi chamado como esperado.

### Objetos mock

São usados para verificar a lógica de forma independente, quando ela **depende** de saídas indiretas para outros componentes de software.

```jsx
import calculate from './calc';

test('calculate calls add', () => {
  const mockAdd = jest.fn();
  const calculator = new Calculator(mockAdd)

  calculator.execute(1, 2);

  expect(mockAdd).toHaveBeenCalledTimes(1);
  expect(mockAdd).toHaveBeenCalledWith(1, 2);
});
```

Neste caso, o mock é injetado na classe principal do teste que verifica se o mock foi chamado como esperado.

## Dependências de entrada

Representam um requisito de um eventual comportamento da unidade. Fornecem um dado ou comportamento específico para o teste, como o resultado de uma query do banco de dados, o conteúdo de um arquivo do filesystem, uma resposta de uma requisição, etc.

<aside>
💡 Note que todos são dados que fluem para dentro da unidade como resultado de uma operação anterior.

</aside>

Para testar esse tipo de dependências utilizamos **Stubs**. Stubs assim como mocks, são módulos fake, objetos ou funções, a diferença é que nós **NÃO fazemos asserções** neles. Os stubs também se dividem em algumas categorias:

### Objetos fictícios (Dummy Objects)

São usado para especificar os valores que serão usados nos testes, por exemplo, argumentos de chamadas de métodos.

```jsx
test('greet user', () => {
  const user = { email: 'user@email.com' }
  const controller = new Controller()

  controller.greetUser('user@email.com')

  /* ... */
})
```

Neste caso, é o objeto passado por parâmetro para o método `greetUser`.

### Stub de testes

Usados para verificar a lógica de forma independente quando ela depende de entradas indiretas de outros componentes do software.

```jsx
test('creating a report', () => {
  const stub = jest.fn().mockReturnValue(10)
  const controller = new Controller(stub)

  const report = controller.createReport()

  expect(stub).toHaveBeenCalledTimes(1)
})
```

O stub é configurado para retornar um valor específico. Depois disso, verificamos a interação do código com o stub.

<aside>
⚠️ É bem comum ouvir as pessoas chamando tudo de mock, independente se são mocks ou stubs. Mas é importante saber a diferença.

</aside>

## Conclusão

É bem importante saber como e quando usar dublês de teste. São ferramentas que ajudam muito nos testes quando usadas corretamente. Me conta aí, você já usou dublês de teste antes? Esse artigo te ajudou de alguma forma?