---
layout: default
title: Como proteger endpoints de API
tags:
  - backend
  - javascript
date: 2024-12-27T14:22:00.000Z
---
Descubra neste post como proteger seus endpoints que necessitam de autenticação e controle de acesso usando o [Express.js](https://expressjs.com/).

## Por que proteger seus endpoints de API?

Os endpoints de uma API são os pontos de entrada para os dados e funcionalidades do seu sistema. Proteger esses endpoints é fundamental para evitar acessos não autorizados, roubo de dados e outras vulnerabilidades de segurança.

Vamos mostrar como implementar autenticação e controle de acesso usando middlewares e JSON Web Tokens (JWT).

## Usando middleware para verificar JWT

Os middlewares processam as requisições antes que elas cheguem aos endpoints. Eles são ideais para adicionar lógicas de autenticação e autorização.

### Exemplo de um endpoint simples

No exemplo abaixo, o endpoint retorna dados do dashboard. Esses dados devem ser acessíveis apenas para usuários autenticados.

```javascript
app.get('/api/dashboard-data', (req, res) => {
  return res.json(databoardData);
});
```

### Implementando um middleware básico

Um middleware simples pode inspecionar os cabeçalhos da requisição:

```javascript
app.use((req, res, next) => {
  console.log(req.headers);
  next();
});
```

## Instalando e configurando a biblioteca JWT

A biblioteca [`express-jwt`](https://www.npmjs.com/package/express-jwt) facilita o processo de verificação de tokens JWT.

### Instalando a Dependência

```
npm i express-jwt
```

### Configurando o middleware JWT

Crie um middleware que verifique o token:

```javascript
const jwt = require('express-jwt')

const checkJwt = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'] // Certifique-se de usar o algoritmo correto
})
```

### Protegendo o endpoint

Agora, aplique o middleware ao endpoint:

```javascript
app.get('/api/dashboard-data', checkJwt, (req, res) => {
  return res.json(databoardData);
});
```

## Anexando o usuário à requisição

Para realizar operações que dependem do usuário autenticado, é útil anexar os dados do JWT ao objeto da requisição.

### Atualizando Permissões do Usuário

No exemplo abaixo, usamos o `req.user.sub` para identificar o usuário:

```javascript
app.patch('/api/user-role', async (req, res) => {
  try {
    const { role } = req.body;
    const allowedRoles = ['user', 'admin'];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'Role not allowed' });
    }

    await User.findOneAndUpdate(
      { _id: req.user.sub },
      { role }
    );
    
    res.status(200).json({ message: 'Role updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
});
```

### Criando um middleware para anexar o usuário

Esse middleware decodifica o token e adiciona o usuário ao objeto da requisição:

```javascript
const jwtDecode = require('jwt-decode');

const attachUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Authentication invalid' });
  }

  const decodedToken = jwtDecode(token.slice(7)); // Remove "Bearer "
  if (!decodedToken) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  req.user = decodedToken;
  next();
};

app.use(attachUser);
```

## Limitando acesso para administradores

Algumas rotas devem ser acessíveis apenas por administradores. Vamos implementar isso de forma simples.

### Middleware para verificar o papel do usuário

Este middleware impede que usuários sem permissões acessem determinados endpoints:

```javascript
const requireAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== 'admin') {
    return res.status(403).json({ message: 'Insufficient role' });
  }
  next();
};
```

### Aplicando o middleware

Proteja endpoints que contêm dados sensíveis:

```javascript
app.get('/api/inventory', checkJwt, requireAdmin, (req, res) => {
  return res.json(inventoryData);
});
```

## Conclusão

A proteção de endpoints é essencial para manter a segurança da sua API e dos seus usuários. Usando middlewares, JWTs e controle de acesso baseado em papéis, você pode garantir que apenas usuários autorizados tenham acesso aos dados.
