---
layout: default
title: Estilos de Testes de Unidade
tags:
  - testes
  - javascript
  - qualidade
date: 2024-12-04T18:26:00.000Z
---
Testes de unidade são essenciais para garantir a qualidade do código e a confiança no desenvolvimento de software. Mas você sabia que existem diferentes estilos de testes de unidade? Neste artigo, vamos explorar os três principais: testes baseados em saída, estado e comunicação. Além disso, daremos dicas práticas para você aplicá-los da melhor forma em seus projetos.

## O que são estilos de teste de unidade?

Antes de aprofundarmos nos estilos, é importante entender o conceito. Estilos de teste de unidade são abordagens distintas que definem como validamos o comportamento do código. Cada estilo tem suas características e casos de uso específicos. Saber diferenciá-los pode fazer toda a diferença na qualidade do seu código e na eficiência dos seus testes.

## Estilo 1: Teste baseado em saída

Esse estilo é ideal para códigos que não possuem efeitos colaterais. O foco aqui é verificar apenas o valor de retorno de uma função.

### Exemplo na prática

Imagine uma função simples que soma dois números:

```javascript
const sum = (a, b) => a + b;

test('two positive numbers', () => {
  expect(sum(1, 2)).toBe(3);
})
```

Esse estilo se alinha ao paradigma da programação funcional. Como não há dependência de estados externos, os testes tendem a ser rápidos, previsíveis e confiáveis.

**Dica de ouro**: Sempre que possível, escreva seu código sem efeitos colaterais. Isso facilita o uso de testes baseados em saída.

## Estilo 2: Teste baseado em estado

Esse estilo se aplica a casos onde o comportamento esperado é uma **mudança de estado** no sistema, como componentes de UI ou sistemas que manipulam dados.

### Exemplo na prática

Vamos testar um componente que exibe a quantidade de cliques:

```javascript
test('increments count', async () => {
  render(<Counter />)

  fireEvent.click(screen.getByText('+1'));
  
  expect(screen.getByText(/clicked 6 times/i)).toBeInTheDocument();
});
```

Diferente dos testes baseados em saída, aqui o foco não é o retorno de uma função, mas sim o resultado da interação com o sistema. Esse estilo é muito usado em aplicações React, onde o estado dos componentes muda frequentemente.

**Dica prática**: Combine este estilo com bibliotecas como o [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) para simplificar a verificação de estados.

## Estilo 3: Teste baseado em comunicação

Use este estilo quando o código interage com dependências externas como APIs, bancos de dados ou serviços de terceiros.

### Exemplo na prática

Vamos simular o envio de um e-mail:

```javascript
test('sending a greetings email', () => {
  const emailGatewayMock = jest.fn()
  const sut = new Controller(emailGatewayMock)

  sut.greetUser('user@email.com')

  expect(emailGatewayMock).toHaveBeenCalledWith('user@email.com')
  expect(emailGatewayMock).toHaveBeenCalledTimes(1)
})
```

Embora úteis, os mocks podem gerar testes frágeis e superficiais se usados em excesso. Evite simular tudo; prefira testar integrações reais sempre que possível.

**Ponto de atenção**: O uso excessivo pode resultar em testes superficiais que verificam apenas uma pequena parte do código e “mockam” todo o resto.

## Conclusão

Sempre que possível, priorize testes baseados em saída. Eles são mais confiáveis, fáceis de manter e oferecem resultados previsíveis. No entanto, sabemos que nem sempre é possível aplicá-los.

Adotar o estilo certo no momento certo pode transformar sua abordagem de testes, tornando seu código mais robusto e sua equipe mais produtiva. Comece agora mesmo a revisar seus testes com base nesses conceitos e veja a diferença!
