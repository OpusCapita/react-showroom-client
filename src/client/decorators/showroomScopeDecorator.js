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
    transpiledCode = transpiledCode.replace(/_scope/g, 'this');
    let compiledCode = eval(transpiledCode); // eslint-disable-line no-eval
    return compiledCode;
  }
};
