
# &lt;fc-applayout&gt;

[![Available in Vaadin_Directory](https://img.shields.io/vaadin-directory/v/flowingcodefc-applayout.svg)](https://vaadin.com/directory/component/flowingcodefc-applayout)

[&lt;fc-applayout&gt;](https://vaadin.com/components/fc-applayout) is a Responsive and flexible LitElement based Application Layout. Built using [@polymer/app-layout](https://www.webcomponents.org/element/@polymer/app-layout).


![GIF for fc-applayout](./Demo.gif)

## Example Usage
```html
<fc-applayout title="Application Layout">
      <div slot="title" main-title="">AppLayout  Demo</div>
      <paper-icon-button slot="toolbar" icon="settings" title="Settings" role="button"></paper-icon-button>
      <div slot="menu">
        <p onclick="this.dispatchEvent(new CustomEvent('item-clicked', {bubbles: true}))">This is menu</p>
      </div>
      <div>Content</div>
</fc-applayout>
```