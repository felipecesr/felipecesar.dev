import styled from 'styled-components'

export const PostWrapper = styled.section`
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  main,
  menu,
  nav,
  section,
  summary {
    display: block;
  }

  audio,
  canvas,
  progress,
  video {
    display: inline-block;
  }

  audio:not([controls]) {
    display: none;
    height: 0;
  }

  progress {
    vertical-align: baseline;
  }

  [hidden],
  template {
    display: none;
  }

  a {
    background-color: transparent;
    -webkit-text-decoration-skip: objects;
  }

  a:active,
  a:hover {
    outline-width: 0;
  }

  abbr[title] {
    border-bottom: none;
    text-decoration: underline;
    text-decoration: underline dotted;
  }

  b,
  strong {
    font-weight: inherit;
    font-weight: bolder;
  }

  dfn {
    font-style: italic;
  }

  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }

  mark {
    background-color: #ff0;
    color: #000;
  }

  small {
    font-size: 80%;
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  img {
    border-style: none;
  }

  svg:not(:root) {
    overflow: hidden;
  }

  code,
  kbd,
  pre,
  samp {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  figure {
    margin: 1em 40px;
  }

  hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font: inherit;
    margin: 0;
  }

  optgroup {
    font-weight: 700;
  }

  button,
  input {
    overflow: visible;
  }

  button,
  select {
    text-transform: none;
  }

  [type='reset'],
  [type='submit'],
  button,
  html [type='button'] {
    -webkit-appearance: button;
  }

  [type='button']::-moz-focus-inner,
  [type='reset']::-moz-focus-inner,
  [type='submit']::-moz-focus-inner,
  button::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  [type='button']:-moz-focusring,
  [type='reset']:-moz-focusring,
  [type='submit']:-moz-focusring,
  button:-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  fieldset {
    border: 1px solid silver;
    margin: 0 2px;
    padding: 0.35em 0.625em 0.75em;
  }

  legend {
    box-sizing: border-box;
    color: inherit;
    display: table;
    max-width: 100%;
    padding: 0;
    white-space: normal;
  }

  textarea {
    overflow: auto;
  }

  [type='checkbox'],
  [type='radio'] {
    box-sizing: border-box;
    padding: 0;
  }

  [type='number']::-webkit-inner-spin-button,
  [type='number']::-webkit-outer-spin-button {
    height: auto;
  }

  [type='search'] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }

  [type='search']::-webkit-search-cancel-button,
  [type='search']::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-input-placeholder {
    color: inherit;
    opacity: 0.54;
  }

  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }

  html {
    font: 100%/1.75em 'Merriweather', 'Georgia', 'serif';
    box-sizing: border-box;
    overflow-y: scroll;
  }

  img {
    max-width: 100%;
    margin-bottom: 1.75rem;
  }

  h1 {
    margin-bottom: 1.75rem;
    color: inherit;
    font-family: Montserrat, sans-serif;
    font-weight: 900;
    text-rendering: optimizeLegibility;
    font-size: 2.5rem;
    line-height: 1.1;
  }

  h2 {
    margin-bottom: 1.75rem;
    color: inherit;
    font-family: 'Merriweather', 'Georgia', 'serif';
    font-weight: 900;
    text-rendering: optimizeLegibility;
    font-size: 1.73286rem;
    line-height: 1.1;
  }

  h3 {
    margin-bottom: 1.75rem;
    color: inherit;
    font-family: 'Merriweather', 'Georgia', 'serif';
    font-weight: 900;
    text-rendering: optimizeLegibility;
    font-size: 1.4427rem;
    line-height: 1.1;
  }

  h4 {
    margin-bottom: 1.75rem;
    color: inherit;
    font-family: 'Merriweather', 'Georgia', 'serif';
    font-weight: 900;
    text-rendering: optimizeLegibility;
    font-size: 1rem;
    line-height: 1.1;
    letter-spacing: 0.140625em;
    text-transform: uppercase;
  }

  h5 {
    margin-bottom: 1.75rem;
    color: inherit;
    font-family: 'Merriweather', 'Georgia', 'serif';
    font-weight: 900;
    text-rendering: optimizeLegibility;
    font-size: 0.83255rem;
    line-height: 1.1;
  }

  h6 {
    margin-bottom: 1.75rem;
    color: inherit;
    font-family: 'Merriweather', 'Georgia', 'serif';
    font-weight: 900;
    text-rendering: optimizeLegibility;
    font-size: 0.75966rem;
    line-height: 1.1;
    font-style: italic;
  }

  hgroup {
    margin-bottom: 1.75rem;
  }

  ul {
    margin-left: 1.75rem;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.75rem;
    list-style-position: outside;
    list-style-image: none;
    list-style: disc;
  }

  ol {
    margin-left: 1.75rem;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.75rem;
    list-style-position: outside;
    list-style-image: none;
  }

  dl {
    margin-bottom: 1.75rem;
  }

  dd {
    margin-bottom: 1.75rem;
  }

  p {
    margin-bottom: 1.75rem;
  }

  figure {
    margin-bottom: 1.75rem;
  }

  pre {
    margin-bottom: 1.75rem;
    font-size: 0.85rem;
    line-height: 1.75rem;
  }

  table {
    margin-bottom: 1.75rem;
    font-size: 1rem;
    line-height: 1.75rem;
    border-collapse: collapse;
    width: 100%;
  }

  fieldset {
    margin-bottom: 1.75rem;
  }

  blockquote {
    margin-left: -1.75rem;
    margin-right: 1.75rem;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 1.42188rem;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.75rem;
    font-size: 1.20112rem;
    line-height: 1.75rem;
    color: hsla(0, 0%, 0%, 0.59);
    font-style: italic;
    border-left: 0.32813rem solid hsla(0, 0%, 0%, 0.9);
  }

  form {
    margin-bottom: 1.75rem;
  }

  noscript {
    margin-bottom: 1.75rem;
  }

  iframe {
    margin-bottom: 1.75rem;
  }

  hr {
    margin-bottom: calc(1.75rem - 1px);
    background: hsla(0, 0%, 0%, 0.2);
    border: none;
    height: 1px;
  }

  address {
    margin-bottom: 1.75rem;
  }

  b {
    font-weight: 700;
  }

  strong {
    font-weight: 700;
  }

  dt {
    font-weight: 700;
  }

  th {
    font-weight: 700;
  }

  li {
    margin-bottom: calc(1.75rem / 2);
  }

  ol li {
    padding-left: 0;
  }

  ul li {
    padding-left: 0;
  }

  li > ol {
    margin-left: 1.75rem;
    margin-bottom: calc(1.75rem / 2);
    margin-top: calc(1.75rem / 2);
  }

  li > ul {
    margin-left: 1.75rem;
    margin-bottom: calc(1.75rem / 2);
    margin-top: calc(1.75rem / 2);
  }

  blockquote *:last-child {
    margin-bottom: 0;
  }

  li *:last-child {
    margin-bottom: 0;
  }

  p *:last-child {
    margin-bottom: 0;
  }

  li > p {
    margin-bottom: calc(1.75rem / 2);
  }

  code {
    font-size: 0.85rem;
    line-height: 1.75rem;
  }

  kbd {
    font-size: 0.85rem;
    line-height: 1.75rem;
  }

  samp {
    font-size: 0.85rem;
    line-height: 1.75rem;
  }

  abbr {
    border-bottom: 1px dotted hsla(0, 0%, 0%, 0.5);
    cursor: help;
  }

  acronym {
    border-bottom: 1px dotted hsla(0, 0%, 0%, 0.5);
    cursor: help;
  }

  abbr[title] {
    border-bottom: 1px dotted hsla(0, 0%, 0%, 0.5);
    cursor: help;
    text-decoration: none;
  }

  thead {
    text-align: left;
  }

  td,
  th {
    text-align: left;
    border-bottom: 1px solid hsla(0, 0%, 0%, 0.12);
    font-feature-settings: 'tnum';
    -moz-font-feature-settings: 'tnum';
    -ms-font-feature-settings: 'tnum';
    -webkit-font-feature-settings: 'tnum';
    padding-left: 1.16667rem;
    padding-right: 1.16667rem;
    padding-top: 0.875rem;
    padding-bottom: calc(0.875rem - 1px);
  }

  th:first-child,
  td:first-child {
    padding-left: 0;
  }

  th:last-child,
  td:last-child {
    padding-right: 0;
  }

  blockquote > :last-child {
    margin-bottom: 0;
  }

  blockquote cite {
    font-size: 1rem;
    line-height: 1.75rem;
    color: hsla(0, 0%, 0%, 0.9);
    font-weight: 400;
  }

  blockquote cite:before {
    content: '— ';
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 3.5rem;
  }

  mark,
  ins {
    background: #007acc;
    color: white;
    padding: 0.10938rem 0.21875rem;
    text-decoration: none;
  }

  a.gatsby-resp-image-link {
    box-shadow: none;
  }

  time {
    margin-bottom: 1.75rem;
    margin-top: -1.75rem;
  }

  .mdx-marker {
    width: 100%;
    display: block;
    margin-right: -1em;
    margin-left: -0.5em;
    padding-right: 1em;
    padding-left: 0.25em;
    border-left: 0.25em solid #007acc;
    background: linear-gradient(
      90deg,
      rgba(0, 122, 204, 0.39),
      rgba(0, 122, 204, 0.39) 61%,
      #2d2d2d
    ) !important;
  }
`
