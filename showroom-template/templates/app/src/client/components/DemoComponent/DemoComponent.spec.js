import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import DemoComponent from '.';

describe('<DemoComponent />', () => {
  it('should have the right class name', () => {
    let className = 'test-class-name';
    let wrapper = mount(<DemoComponent className={className} />);
    expect(wrapper.getDOMNode().classList.contains(className)).to.equal(true);
  });
});
