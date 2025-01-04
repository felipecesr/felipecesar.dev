---
layout: default
title: Como nomear testes?
tags:
  - testes
date: 2024-12-18T17:56:00.000Z
---
Ao escrever testes, muitos desenvolvedores se perguntam: qual a melhor forma de nomear meus testes? Embora pareça uma tarefa simples, um nome bem escolhido pode fazer toda a diferença na clareza e manutenção do código. Neste artigo, exploramos boas práticas e convenções para criar nomes de testes que realmente agregam valor ao seu projeto.

## Convenções

Uma das convenções mais usadas é estruturar os nomes dos testes assim: \[método]\[cenário]\[resultado esperado].

```javascript
test('isDeliveryValid with invalid dates returns false', () => {
  // Teste implementado aqui
});
```

Nesta abordagem:

* **Método**: é o nome da função ou método que está sendo testado.
* **Cenário**: é a condição específica que está sendo testada.
* **Resultado esperado**: descreve o resultado que o teste espera obter.

### Problemas dessa convenção

Embora popular, essa convenção apresenta alguns problemas:

1. **Foco nos detalhes de implementação**: Ao enfatizar o método, os nomes dos testes podem ficar acoplados ao código e não ao comportamento.
2. **Pouca clareza para não-programadores**: Alguém fora da equipe de desenvolvimento pode não entender o que o teste realmente verifica.

Por exemplo, o nome `isDeliveryValid with invalid dates returns false` não comunica claramente o comportamento esperado para um leitor leigo.

## Como melhorar?

Uma alternativa mais eficiente é nomear os testes descrevendo o cenário e o comportamento esperado. Veja como reescrever o exemplo anterior:

```javascript
test('delivery with a past date should be invalid', () => {
  // Teste implementado aqui
});
```

### Vantagens:

1. **Clareza**: O nome é autoexplicativo e mais intuitivo.
2. **Independência de implementação**: O nome reflete o comportamento esperado, não detalhes específicos do método.
3. **Inclusividade**: Facilita a compreensão para membros da equipe que não são programadores, como analistas de negócio.

## Conclusão

Ao priorizar a descrição do comportamento esperado, você torna seus testes mais intuitivos e fáceis de entender para todos os membros da equipe. E lembre-se: você não está apenas testando código, mas sim validando comportamentos que fazem sentido para o seu negócio.
