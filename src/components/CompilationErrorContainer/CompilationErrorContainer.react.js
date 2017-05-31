import React, { Component } from 'react';
import './CompilationErrorContainer.less';

/* TO-DO It will be reimplemented in more reactive way when scope component will be removed */
export default
class CompilationErrorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { error: window._showroom.codeCompilationError };
  }

  componentWillMount() {
    window._showroom = { codeCompilationError: null };
  }

  componentWillReceiveProps() {
    setTimeout(() => {
      this.setState({ error: window._showroom.codeCompilationError });
    }, 300);
  }

  render() {
    let { error } = this.state;
    if (!error) {
      return null;
    }
    return (
      <div className="compilation-error-container">
        <pre className="compilation-error-container__message">
          <code>
            {error}
          </code>
        </pre>
      </div>
    );
  }
}

CompilationErrorContainer.propTypes = {

};
CompilationErrorContainer.defaultProps = {
};
