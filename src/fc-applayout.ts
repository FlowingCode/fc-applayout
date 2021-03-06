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

import {html, customElement, property, css, query} from 'lit-element';
import {AppDrawerElement} from '@polymer/app-layout/app-drawer/app-drawer';
import {ThemableElement} from '@vaadin/themable-element/themable-element.js';
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
export class FcAppLayoutElement extends ThemableElement {
  static get is() { return 'fc-applayout'; }

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
  * Sets if swiping opens the drawer
  */
  @property({type: Boolean})
  swipeOpen = true;

 /**
  * Sets if scrolling up will reveal the header
  */
  @property({type: Boolean})
  reveals = true;    

 /**
  * Sets the drawer visibility
  */
  @property({type: Boolean})
  drawerVisible = true;    
  
  /**
  * Sets header fixed
  */
  @property({type: Boolean})
  fixed = false;    

 /**
  * The alignment of the drawer on the screen ('left', 'right', 'start' or
  * 'end'). 'start' computes to left and 'end' to right in LTR layout and
  * vice versa in RTL layout.
  */
  @property({type: String})
  drawerAlign = "left";

 /**
  * Sets header fixed
  */
  @property({type: Boolean})
  shadow = true;    
  
  @query('#drawer')
  drawer!: AppDrawerElement;

  render() {
    return html`
      <div>
        <app-header part="header" id="header" effects="" ?shadow=${this.shadow} ?reveals=${this.reveals} ?fixed=${this.fixed} style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);">
          <app-toolbar part="toolbar" style="transform: translate3d(0px, 0px, 0px);">
            <paper-icon-button ?hidden=${!this.drawerVisible} @click="${this.clickHandler}" icon="menu" role="button" tabindex="0" aria-disabled="false"></paper-icon-button>
            <div style="display:flex; align-items: center; width: 100%">
              <slot name="title"></slot>
            </div>
            <slot name="toolbar"></slot>
          </app-toolbar>
        </app-header>
        <app-drawer part="drawer" align="${this.drawerAlign}" ?swipe-open=${this.swipeOpen} id="drawer" style="transition-duration: 200ms; touch-action: pan-y;">
          <slot name="profile"></slot>
          <paper-listbox role="listbox" tabindex="0">
            <slot name="menu"></slot>
          </paper-listbox>
        </app-drawer>
        <div><slot name="content"></slot></div>
      </div>
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
