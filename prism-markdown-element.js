import 'prismjs/prism.js';
import 'commonmark/dist/commonmark.min.js';
import { LitElement, html } from '@polymer/lit-element';
import { unsafeHTML } from 'lit-html/lib/unsafe-html.js';

class PrismMarkdownElement extends LitElement {

  static get properties() {
     return {
       mdsrc: String,
       markdown: String,
       safe: Boolean,
       theme: String,
       markdownRendered: String,
       styles: String,
       customtheme: String,

     }
   }

  constructor() {
   super();
   this.safe = true;
   this.mdsrc  = "";
   this.markdown = "";
   this.theme = "";
   this.styles = "";
   this.customtheme = "";
   this.markdownRendered = "";
   this.__reader = new commonmark.Parser();
   this.__writer = new commonmark.HtmlRenderer({safe: this.safe });
  }

  connectedCallback() {
    super.connectedCallback();
    const customtheme = this.getAttribute('customtheme');
    const theme = this.getAttribute('theme');
    if (theme === null && customtheme === null) {
      this.fetchStyles({ theme: 'prism' });
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
     this[name] = newValue;
     switch(name) {
        case 'mdsrc':
          this.fetchMd(newValue).then(markdown => {
            this.setAttribute('markdown',markdown);
          }).catch(err => err);
          return;
        case 'markdown':
          this.markdownRendered = this.parseMarkdown(newValue);
          return;
        case 'theme':
          this.fetchStyles({ theme: newValue }).then(newStyles => {
            this.styles = html`${unsafeHTML(newStyles)}`;
          }).catch(error => {
            this.styles = "";
          });
          return;
        case 'customtheme':
          this.fetchStyles({ url: newValue }).then(newStyles => {
            this.styles = html`${unsafeHTML(newStyles)}`;
          }).catch(error => {
            this.styles = "";
          })
          return;
        default:
          break;
     }
  }

  fetchMd(src) {
    if (!src.includes('.md')) { return; }
    return fetch(src).then(res => res.text()).then(markdown => markdown);
  }

  fetchStyles({url, theme}) {
   const allowedThemes = ['coy', 'dark', 'funky', 'okaidia','solarizedlight', 'tomorrow', 'twilight'];
   const theme_file = (!allowedThemes.includes(theme)) ? 'prism.css' : `prism-${theme}.css`;
   const resource = url !== undefined ? url : `../node_modules/prismjs/themes/${theme_file}`;
   return fetch(resource).then(res => res.text()).then(styles => {
     const styleTag = `
      <style>
        :host {
          display: block;
        }
        ${styles}
      </style>`;
      return styleTag;
   });
  }

  parseMarkdown(markdown) {
   return html`${unsafeHTML(this.__writer.render(this.__reader.parse(markdown)))}`;
  }

  _didRender() {
     Prism.highlightAllUnder(this.shadowRoot);
  }

  _render({ markdownRendered, styles }) {
    return html`
      ${styles}
      ${markdownRendered}`
  }

}

customElements.define('prism-markdown-element', PrismMarkdownElement);
