import React from 'react'
import { shallow, mount } from 'enzyme'

import ItemChoice, { ItemChoiceStatus } from '~/itemChoice'
import { HomeIcon, NewspaperIcon, CheckShieldIcon } from '~/icon'
import Menu, { MenuItemChoiceProps } from './index'

let items: MenuItemChoiceProps[]

describe('Menu', () => {
  beforeEach(() => {
    items = [
      {
        id: 'menu-item-1',
        label: 'Dashboard',
        leftAddon: <HomeIcon />,
        href: '/',
      },
      {
        id: 'menu-item-2',
        label: 'Rides offered',
        leftAddon: <NewspaperIcon />,
        rightAddon: <CheckShieldIcon />,
        href: '/rides',
      },
    ]
  })

  it('Should accept a custom className', () => {
    const customClassName = 'custom'
    const wrapper = shallow(<Menu items={items} className={customClassName} />)
    expect(wrapper.hasClass(customClassName)).toBe(true)
  })

  it('Should render menu items', () => {
    const wrapper = mount(<Menu items={items} />)
    expect(wrapper.find(ItemChoice)).toHaveLength(2)
    expect(
      wrapper
        .find(ItemChoice)
        .first()
        .prop('href'),
    ).toEqual('/')
    expect(
      wrapper
        .find(ItemChoice)
        .first()
        .text(),
    ).toEqual('Dashboard')
    expect(wrapper.find(HomeIcon)).toHaveLength(1)
    expect(wrapper.find(CheckShieldIcon)).toHaveLength(1)
  })

  it('Should configure onClick listeners on nested menu items', () => {
    // Set up the second menu item with a mocked onClick handler.
    const onClickMock = jest.fn()
    const itemsClick = items.map(item => ({ ...item, onClick: onClickMock }))

    const wrapper = shallow(<Menu items={itemsClick} />)
    wrapper
      .find(ItemChoice)
      .last()
      .simulate('click')
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('Should use configured status for nested items', () => {
    const itemsLoading = items.map(item => ({ ...item, status: ItemChoiceStatus.LOADING }))
    const wrapper = shallow(<Menu items={itemsLoading} />)
    expect(
      wrapper
        .find(ItemChoice)
        .first()
        .prop('status'),
    ).toEqual('loading')
  })
})
