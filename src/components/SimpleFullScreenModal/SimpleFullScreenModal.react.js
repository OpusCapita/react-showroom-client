import React, { Component, PropTypes } from 'react';
import './SimpleFullScreenModal.less';

class SimpleFullScreenModal extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.isOpen) {
      this.register();
    }
    if(!nextProps.isOpen) {
      this.unregister();
    }
  }

  componentWillUnmount() {
    this.unregister();
  }

  handleKeyDown(event) {
    let escKeyCode = 27;
    if(event.keyCode === escKeyCode ) {
      this.props.onHide();
    }
    return false;
  }

  register() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'hidden';
  }

  unregister() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'initial';
  }

  handleCloseButtonClick() {
    this.props.onHide();
  }

  render() {
    let { children, isOpen, headerLabel } = this.props;
    let header = headerLabel ? (
      <div className="simple-full-screen-modal__header">
        <div className="simple-full-screen-modal__header-label">
          { headerLabel }
        </div>
        <div
          className="simple-full-screen-modal__close-button"
          onClick={this.handleCloseButtonClick.bind(this)}
        >
          <div className="simple-full-screen-modal__close-button-label">
            hide
          </div>
          <div className="simple-full-screen-modal__close-button-x">
            ×
          </div>
        </div>
      </div>
    ) : null;
    let modal = isOpen ? (
      <div className="simple-full-screen-modal">
        <div className="simple-full-screen-modal__content-container">
          <div className="simple-full-screen-modal__content">
            {header}
            {children}
          </div>
        </div>
      </div>
    ) : null;
    return modal;
  }
}

SimpleFullScreenModal.propTypes = {
  isOpen: PropTypes.bool,
  onHide: PropTypes.func,
  headerLabel: PropTypes.node
}
SimpleFullScreenModal.defaultProps = {
  onHide: () => {}
};

export default SimpleFullScreenModal;
