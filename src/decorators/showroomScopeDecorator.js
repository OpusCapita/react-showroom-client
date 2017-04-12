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
      /* TO-DO It will be reimplemented in more reactive way when scope component will be removed */
      window._showroom ? window._showroom.codeCompilationError = null : window._showroom = {};
    } catch (err) {
      /* TO-DO It will be reimplemented in more reactive way when scope component will be removed */
      window._showroom ? window._showroom.codeCompilationError = err.message : window._showroom = {};
      console.log('Showroom scope decorator - transpiling code error:', err);
    }

    /* Use '_scope' keyword in react.md file when want get access to "Scope" component.
       For example - '<ModalContainer showModal={ _scope.state.showModal } />'
       For code 'this.state.a' After transpiling finish, result code is 'undefined.state.a'.
       Because 'undefined' is an frequently occurring word, we use '_scope' */
    transpiledCode = transpiledCode.replace(/_scope/g, 'this');
    let compiledCode;

    try {
      compiledCode = eval(transpiledCode); // eslint-disable-line no-eval
      /* TO-DO It will be reimplemented in more reactive way when scope component will be removed */
      window._showroom ? window._showroom.codeCompilationError = null : window._showroom = {};
    } catch (err) {
      /* TO-DO It will be reimplemented in more reactive way when scope component will be removed */
      window._showroom ? window._showroom.codeCompilationError = err.message : window._showroom = {};
    }

    return compiledCode;
  };
};
