---
layout: default
title: Como configurar o Prettier e ESLint em projetos React
date: 2021-07-17T17:00:29.174Z
---
Continuando a série sobre testes, vamos adicionar duas ferramentas ao projeto que ajudam a melhorar a qualidade do código.

Você pode baixar o [repositório](https://github.com/felipecesr/react-com-tdd-na-pratica/tree/master) e fazer o checkout na branch `exercise-05` para continuar de onde paramos.

## Prettier
A primeira ferramenta é o [Prettier](https://prettier.io/), com ele não precisamos nos preocupar com indentação de código, se as aspas devem ser simples ou duplas, etc. Ele formata o código automaticamente mantendo sempre o mesmo padrão.

Para instalar o Prettier execute o comando:

```bash
$ npm i -D prettier
```

Com o Prettier instalado, precisamos criar o arquivo `.prettierrc` e adicionar as [opções](https://prettier.io/docs/en/options.html) desejadas. Você também pode usar o [playground](https://prettier.io/playground/) para ajudar na configuração.

Nesse caso vou criar o arquivo `.prettierrc` na raiz do projeto e adicionar apenas um objeto vazio, para usar as configurações padrão:

```json
{}
```

Adicione o script no `package.json`:

```json
"format": "prettier --write \"src/**/*.{js,jsx}\""
```

Se você executar esse script o Prettier vai formatar todos os arquivos `.js` ou `.jsx` dentro de `src`.

## Extensão para o Visual Studio Code

Para quem usa o [Visual Studio Code](https://code.visualstudio.com/), é possível instalar uma [extensão](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) que facilita ainda mais o uso do Prettier.

Adicione as linhas seguintes no arquivo `settings.json` do Visual Studio Code, para que os arquivos sejam formatados sempre que forem salvos:

```json
{
  "editor.formatOnSave": true,
  "prettier.requireConfig": true
}
```

### Com a extensão instalada, é necessário instalar o Prettier no projeto?

Você pode instalar a extensão e não instalar no projeto, mas se você estiver trabalhando em um projeto a longo prazo que outras pessoas também vão trabalhar nele, é importante instalar o Prettier no projeto, para que todos possam se beneficiar dele, mesmo se não estiverem usando o Visual Studio Code.

## ESLint

O [ESLint](https://eslint.org/) é uma ferramenta incrível de análise de código que ajuda a previnir vários erros.

Para instalar execute o seguinte comando:

```bash
$ npm i -D eslint eslint-config-prettier
```

O ESLint verifica algumas regras de formatação que o Prettier também verifica, para que não tenham conflitos, podemos desabilitar essas regras no ESLint e deixar apenas como responsabilidade do Prettier.

Ao invés de sair desabilitando essas regras uma por uma, instalamos o `eslint-config-prettier` no projeto para desabilitar todas de uma vez.

Crie o arquivo `.eslintrc.json` na raiz do projeto e adicione:

```json
{
  "extends": ["eslint:recommended", "prettier"]
}
```

Podemos adicionar várias configurações pré-definidas nesse Array. A ordem é importante porque as últimas sempre vão sobrescrever as primeiras. Nesse caso o Prettier deve ficar por ultimo porque ele não adiciona nenhuma regra, ele apenas desabilita as regras que são responsabilidade dele.

Para usar a ECMAScript mais recente e features como módulos e JSX, precisamos adicionar mais algumas [configurações](https://eslint.org/docs/user-guide/configuring/language-options):

```json
{
  "extends": ["eslint:recommended", "prettier"],
  "parserOptions": {
    "ecmaVersion": 2021,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6": true,
    "browser": true,
    "jest": true,
    "node": true
  }
}
```

Adicione o seguinte comando no `package.json`:

```json
"lint": "eslint \"src/**/*.{js,jsx}\" --quiet"
```

O `--quiet` faz o ESLint retornar apenas erros, caso tenha algum warning, ele será ignorado.

## Extensão para o Visual Studio Code

O ESLint também conta com uma [extensão](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) pra o Visual Studio Code, para melhorar ainda mais a experiencia do desenvolvedor.

Para que os problemas relatados pelo ESLint sejam corrigidos automaticamente após o arquivo ser salvo, adicione o seguinte no arquivo `settings.json` do Visual Studio Code:

```json
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
}
```

## ESLint e React

Quando adicionamos suporte ao JSX, não quer dizer que adicionamos suporte ao React, existem alguns detalhes que o React adiciona no JSX que não são reconhecidos pelo ESLint.

Para que tudo funcione, execute o seguinte comando: 

```bash
$ npm install -D eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react  
```

Após a intalação, adicione mais algumas configurações no `.eslintrc.json`, para que ele fique assim:

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier"
  ],
  "rules": {
    "react/prop-types": "off",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react/self-closing-comp": "warn"
  },
  "plugins": ["react", "import", "jsx-a11y"],
  "parserOptions": {
    "ecmaVersion": 2021,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6": true,
    "browser": true,
    "jest": true,
    "node": true
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

## ESLint e Hooks

Quando usamos [Hooks](https://reactjs.org/docs/hooks-intro.html) devemos seguir algumas [regras](https://reactjs.org/docs/hooks-rules.html), podemos usar o `eslint-plugin-react-hooks` para nos ajudar com isso.

Para instalar o plugin, execute:

```bash
$ npm install -D eslint-plugin-react-hooks
```

Em seguida adicione ele no `.eslintrc.json`:

```diff
  "plugin:jsx-a11y/recommended",
+ "plugin:react-hooks/recommended",
  "prettier"
```

## Conclusão

Adicionamos duas ferramentas que ajudam a melhorar bastante a qualidade do código. O ESLint faz uma análise estática do código, ajudando a eliminar vários bugs e o Prettier garante que o código seja formatado corretamente.

Quando comecei a usar essas duas ferramentas juntas, sempre ficava com dúvidas durante a instalação, por isso fiz questão de escrever esse artigo e tentei deixar o mais claro possível.

Se esse conteúdo te ajudou ou se ficou alguma dúvida, deixa um comentário. E como de costume o código completo pode ser encontrado nesse [repositório](https://github.com/felipecesr/react-com-tdd-na-pratica/tree/exercise-06). Abraço!

