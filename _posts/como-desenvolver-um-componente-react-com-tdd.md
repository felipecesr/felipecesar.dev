---
layout: default
title: Como desenvolver um componente React com TDD
date: 2021-04-17T14:18:37.510Z
---
## Red: Teste que falha

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import Item from '../Item'

test('renders the todo description', () => {
  const container = document.createElement('div')
  document.body.appendChild(container)

  ReactDOM.render(<Item />, container)

  expect(document.body.textContent).toBe('make dinner')
})

```
Erro
```bash
  ● Item › renders the todo description

    Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
```

## Green: Fazendo o teste passar
```javascript
import React from 'react'

const Item = () => <div>make dinner</div>

export default Item

```
...

```bash
 PASS  src/components/__tests__/Item.test.js
  ✓ renders the todo description (20 ms)
```

...

```javascript
test('renders another todo description', () => {
  const container = document.createElement('div')
  document.body.appendChild(container)

  ReactDOM.render(<Item />, container)

  expect(document.body.textContent).toBe('go shopping')
})
```

```javascript
✓ renders the todo description (23 ms)
✕ renders another todo description (9 ms)

● renders another todo description

  expect(received).toBe(expected) // Object.is equality

  Expected: "go shopping"
  Received: "make dinnermake dinner"
```

...

```javascript
  expect(document.body.textContent).toBe('make dinner')
  container.remove()
```
...

```bash
Expected: "go shopping"
Received: "make dinner"
```
...
```javascript
 ReactDOM.render(<Item description='make dinner' />, container)
```
...
```javascript
export const Item = ({ description }) => <div>{description}</div>
```

...

```javascript
 PASS  src/components/__tests__/Item.test.js
  ✓ renders the todo description (15 ms)
  ✓ renders another todo description (3 ms)
```

## Refactor

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import Item from '../Item'

test('renders the todo description', () => {
  const container = document.createElement('div')
  document.body.appendChild(container)

  ReactDOM.render(<Item description='make dinner' />, container)

  expect(document.body.textContent).toBe('make dinner')
  container.remove()
})

test('renders another todo description', () => {
  const container = document.createElement('div')
  document.body.appendChild(container)

  ReactDOM.render(<Item description='go shopping' />, container)

  expect(document.body.textContent).toBe('go shopping')
  container.remove()
})
```
...
```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import Item from '../Item'

function render(component) {
  const container = document.createElement('div')
  document.body.appendChild(container)

  ReactDOM.render(component, container)
}

afterEach(() => {
  document.body.innerHTML = ''
})

test('renders the todo description', () => {
  const description = 'make dinner'
  render(<Item description={description} />)
  expect(document.body.textContent).toBe(description)
})

test('renders another todo description', () => {
  const description = 'go shopping'
  render(<Item description={description} />)
  expect(document.body.textContent).toBe(description)
})

```
