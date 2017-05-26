const postcss = require('postcss');
const camelCase = require('lodash.camelcase');

const DYNAMIC_EXPRESSION = /__DYNAMIC__EXPRESSION__\d+__/g;

function buildValueAst(t, value, expressions) {
    let matches = value.match(DYNAMIC_EXPRESSION) || [];

    if (!matches.length) {
        return t.stringLiteral(value);
    }

    const quasis = value.split(DYNAMIC_EXPRESSION).map(e => t.templateElement(e));
    const exprs = matches.map((match) => {
        let [, index] = (/__DYNAMIC__EXPRESSION__(\d+)__/g).exec(match);
        index = parseInt(index, 10);

        return expressions[index];
    });

    return t.templateLiteral(quasis, exprs);
}

function buildObjectAst(t, nodes, expressions) {
    const properties = nodes.map((node) => {
        switch (node.type) {
            case 'decl':
                let { prop, value } = node;

                return t.objectProperty(
                    t.identifier(camelCase(prop)),
                    buildValueAst(t, value, expressions)
                );
            case 'rule':
                let { selector } = node;

                return t.objectProperty(
                    buildValueAst(t, selector, expressions),
                    buildObjectAst(t, node.nodes, expressions)
                );
            case 'atrule':
                let { name, params } = node;

                return t.objectProperty(
                    buildValueAst(t, `@${name} ${params}`, expressions),
                    buildObjectAst(t, node.nodes, expressions)
                );
            default:
                throw new Error(`Invalid CSS node ${node.type}`);
        }
    });

    return t.objectExpression(properties);
}

module.exports = function cssTaggedLiteralsToJs(babel) {
    const t = babel.types;

    return {
        visitor: {
            TaggedTemplateExpression(path, { opts }) {
                const { tagName = 'css' } = opts;
                const node = path.node;

                if (node.tag.name !== tagName || !path.scope.hasBinding(tagName)) {
                    return;
                }

                const nodeQuasis = node.quasi.quasis;
                const nodeExpressions = node.quasi.expressions || [];
                const cssExpr = nodeQuasis.reduce((acc, quasi, i) => {
                    if (quasi.value.cooked) {
                        acc += quasi.value.cooked;
                    }

                    if (nodeExpressions[i]) {
                        acc += `__DYNAMIC__EXPRESSION__${i}__`;
                    }

                    return acc;
                }, '');

                const cssAst = postcss.parse(cssExpr);

                const cssObjectAst = buildObjectAst(t, cssAst.nodes, nodeExpressions);

                path.replaceWith(
                    t.callExpression(
                        t.identifier(tagName),
                        [cssObjectAst]
                    )
                );
            }
        }
    };
};
