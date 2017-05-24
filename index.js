const postcss = require('postcss');
const camelCase = require('lodash.camelcase');

const DVS = '__DYNAMIC_VAR_START__';
const DVE = '__DYNAMIC_VAR_END__';

function cssToJSObjectStr(nodes) {
    return '{\n' + nodes.map(function(node) {
        switch (node.type) {
            case 'decl':
                let { prop, value } = node;
                let output = camelCase(prop);

                output += ': ';

                if (value.indexOf(DVS) > -1) {
                    output += '`';
                    output += value.replace(DVS, '${').replace(DVE, '}');
                    output += '`';
                } else {
                    output += ("'" + value + "'");
                }

                return output;
            case 'rule':
                let { selector } = node;
                let selectoutput = '';

                if (selector.indexOf(DVS) > -1) {
                    selectoutput += '[`';
                    selectoutput += selector.replace(DVS, '${').replace(DVE, '}');
                    selectoutput += '`]';
                } else {
                    selectoutput += ("'" + selector + "'");
                }

                return `${selectoutput}: ${cssToJSObjectStr(node.nodes)}`;
            case 'atrule':
                let { name, params } = node;
                let mediaQuery = params.indexOf(DVS) > -1
                                    ? `[\`@${name} ${params.replace(DVS, '${').replace(DVE, '}')}\`]`
                                    : `'@${name} ${params}'`;

                return `${mediaQuery}: ${cssToJSObjectStr(node.nodes)}`;
            default:
                throw new Error('Invalid CSS node');
        }
    }).join(',\n') + '\n}';
}

module.exports = function (babel) {
    const t = babel.types;

    return {
        visitor: {
            TaggedTemplateExpression(path, { opts, file }) {
                const { tagName = 'css' } = opts;
                const node = path.node;

                if (node.tag.name !== tagName || !path.scope.hasBinding(tagName)) {
                    return;
                }


                let nodes = '';
                const expressions = node.quasi.expressions;

                node.quasi.quasis.forEach(function(elem, i) {
                    if (elem.value.cooked) {
                        nodes += elem.value.cooked;
                    }

                    if (i < expressions.length) {
                        const expr = expressions[i];
                        nodes += DVS;
                        nodes += file.code.substring(expr.start, expr.end);
                        nodes += DVE;
                    }
                });

                const cssAst = postcss.parse(nodes);

                let cssStr = cssToJSObjectStr(cssAst.nodes);

                path.replaceWithSourceString(`${tagName}(${cssStr})`);
            }
        }
    };
};
