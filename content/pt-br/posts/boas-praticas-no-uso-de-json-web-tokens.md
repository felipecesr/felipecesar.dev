---
layout: default
title: Boas Práticas no uso de JSON Web Tokens
tags:
  - seguranca
date: 2024-12-21T07:19:00.000Z
---
JSON Web Tokens (JWT) são ferramentas incríveis para autenticação e autorização. Contudo, usá-los de forma errada pode abrir brechas de segurança na sua aplicação. Vamos explorar o que você deve evitar e o que fazer para garantir uma implementação segura e eficiente.

## O que não fazer com JSON Web Tokens

Começaremos destacando as práticas que você deve evitar a todo custo ao trabalhar com JWTs.

### 1. Evite armazenar tokens no Local Storage

Armazenar tokens no Local Storage pode parecer uma solução conveniente, mas é extremamente inseguro. O Local Storage é facilmente acessível via JavaScript no navegador. Por exemplo, qualquer pessoa pode abrir o console do navegador e executar o comando `localStorage.getItem('token')` para obter o token.

Se houver uma vulnerabilidade de Cross-Site Scripting (XSS) na sua aplicação, um código malicioso poderia roubar o token e usá-lo para acessar dados sensíveis. Isso torna o Local Storage um dos piores lugares para armazenar tokens.

**Alternativa segura:** Utilize cookies HTTP-only ou mantenha o token no estado da aplicação (memória do navegador).

### 2. Não armazene secret keys no navegador

Secret keys são usadas para assinar tokens e devem ser mantidas exclusivamente no backend. Navegadores são ambientes públicos, e qualquer pessoa com acesso à chave poderia criar e assinar novos tokens.

**Melhor prática:** Mantenha suas secret keys em um ambiente seguro no servidor, como variáveis de ambiente ou um gerenciador de segredos.

### 3. Não decodifique tokens no client

Ao usar OAuth ou JWTs, evite decodificar os tokens no lado do cliente. Tokens devem ser tratados como informações sigilosas que só podem ser verificadas e validadas no backend.

**Solução alternativa:** Crie um endpoint como `/user` para obter as informações do usuário após o login ou registro. Caso precise saber quando o token expira, armazene apenas o `expiresAt` no Local Storage (se isso for seguro no seu contexto).
