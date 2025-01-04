---
layout: default
title: Como implementar Logout em uma Single Page Application (SPA)
tags:
  - react
  - javascript
date: 2024-12-26T10:17:00.000Z
---
Quando um usuário faz login em um site ou aplicação web utilizando cookies e sessões, uma sessão é armazenada no servidor para o usuário, enquanto um cookie é enviado de volta ao navegador. O processo de logout, nesse caso, é relativamente simples: basta remover a sessão do servidor e, se necessário, limpar o cookie no navegador.

No entanto, em Single Page Applications (SPAs), onde frequentemente utilizamos autenticação stateless com JSON Web Tokens (JWT), o processo de logout é ligeiramente diferente. Este guia mostrará como implementar um fluxo de logout em uma SPA.

## Como funciona?

SPAs geralmente utilizam tokens JWT para autenticação. Esses tokens são armazenados no navegador, eliminando a necessidade de sessões no servidor. Ao fazer o logout, é necessário garantir que o token seja removido de forma segura e que o estado da aplicação seja resetado.

No [artigo anterior](/posts/como-persistir-estado-com-local-storage/), exploramos como manter o usuário autenticado em uma SPA usando React. Agora, vamos nos aprofundar no processo de logout.

## Passo 1: Limpando o Local Storage

O primeiro passo para implementar o logout é garantir que todas as informações sensíveis, como o token de autenticação, sejam removidas do Local Storage. Veja como fazer isso:

```javascript
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userInfo');
  localStorage.removeItem('expiresAt');
};
```

## Passo 2: Expondo a Função de Logout no Provider

Se você estiver usando o Context API para gerenciar a autenticação, será necessário expor a função de logout no seu `AuthContext`:

```jsx
return (
  <AuthContext.Provider value={{
    auth,
    setAuth,
    isAuthenticated,
    logout
  }}>
    {children}
  </AuthContext.Provider>
);
```

Contudo, apenas limpar o Local Storage não é suficiente. Sem um recarregamento na página, o usuário continuará autenticado no contexto atual.

## Passo 3: Resetando o Estado da Aplicação

Na mesma função de logout, você precisa resetar o estado da aplicação para os valores iniciais (antes do login). Além disso, é importante redirecionar o usuário para uma página que não exija autenticação, como a página de login:

```javascript
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userInfo');
  localStorage.removeItem('expiresAt');

  setAuth({
    token: null,
    expiresAt: null,
    userInfo: {},
  });

  router.push("/login");
};
```

## Conclusão

Garantir que todas as informações sensíveis sejam removidas do armazenamento local, resetar o estado da aplicação e redirecionar o usuário para uma página apropriada são passos essenciais para um fluxo de logout seguro e eficaz.

Com essas práticas, você estará criando uma aplicação mais segura e funcional para seus usuários.
