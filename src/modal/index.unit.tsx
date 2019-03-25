import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import Button from '~/button'
import Modal from './index'

const defaultProps = {
  close() {},
}

describe('Modal', () => {
  it('Should have default dimmer with default props', () => {
    const wrapper = mount(<Modal {...defaultProps} />)
    expect(wrapper.find('.kirk-modal-dimmer--visible').exists()).toBe(true)
  })

  it('Should be not visible if isOpen is set to false', () => {
    const wrapper = mount(<Modal {...defaultProps} />)
    expect(wrapper.find('.kirk-modal-dialog').exists()).toBe(false)
    expect(wrapper.find('.kirk-modal-dimmer--inactive').exists()).toBe(true)
  })

  it('Should be visible if isOpen is set to true', () => {
    const wrapper = mount(<Modal {...defaultProps} isOpen />)
    expect(wrapper.find('.kirk-modal-dialog').exists()).toBe(true)
    expect(wrapper.find('.kirk-modal-dimmer--active').exists()).toBe(true)
  })

  it('Could be fullscreen displayed', () => {
    const wrapper = mount(<Modal {...defaultProps} isOpen fullscreen />)
    expect(wrapper.find('.kirk-modal-dimmer--fullscreen').exists()).toBe(true)
  })

  it('Could have an hidden dimmer', () => {
    const wrapper = mount(<Modal {...defaultProps} isOpen displayDimmer={false} />)
    expect(wrapper.find('.kirk-modal-dimmer--hide').exists()).toBe(true)
    expect(wrapper.find('.kirk-modal-dimmer--visible').exists()).toBe(false)
  })

  it('Could edit the modal width', () => {
    const wrapper = mount(<Modal {...defaultProps} isOpen large />)
    expect(wrapper.find('.kirk-modal--large').exists()).toBe(true)
  })

  it('should hide the modal on close button click', () => {
    const mockClose = jest.fn()
    const wrapper = mount(<Modal {...defaultProps} isOpen close={mockClose} />)
    wrapper.find(Button).simulate('click')
    expect(mockClose).toHaveBeenCalledTimes(1)
  })

  describe('Rendering by environment', () => {
    const modalOutput =
      // tslint:disable-next-line: max-line-length
      '<div class="kirk-modal-dimmer kirk-modal-dimmer--visible kirk-modal-dimmer--inactive"><div class="transition-wrapper"></div></div>'

    beforeEach(jest.resetModules)

    it('Should render the modal server side', () => {
      jest.mock('~/_utils/environment', () => ({ canUseDOM: false }))
      const Modal = require('./index').default
      const serverSide = mount(<Modal {...defaultProps} />)
      expect(serverSide.html()).toBe(modalOutput)
    })

    it('Should render the modal client side', () => {
      jest.mock('~/_utils/environment', () => ({ canUseDOM: true }))
      const Modal = require('./index').default
      const clientSide = mount(<Modal {...defaultProps} />)
      expect(clientSide.html()).toBe(modalOutput)
    })

    it('should not have changed', () => {
      jest.mock('~/_utils/environment', () => ({ canUseDOM: false }))
      const Modal = require('./index').default
      const modalServerSide = renderer.create(<Modal {...defaultProps} isOpen large />).toJSON()
      expect(modalServerSide).toMatchSnapshot()
    })
  })
})
