import markdownToAst from 'markdown-to-ast';

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
    return new Array(countOfSections).fill('').map((el, i) => i + targetHeaderIndex);
  }
  return [];
}

export function parseDocumentation(markdown) {
  let ast = markdownToAst.parse(markdown);
  return {
    componentName:
      ast.children[getSectionIndexRange(ast, 'Component Name')[0]] &&
      ast.children[getSectionIndexRange(ast, 'Component Name')[0]].children[0].value,
    group:
      ast.children[getSectionIndexRange(ast, 'Component Group')[0]] &&
      ast.children[getSectionIndexRange(ast, 'Component Group')[0]].children[0].value,
    demoProps:
      ast.children[getSectionIndexRange(ast, 'Code Example')[0]] &&
      ast.children[getSectionIndexRange(ast, 'Code Example')[0]].value
  };
}

export default function parseComponents(components) {
  return components.map(component => {
    let parsedDocumentation = parseDocumentation(component.readme);
    return {
      name: parsedDocumentation.componentName || 'Unknown component',
      group: parsedDocumentation.group || 'Components',
      documentation: component.readme || 'Sorry. There is no documentation for this component. =(',
      componentClass: component.componentClass.default || component.componentClass,
      demoProps: parsedDocumentation.demoProps
    }
  })
}
