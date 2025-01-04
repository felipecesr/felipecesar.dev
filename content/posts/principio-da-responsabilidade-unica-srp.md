---
layout: default
title: Princípio da Responsabilidade Única (SRP)
date: 2018-07-16T16:51:23.478Z
aliases:
  - /princípio-da-responsabilidade-única-srp/
serie: solid
---
Neste artigo vou explicar como funciona o **Princípio da Responsabilidade Única (SRP)** do **SOLID** e mostrar como aplicá-lo em JavaScript.

## O que é SOLID?

SOLID é um acrônimo de 5 princípios da programação orientada a objetos, são eles:

[**S**]ingle Responsability Principle\
[**O**]pen/Closed Principle\
[**L**]iskov Substitution Principle\
[**I**]nterface Segregation Principle\
[**D**]ependency Inversion Principle

Com a aplicação destes princípios podemos obter alguns benefícios, como códigos mais fáceis de manter, adaptar, testar, etc. Além de evitar possíveis problemas como códigos desestruturados, frágeis e duplicados.

## O primeiro princípio

O primeiro princípio do SOLID é o da responsabilidade única ou **SRP**, este princípio define que uma classe deve possuir apenas uma responsabilidade que deve estar totalmente encapsulada dentro dela.

Sua definição formal diz:

> Uma classe deve ter **um, e apenas um**, motivo para ser modificada.

Se uma classe só deve ter um motivo para ser modificada, certamente ela só deve ter uma única responsabilidade.

## Exemplo de violação

Vamos supor que precisamos criar uma classe que faça requisições ao servidor e valide os erros para apresenta-los como um alerta na tela, essa é uma classe que possui mais de uma responsabilidade e claramente viola o SRP. Abaixo segue um exemplo desta classe onde importamos o [SweetAlert2](https://sweetalert2.github.io/) para exibir os alertas de erro:

```javascript
import Swal from 'sweetalert2';

export class HttpClient {
  get(url) {
    return fetch(url, {
      headers: {
        Accept: 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        if (response.status == 401) {
          Swal({
            title: 'Não autorizado',
            type: 'error'
          });
        } else if (response.status == 404) {
          Swal({
            title: 'Não encontrado',
            type: 'warning'
          });
        } else if (response.status == 500) {
          Swal({
            title: 'Erro do Servidor Interno',
            type: 'error'
          });
        } else {
          Swal({
            title: 'Erro desconhecido',
            type: 'info'
          });
        }
      }
    });
  }
}
```

## Resolvendo a violação do SRP

Nesse caso como decidimos importar uma lib para validar o erro antes de que ele seja exibido, podemos separar as responsabilidades em duas classes:

```javascript
import Swal from 'sweetalert2';

export default class ErrorHandler {
  static handle(response) {
    if (response.status == 401) {
      Swal({
        title: 'Não autorizado',
        type: 'error'
      });
    } else if (response.status == 404) {
      Swal({
        title: 'Não encontrado',
        type: 'warning'
      });
    } else if (response.status == 500) {
      Swal({
        title: 'Erro do Servidor Interno',
        type: 'error'
      });
    } else {
      Swal({
        title: 'Erro desconhecido',
        type: 'info'
      });
    }
  }
}
```

```javascript
import ErrorHandler from './error-handler';

export default class HttpClient {
  get(url) {
    return fetch(url, {
      headers: {
        Accept: 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        ErrorHandler.handle(response);
      }
    });
  }
}
```

Dessa forma conseguimos corrigir a violação, dividindo as responsabilidades em classes diferentes.

## Conclusão

Esse é o tipo de princípio que toda aplicação orientada a objetos deve ter, aplicando ele conseguimos criar classes mais coesas e com um acoplamento mais baixo.

Espero que tenham gostado, se tiverem duvidas ou sugestões podem comentar. Abraço!
