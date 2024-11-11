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

import {html, css, LitElement} from 'lit';
import {property} from 'lit/decorators/property.js';
import {query} from 'lit/decorators/query.js';
import {customElement} from 'lit/decorators/custom-element.js';
import {AppDrawerElement} from '@polymer/app-layout/app-drawer/app-drawer';
import {AppHeaderElement} from '@polymer/app-layout/app-header/app-header';
import "@polymer/app-layout/app-scroll-effects/app-scroll-effects";
import "@polymer/font-roboto/roboto";
import '@polymer/app-layout/app-layout';
import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-listbox/paper-listbox';
import "@polymer/app-layout/app-toolbar/app-toolbar";
import { ThemableMixin } from '@vaadin/vaadin-themable-mixin';

/**
 * FcAppLayoutElement is a custom web component that provides a responsive and customizable application layout.
 * It is based on Polymer's AppLayout components but built with Lit.
 * The layout includes an app-header, app-drawer, and a content area, which can be customized using various properties and slots.
 *
 * @slot title - Slot for the main title or logo in the app-header.
 * @slot toolbar - Slot for additional toolbar elements in the app-header.
 * @slot profile - Slot for the profile information in the app-drawer.
 * @slot menu - Slot for the menu items in the app-drawer.
 * @csspart header - CSS part for the app-header.
 * @csspart toolbar - CSS part for the app-toolbar.
 * @csspart drawer - CSS part for the app-drawer.
 * @csspart menu-container - CSS part for the paper-listbox in the app-drawer.
 */
@customElement('fc-applayout')
export class FcAppLayoutElement extends ThemableMixin(LitElement) {
  static get is() { return 'fc-applayout'; }

  static override styles = css`
    app-toolbar {
      background-color: #4285f4;
      color: #fff;
      transform: translate3d(0px, 0px, 0px);
      display:flex;
      height: var(--app-header-height, 64px);
    }

    app-toolbar.alignRight {
      flex-direction: row-reverse;
    }

    paper-icon-button + [main-title] {
      margin-left: 24px;
    }

    ::slotted(paper-icon-button[slot="toolbar"]) {
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

    .content-container {
      width:100%; 
      height:calc( 100% - var(--app-header-height, 64px) ); 
      transform: translateY(var(--app-header-height, 64px));
    }

    .layout-container {
      height:100%;
      width:100%; 
    }

    :host {
      width: 100%;
      height: 100%;
    }
  `;

  /**
   * Sets if swiping opens the drawer.
   * @type {boolean}
   */
  @property({type: Boolean})
  swipeOpen = true;

  /**
   * Sets if scrolling up will reveal the header.
   * @type {boolean}
   */
  @property({type: Boolean})
  reveals = true;    

  /**
   * Sets the drawer visibility.
   * @type {boolean}
   */
  @property({type: Boolean})
  drawerVisible = true;    
  
  /**
   * Sets header fixed.
   * @type {boolean}
   */
  @property({type: Boolean})
  fixed = false;    

  /**
   * The alignment of the drawer on the screen ('left', 'right', 'start' or 'end').
   * 'start' computes to left and 'end' to right in LTR layout and vice versa in RTL layout.
   * @type {string}
   */
  @property({type: String})
  drawerAlign = "left";

  /**
   * Sets header shadow.
   * @type {boolean}
   */
  @property({type: Boolean})
  shadow = true;    

  /**
   * Makes the drawer to be opened by default, in a non modal way.
   * @type {boolean}
   */
  @property({type: Boolean})
  drawerPersistent = false;    

  /**
   * Makes the drawer to be shown below the header.
   * @type {boolean}
   */
  @property({type: Boolean})
  drawerBelowHeader = false;
  
  @query('#drawer')
  drawer!: AppDrawerElement;

  @query('#header')
  header!: AppHeaderElement;

  @query('#content')
  content!: HTMLDivElement;

  override render() {
    return html`
      <div class="layout-container">
        <app-header part="header" id="header" effects="" ?shadow=${this.shadow} ?reveals=${this.reveals} ?fixed=${this.fixed} style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);">
          <app-toolbar part="toolbar" class=${this.drawerAlign=="right"?"alignRight":""}>
            <paper-icon-button ?hidden=${!this.drawerVisible} @click="${this.clickHandler}" icon="menu" role="button" tabindex="0" aria-disabled="false"></paper-icon-button>
            <div style="display:flex; align-items: center; width: 100%">
              <slot name="title"></slot>
            </div>
            <slot name="toolbar"></slot>
          </app-toolbar>
        </app-header>
        <app-drawer ?persistent=${this.drawerPersistent} part="drawer" align="${this.drawerAlign}" ?swipe-open=${this.swipeOpen} id="drawer" style="transition-duration: 200ms; touch-action: pan-y;">
          <slot name="profile"></slot>
          <paper-listbox part="menu-container" role="listbox" tabindex="0">
            <slot name="menu"></slot>
          </paper-listbox>
        </app-drawer>
        <div class="content-container" id="content"><slot></slot></div>
      </div>
    `;
  }

  clickHandler() {
    this.drawer.toggle();
    this._updateMargin();
  }

  constructor() {
    super();
    this.addEventListener('item-clicked', () => {
      if (!this.drawerPersistent) {
        this.drawer.close();
      }
    });
  }

  override firstUpdated() {
    this.drawer.shadowRoot!.getElementById("contentContainer")!.style.display="flex";
    this.drawer.shadowRoot!.getElementById("contentContainer")!.style.flexDirection="column";
  }

  override updated(changedProps: { has: (arg0: string) => any; get: (arg0: string) => any; }) {
    if (changedProps.has('drawerPersistent')) {
      this.drawer.opened=this.drawerPersistent;
      this._updateMargin();
    }
    if (changedProps.has('drawerBelowHeader')) {
      this._updateZIndex();
    }
  }

  private _updateZIndex() {
    if (this.drawerBelowHeader) {
      this.header.style.zIndex = "1001";
      this.drawer.style.top = this.header.clientHeight - 120 + "px";
    } else {
      this.header.style.zIndex = "1000";
      this.drawer.style.top = "-120px";
    }
  }

  _updateMargin() {
    let marginWidth = this.drawer.clientWidth + "px";
    if (this.drawerPersistent) {
      //TRUE TRUE
      if(this.drawerBelowHeader){
        if(this.drawer.opened) {
          if (this.drawerAlign == "right") {
            this.header.style.marginRight = "0px";
            this.content.style.marginRight = marginWidth;
          } else {
            this.header.style.marginLeft = "0px";
            this.content.style.marginLeft = marginWidth;
          }
        } else {
          if (this.drawerAlign == "right") {
            this.header.style.marginRight = "0px";
            this.content.style.marginRight = "0px";
          } else {
            this.header.style.marginLeft = "0px";
            this.content.style.marginLeft = "0px";
          }
        }
      } else {//TRUE FALSE
        if(this.drawer.opened) {
          if (this.drawerAlign == "right") {
            this.header.style.marginRight = marginWidth;
            this.content.style.marginRight = marginWidth;
          } else {
            this.header.style.marginLeft = marginWidth;
            this.content.style.marginLeft = marginWidth;
          }
        } else {
          if (this.drawerAlign == "right") {
            this.header.style.marginRight = "0px";
            this.content.style.marginRight = "0px";
          } else {
            this.header.style.marginLeft = "0px";
            this.content.style.marginLeft = "0px";
          }
        }
      }

    } else {
      //FALSE TRUE
      //FALSE FALSE
        if (this.drawerAlign == "right") {
          this.header.style.marginRight = "0px";
          this.content.style.marginRight = "0px";
        } else {
          this.header.style.marginLeft = "0px";
          this.content.style.marginLeft = "0px";
        }
      }
    }
  }

declare global {
  interface HTMLElementTagNameMap {
    'fc-applayout': FcAppLayoutElement;
  }
}
