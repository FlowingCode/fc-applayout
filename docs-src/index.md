---
layout: page.11ty.cjs
title: <fc-applayout> ⌲ Home
---

# &lt;fc-applayout>

`<fc-applayout>` is a web component that builds a responsive and flexible layout for creating web applications.

## As easy as HTML

<section class="columns">
  <div>

`<fc-applayout>` is just an HTML element. You can it anywhere you can use HTML!

```html
<fc-applayout></fc-applayout>
```

  </div>
  <div>

<fc-applayout></fc-applayout>

  </div>
</section>

## Configure with attributes

<section class="columns">
  <div>

`<fc-applayout>` can be configured with attributed in plain HTML.

```html
<fc-applayout title="My App"></fc-applayout>
```

  </div>
  <div>

<fc-applayout title="My App"></fc-applayout>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<fc-applayout>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const name="lit-html";

render(html`
  <h2>This is a &lt;fc-applayout&gt;</h2>
  <fc-applayout .title=${title}></fc-applayout>
`, document.body);
```

  </div>
  <div>

<h2>This is a &lt;fc-applayout&gt;</h2>
<fc-applayout title="lit-html"></fc-applayout>

  </div>
</section>
