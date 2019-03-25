import React from 'react'
import { shallow } from 'enzyme'

import Loader from '~/loader'
import Item from '~/_utils/item/index'
import { color } from '~/_utils/branding'
import CircleIcon from '~/icon/circleIcon'
import CheckIcon from '~/icon/checkIcon'

import ToggleButton from './index'

const defaultProps = {
  name: 'foo',
  label: 'Foo',
}

describe('ToggleButton', () => {
  it('Should render a button html component with the aria-pressed attribute', () => {
    const toggleButton = shallow(<ToggleButton {...defaultProps} />)
    const btn = toggleButton.find('button')
    expect(btn.prop('aria-pressed')).toBeDefined()
  })

  it('Should change the checked state when clicking on it', () => {
    const toggleButton = shallow<ToggleButton>(<ToggleButton {...defaultProps} />)
    const instance = toggleButton.instance()
    expect(toggleButton.state('checked')).toBe(false)
    instance.onButtonClick()
    expect(toggleButton.state('checked')).toBe(true)
  })

  it('Should call the onChange prop when clicking on it', () => {
    const onChangeMock = jest.fn()
    const toggleButton = shallow<ToggleButton>(
      <ToggleButton {...defaultProps} onChange={onChangeMock} />,
    )
    toggleButton.instance().onButtonClick()
    expect(onChangeMock).toHaveBeenCalledWith({ name: 'foo', value: true })
  })

  describe('checked state', () => {
    it('Should render a CheckIcon', () => {
      const toggleButton = shallow(<ToggleButton {...defaultProps} checked />)
      expect(toggleButton.find(Item).prop('rightAddon')).toEqual(
        <CheckIcon iconColor={color.white} backgroundColor={color.primary} thin />,
      )
    })

    it('Should have the aria-pressed attribute to true', () => {
      const toggleButton = shallow(<ToggleButton {...defaultProps} checked />)
      const btn = toggleButton.find('button')
      expect(btn.prop('aria-pressed')).toBe(true)
    })
  })

  describe('unchecked state', () => {
    it('Should render a CircleIcon', () => {
      const toggleButton = shallow(<ToggleButton {...defaultProps} checked={false} />)
      expect(toggleButton.find(Item).prop('rightAddon')).toEqual(
        <CircleIcon iconColor={color.primary} thin />,
      )
    })

    it('Should have the aria-pressed attribute to false', () => {
      const toggleButton = shallow(<ToggleButton {...defaultProps} checked={false} />)
      const btn = toggleButton.find('button')
      expect(btn.prop('aria-pressed')).toBe(false)
    })
  })

  describe('loading status', () => {
    it('Should render a Loader', () => {
      const toggleButton = shallow(
        <ToggleButton {...defaultProps} status={ToggleButton.STATUS.LOADING} />,
      )
      expect(toggleButton.find(Item).prop('rightAddon')).toEqual(<Loader size={24} inline />)
    })

    it('Should be disabled', () => {
      const toggleButton = shallow(
        <ToggleButton {...defaultProps} status={ToggleButton.STATUS.LOADING} />,
      )
      const btn = toggleButton.find('button')
      expect(btn.prop('disabled')).toBe(true)
    })
  })
})
