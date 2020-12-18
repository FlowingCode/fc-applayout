import {FcAppLayoutElement} from '../fc-applayout.js';
import {fixture, html} from '@open-wc/testing';

const assert = chai.assert;

suite('fc-applayout', () => {
  test('is defined', () => {
    const el = document.createElement('fc-applayout');
    assert.instanceOf(el, FcAppLayoutElement);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<fc-applayout></fc-applayout>`);
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, World!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `
    );
  });

  test('renders with a set title', async () => {
    const el = await fixture(html`<fc-applayout title="Test"></fc-applayout>`);
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, Test!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `
    );
  });

});
