# \<prism-markdown-element\>

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/prism-markdown-element)

**prism-markdown-element** is `LitElement` component inspired from [markdown-element](https://github.com/intcreator/markdown-element) but with extra sugar properties

It allows render markdown to html with the help of `prismjs` and `commonmark` libraries

**Install**

 ```shell
npm i prism-markdown-element
 ```

 **import it**

 ```js
import 'prism-markdown-element/prism-markdown-element.js';
 ```

## Features
* Support highlight code syntax
* Support the default themes from `prismjs`
* Support custom theme from any url or path (should be a style link and a prismjs theme)

## Properties

* **mdsrc** markdown source url
* **markdown** markdown text (string)
* **theme** any `prismjs` theme ('coy', 'dark', 'funky', 'okaidia','solarizedlight', 'tomorrow', 'twilight')
* **customtheme** custom theme url (should be a prismjs css )

## Usage

**No theme (prism as default) and remote markdown**

```html
<prism-markdown-element
mdsrc="https://gist.githubusercontent.com/GermanMtzmx/3855ed67c331bad39d2a625a597a83d5/raw/92399a9fd8b29ec7b750c111a45f0cf6eb532e86/testingMethodsInsideNestedDomIf.md">
</prism-markdown-element>
```

**customtheme example**

``` html
<prism-markdown-element
  customtheme="https://raw.githubusercontent.com/PrismJS/prism-themes/master/themes/prism-ghcolors.css"
  mdsrc="https://gist.githubusercontent.com/GermanMtzmx/3855ed67c331bad39d2a625a597a83d5/raw/92399a9fd8b29ec7b750c111a45f0cf6eb532e86/testingMethodsInsideNestedDomIf.md">
</prism-markdown-element>
```

**markdown string and prismtheme**

```html
<prism-markdown-element
  theme="coy"
  markdown=" # Hello prism markdown element"
  >
</prism-markdown-element>
```
