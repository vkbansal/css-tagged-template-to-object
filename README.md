# babel-plugin-transform-css-tagged-template-to-object
**EXPERIMENTAL!**
Babel Plugin to convert css tagged literals to javascript objects. Intended to be used with glamor.

```js
// from
export const $switch = css`
    display: inline-flex;
    vertical-align: middle;
    height: 34px;
    align-items: flex-end;
`;

// to
export const $switch = css({
    display: 'inline-flex',
    verticalAlign: 'middle',
    height: '34px',
    alignItems: 'flex-end'
});
```
