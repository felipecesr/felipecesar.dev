---
layout: default
title: Gerenciando dependências com Volta
date: 2020-10-19T02:28:22.573Z
---
Neste post vou falar um pouco sobre o que é o [Volta](https://volta.sh/) e por quê troquei o [NVM](http://nvm.sh/) por ele.

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

Também podemos definir versões fixas em nossos projetos utilizando o comando `pin`:

```shell
volta pin node yarn
```

Ele vai adicionar as versões salvas em um objeto no package.json.

```json
"volta": {
  "node": "12.19.0",
  "yarn": "1.22.10"
}
```

## Por quê deixei de usar o NVM?

Quando ouvi falar sobre o Volta pela primeira vez, a primeira coisa que pensei foi: Não preciso disso, já uso o NVM.

Mesmo assim resolvi dar uma olhada e vi que não era a mesma coisa, com o NVM eu conseguia gerenciar versões do Node, com o Volta eu posso fazer isso com qualquer ferramenta.

Além disso, tinham alguns pontos que me incomodavam no NVM:

* Sempre precisava trocar as versões de forma manual, para automatizar isso é necessário configurar o shell para fazer isso.
* Sempre que abria o terminal em um projeto que tinha o arquivo `.nvmrc` demorava muito para trocar a versão.

Com o Volta não é necessário nenhuma configuração e esse mudança é extremamente rápida.

## Conclusão