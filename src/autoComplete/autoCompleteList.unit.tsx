import React from 'react'
import { shallow, mount } from 'enzyme'

import AutoCompleteList from './autoCompleteList'
import AutoCompleteListItem from './autoCompleteListItem'

import KEYCODES from '~/_utils/keycodes'

const fakeItems = [
  { id: 'one', title: 'title1', description: 'description1' },
  { id: 'two', title: 'title2', description: 'description2' },
]

const defaultProps = {
  name: 'cities',
  items: fakeItems,
  renderItem: ({ item }: AutocompleteItemToRender) => <div>{item.title}</div>,
  visible: true,
}

const fakeKeyboardEvent = (code: string) => new KeyboardEvent('keydown', { code })

jest.useFakeTimers()

describe('AutoCompleteList', () => {
  it('Renders `null` if not visible', () => {
    const wrapper = shallow(<AutoCompleteList {...defaultProps} visible={false} />)
    expect(wrapper.html()).toBeNull()
  })

  it('Renders `null` if no items', () => {
    const wrapper = shallow(<AutoCompleteList {...defaultProps} items={[]} />)
    expect(wrapper.html()).toBeNull()
  })

  it('Renders all list items', () => {
    const wrapper = mount(<AutoCompleteList {...defaultProps} />)
    expect(wrapper.find('li')).toHaveLength(2)
  })

  it('Renders `maxItems` list items', () => {
    const wrapper = mount(<AutoCompleteList {...defaultProps} maxItems={1} />)
    expect(wrapper.find('li')).toHaveLength(1)
  })

  it('Renders items with a custom renderer', () => {
    const CustomItem = jest.fn(({ item }) => <h1>{item.title}</h1>)
    const wrapper = mount(<AutoCompleteList {...defaultProps} renderItem={CustomItem} />)
    expect(wrapper.find('h1')).toHaveLength(2)
    expect(CustomItem).toHaveBeenCalledTimes(2)
  })

  it('Renders items with a custom className', () => {
    const customClassName = 'custom-class'
    const wrapper = mount(<AutoCompleteList {...defaultProps} itemClassName={customClassName} />)
    expect(wrapper.find('li').every(`.${customClassName}`)).toBe(true)
  })

  describe('Keyboard navigation', () => {
    it('Can navigate with `down` arrow key', () => {
      const wrapper = shallow<AutoCompleteList>(<AutoCompleteList {...defaultProps} />)

      wrapper.instance().handleKeydown(fakeKeyboardEvent(KEYCODES.ARROW_DOWN))
      expect(wrapper.state('highlightedIndex')).toBe(0)
      wrapper.instance().handleKeydown(fakeKeyboardEvent(KEYCODES.ARROW_DOWN))
      expect(wrapper.state('highlightedIndex')).toBe(1)
      wrapper.instance().handleKeydown(fakeKeyboardEvent(KEYCODES.ARROW_DOWN))
      expect(wrapper.state('highlightedIndex')).toBe(0)
    })

    it('Can navigate with `up` arrow key', () => {
      const wrapper = shallow<AutoCompleteList>(<AutoCompleteList {...defaultProps} />)

      wrapper.instance().handleKeydown(fakeKeyboardEvent(KEYCODES.ARROW_UP))
      expect(wrapper.state('highlightedIndex')).toBe(1)
      wrapper.instance().handleKeydown(fakeKeyboardEvent(KEYCODES.ARROW_UP))
      expect(wrapper.state('highlightedIndex')).toBe(0)
      wrapper.instance().handleKeydown(fakeKeyboardEvent(KEYCODES.ARROW_UP))
      expect(wrapper.state('highlightedIndex')).toBe(1)
    })

    it('Can select an item with `enter` key', () => {
      const onSelectSpy = jest.fn()
      const wrapper = shallow<AutoCompleteList>(
        <AutoCompleteList {...defaultProps} onSelect={onSelectSpy} />,
      )

      wrapper.instance().handleKeydown(fakeKeyboardEvent(KEYCODES.ENTER))
      expect(onSelectSpy).not.toHaveBeenCalled()
      wrapper.instance().handleKeydown(fakeKeyboardEvent(KEYCODES.ARROW_DOWN))
      wrapper.instance().handleKeydown(fakeKeyboardEvent(KEYCODES.ENTER))
      expect(onSelectSpy).toHaveBeenCalledWith(fakeItems[0])
    })
  })

  describe('#selectedItemStatus', () => {
    it('displays an AutoCompleteListItem in loading state', () => {
      const onSelectSpy = jest.fn()
      const wrapper = shallow<AutoCompleteList>(
        <AutoCompleteList
          {...defaultProps}
          onSelect={onSelectSpy}
          selectedItemStatus={AutoCompleteListItem.STATUS.LOADING}
        />,
      )

      wrapper.instance().handleKeydown(fakeKeyboardEvent(KEYCODES.ARROW_DOWN))
      wrapper.instance().handleKeydown(fakeKeyboardEvent(KEYCODES.ENTER))

      expect(wrapper.state().selectedIndex).toBe(0)
    })
  })
})
