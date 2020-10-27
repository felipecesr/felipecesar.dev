---
language: pt-BR
title: Gerenciando dependências com Volta
date: 2020-10-19T02:28:22.573Z
---

Neste post vou falar um pouco sobre o que é o [Volta](https://volta.sh/) e porque deixei de usar o [NVM](http://nvm.sh/).

## O que é o Volta

Volta é uma ferramenta de linha de comando que permite instalar e executar qualquer ferramenta JavaScript perfeitamente. Ele garante que todos no projeto usem as mesmas ferramentas, com as mesmas versões.

Para instalar só é necessário executar um comando:

```shell
# install Volta
curl https://get.volta.sh | bash
```

Feito isso, podemos instalar qualquer ferramenta e usar normalmente:

```shell
# install Node
volta install node

# start using Node
node
```

Podemos também instalar uma versão específica:

```shell
volta install node@10
```

Com o comando `volta list all` podemos listar todas as ferramentas e versões instaladas:

```shell
Node runtimes:
    v10.19.0
    v12.19.0 (default)

Package managers:
    Yarn:
        v1.22.10 (default)
```

Quando executamos o comando `volta install` ele baixa a versão e define como default automaticamente, caso você já tenha a versão instalada, ele só define como default.

Também podemos fixar versões em nossos projetos utilizando o comando `volta pin`, por exemplo:

```shell
volta pin node yarn
```

Ele vai adicionar as versões no package.json.

```json
"volta": {
  "node": "12.19.0",
  "yarn": "1.22.10"
}
```

Caso você não tenha alguma dessas versões instaladas, ele baixa automaticamente.

## Por quê deixei de usar o NVM?

Quando ouvi falar sobre o Volta pela primeira vez, a primeira coisa que pensei foi: Não preciso disso, já uso o NVM.

Mesmo assim resolvi dar uma olhada e logo percebi que estava enganado, com o NVM eu conseguia gerenciar versões do Node, com o Volta eu posso fazer isso com qualquer ferramenta.

Além disso, tinham alguns pontos que me incomodavam no NVM:

* Sempre precisava trocar as versões de forma manual, para automatizar isso era necessário fazer algumas configurações no shell e adicionar um arquivo `.nvmrc` no projeto.
* Quando abria o terminal no diretório do projeto demorava um pouco trocar a versão.

Com o Volta a troca de versão é extremamente rápida e não é necessário nenhuma configuração adicional, ele já faz isso automaticamente.

## Conclusão

Este post foi uma breve introdução ao Volta e algumas vantagens que vi em relação ao NVM, se você viu outras vantagens ou desvantagens não deixe de comentar. Abraço!
