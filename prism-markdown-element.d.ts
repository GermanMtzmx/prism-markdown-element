import { LitElement } from 'lit-element/lit-element.js';

/**
 * @customElement prism-markdown-element
 */
export declare class PrismMarkdownElement extends LitElement {

    safe: boolean;
    mdsrc: string;
    markdown: string;
    theme: string;
    customtheme: string;
    __styles: string;
    __markdownRendered: string;
    __reader: any;
    __writer: any;

    /**
     * @method fetchMd
     * @description method to fetch markdown from a url or path
     * @param {String} src markdown url
     * @return {Promise}
     */
    fetchMd(src: string): Promise<any>;

    /**
     * @method fetchStyles
     * @description method to fetch styles from a url or path
     * @param {Object} config - config to fetch styles required
     * @param {String} config.url url with the style theme
     * @param {String} config.theme name of the prismjs theme
     * @return {Promise}
     */
    fetchStyles({ url, theme }: {
        url: string;
        theme: string;
    }): Promise<any>;

    /**
     * @method parseMarkdown
     * @description parse markdown string to html content
     * @param {String} markdown string with markdown content
     * @return {Object} html template string
     */
    parseMarkdown(markdown: string): Object;
}

declare global {
    interface HTMLElementTagNameMap {
        "prism-markdown-element": PrismMarkdownElement;
    }
}
