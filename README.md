[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][deps-image]][deps-url]
[![Dev Dependency Status][dev-deps-image]][dev-deps-url]

# babel-plugin-transform-css-tagged-template-to-object

Babel Plugin to convert css tagged literals to javascript objects. Intended to be used with CSS-in-JS libraries like [glamor](https://github.com/threepointone/glamor).

It transpiles the following

```js
export const $switch = css`
    display: inline-flex;
    vertical-align: middle;
    height: 34px;
    align-items: flex-end;
`;
```

into this

```js
export const $switch = css({
    display: 'inline-flex',
    verticalAlign: 'middle',
    height: '34px',
    alignItems: 'flex-end'
});
```

## Install

Use npm

```
npm install -S babel-plugin-transform-css-tagged-template-to-object
```

Add the following to your `.babelrc` or `package.json`. Whichever you prefer.

```json
{
    "plugins": [
        "transform-css-tagged-template-to-object"
    ]
}
```
[npm-url]: https://npmjs.org/package/babel-plugin-transform-css-tagged-template-to-object
[npm-image]: http://img.shields.io/npm/v/babel-plugin-transform-css-tagged-template-to-object.svg?style=flat-square

[travis-url]: https://travis-ci.org/vkbansal/babel-plugin-transform-css-tagged-template-to-object
[travis-image]: http://img.shields.io/travis/vkbansal/babel-plugin-transform-css-tagged-template-to-object/master.svg?style=flat-square

[deps-url]: https://david-dm.org/vkbansal/babel-plugin-transform-css-tagged-template-to-object
[deps-image]: https://img.shields.io/david/vkbansal/babel-plugin-transform-css-tagged-template-to-object.svg?style=flat-square

[dev-deps-url]: https://david-dm.org/vkbansal/babel-plugin-transform-css-tagged-template-to-object
[dev-deps-image]: https://img.shields.io/david/dev/vkbansal/babel-plugin-transform-css-tagged-template-to-object.svg?style=flat-square
