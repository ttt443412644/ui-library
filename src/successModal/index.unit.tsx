import React from 'react'
import { shallow, mount } from 'enzyme'

import SuccessModal from './index'

const defaultProps = {
  onConfirm() {},
  confirmLabel: 'Confirm',
  imageSrc: 'https://svgshare.com/i/AGz.svg',
  imageText: 'Illustration description',
  closeOnEsc: true,
}

describe('SuccessModal', () => {
  it('Should be not visible if isOpen is set to false', () => {
    const wrapper = shallow(<SuccessModal {...defaultProps} />)
    expect(wrapper.find('.kirk-modal-dialog').exists()).toBe(false)
  })

  it('Should be visible if isOpen is set to true', () => {
    const wrapperOpen = mount(<SuccessModal {...defaultProps} isOpen />)
    expect(wrapperOpen.find('.kirk-modal-dialog').exists()).toBe(true)
  })

  it('Should have a confirmation button and call the according function when click on it', () => {
    const wrapperOpen = mount(<SuccessModal {...defaultProps} isOpen />)
    expect(wrapperOpen.find('.kirk-button-secondary').text()).toBe('Confirm')
  })

  it('Should have the proper image', () => {
    const wrapperOpen = mount(<SuccessModal {...defaultProps} isOpen />)
    const image = wrapperOpen.find('.kirk-successModal-image')
    expect(image.prop('src')).toBe('https://svgshare.com/i/AGz.svg')
    expect(image.prop('alt')).toBe('Illustration description')
  })

  it('Should have a confirmation button and call the according function when click on it', () => {
    const mockConfirm = jest.fn()
    const wrapperOpen = mount(<SuccessModal {...defaultProps} isOpen onConfirm={mockConfirm} />)
    const confirmButton = wrapperOpen.find('.kirk-button-secondary')
    expect(confirmButton.text()).toBe('Confirm')
    confirmButton.simulate('click')
    expect(mockConfirm).toHaveBeenCalledTimes(1)
  })
})
