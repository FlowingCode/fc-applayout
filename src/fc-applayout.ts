/**
 * @license
 * Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

import {LitElement, html, customElement, property, css, query} from 'lit-element';
import {AppDrawerElement} from '@polymer/app-layout/app-drawer/app-drawer';
import "@polymer/app-layout/app-scroll-effects/app-scroll-effects";
import "@polymer/font-roboto/roboto";
import '@polymer/app-layout/app-layout';
import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-listbox/paper-listbox';
import "@polymer/app-layout/app-toolbar/app-toolbar";
import "@polymer/app-layout/app-header/app-header";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('fc-applayout')
export class FcAppLayoutElement extends LitElement {
  static styles = css`
    fc-menuitem fc-menuitem {
      background-color: var(--lumo-primary-color-10pct);
    }

    app-toolbar {
      background-color: #4285f4;
      color: #fff;
    }

    paper-icon-button + [main-title] {
      margin-left: 24px;
    }

    paper-icon-button {
      --paper-icon-button-disabled-text: var(--lumo-disabled-text-color);
    }

    paper-progress {
      display: block;
      width: 100%;
      --paper-progress-active-color: rgba(255, 255, 255, 0.5);
      --paper-progress-container-color: transparent;
    }

    app-header {
      position: var(--layout-fixed-top_-_position); top: var(--layout-fixed-top_-_top); left: var(--layout-fixed-top_-_left); right: var(--layout-fixed-top_-_right);
      color: #fff;
      --app-header-background-rear-layer_-_background-color:  #ef6c00;;
      z-index: 1000;
    }

    app-drawer {
      --app-drawer-scrim-background: rgba(0, 0, 100, 0.8);
        z-index: 1000;
    }

    app-drawer paper-listbox {
        overflow-y: auto;
        flex-grow: 1;
    }

    :host {
      width: 100%;
      height: 100%;
    }
  `;

  /**
   * The title of the application
   */
  @property()
  title = 'AppLayout';

  /**
   * The number of times the button has been clicked.
   */
  @property({type: Number})
  count = 0;

  @query('#drawer')
  drawer!: AppDrawerElement;

  render() {
    return html`
      <div style="width: 100%; height: 64px;">
        <app-header effects="" reveals="" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);">
          <app-toolbar style="height: 64px; transform: translate3d(0px, 0px, 0px);">
            <paper-icon-button @click="${this.clickHandler}" icon="menu" role="button" tabindex="0" aria-disabled="false"></paper-icon-button>
            <div style="display:flex; align-items: center; width: 100%">
              <slot name="title"></slot>
            </div>
            <slot name="toolbar"></slot>
          </app-toolbar>
        </app-header>
        <app-drawer swipeOpen="" id="drawer" position="left" style="transition-duration: 200ms; touch-action: pan-y;">
          <slot name="profile"></slot>
          <paper-listbox role="listbox" tabindex="0">
            <slot name="menu"></slot>
          </paper-listbox>
        </app-drawer>
      </div>
      <div><slot name="content"></slot></div>
    `;
  }

  clickHandler() {
    this.drawer.toggle();
  }

  constructor() {
    super();
    this.addEventListener('item-clicked', () => {
      this.drawer.close();
    });
  }

  firstUpdated() {
    this.drawer.shadowRoot!.getElementById("contentContainer")!.style.display="flex";
    this.drawer.shadowRoot!.getElementById("contentContainer")!.style.flexDirection="column";
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'fc-applayout': FcAppLayoutElement;
  }
}
