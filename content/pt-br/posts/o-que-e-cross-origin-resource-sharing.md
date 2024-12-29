---
layout: default
title: O que é Cross-Origin Resource Sharing (CORS)?
tags:
  - web
  - seguranca
date: 2024-12-29T15:19:00.000Z
---
CORS (Cross-Origin Resource Sharing) é um recurso de segurança dos navegadores que controla quais domínios podem acessar recursos de um servidor diferente daquele que serviu a página. É como uma lista de permissões para evitar acessos não autorizados.

## Por que o CORS existe?

O objetivo do CORS é proteger recursos de sites contra acessos maliciosos. Ele evita que outros domínios consumam dados sem autorização.

> **Nota:** O CORS não previne ataques CSRF (Cross-Site Request Forgery). Requisições POST feitas por formulários, por exemplo, não são controladas por ele.

## Requisições simples vs complexas

Nem todas as requisições estão sujeitas ao CORS. Para serem consideradas "simples", precisam atender a estas condições:

* O `Content-Type` deve ser:

  * `application/x-www-form-urlencoded`
  * `multipart/form-data`
  * `text/plain`
* O método HTTP deve ser:

  * `GET`
  * `POST`
  * `HEAD`

> Métodos como `PUT`, `PATCH` ou `DELETE`, ou headers personalizados, tornam a requisição "complexa" e sujeita a verificações adicionais.

## Como o CORS funciona?

Para requisições complexas, o navegador faz uma verificação prévia (preflight):

1. Envia uma requisição `OPTIONS` ao servidor perguntando o que é permitido.
2. O servidor responde com headers, como:

   * `Access-Control-Allow-Origin`
   * `Access-Control-Allow-Methods`
   * `Access-Control-Allow-Headers`

> O navegador basicamente pergunta: "Posso acessar?" E o servidor responde com o que é permitido.

## Principais headers do CORS

* **`Access-Control-Allow-Origin`**: Define quais domínios podem acessar os recursos.
* **`Access-Control-Allow-Methods`**: Lista os métodos HTTP permitidos.
* **`Access-Control-Allow-Headers`**: Indica quais headers personalizados podem ser usados.
* **`Access-Control-Allow-Credentials`**: Permite cookies e headers de autenticação em requisições cross-origin.

> Use este header com cuidado: só aceita o valor `true` ou não deve ser incluído.

## Conclusão

O CORS é essencial para proteger aplicações web e garantir que apenas origens confiáveis acessem seus recursos. Saber como ele funciona ajuda a configurar APIs de forma segura e eficiente. E aí, pronto para aplicar no seu próximo projeto?
