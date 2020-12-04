---
layout: default
title: Como configurar scripts do Cypress em ambientes diferentes
date: 2020-12-03T13:45:32.785Z
---
E aí pessoal, tudo certo? Esse post é uma dica bem rápida, dessa vez vou mostrar como configurar e executar scripts do Cypress tanto no local quanto no CI com mais eficiência.

Vamos supor que temos uma aplicação com o Cypress instalado e no package.json temos os scripts para executá-lo

```json
{
  "scripts": {
    "cy:open": "cypress open"
  }
}
```
