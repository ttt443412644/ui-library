import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'

import Button from '~/button'
import Snackbar from './index'

const close = jest.fn()

describe('Snackbar', () => {
  beforeEach(jest.resetModules)

  it('should not have changed', () => {
    jest.mock('~/_utils/environment', () => ({ canUseDOM: false }))
    const Snackbar = require('./index').default

    const snackbarServerSide = renderer
      .create(
        <Snackbar isOpen close={close}>
          Oups
        </Snackbar>,
      )
      .toJSON()
    expect(snackbarServerSide).toMatchSnapshot()
  })

  it('should show the snackbar when isOpen is true', () => {
    const wrapper = shallow(<Snackbar isOpen close={close} />)
    expect(wrapper.find('.kirk-snackbar').exists()).toBe(true)
  })

  it('should not show the snackbar when isOpen is false', () => {
    const wrapper = shallow(<Snackbar isOpen={false} close={close} />)
    expect(wrapper.find('.kirk-snackbar').exists()).toBe(false)
  })

  it('should call close method when click on cross button', () => {
    const wrapper = shallow(<Snackbar isOpen close={close} />)
    wrapper.find(Button).simulate('click')
    expect(close).toHaveBeenCalled()
  })

  describe('Rendering by environment', () => {
    const modalOutput =
      // tslint:disable-next-line: max-line-length
      '<div class="transition-wrapper kirk-snackbar-container"><div class="jsx-190474685 kirk-snackbar slide-up slide-up-entered"><span role="alert" class="kirk-text kirk-text-title kirk-snackbar-content"></span><button class="kirk-button kirk-button-unstyled kirk-snackbar-cross" type="button"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="kirk-icon" width="18px" height="18px" aria-hidden="true"><path d="M19 5L5 19M19 19L5 5" fill="none" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"></path></svg></button></div></div>'

    beforeEach(jest.resetModules)

    it('Should render the snackbar server side', () => {
      jest.mock('~/_utils/environment', () => ({ canUseDOM: false }))
      const Snackbar = require('./index').default
      const serverSide = mount(<Snackbar isOpen close={close} />)
      expect(serverSide.html()).toBe(modalOutput)
    })

    it('Should render the snackbar client side', () => {
      jest.mock('~/_utils/environment', () => ({ canUseDOM: true }))
      const Snackbar = require('./index').default
      const clientSide = mount(<Snackbar isOpen close={close} />)
      expect(clientSide.html()).toBe(modalOutput)
    })
  })
})
