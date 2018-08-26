import 'prismjs/prism.js';
import 'commonmark/dist/commonmark.min.js';
import { LitElement, html } from '@polymer/lit-element';
import { unsafeHTML } from 'lit-html/lib/unsafe-html.js';


/**
*
*
*
*
*/

class PrismMarkdownElement extends LitElement {
  static get properties() {
     return {
       mdsrc: String,
       markdown: String,
       safe: Boolean,
       theme: String,
       customtheme: String,
       __markdownRendered: String,
       __styles: String,

     }
   }
   /**
    * Set default values for component attributes
    * @property {Boolean} safe enable safe render for commonmark
    * @property {String} mdsrc markdown resource
    * @property {String} theme prismjs theme name
    * @property {String} customtheme prismjs theme url
    * @property {String} __styles template object that contain styles
    * @property {Strin} __markdownRendered property used to render markdown
    * @property {Object} __reader Instance of commonmark parser
    * @property {Object} __writer Instance of commonmark writer
    */
  constructor() {
   super();
   this.safe = true;
   this.mdsrc  = "";
   this.markdown = "";
   this.theme = "";
   this.customtheme = "";
   this.__styles = "";
   this.__markdownRendered = "";
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
          this.__markdownRendered = this.parseMarkdown(newValue);
          return;
        case 'theme':
          this.fetchStyles({ theme: newValue }).then(newStyles => {
            this.__styles = html`${unsafeHTML(newStyles)}`;
          }).catch(error => {
            this.__styles = "";
          });
          return;
        case 'customtheme':
          this.fetchStyles({ url: newValue }).then(newStyles => {
            this.__styles = html`${unsafeHTML(newStyles)}`;
          }).catch(error => {
            this.__styles = "";
          })
          return;
        default:
          break;
     }
  }
  /**
  * @method fetchMd
  * @description method to fetch markdown from a url or path
  * @param {String} src markdown url
  * @return {Promise}
  */
  fetchMd(src) {
    if (!src.includes('.md')) { return; }
    return fetch(src).then(res => res.text()).then(markdown => markdown);
  }
  /**
  * @method fetchStyles
  * @description method to fetch styles from a url or path
  * @param {Object} config - config to fetch styles required
  * @param {String} config.url url with the style theme
  * @param {String} config.theme name of the prismjs theme
  * @return {Promise}
  */
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

  /**
  * @method parseMarkdown
  * @description parse markdown string to html content
  * @param {String} markdown string with markdown content
  * @return {Object} html template string
  */
  parseMarkdown(markdown) {
   return html`${unsafeHTML(this.__writer.render(this.__reader.parse(markdown)))}`;
  }

  _didRender() {
     Prism.highlightAllUnder(this.shadowRoot);
  }

  _render({ __markdownRendered, __styles }) {
    return html`
      ${__styles}
      ${__markdownRendered}`
  }

}

customElements.define('prism-markdown-element', PrismMarkdownElement);
