---
layout: default
title: Normalização de dados no Frontend
tags:
  - system
  - design
  - dados
  - javascript
  - arquitetura
date: 2024-12-16T18:32:00.000Z
---
Uma técnica poderosa para otimizar o gerenciamento de dados em aplicações frontend é a normalização de dados. Esse conceito, amplamente utilizado em bancos de dados, também traz grandes benefícios quando aplicado no estado de aplicações de interface do usuário (UI).

Objetivos da normalização de dados:

1. Desempenho otimizado no acesso aos dados
2. Estrutura de armazenamento eficiente
3. Alta legibilidade e manutenção do código

Quando os dados armazenados no estado seguem uma estrutura unificada, a legibilidade do código e a facilidade de manutenção são significativamente melhoradas.

A normalização de dados opera com base em "formas normais". Embora existam sete formas normais no total, no contexto de aplicações UI, geralmente utilizamos a primeira (1FN), segunda (2FN) e, em alguns casos, a terceira forma normal (3FN).

## Exemplos de normalização

Inicialmente, podemos ter um objeto simples que não está normalizado:

```javascript
{
  id: "1",
  name: "Evgenil",
  job: {
    id: "UIE",
    title: "UI Engineer",
    department: "Engineering"
  },
  location: { code: "UK", name: "United Kingdom" }
}
```

Vamos otimizar esse objeto aplicando a primeira forma normal.

### Primeira forma normal

**Principais Regras:**

* Dados devem ser atômicos.
* Deve haver uma chave primária para identificar cada registro.

Para cumprir essas regras, removemos o aninhamento de objetos e convertemos os dados para uma estrutura atômica (remover os aninhamentos):

```javascript
{
  id: "1",
  name: "Evgenil",
  job_id: "UIE",
  job_title: "UI Engineer",
  job_department: "Engineering",
  country_code: "UK",
  country_name: "United Kingdom",
}
```

Agora, todos os campos são atômicos e a chave primária é representada pelo `id`.

### Segunda forma normal

**Principais Regras:**

* A estrutura precisa estar em 1FN.
* Campos que não são chaves primárias devem depender unicamente da chave primária.

Neste caso, observamos que campos como `job_title` e `job_department` dependem do `job_id`, mas também do usuário. Para corrigir isso, criamos tabelas separadas para cada entidade:

```javascript
const users = {
  "1": {
    name: "Evgenil",
    job_id: "UIE",
    country_id: "UK",
  }
}

const jobs = {
  "UIE": {
    title: "UI Engineer",
    department: "Engineering"
  }
}

const user_jobs = { "1": "UIE" }

const countries = { "UK": "United Kingdom" }
```

Essa separação garante que cada entidade dependa exclusivamente de sua própria chave primária.

### Terceira forma normal

**Principais Regras:**

* A estrutura precisa estar em 2FN.
* Campos que não são chaves primárias devem depender apenas da chave primária da entidade.

Na estrutura atual, o campo `department` em `jobs` pode não estar diretamente relacionado ao `job_id`. Para resolver isso, criamos uma tabela adicional para o departamento:

```javascript
const jobs = { "UIE": "UI Engineer" }

const department = { "UIE": "Engineering" }
```

A terceira forma normal (3FN) pode ser excessiva em alguns casos. Normalmente, a segunda forma normal (2FN) é suficiente para aplicações frontend, mas a escolha final depende das necessidades específicas do seu projeto.

## Conclusão

Aplicar normalização às estruturas de dados no frontend pode melhorar significativamente a eficiência, legibilidade e manutenção do seu código, além de prevenir problemas relacionados a dados duplicados ou inconsistências ao longo da aplicação.
