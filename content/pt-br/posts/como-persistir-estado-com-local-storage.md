---
layout: default
title: Como persistir estado com Local Storage
tags:
  - react
  - ""
date: 2024-12-25T17:06:00.000Z
---
Gerenciar o que cada usuário pode ver, acessar e interagir é essencial para a segurança e experiência do usuário. Mas como garantir que o estado de autenticação continue funcionando, mesmo depois de atualizações de página?

Neste artigo, vamos utilizar a Local Storage do browser para armazenar o estado de autenticação no front-end, incluindo exemplos práticos com React Context API.

## Implementando com React Context API

A React Context API é uma ferramenta poderosa para compartilhar estado entre componentes sem precisar passar props manualmente por toda a árvore de componentes.

Veja como criar um contexto para gerenciar autenticação:

```jsx
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    expiresAt: null,
    userInfo: {},
  });
  
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
```

## Gerenciando Login e Cadastro

Nas páginas de login e cadastro, utilizamos o contexto para atualizar o estado de autenticação assim que o usuário insere suas credenciais e recebe uma resposta do servidor:

```jsx
const Page = () => {
  const authContext = useContext(AuthContext);
  // ...

  const submitCredentials = async credentials => {
    try {
      setLoginLoading(true);
      const { data } = await signIn(credentials);
      authContext.setAuth(data);
  // ...
```

Com isso, o estado global de autenticação é atualizado e pode ser usado por toda a aplicação.

## Como persistir a autenticação após um refresh

Um dos maiores desafios no gerenciamento de autenticação é lidar com atualizações (refresh) da página. Quando isso acontece, o estado armazenado na memória do React é perdido.

Uma solução simples (mas não ideal para produção) é usar o **localStorage** para persistir dados:

```jsx
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const token = localStorage.getItem('token');
  const expiresAt = localStorage.getItem('expiresAt');
  const userInfo = localStorage.getItem('userInfo');

  const [auth, setAuth] = useState({
    token,
    expiresAt,
    userInfo: userInfo ? JSON.parse(userInfo) : {},
  });

  const setAuthInfo = ({ token, expiresAt, userInfo  }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('expiresAt', expiresAt);
    localStorage.setItem('userInfo', userInfo);
  };
  
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
```

Com esse método, os dados de autenticação são salvos no navegador e carregados automaticamente quando a página é recarregada. Mas atenção: armazenar tokens no localStorage tem vulnerabilidades de segurança, como ataques XSS.

## Verificando se o usuário está autenticado

Para garantir que apenas usuários autenticados tenham acesso a determinados recursos, podemos verificar se o token do usuário ainda é válido.

Aqui está um exemplo de função que utiliza o `expiresAt` para determinar se o usuário está autenticado:

```javascript
const isAuthenticated = () => {
  if (!auth.token || auth.expiresAt) {
    return false;
  }
  return new Date().getTime() / 1000 < auth.expiresAt
};
```

* Primeiro verificamos se o `token` e o `expiresAt` existem. Caso contrário, retornamos false.
* Em seguida, comparamos o timestamp atual (em segundos) com o `expiresAt`. Se o token ainda for válido, retornamos `true`.

Essa verificação ajuda a controlar o acesso de forma eficiente, evitando que usuários com tokens expirados utilizem a aplicação.

## Conclusão

Embora o localStorage seja prático para fins didáticos, ele não é a solução mais segura para persistir autenticação. O uso de **cookies Http-Only** é uma abordagem mais robusta, pois protege os dados de ataques XSS e melhora a segurança geral da aplicação.

No próximos artigos, exploraremos como implementar cookies Http-Only para gerenciar a autenticação de forma segura em aplicações front-end.
