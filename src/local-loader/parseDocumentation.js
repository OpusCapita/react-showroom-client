'use strict';

let markdownToAst = require('markdown-to-ast');
let fill = require('lodash/fill');

function getSectionIndexRange(ast, headerName) {
  let targetHeaderIndex = ast.children.reduce((result, branch, index) => {
    if (result === null && branch.type === 'Header' && branch.children[0].value === headerName) {
      return index + 1;
    }
    return result;
  }, null);

  let nextHeaderIndex = targetHeaderIndex === null ? null :
    ast.children.reduce((result, branch, index) => {
      if (result === null && index > targetHeaderIndex && branch.type === 'Header') {
        return index;
      }
      return result;
    }, null);

  let countOfSections = nextHeaderIndex - targetHeaderIndex;
  if (countOfSections > 0) {
    return fill(Array(countOfSections), '').map((el, i) => i + targetHeaderIndex);
  }
  return [];
}

function parseDocumentation(markdown) {
  let ast = markdownToAst.parse(markdown);
  return {
    componentName:
      ast.children[getSectionIndexRange(ast, 'Component Name')[0]] &&
      ast.children[getSectionIndexRange(ast, 'Component Name')[0]].children[0].value,
    tags:
      ast.children[getSectionIndexRange(ast, 'Tags')[0]] &&
      ast.children[getSectionIndexRange(ast, 'Tags')[0]].children[0].value,
    demoProps:
      ast.children[getSectionIndexRange(ast, 'Code Example')[0]] &&
      ast.children[getSectionIndexRange(ast, 'Code Example')[0]].value
  };
}

module.exports = parseDocumentation;
