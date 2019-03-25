import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import DayPicker, { NavbarElementProps, CaptionElementProps } from 'react-day-picker'

import DatePicker from './index'

const classNames = {
  container: 'DayPicker',
  wrapper: 'DayPicker-wrapper',
  interactionDisabled: 'DayPicker--interactionDisabled',
  months: 'DayPicker-Months',
  month: 'DayPicker-Month',

  navBar: 'DayPicker-NavBar',
  navButtonPrev: 'DayPicker-NavButton DayPicker-NavButton--prev',
  navButtonNext: 'DayPicker-NavButton DayPicker-NavButton--next',
  navButtonInteractionDisabled: 'DayPicker-NavButton--interactionDisabled',

  caption: 'DayPicker-Caption',
  weekdays: 'DayPicker-Weekdays',
  weekdaysRow: 'DayPicker-WeekdaysRow',
  weekday: 'DayPicker-Weekday',
  body: 'DayPicker-Body',
  week: 'DayPicker-Week',
  weekNumber: 'DayPicker-WeekNumber',
  day: 'DayPicker-Day',
  footer: 'DayPicker-Footer',
  todayButton: 'DayPicker-TodayButton',

  // default modifiers
  today: 'today',
  selected: 'selected',
  disabled: 'disabled',
  outside: 'outside',
}

describe('DatePicker', () => {
  describe('renderNavbar', () => {
    const navbarProps: NavbarElementProps = {
      className: '',
      classNames,
      previousMonth: new Date(),
      month: new Date(),
      nextMonth: new Date(),
      showNextButton: true,
      showPreviousButton: true,
      onPreviousClick() {},
      onNextClick() {},
      labels: { previousMonth: '-1', nextMonth: '+1' },
      localeUtils: DayPicker.LocaleUtils,
      locale: 'en',
    }

    it('Should render the weekdays in vertical mode', () => {
      const datepicker = shallow<DatePicker>(
        <DatePicker name="datepicker" orientation={DatePicker.constants.VERTICAL} />,
      )
      const navbar = renderer.create(datepicker.instance().renderNavbar(navbarProps))
      expect(navbar).toMatchSnapshot()
    })

    it('Should render the previous/next buttons in horizontal mode', () => {
      const datepicker = shallow<DatePicker>(
        <DatePicker name="datepicker" orientation={DatePicker.constants.HORIZONTAL} />,
      )
      const navbar = renderer.create(datepicker.instance().renderNavbar(navbarProps))
      expect(navbar).toMatchSnapshot()
    })
  })

  describe('renderCaption', () => {
    const currentYear = new Date().getFullYear()
    const datepicker = shallow<DatePicker>(<DatePicker name="datepicker" />)
    const captionProps: CaptionElementProps = {
      date: new Date(currentYear, 0, 1),
      classNames,
      locale: 'en',
      localeUtils: {
        ...DayPicker.LocaleUtils,
        formatMonthTitle: datepicker.instance().formatMonthTitle,
      },
    }

    it('Should render the given month title', () => {
      const caption = renderer.create(datepicker.instance().renderCaption(captionProps))
      expect(caption).toMatchSnapshot()
    })

    it('Should render the given month title with year if it is not the current year', () => {
      const futureYearProps = { ...captionProps, date: new Date(2050, 0, 1) }
      const caption = renderer.create(datepicker.instance().renderCaption(futureYearProps))
      expect(caption).toMatchSnapshot()
    })
  })

  describe('onChange', () => {
    it('Should return the date in the format `YYYY-MM-DD`', () => {
      const onChange = jest.fn()
      const date = new Date(2020, 0, 1)
      const wrapper = shallow<DatePicker>(<DatePicker name="datepicker" onChange={onChange} />)
      wrapper.instance().onDayClick(date, {
        today: false,
        outside: false,
      })
      expect(onChange).toHaveBeenCalledWith({ name: 'datepicker', value: '2020-01-01' })
    })
  })
})
