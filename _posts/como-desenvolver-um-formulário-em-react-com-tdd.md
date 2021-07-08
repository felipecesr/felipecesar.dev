---
layout: default
title: Como desenvolver um formulário em React com TDD
date: 2021-07-08T13:06:03.967Z
---
Continuando os artigos sobre testes, chegou a hora de adicionar um pouco mais de ação, vamos criar um componente de formulário, onde o usuário vai preencher os campos e clicar em um botão para submeter os dados.

## Escrevendo um teste que falha

Você pode baixar o repositório e fazer o `checkout` na `branch` `exercise-02` para continuar de onde paramos.

Crie o arquivo `Form.test.js` dentro de `src/components` e adicione o seguinte conteúdo:

```jsx

```

Já adicionamos queries para obter os campos do formulário, logo após a chamada da função `render`. Existem diferentes tipos de queries, você pode ver com mais detalhes acessando a [documentação](https://testing-library.com/docs/queries/about#types-of-queries).

Também é importante saber que existe uma ordem de [prioridade](https://testing-library.com/docs/queries/about#priority) recomendada para usar as queries. Nesse caso decidi usar [`getByLabelText`](https://testing-library.com/docs/queries/bylabeltext) e [`getByRole`](https://testing-library.com/docs/queries/byrole).

Após criar o teste, crie o arquivo `Form.js`, com o seguinte conteúdo:

```jsx

```

Execute o comando `npm test -- --watch`, dessa forma os testes serão executados sempre que um arquivo for modificado. Agora observe o erro:

```

```

Sempre que utilizamos queries do tipo `getBy` e o elemento não é encontrado, o teste deve falhar, e além de exibir uma mensagem de erro, também é exibido o `html` do componente, além da linha onde o teste falhou.

## Fazendo o teste passar

Para que o teste passe, precisamos fazer com que esse erro não ocorra mais, e para isso, tudo que precisamos é adicionar o campo valor no formulário.

```jsx

```

Note que o teste continua falhando, mas o erro é outro:

```

```

Adicione o próximo campo do formulário:

```jsx

```

É importante sempre observar bem os erros retornados pelos testes.

```

```

Agora é só adicionar o botão de submit:

```jsx

```

Com isso o teste já está passando, mas o formulário ainda não envia nenhuma informação.

## Adicionando eventos

O componente `Form` deve receber uma `prop` chamada `onSubmit`, ela será uma função que deve ser chamada com os valores preenchidos no formulário quando ocorrer o evento `submit`.

Faça as seguintes alterações no teste:

```jsx

```

O [`jest.fn()`](https://jestjs.io/docs/jest-object#jestfnimplementation) retorna uma [função mock](https://jestjs.io/docs/mock-function-api), esse tipo de função também é conhecido como "spy", e como o próprio nome já diz, eles "espionam" informações secretas sobre funções. Elas possibilitam saber, quantas vezes uma função foi chamada, quais parâmetros ela recebeu, etc.

Com a função `handleSubmit` criada, precisamos preencher o formulário com alguns valores e clicar no botão para submeter o formulário. Para executar o evento de clique precisamos importar o [`fireEvent`](https://testing-library.com/docs/dom-testing-library/api-events) da [Testing Library](https://testing-library.com/). Faça as seguintes alterações no teste:

```jsx

```

Repare que o teste passa, mas uma mensagem de erro é exibida no terminal:

```

```

Se você abrir o arquivo `jest.config.js`, poderá ver que a seguinte linha:

```

```

O [`jsdom`](https://github.com/jsdom/jsdom) é uma implementação de vários padrões web, para uso com [Node.js](https://nodejs.org/en/). Aqui é onde definimos que o [Jest](https://jestjs.io/) vai usar essa implementação, por isso temos acesso ao DOM no ambiente de teste.

O `jsdom` não conta com o evento `submit` padrão do navegador, e nós também não temos intenção de usá-lo, então para resolver isso, faça a seguinte mudança no componente:

```jsx

```

Com isso, a mensagem de erro não é mais exibida. Vamos garantir que a função `handleSubmit` seja chamada com as informações corretas quando o formulário é submetido.

Adicione o seguinte `expect` no final do arquivo `Form.test.js`:

```javascript

```

Com isso o teste volta a falhar, para fazê-lo passar precisamos fazer com que o componente `Form` chame a função que foi passada na `prop` `onSubmit`.

Faça as seguintes alterações no arquivo `Form.js`:

```jsx

```

Pronto! Com isso o teste volta a passar, você também pode adicionar mais um `expect` para garantir que a função foi chamada apenas uma vez:

```javascript

```

## Melhorando os eventos do usuário

Observe a forma que adicionamos valores e clicamos no botão do formulário:

```jsx

```

Adicionamos alguns valores diretamente nos elementos e executamos apenas o evento de `click`.

Quando um usuário está preenchendo um formulário em um navegador e altera um campo, alguns eventos são disparados como `keydown`, `keyup`, `change`, ocorrem diferentes tipos de eventos.

Para que os testes fiquem mais próximos de como um usuário interage com a aplicação, é recomendado usar chamado [`user-event`](https://testing-library.com/docs/ecosystem-user-event/), que também faz parte da Testing Library.

Execute o seguinte comando para instalar o `user-event`:

```bash

```

Agora altere o arquivo `Form.test.js`, para que fique assim:

```jsx

```

## Conclusão

Nesse artigo criamos um formulário, criamos um `mock`, passamos como `prop`, adicionamos eventos, enfim, fizemos bastante coisa. Confesso que foi bem difícil resumir tudo. Como queria fazer algo bem prático, não me aprofundei muito em alguns pontos, mas procurei deixar links em todos eles.

E é isso, mais uma vez espero que o conteúdo tenha ajudado e se tiver alguma dúvida ou sugestão, não deixa de comentar, isso ajuda muito :D.

E como de costume, vou deixar o link do [repositório](https://github.com/felipecesr/react-com-tdd-na-pratica/tree/exercise-03). Valeu!