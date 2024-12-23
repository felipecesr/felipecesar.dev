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

Aqui está um exemplo prático de um endpoint de cadastro em Node.js utilizando [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers):

```javascript
export async function POST(req) {
  try {
    const {
      email,
      firstName,
      lastName,
      password
    } = await req.json();

    const hashedPassword = await hashPassword(password);

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
      return NextResponse
        .json({ error: "Email already exists" }, { status: 400 })
    }

    const newUser = new User(userData);
    const savedUser = await newUser.save();
    
    const {
      firstName,
      lastName,
      email,
      role
    } = savedUser;
    
    const userInfo = {
      firstName,
      lastName,
      email,
      role
    };

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
      return NextResponse
        .json({ error: "There's a problem creating your account" }, { status: 400 });
    }
  } catch (err) {
    return NextResponse
      .json({ error: "There's a problem creating your account" }, { status: 400 })
  }
});
```

### Pontos de atenção

* **Nunca armazene senhas em texto puro**: As senhas devem ser criptografadas utilizando bibliotecas como `bcrypt` para gerar hashes seguros.
* **Mensagem de erro para emails já cadastrados**: Ao verificar se o email já está cadastrado, há duas abordagens possíveis. Algumas pessoas defendem mensagens genéricas, como "dados inválidos", para evitar que invasores descubram emails existentes. Por outro lado, serviços como o Gmail optam por mensagens claras, como "email já cadastrado", priorizando a experiência do usuário. Não há uma regra fixa aqui; escolha a abordagem que melhor atende às necessidades do seu projeto, equilibrando segurança e usabilidade.
* **Retorne um token após o cadastro**: Um token JWT permite que o usuário acesse recursos protegidos sem precisar fazer login novamente imediatamente após o cadastro.

Com essas práticas, você pode garantir segurança e uma experiência de usuário sem frustrações.

## Endpoint de login

Agora, vamos falar sobre o endpoint de login. Veja como ele pode ser implementado:

```javascript
export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const user = await User.findOne({ email }).lean();

    if (!user) {
      return NextResponse
        .json({ error: "Wrong email or password" }, { status: 403 });
    }

    const passwordValid = await verifyPassword(password, user.password);

    if (passwordValid) {
      const { password, bio, ...rest } = user;
      const userInfo = Object.assign({}, { ...rest });

      const token = createToken(userInfo);

      const decodedToken = jwtDecode(token);
      const expiresAt = decodedToken.exp;

      return NextResponse.json({
        message: "Authentication successful!",
        token,
        userInfo,
        expiresAt,
      });
    } else {
      return NextResponse.json({ error: "Wrong email or password" }, { status: 403 });
    }
  } catch (err) {
    return NextResponse.json({ error: "Something went wrong!" }, { status: 400 });
  }
});
```

### Ponto de atenção

* **Evite informações detalhadas em erros**: Mensagens genéricas, como "email ou senha incorretos", dificultam o trabalho de invasores, que não saberão se o erro está no email ou na senha.

## Conclusão

O objetivo deste post foi apresentar exemplos simples e práticos para ilustrar o que acontece no backend durante o processo de login e cadastro em APIs que utilizam JWT. Espero que esses conceitos tenham ajudado a esclarecer o funcionamento básico dessas operações.
