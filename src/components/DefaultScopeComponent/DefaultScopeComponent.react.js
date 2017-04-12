import React, { Component, PropTypes } from 'react';
import { I18nManager } from 'opuscapita-i18n';
import showroomScope from '../../decorators/showroomScope';

const formatPatterns = {
  en: {
    datePattern: 'MM/dd/yyyy',
    integerPattern: '#,##0',
    numberPattern: '#,##0.00',
    numberDecimalSeparator: '.',
    numberGroupingSeparator: ',',
    numberGroupingSeparatorUse: true
  },
  de: {
    datePattern: "dd.MM.yyyy",
    integerPattern: "#,##0",
    numberPattern: "#,##0.00",
    numberDecimalSeparator: ",",
    numberGroupingSeparator: ".",
    numberGroupingSeparatorUse: true
  }
};

@showroomScope
class DefaultScopeComponent extends Component {
  getChildContext() {
    if (!this.context.i18n) {
      this.context.i18n = new I18nManager('en', null, formatPatterns);
    }
    return {
      i18n: this.context.i18n,
      serviceRegistry: serviceName => ({ url: 'http://localhost:3000' })
    };
  }

  render = () => (<div>{this._renderChildren()}</div>);
}

DefaultScopeComponent.contextTypes = {
  i18n: PropTypes.object
};
DefaultScopeComponent.childContextTypes = {
  i18n: PropTypes.object,
  serviceRegistry: PropTypes.func
};

export default DefaultScopeComponent;
