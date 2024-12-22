---
layout: default
title: Como funcionam endpoints de login e cadastro com jwt
tags:
  - seguranca
  - backend
  - javascript
date: 2024-12-22T11:25:00.000Z
---
Neste post, vamos explorar de forma prática e clara como é feita a autenticação e a criação de usuários utilizando **JWT (JSON Web Token)** no backend. Vamos mergulhar nos detalhes técnicos e, ao mesmo tempo, entender boas práticas para garantir segurança e eficiência no processo.

## Endpoint de cadastro

Aqui está um exemplo prático de um endpoint de cadastro em Node.js utilizando Express:

```javascript
app.post("/api/signup", async (req, res) => {
  try {
    const { email, firstName, lastName } = req.body;

    const hashedPassword = await hashPassword(req.body.password);

    const userData = {
      email: email.toLowerCase(),
      firstName,
      lastName,
      password: hashedPassword,
      role: "admin",
    };

    const existingEmail = await User.findOne({
      email: userData.email,
    }).lean();

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User(userData);
    const savedUser = await newUser.save();

    if (savedUser) {
      const token = createToken(savedUser);
      const decodedToken = jwtDecode(token);
      const expiresAt = decodedToken.exp;

      const { firstName, lastName, email, role } = savedUser;

      return res.json({
        message: "User created!",
        token,
        userInfo,
        expiresAt,
      });
    } else {
      return res.status(400).json({
        message: "There's a problem creating your account",
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: "There's a problem creating your account",
    });
  }
});
```

### Pontos de observação

* **Nunca armazene senhas em texto puro**: As senhas devem ser criptografadas utilizando bibliotecas como `bcrypt` para gerar hashes seguros.
* **Mensagem de erro para emails já cadastrados**: Ao verificar se o email já está cadastrado, há duas abordagens possíveis. Algumas pessoas defendem mensagens genéricas, como "dados inválidos", para evitar que invasores descubram emails existentes. Por outro lado, serviços como o Gmail optam por mensagens claras, como "email já cadastrado", priorizando a experiência do usuário. Não há uma regra fixa aqui; escolha a abordagem que melhor atende às necessidades do seu projeto, equilibrando segurança e usabilidade.
* **Retorne um token após o cadastro**: Um token JWT permite que o usuário acesse recursos protegidos sem precisar fazer login novamente imediatamente após o cadastro.

Com essas práticas, você pode garantir segurança e uma experiência de usuário sem frustrações.

## Endpoint de login
