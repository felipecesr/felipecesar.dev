---
layout: default
title: "SOLID com JavaScript: Princípio da Inversão de dependência"
tags:
  - javascript
  - solid
  - cleancode
date: 2024-05-22T19:20:01.214Z
serie: solid
---
Neste artigo, vou falar sobre o quinto e último princípio do SOLID: o Princípio da Inversão de dependência (Dependency Inversion Principle), ou simplesmente DIP.

De acordo com Robert C. Martin, o Princípio de Inversão de Dependência consiste em duas partes:

1. Módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem depender de abstrações.
2. As abstrações não devem depender de detalhes. Os detalhes devem depender de abstrações.

Vamos entender melhor com alguns exemplos:

## **Exemplo de violação**

Observe a função `isWeekDay`, a única responsabilidade dela é retornar `true` ou `false` dependendo do dia da semana, observe também que existe uma dependência da função `getDay` do módulo `date-fns`.

```jsx
import { getDay } from "date-fns";

function isWeekDay() {
  const SUNDAY = 0, SATURDAY = 6;
  const dayOfWeek = getDay(new Date());
  
  return [SATURDAY, SUNDAY].includes(dayOfWeek)
}
```

## Solução

Neste caso, podemos receber `dayOfWeek` como parâmetro.

```jsx
function isWeekDay(dayOfWeek) {
  const SUNDAY = 0, SATURDAY = 6;
  
  return [SATURDAY, SUNDAY].includes(dayOfWeek)
}
```

Dessa forma, quem controla a forma como `dayOfWeek` é calculado é quem vai usar a função `isWeekDay`.

## **Conclusão**

Aplicando este princípio deixamos de criar a dependência internamente, passando essa responsabilidade para quem vai utilizar a função. Essa pequena mudança facilita os testes e torna o código mais flexível.

Espero que tenham gostado, se tiverem duvidas ou sugestões podem comentar. Abraço!
