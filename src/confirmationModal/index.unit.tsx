import React from 'react'
import { shallow, mount } from 'enzyme'

import ConfirmationModal from './index'
import CrossIcon from '~/icon/crossIcon'

const defaultProps = {
  onClose() {},
  onConfirm() {},
  confirmLabel: 'Confirm',
}

const defaultWarningProps = {
  ...defaultProps,
  status: ConfirmationModal.STATUS.WARNING,
}

const defaultReminderProps = {
  ...defaultProps,
  status: ConfirmationModal.STATUS.REMINDER,
}

describe('<ConfirmationModal> with warning status', () => {
  it('Should be not visible if isOpen is set to false', () => {
    const wrapperWarning = shallow(<ConfirmationModal {...defaultWarningProps} />)
    expect(wrapperWarning.find('.kirk-confirmationModal-dialog').exists()).toBe(false)
  })

  it('Should be visible if isOpen is set to true', () => {
    const wrapperWarningOpen = mount(<ConfirmationModal {...defaultWarningProps} isOpen />)
    expect(wrapperWarningOpen.find('.kirk-confirmationModal-dialog').exists()).toBe(true)
  })

  it('Should have a close button and hide the ConfirmationModal when click on it', () => {
    const mockClose = jest.fn()
    const wrapperWarningOpen = mount(
      <ConfirmationModal {...defaultWarningProps} isOpen onClose={mockClose} />,
    )
    wrapperWarningOpen.find(CrossIcon).simulate('click')
    expect(mockClose).toHaveBeenCalledTimes(1)
  })

  it('should have a confirm button with label and action', () => {
    const mockConfirm = jest.fn()
    const wrapperWarningOpen = mount(
      <ConfirmationModal {...defaultWarningProps} isOpen onConfirm={mockConfirm} />,
    )
    const confirmButton = wrapperWarningOpen.find('.kirk-button-warning')
    expect(confirmButton.text()).toBe('Confirm')
    confirmButton.simulate('click')
    expect(mockConfirm).toHaveBeenCalledTimes(1)
  })
})

describe('<ConfirmationModal> with reminder status', () => {
  it('Should have no close button', () => {
    const wrapperReminderOpen = mount(<ConfirmationModal {...defaultReminderProps} isOpen />)
    expect(wrapperReminderOpen.find(CrossIcon).exists()).toBe(false)
  })
})
