import React from 'react'
import { mount } from 'enzyme'
import TopTripCardList from './TopTripCardList'
import TripCard from 'tripCard'

const tripCardConfig = {
  ariaLabel: 'Pick-up point: Paris, Drop-off point: Bordeaux, Departure time: 09:00, warning',
  href: '/',
  itinerary: [
    {
      mainLabel: 'Paris',
      subLabel: 'Porte de Vincennes',
      time: '09:00',
      isoDate: '2017-12-11T09:00',
      distanceFromPoint: '1,5km',
    },
    {
      mainLabel: 'Bordeaux',
      subLabel: 'Gare Bordeaux Saint-Jean',
      time: '12:00',
      isoDate: '2017-12-11T12:00',
      distanceFromPoint: '8km',
    },
  ],
  price: '8,00€',
  flags: {
    ladiesOnly: true,
    maxTwo: true,
    autoApproval: true,
  },
  metaUrl: 'Meta URL',
  badge: 'Cheapest',
  title: '',
}

describe('TopTripCardList component', () => {
  it('Should render as many TripCards as passed', () => {
    const wrapper = mount(
      <TopTripCardList>
        <TripCard {...tripCardConfig} />
        <TripCard {...tripCardConfig} />
        <TripCard {...tripCardConfig} />
      </TopTripCardList>,
    )
    expect(wrapper.find(TripCard).length).toEqual(3)
  })
  it('Should have the wrapped class', () => {
    const wrapper = mount(
      <TopTripCardList isWrapped>
        <TripCard {...tripCardConfig} />
        <TripCard {...tripCardConfig} />
        <TripCard {...tripCardConfig} />
      </TopTripCardList>,
    )
    expect(wrapper.find('.kirk-topTripCardList-wrapped').exists()).toBe(true)
    wrapper.setProps({ isWrapped: false })
    expect(wrapper.find('.kirk-topTripCardList-wrapped').exists()).toBe(false)
  })
})
