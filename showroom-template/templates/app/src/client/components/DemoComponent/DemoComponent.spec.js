import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import DemoComponent from '.';

describe('<DemoComponent />', () => {
  /* Recommended test-cases */

  it('should have default props', () => {
    let component = <DemoComponent />;
    expect(component.props.label).to.equal('Give me back my label!');
    expect(component.props.onClick).to.be.a('function');
  });
  it('should have the right class name', () => {
    let wrapper = shallow(<DemoComponent className="test-class-name" />);
    expect(wrapper).to.have.className('demo-component');
    expect(wrapper).to.have.className('test-class-name');
  });

  /* More examples */

  it('should display click count', () => {
    let wrapper = shallow(<DemoComponent />);
    let clicksCount = wrapper.find('.demo-component__clicks-count');
    let incrementButton = wrapper.find('.demo-component__increment-button');
    expect(clicksCount.text()).to.equal('0');
  });

  it('should have increment button', () => {
    let wrapper = shallow(<DemoComponent />);
    let incrementButton = wrapper.find('.demo-component__increment-button');
    expect(incrementButton).to.present();
  });

  it('should increment clicks count by pressing increment button', () => {
    let wrapper = shallow(<DemoComponent />);
    let clicksCount = wrapper.find('.demo-component__clicks-count');
    let incrementButton = wrapper.find('.demo-component__increment-button');

    incrementButton.simulate('click');
    clicksCount = wrapper.find('.demo-component__clicks-count');
    expect(clicksCount.text()).to.equal('1');

    incrementButton.simulate('click');
    clicksCount = wrapper.find('.demo-component__clicks-count');
    expect(clicksCount.text()).to.equal('2');

    incrementButton.simulate('click');
    clicksCount = wrapper.find('.demo-component__clicks-count');
    expect(clicksCount.text()).to.equal('3');
  });
});
