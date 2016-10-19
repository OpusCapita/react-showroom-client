import { transform } from 'babel-standalone';

export default
target => {
  target.prototype._renderChildren = function() { // eslint-disable-line no-param-reassign
    let transpiledCode;
    try {
      transpiledCode = transform(
        `{<div>${this.props._childrenCode}</div>}`,
        { presets: ['es2015', 'react', 'stage-0'] }
      ).code;
    } catch (err) {
      console.log('Showroom scope decorator - transpiling code error:', err);
    }

    /* Use '_scope' keyword in DOCUMENTATION file when want get access to SCOPE component.
       For example - '<ContainerWithControls showModal={ _scope.state.showModal } />'
       For code 'this.state.a' After transpiling finish, result code is 'undefined.state.a'.
       Because 'undefined' is an frequently occurring word, we use '_scope' */
    transpiledCode = transpiledCode.replace(/_scope/g, 'this');
    let compiledCode = eval(transpiledCode); // eslint-disable-line no-eval
    return compiledCode;
  }
};